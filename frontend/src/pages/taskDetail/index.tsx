import { Card, CardBody, Text, Center, Flex, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Divider, Select } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { UserContext  } from '../../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { MdAdd, MdOutlineCheck } from 'react-icons/md'
import ModalResult from '../../components/modalResult'
import React from 'react'
import { ITask, IVotes } from './../../interface/index';
import { api } from '../../axios'
import TaskCard from '../../components/Card'


export default function TaskDetail(){

    const navigate = useNavigate()
    const {userName, setUserName}  = useContext(UserContext)
    const {taskName, setTaskName} = useContext(UserContext)
    const [tasks, setTasks] = useState<ITask | null>(null)
    const [votes, setVotes] = useState<IVotes[]>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:iOpen, onOpen:oOpen, onClose: oClose } = useDisclosure()
    const {id} = useParams();
    const [vote, setVote] = useState(Number)
    const [finalVote, setFinalVote] = useState(Number)
    const [isVisible, setIsVisible] = useState(true);
    const [visible, setVisible] = useState(false);
    let [meio, setMeio] = useState(0);
    let [um, setUm] = useState(0);
    let [dois, setDois] = useState(0);
    let [tres, setTres] = useState(0);
    let [cinco, setCinco] = useState(0);
    let [oito, setOito] = useState(0);
    let [total, setTotal] = useState(0);
    
    const [isDisabled, setIsDisabled] = useState(true);
    let scoreArray = [
        { chave: 'Meio', valor: meio, ponto: 0.5 },
        { chave: 'Um', valor: um, ponto: 1 },
        { chave: 'Dois', valor: dois, ponto: 2 },
        { chave: 'Tres', valor: tres, ponto: 3 },
        { chave: 'Cinco', valor: cinco, ponto: 5},
        { chave: 'Oito', valor: oito, ponto: 8 }
    ];

    function backToList(){
        navigate('/tasks')
    }
    
    function toggleDisplay(){
        setIsVisible(!isVisible);
      };
      
    function toggleDisplayList(){
        setVisible(!visible);
      };

    function handleVote(){
        if(vote === 0.5 || vote === 1 || vote === 2  || vote === 3  || vote === 5  || vote === 8 ){ 
            const fetchdata = async () => {
                try{
                    const data = {
                        id: id,
                        vote: vote
                    }
                    const response = await api.post('votes/', data)
                    onClose()
                }catch(error){
                    console.error('Erro na requisição:', error);
                }
            }    
            fetchdata()
            onClose()
            toggleDisplay()
            handleDisableButton()
        }
    }

    function handleResultVote(){
        const fetchData = async () => {
            try {
                const response = await api.get(`votes/`);
                setVotes(response.data);
                console.log("🚀 ~ fetchData ~ (response.data:", response.data)
                response.data.forEach((item: { vote: any }) => {

                    console.log(item.vote);
                    switch (item.vote) {
                        case 0.5:
                            setMeio( meio = meio + 1);
                            break;
                        case 1:
                            setUm(um = um + 1);
                            break;
                        case 2:
                            setDois(dois = dois + 1);
                            break;
                        case 3:
                            setTres(tres = tres + 1);
                            break;
                        case 5:
                            setCinco(cinco = cinco + 1);
                            break;
                        case 8:
                            setOito(oito = oito + 1);
                            break;
                    }
                });                
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };
        fetchData();
        toggleDisplayList();
        oOpen()
   }

    
    
    function highScore(){
        let maxObj = scoreArray[0];
        for (let i = 1; i < scoreArray.length; i++) {
            if (scoreArray[i].valor >= maxObj.valor) {
                maxObj = scoreArray[i];
            }
        }
        return maxObj;
    }

    
    function  displayHighScore() {   
            let maxObj = highScore()
            setFinalVote(maxObj.ponto)
            return maxObj.chave
        }


    function handleDisableButton(){
        setIsDisabled(!isDisabled);
      };

      function deleteVotes() {
        const fetchdata = async () => {
            try {
                const response = await api.delete(`votes/${id}`);
                console.log('Votos apagados com sucesso!');
                return 200
            } catch (error) {
                console.error('Erro ao apagar os votos:', error);
                return 400;
            }
        }
        
        fetchdata();
    }

      function updateTask(){
            const fetchdata = async () => {
                try{
                    const data = {
                        title: taskName,
                        result: finalVote
                    }
                    const response = await api.put(`task/${id}`, data)
                }catch(error){
                    console.error('Erro na requisição:', error);
                }
            }           
            
            fetchdata()
            deleteAllVotes();
            backToList()
    }

    async function deleteAllVotes() {
        let res = total;
        do {
            await deleteVotes();
            res--
        } while (res >= 0);
    }

    useEffect(() => {
        setTotal(um + dois + tres + cinco + oito);
    }, [um, dois, tres, cinco, oito]);

    function percent(value: number){
       let result = value / total;
       let percent = result * 100;
       return isNaN(percent) ? 0 : percent.toFixed(2)+'%';  
    }

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const response = await api.get(`task/${id}`)
                setTasks(response.data)
            }catch(error){
                console.error('Erro na requisição:', error);
            }
        }

        fetchdata()
    })

    return(
        
         <Flex direction="column" align="center" justify="center" height="100vh" width={"100vw"}>

            <Center>
                <Text as='b' mb={3}  fontSize={'1.5em'}>Planning Poker </Text>
            </Center>

            <Center mb={3}>
                <Button display={isVisible ? 'visible' : 'none'} leftIcon={<MdAdd/>} colorScheme='green' variant='solid' onClick={onOpen}>
                    Votar na tarefa  
                </Button>

            </Center >
                <Card width={10} height={10} mb={3} display={isVisible ? 'none' : "block"}>
                    <MdOutlineCheck  size={40} color='green'/>
                </Card>

            <Flex direction="row" align="center" justify="center" flexWrap={'wrap'}>
                <TaskCard
                    key={tasks?.id}
                    title={tasks?.title}
                    result={tasks?.result}
                />
                   
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontSize={'2xl'}>Pontuar tarefa</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={'xl'} mb={3}>
                        Selecione a pontuação da tarefa:
                    </Text>
                    <Divider/>
                    <Select placeholder='Select option' onChange={(e) => setVote(Number(e.target.value))} value={vote}>
                        <option value='0.5'>0.5</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='5'>5</option>
                        <option value='8'>8</option>
                    </Select>
                    <Divider/>
                </ModalBody>

            <ModalFooter>
                <Flex justifyContent='center' alignItems='center' width={'100%'}>
                    <Button colorScheme='green' width={'40%'} onClick={handleVote} >Confirmar</Button>                    
                </Flex>
            </ModalFooter>
            </ModalContent>
            </Modal>

            
            </Flex>
            <Center mt={10}>
                <Button leftIcon={<MdOutlineCheck />} colorScheme='green' variant='solid' onClick={handleResultVote} isDisabled={isDisabled} >
                   Finalizar Votação 
                </Button>                                    
            </Center>        

            <ModalResult
                isOpen={iOpen}
                onClose={oClose}
                displayHighScore={displayHighScore}
                meio={meio} 
                um={um}
                dois={dois}
                tres={tres}
                cinco={cinco}
                oito={oito}
                percent={percent}
                updateTask={updateTask}
            />
        </Flex>

    )
}

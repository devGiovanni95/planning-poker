import { Card,  CardBody, Text, Center, Input, Flex, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Divider } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { UserContext  } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { MdAdd } from 'react-icons/md'
import {ITask} from '../../interface'
import { api } from '../../axios'


export default function Tasks(){

    const navigate = useNavigate()
    const {userName, setUserName}  = useContext(UserContext)
    const {taskName, setTaskName} = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleTask(id:any, name:any){
        setTaskName(name)
        if(userName != ''){
            navigate(`/taskdetail/${id}`)
        }
    }

    function createTask(){
        if(title != ''){
            const fetchdata = async () => {
                try{
                    const data = {
                        title: title
                    }
                    const response = await api.post('task', data)
                    onClose()
                }catch(error){
                    console.error('Erro na requisição:', error);
                }
            }
    
            fetchdata()
        }
    }
    
    useEffect( () => {
        const fetchdata = async () => {
            try{
                const response = await api.get('task')
                setTasks(response.data)
            }catch(error){
                console.error('Erro na requisição:', error);
            }
        }
        fetchdata()
        const userNameFromStorage = sessionStorage.getItem("username");

        if (userNameFromStorage) {
            setUserName(userNameFromStorage);
        }else{
            navigate("/")
        }        
    } ,[tasks, userName])

    return(
        
         <Flex direction="column" align="center" justify="center" height="100vh">

            <Center>
                <Text as='b' mb={3}  fontSize={'1.5em'}>Bem vindo ao Planning Poker </Text>
            </Center>

            <Center mb={3}>
                <Button leftIcon={<MdAdd/>} colorScheme='green' variant='solid' onClick={onOpen}>
                    Adicionar tarefa
                </Button>
            </Center>

            <Flex direction="row" align="center" justify="center" flexWrap={'wrap'}>
                { tasks && (
                    tasks.map((task:ITask)=> (
                        <Card border={'1px'} borderRadius={10} width={'50vw'} marginRight={4} mb={3} onClick={() => handleTask(task.id, task.title)}>
                            <CardBody width={'100%'} key={task.id}>
                                <Text>Tarefa: {task.title}</Text>
                                {task.result ? (
                                    <Text>Pontuação: {task.result}</Text>
                                    ):(
                                    <Text>Pontuação: Não definida {task.result}</Text>
                                )}
                            </CardBody>
                        </Card>
                    ))
                )}
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={'2xl'}>Criar nova tarefa</ModalHeader>
                    <ModalCloseButton />
                        <ModalBody>
                            <Text fontSize={'xl'}>
                                Titulo da tarefa:
                            </Text>
                            <Divider/>
                            <Input placeholder='Insira o nome da tarefa' border={'1px'} width={'100%'} onChange={(e) => {setTitle(e.target.value)}}/>
                            <Divider/>
                        </ModalBody>

                    <ModalFooter>
                        <Flex justifyContent='center' alignItems='center' width={'100%'}>
                            <Button colorScheme='green' width={'40%'} onClick={createTask} >Confirmar</Button>                    
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>


    )
}

import { Card, CardBody, Text, Center, Box, Input, Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext  } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function Home(){

    const navigate = useNavigate()
    const {userName, setUserName}  = useContext(UserContext)
    
    function handleUser(){
        if(userName != ''){
            sessionStorage.setItem("username", userName);
            navigate('/tasks')
        }
    }
    


    return(
        <Box position={'relative'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Card 
                border={'1px'}
                borderRadius={50}
                width={'50%'}
                height={'35%'}
                >
                <CardBody>
                <Text as='b' mb={12} fontSize={'1.5em'}>Bem vindo ao Planning Poker</Text>
                    <Text size={'xl'} mt={5} fontSize={'1.2em'} ml={'10%'} mb={5} >Por favor insira seu username:</Text>
                    <Input placeholder='Insira seu username' border={'1px'} width={'80%'} ml={'10%'} onChange={(e) => { setUserName(e.target.value)}}/>

                    <Center mt={8}>
                        <Button colorScheme='teal' size='lg' onClick={handleUser}>
                            Confirmar
                        </Button>
                    </Center>

                </CardBody>
            </Card>
            </Box>
    )
}
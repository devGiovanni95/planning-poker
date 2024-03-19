import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Center, Text, Button } from '@chakra-ui/react';
import { MdOutlineCheck } from 'react-icons/md';

interface ModalResultProps {
    isOpen: boolean;
    onClose: () => void;
    displayHighScore: () => any;
    meio: number;
    um: number;
    dois: number;
    tres: number;
    cinco: number;
    oito: number;
    percent: (value: number) => any;
    updateTask: () => void;
}

const ModalResult: React.FC<ModalResultProps> = ({
    isOpen,
    onClose,
    displayHighScore,
    meio,
    um,
    dois,
    tres,
    cinco,
    oito,
    percent,
    updateTask
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Resultado</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.7em'}>Votos</Text>
                    </Center>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.5em'}>Maior voto: {displayHighScore()} Pontos</Text>
                    </Center>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.5em'}>0.5 = {meio} votos  {percent(meio)}</Text>
                    </Center>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.5em'}>1.0 = {um} votos {percent(um)}</Text>
                    </Center>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.5em'}>2.0 = {dois} votos {percent(dois)}</Text>
                    </Center>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.5em'}>3.0 = {tres} votos {percent(tres)}</Text>
                    </Center>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.5em'}>5.0 = {cinco} votos {percent(cinco)}</Text>
                    </Center>

                    <Center mt={0.5}>
                        <Text as='b' mb={0.5} fontSize={'1.5em'}>8.0 = {oito} votos {percent(oito)}</Text>
                    </Center>

                    <Center mt={10}>
                        <Button leftIcon={<MdOutlineCheck />} colorScheme='green' variant='solid' onClick={updateTask} >
                            Atribuir pontuações
                        </Button>
                    </Center>


                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalResult;


import React from 'react';
import { Card, CardBody, Text } from '@chakra-ui/react';
import { ITask } from '../../interface';

const TaskCard = ({ id, title, result }:any) => {
  return (
    <Card border={'1px'} borderRadius={10} width={'35vw'} marginRight={4} mb={3}>
      <CardBody width={'100%'} key={id}>
        <Text>Tarefa: {title}</Text>
        {result ? (
          <Text>Pontuação: {result}</Text>
        ) : (
          <Text>Pontuação: 0</Text>
        )}
      </CardBody>
    </Card>
  );
};

export default TaskCard;
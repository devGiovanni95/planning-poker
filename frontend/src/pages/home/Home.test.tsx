import {render, screen, fireEvent} from '@testing-library/react';
import Home from './index'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const renderComponent = () => {    
    render(
        <ChakraProvider>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </ChakraProvider>
    );
}  

describe("Page home", () => {
    
    it("should render home page", () => {

        renderComponent()
        
        screen.getByText("Bem vindo ao Planning Poker")
        screen.getByText("Por favor insira seu username:")
        screen.getByPlaceholderText("Insira seu username")
        screen.getByText("Confirmar")
    });
});
import {useState} from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Board from './Board';
import Modal from './Modal';
import PlayersInfo from './PlayersInfo'

const GameContainer = styled.div`
    padding: 1.5rem;
    margin: 0 auto;
    height: 100vh;
    width: 100%;
    max-width: 1110px;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    align-items: center;



    @media (min-width: 768px) {
        padding: 2.5rem;
    }

    @media (min-width: 1444px) {
        padding: 5rem 0;
    }
`;

export default function Game({handleNewGame}) {

    return (
        <GameContainer>
            <Nav handleNewGame={handleNewGame}/>
        </GameContainer>
    )
}
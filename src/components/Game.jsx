import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Board from './Board';
import Modal from './Modal';
import PlayersInfo from './PlayersInfo'
import ResultsMenu from './ResultsMenu';
import formatTime from '../utility/formatTime';

const GameContainer = styled.div`
    padding: 1.5rem;
    margin: 0 auto;
    height: 100vh;
    width: 100%;
    max-width: 1110px;
    display: flex; 
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .players-info-container {
        width: 100%;
        display: grid;
        justify-content: center;
        grid-template-columns: ${({$numPlayers}) => `repeat(${$numPlayers}, minmax(50px, 250px))`};        grid-gap: 1.5rem;
    }

    @media (min-width: 768px) {
        padding: 2.5rem;
    }

    @media (min-width: 1444px) {
        padding: 5rem 0;
    }
`;

export default function Game({numOfPlayers, handleNewGame}) {
    const [players, setPlayers] = useState([]);
    const [timeLapsed, setTimeLapsed] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    
    useEffect(() => {
        const initializePlayers = (numPlayers) => {
            return Array.from({length: numPlayers}, (_, index) => ({
                name: `Player ${index + 1}`,
                pairs: 0,
                turn: index === 0,
                id: index
            }));
        }

        const playersArray = initializePlayers(numOfPlayers);
        setPlayers(playersArray);
    }, [numOfPlayers]);

    useEffect(() => {
        
        let interval;
        if (!menuOpen && !gameOver) {
            interval = setInterval(() => {
                setTimeLapsed(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [menuOpen, gameOver])

    function handleToggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function handleGameOver() {
        setGameOver(!gameOver);
    }

    const time = formatTime(timeLapsed);

    
    
    return (
        <GameContainer $numPlayers={numOfPlayers > 1 ? numOfPlayers : 2}>
            <button onClick={handleGameOver}>Stimulate Game over</button>
            {gameOver && 
            <ResultsMenu handleNewGame={handleNewGame} players={players} timeLapsed={time} moves="10"/>
            }
            <Nav menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} handleNewGame={handleNewGame}/>
            <PlayersInfo numOfPlayers={numOfPlayers} players={players} time={time}/>
        </GameContainer>
    )
}
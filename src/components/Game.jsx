import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Board from './Board';
import PlayersInfo from './PlayersInfo'
import ResultsMenu from './ResultsMenu';
import formatTime from '../utility/formatTime';

const GameContainer = styled.div`
    padding: 1.5rem;
    margin: 0 auto;
    height: 100svh;
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

export default function Game({numOfPlayers, isNumbers, isSmallGrid, handleNewGame}) {
    const [players, setPlayers] = useState([]);
    const [timeLapsed, setTimeLapsed] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [movesTaken, setMovesTaken] = useState(0);
    const [toggleRefreshGame, setToggleRefreshGame] = useState(false);

    // Populates gameboard on mount and when user 'refreshes' game
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
        setMenuOpen(false);
        setMovesTaken(0);
        setTimeLapsed(0);
        setGameOver(false);
    }, [toggleRefreshGame]);

    // initialises setInterval - clears set interval on game end or menu open (to stop timer)
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
        setGameOver(true);
    }
    function increaseMovesTaken() {
        setMovesTaken(movesTaken + 1);
    }

    function handleRefreshGame() {
        setToggleRefreshGame(!toggleRefreshGame);
    }

    // utility function to format time 00:00
    const time = formatTime(timeLapsed);

    // Run on every second click -ie end of player turn. Increases moves, updates player state
    function changePlayerTurn(updateScore) {
        increaseMovesTaken();
        let newPlayers = [...players];
        // find current player -> rotate turn - increase pair property if pair found
        for (let i = 0; i < newPlayers.length; i++) {
            if (newPlayers[i].turn) {
                newPlayers[i].turn = false;
                newPlayers[(i + 1) % newPlayers.length].turn = true;
                updateScore && newPlayers[i].pairs++; 
                break;
            }
        }
        setPlayers(newPlayers);
    }
    
    
    return (
        <GameContainer $numPlayers={numOfPlayers > 1 ? numOfPlayers : 2}>
            {gameOver && 
            <ResultsMenu 
                handleRefreshGame={handleRefreshGame}
                handleNewGame={handleNewGame} 
                players={players} 
                timeLapsed={time}
                moves={movesTaken}
            />
            }
            <Nav 
                menuOpen={menuOpen} 
                handleToggleMenu={handleToggleMenu} 
                handleNewGame={handleNewGame} 
                handleRefreshGame={handleRefreshGame}/>
            <Board
                toggleRefreshGame={toggleRefreshGame}
                handleGameOver={handleGameOver}
                players={players} 
                isNumbers={isNumbers} 
                isSmallGrid={isSmallGrid}
                changePlayerTurn={changePlayerTurn}
            />
            <PlayersInfo 
                numOfPlayers={numOfPlayers} 
                players={players} 
                time={time} 
                moves={movesTaken}
            />
        </GameContainer>
    )
}
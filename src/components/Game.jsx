import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Board from './Board';
import Modal from './Modal';
import PlayerInfo from './PlayerInfo'

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
    // console.log(timeLapsed)
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
        console.log('use effect');
        const interval = setInterval(() => {
            console.log('time, ');
            setTimeLapsed(prevTime => prevTime + 1);
        }, 1000);

        return () => clearTimeout(interval);
    }, [])

    function formatTime(time) {
        const mins = Math.floor(time / 60);
        let secs = time % 60;
        if (secs < 10) {
            secs = '0' + secs;
        }
        return `${mins}: ${secs}`;
    }

    const time = formatTime(timeLapsed);

    const playersInfoDivs = players.map((item) => {
        return (
            <PlayerInfo singlePlayer={false} name={item.name} id={item.id} pairs={item.pairs} turn={item.turn} />
        )
    })
    
    return (
        <GameContainer $numPlayers={numOfPlayers > 1 ? numOfPlayers : 2}>
            <Nav handleNewGame={handleNewGame}/>
            <div className="players-info-container">
                {numOfPlayers > 1 && playersInfoDivs}
                {numOfPlayers === 1 && 
                    <>
                        <PlayerInfo singlePlayer={true} title="Time" val={time} />
                        <PlayerInfo singlePlayer={true} title="Moves" val="23" />
                    </>
                }
            </div>
        </GameContainer>
    )
}
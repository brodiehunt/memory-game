import PlayerInfo from './PlayerInfo';
import styled from 'styled-components';

const PlayersDiv = styled.div`
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: ${({$numPlayers}) => `repeat(${$numPlayers}, minmax(50px, 250px))`};       
    grid-gap: 1.5rem;
    
`

export default function PlayersInfo({numOfPlayers, players, time}) {

    const playersInfoDivs = players.map((item) => {
        return (
            <PlayerInfo singlePlayer={false} name={item.name} id={item.id} pairs={item.pairs} turn={item.turn} />
        )
    });

    return (
        <PlayersDiv $numPlayers={numOfPlayers > 1 ? numOfPlayers : 2}>
            {numOfPlayers > 1 && playersInfoDivs}
                {numOfPlayers === 1 && 
                    <>
                        <PlayerInfo singlePlayer={true} title="Time" val={time} />
                        <PlayerInfo singlePlayer={true} title="Moves" val="23" />
                    </>
                }
        </PlayersDiv>
    )
};
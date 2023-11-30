import {useState} from 'react';
import Menu from './Menu';
import Game from './Game';
import BodyContainer from './styles/BodyContianer';

export default function Main() {
    const [isNumbers, setIsNumbers] = useState(true);
    const [numOfPlayers, setNumOfPlayers] = useState(1);
    const [isSmallGrid, setIsSmallGrid] = useState(true);
    const [menuOpen, setMenuOpen] = useState(true);

    function handleChangeIsNumbers() {
        setIsNumbers(!isNumbers);
    }

    function handleChangeNumPlayers(num) {
        setNumOfPlayers(num);
    }

    function handleChangeGrid() {
        setIsSmallGrid(!isSmallGrid);
    }

    function toggleMenuOpen() {
        setMenuOpen(!menuOpen);
    }

    function newGame() {
        setIsNumbers(true);
        setNumOfPlayers(1);
        setIsSmallGrid(true);
        setMenuOpen(true);
    }


    return (
        <BodyContainer $background={menuOpen ? 'dark' : 'light'}>
            {menuOpen ? (
                <Menu
                isNumbers={isNumbers}
                numOfPlayers={numOfPlayers}
                isSmallGrid={isSmallGrid}
                toggleMenuOpen={toggleMenuOpen}
                handleChangeIsNumbers={handleChangeIsNumbers}
                handleChangeNumPlayers={handleChangeNumPlayers}
                handleChangeGrid={handleChangeGrid}/>
                ) : (
                <Game
                    isNumbers={isNumbers}
                    numOfPlayers={numOfPlayers}
                    isSmallGrid={isSmallGrid}
                    handleNewGame={newGame}
                /> 
            )}
            
            
        </BodyContainer>
    )
}
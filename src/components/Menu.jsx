import {useState} from 'react';
import Button from './Button';
import MenuContainer from './styles/MenuContainer';


export default function Menu({isNumbers, numOfPlayers, isSmallGrid, handleChangeIsNumbers, handleChangeNumPlayers, handleChangeGrid, toggleMenuOpen}) {
    const isVal = false;
    return (
        <MenuContainer >
            <h1>memory</h1>
            <div className="menu">
                <div className="btn-group-container">
                    <div className="group-label">Select Theme</div>
                    <div className="btn-group two">
                        <Button className={`btn btn-menu ${isNumbers ? 'active': 'secondary'}`} text="Numbers"
                        onClick={handleChangeIsNumbers}/>
                        <Button className={`btn btn-menu ${isNumbers ? 'secondary': 'active'}`} text="Icons"
                        onClick={handleChangeIsNumbers}/>
                    </div>
                </div>
                <div className="btn-group-container">
                    <div className="group-label">Number of Players</div>
                    <div className="btn-group">
                        <Button className={`btn btn-menu ${numOfPlayers === 1 ? 'active': 'secondary'}`} text="1"
                        onClick={() => handleChangeNumPlayers(1)}/>
                        <Button className={`btn btn-menu ${numOfPlayers === 2 ? 'active': 'secondary'}`} text="2"
                        onClick={() => handleChangeNumPlayers(2)}/>
                        <Button className={`btn btn-menu ${numOfPlayers === 3 ? 'active': 'secondary'}`} text="3"
                        onClick={() => handleChangeNumPlayers(3)}/>
                        <Button className={`btn btn-menu ${numOfPlayers === 4 ? 'active': 'secondary'}`} text="4"
                        onClick={() => handleChangeNumPlayers(4)}/>
                    </div>
                </div>
                <div className="btn-group-container">
                    <div className="group-label">Grid Size</div> 
                    <div className="btn-group two">
                        <Button className={`btn btn-menu ${isSmallGrid ? 'active': 'secondary'}`} text="4x4"
                        onClick={handleChangeGrid}
                        />
                        <Button className={`btn btn-menu ${isSmallGrid ? 'secondary': 'active'}`} text="6x6"
                        onClick={handleChangeGrid}
                        />
                    </div>
                </div>
                <Button className="btn btn-lrg primary" text="Start Game"
                onClick={toggleMenuOpen}
                ></Button>
            </div>
        </MenuContainer>
        
    )
}
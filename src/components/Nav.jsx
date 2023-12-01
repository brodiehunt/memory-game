import styled from 'styled-components';
import Button from './Button';
import {useState} from 'react';

const NavEl = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;

    h1 {
        color: var(--background-col);
        font-size: var(--font-sz-700);
    }

    .nav-buttons {
        display: none;
        gap: 0.4rem;
    }

    .menu-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0, 0.5);
    }

    .menu {
        width: 100%;
        margin: 0 1.5rem;
        padding: 1.5rem;
        background-color: var(--light);
        border-radius: var(--br-S);
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: var(--font-sz-1000);
        }

        .nav-buttons {
            display: flex;
        }
        .btn.open-menu {
            display: none;
        }
    }
`;

export default function Nav({menuOpen, handleNewGame, handleToggleMenu, handleRefreshGame}) {
    

    return (
        <NavEl>
            <h1>memory</h1>
            <div className="nav-buttons">
                <Button className="btn primary btn-nav" text="Restart" onClick={handleRefreshGame}/>
                <Button className="btn secondary btn-nav" text="New Game" onClick={handleNewGame}/>
            </div>
            <Button className="btn primary btn-nav open-menu" text="Menu" onClick={handleToggleMenu}/>
            {menuOpen && 
                <div className="menu-modal">
                    <div className="menu">
                        <Button className="btn primary btn-lrg" text="Restart" onClick={handleRefreshGame}/>
                        <Button className="btn secondary btn-lrg" text="New Game" onClick={handleNewGame}/>
                        <Button className="btn secondary btn-lrg" text="Resume Game" onClick={handleToggleMenu}/>
                    </div>
                </div>
            }
        </NavEl>
)
}
import styled from 'styled-components';
import Button from './Button';

const ResultModal = styled.div`
    
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0, 0.5);
    
    .results-modal {
        width: 100%;
        margin: 0 1.5rem;
        padding: 1.5rem;
        background-color: var(--light);
        border-radius: var(--br-S);
       
    }

    h2 {
        text-align: center;
        color: var(--text-darkest);
        font-size: var(--font-sz-700);
        margin-bottom: 0.5625rem;
    }

    .statement {
        text-align: center;
        color: var(--text-lighter);
        font-size: var(--font-sz-200);
        margin-bottom: 1.5rem;
    }

    .info-grid {
        margin-bottom: 1.5rem;
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
        margin-bottom: 1rem;
        padding: 1rem;
        border-radius: 0.3125rem;
        background-color: var(--neutral);
        color: var(--text-lighter);
    }
    .container.winner {
        background-color: var(--background-col);
        color: var(--text-lightest);
    }

    .player {
        font-size: var(--font-sz-100);
    }

    .pairs {
        font-size: var(--font-sz-600);
        color: var(--text-dark);
    }

    .winner .pairs {
        color: var(--text-lightest);
    }

    .btns-container {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {

        .results-modal {
            max-width: 654px;
            margin: 0 auto;
        }

        h2 {
            font-size: var(--font-sz-1200);
            margin-bottom: 1rem;
        }

        .statement {
            font-size: var(--font-sz-500);
            margin-bottom: 2.5rem;
        }

        .info-grid {
            margin-bottom: 2.5rem;
        }

        .container {
            padding: 1.5rem 2rem;
            border-radius: var(--br-S);
        }

        .player {
            font-size: var(--font-sz-500);
        }

        .pairs {
            font-size: var(--font-sz-900);
        }

        .btns-container {
            grid-template-rows: auto;
            grid-template-columns: 1fr 1fr;

        }
    }

`;

export default function ResultsMenu({players, timeLapsed, moves, handleNewGame, handleRefreshGame}) {
    let isWin = false;
    let heading;
    let statement;
    let playerDivs;

    if (players.length === 1) {
        heading = 'You did it!';
        statement = "Game over! Heres how you got on..."
        playerDivs = (
            <>
                <div className="container" >
                    <div className="player">Time Elapsed</div>
                    <div className="pairs">{timeLapsed}</div>
                </div>
                <div className="container" >
                    <div className="player">Moves Taken</div>
                    <div className="pairs">{moves}</div>
                </div>         
            </>
        )
    } else {
        const sortedPlayers = players.sort((a, b) => b.pairs - a.pairs);
    
        function determineGameResult(sortedPlayers) {
            let win = false;
            let currentHighestScore = 0;
            for (let i = 0; i< sortedPlayers.length; i++) {
                if (sortedPlayers[i].pairs >= currentHighestScore) {
                    currentHighestScore = sortedPlayers[i].pairs;
                    sortedPlayers[i].winner = true;
                } else {
                    win = i > 1 ?  false : true;
                    return win;
                }
            }
            return win;
        }

        isWin = determineGameResult(sortedPlayers);
        heading = isWin ? `${sortedPlayers[0].name} Wins!` : "It's a tie!";
        statement = "Game over! Here are the results..."
        playerDivs = sortedPlayers.map((item, index) => {
            return (
                <div className={item.winner ? 'container winner' : 'container'} key={index} >
                    <div className="player">
                        {item.name}
                        <span className="winner-span">{item.winner ? '(Winner!)' : ''}</span>
                    </div>
                    <div className='pairs'>{`${item.pairs} Pairs`}</div>
                </div>
            )
        });
    }
    
    return (
        <ResultModal className="results-modal-container" $winner={isWin}>
            <div className="results-modal">
                <h2>{heading}</h2>
                <div className="statement">{statement}</div>
                <div className="info-grid">
                    {playerDivs}
                </div>
                <div className="btns-container">
                    <Button className="btn primary btn-nav" text="Restart" onClick={handleRefreshGame}/>
                    <Button onClick={handleNewGame} className="btn secondary btn-nav" text="Setup New Game"/>
                </div>
            </div>
        </ResultModal>
    )
};
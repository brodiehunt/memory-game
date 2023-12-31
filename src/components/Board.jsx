import {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import BoardPiece from './BoardPiece';
import styled from 'styled-components';

const BoardContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: ${({$columns}) => `repeat(${$columns}, 1fr)`};
    grid-template-rows: ${({$columns}) => `repeat(${$columns}, 1fr)`};
    grid-gap: ${({$columns}) => $columns == 4 ? '0.77rem' : '0.57rem'};
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1/1;
    margin: 0 auto;
    perspective: 1000px;

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    @media (min-width: 768px) {
        grid-gap: ${({$columns}) => $columns == 4 ? '0.77rem' : '0.57rem'};

    }
`;

export default function Board({isSmallGrid, isNumbers, changePlayerTurn, handleGameOver, toggleRefreshGame}) {
    const [board, setBoard] = useState([]);
    const [numOfPairs, setNumOfPairs] = useState(null);
    const [currentPairs, setCurrentPairs] = useState(0);
    const [firstSelection, setFirstSelection] = useState(null);
    const [isFirstSelection, setIsFirstSelection] = useState(true);
    const [isOverlayActive, setIsOverlayActive] = useState(false);

    // Run on first mount and then if the player restarts game (toggleRefreshGame)
    useEffect(() => {
        let numOfObjects = isSmallGrid ? 16 : 36;
        let numberOfPairs = numOfObjects / 2;

        const icons = ['ball', 'anchor', 'beaker', 'sun', 'hand', 'bug', 'moon', 'snow', 'music', 'car'];
        const buildBoard = () => {
            const arrOfObjs = [];
            // create object pairs an push into board array
            for (let i = 0; i < numberOfPairs; i++) {
                const value = isNumbers ? Math.floor(Math.random() * 99) : icons[i % icons.length];
                const obj1 = {
                    value,
                    paired: false,
                    active: false,
                    id: uuidv4()
                }
                const obj2 = {...obj1, id: uuidv4()};
                arrOfObjs.push(obj1, obj2);
            }
            // shuffle items in board array -Knuth shuffle
            for (let i = arrOfObjs.length -1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arrOfObjs[i], arrOfObjs[j]] = [arrOfObjs[j], arrOfObjs[i]]
            }

            return arrOfObjs;
        }
        // refresh state to original board state
        const boardArr = buildBoard();
        setBoard(boardArr);
        setNumOfPairs(numberOfPairs);
        setCurrentPairs(0);
        setFirstSelection(null);
        setIsFirstSelection(true);
        setIsOverlayActive(false);
       
    }, [toggleRefreshGame]);

    // check if game has been won if currentPairs increases
    useEffect(() => {
        if (currentPairs === numOfPairs) {
          handleGameOver();
        }
    }, [currentPairs, numOfPairs]);

    // Onclick event listener for board piece
    function handlePlayerTurn(index) {
        // changes board state to reflect event in dom
        updatePieceToActive(index);
        
        if (!isFirstSelection) {
            setIsOverlayActive(true);
            // delay state change so user can see second selection
            setTimeout(() => {
                setIsFirstSelection(!isFirstSelection);
                const isSetPair = isPair(firstSelection, {index, piece: board[index]});
                updateSelections(firstSelection, {index, piece: board[index]}, isSetPair);
                changePlayerTurn(isSetPair);
                setIsOverlayActive(false);
            
            }, 1000)
        } else {
            setIsFirstSelection(!isFirstSelection);
            setFirstSelection({index, piece: board[index]});
        }
        
    }

    // checks the value of both players choices, increases pair state variable if pair
    function isPair(selectionOne, selectionTwo) {
        if (selectionOne.piece.value === selectionTwo.piece.value) {
            setCurrentPairs(currentPairs + 1)
            return true;
        }
        return false;
    }

    // changes state of objects selected by user based on whether or not is pair
    // parameters are objects {index: indexNum, piece: {boardPeice}} and boolean (isPair)
    function updateSelections(selectionOne, selectionTwo, isPair) {
        const newBoard = [...board];
        if (isPair) { 
            newBoard[selectionOne.index] = {...selectionOne.piece, paired: true, active: false};
            newBoard[selectionTwo.index] = {...selectionTwo.piece, paired: true, active: false};
            setBoard(newBoard);
        } else {
            newBoard[selectionOne.index] = {...selectionOne.piece, active: false};
            newBoard[selectionTwo.index] = {...selectionTwo.piece, active: false};
            setBoard(newBoard);
        }
    }

    // changes board state of selected object - for styling reasons
    function updatePieceToActive(index) {
        const newBoard = [...board];
        newBoard[index].active = true;
        setBoard(newBoard);
    }

    // create array of buttons for board grid
    const boardPieces = board.map((item, index) => {
        return (
            <BoardPiece value={item.value} 
            paired={item.paired}
            active={item.active}
            key={item.id}
            index={index}
            isSmallGrid={isSmallGrid}
            handlePlayerTurn={handlePlayerTurn}
            />
            
        )
    })
    return (
        <BoardContainer $columns={isSmallGrid ? 4 : 6}>
            {isOverlayActive && <div className="overlay"></div>}
            {boardPieces}
        </BoardContainer>
    )
}
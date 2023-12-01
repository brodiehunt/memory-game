import {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import BoardPiece from './BoardPiece';
import styled from 'styled-components';

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: ${({$columns}) => `repeat(${$columns}, 1fr)`};
`;


export default function Board({players, isGridSmall, isNumbers}) {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        let numOfObjects = isGridSmall ? 16 : 36;
        let numOfPairs = numOfObjects / 2;

        const icons = ['ball', 'anchor', 'beaker', 'sun', 'hand', 'bug', 'moon', 'snow', 'music', 'car'];
        const buildBoard = () => {
            const arrOfObjs = [];
            // create object pairs an push into board array
            for (let i = 0; i < numOfPairs; i++) {
                const value = isNumbers ? Math.floor(Math.random() * 99) : icons[i % icons.length];
                const obj1 = {
                    value,
                    state: 'hidden',
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
        const boardArr = buildBoard();
        setBoard(boardArr);

    }, [isGridSmall]);

    const boardPieces = board.map((item) => {
        return (
            <BoardPiece value={item.value} state={item.state} id={item.id}/>
        )
    })
    return (
        <BoardContainer $columns={isGridSmall ? 4 : 6}>
            {boardPieces}
        </BoardContainer>
    )
}
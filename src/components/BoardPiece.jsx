import {useState} from 'react';


export default function BoardPiece({value, state, id}) {
    return (
        <button key={id}>{value}</button>
    )
}
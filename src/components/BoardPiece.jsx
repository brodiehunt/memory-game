import styled, {keyframes, css} from 'styled-components';
import Anchor from '../assets/anchor.svg';
import Ball from '../assets/ball.svg';
import Beaker from '../assets/beaker.svg';
import Bug from '../assets/bug.svg';
import Car from '../assets/car.svg';
import Hand from '../assets/hand.svg';
import Moon from '../assets/moon.svg';
import Music from '../assets/music.svg';
import Snow from '../assets/snow.svg';
import Sun from '../assets/sun.svg';

const spin = keyframes`
    from {
        transform: rotateY(0);
    }
    to {
        transform: rotateY(360deg);
    }
`;

const BoardButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: var(--text-lightest);
    font-size: ${({$isSmallGrid}) => $isSmallGrid ? 'var(--font-sz-1000)': 'var(--font-sz-700)'};
    cursor: pointer;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in all;
    background-color: ${({$paired, $active}) => 
    $paired  ? ('var(--idle-col)') : (
        $active ? 'var(--primary-col)' : 'var(--active-col)'
    )};
    transform-style: preserve-3d;
    ${({ $active }) => $active && css`
        animation: ${spin} 0.3s linear;
    `}
    
    &:hover {
        background-color: ${({$paired, $active}) => 
        !$paired ? ($active ? '' : 'var(--idle-hover)') : ('')};
    }

    img {
        width: 30px;
        height: 30px;
    }

    @media (min-width: 768px) {
        font-size: ${({$isSmallGrid}) => $isSmallGrid ? 'var(--font-sz-1200)': 'var(--font-sz-1000)'};

        img {
        width: 40px;
        height: 40px;
    }
    }
`

export default function BoardPiece({value, active, paired, id, index, isSmallGrid, handlePlayerTurn}) {
    // const [hidden, sethidden] = useState(!paired);
    const ICONS = {
        anchor: Anchor,
        ball: Ball,
        beaker: Beaker,
        bug: Bug,
        car: Car,
        hand: Hand,
        moon: Moon,
        music: Music,
        snow: Snow,
        sun: Sun
    
    }
    function handleClick() {
        handlePlayerTurn(index);
    }
    return (
        <BoardButton 
        // $hidden={hidden} 
        $paired={paired}
         $active={active} 
         $isSmallGrid={isSmallGrid}
         onClick={(paired || active) ? null : (event) => handleClick()}
         >
            {(paired || active) && (
                typeof(value) === 'number' ? (
                    value
                ): (
                    <img src={ICONS[value]} alt="" />
                )
            )}
        </BoardButton>
    )
}
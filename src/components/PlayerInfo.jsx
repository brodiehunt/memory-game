import styled from 'styled-components';

const PlayerDiv = styled.div`
    padding: 0.6rem;
    border-radius: 0.3125rem;
    background-color: ${({$turn}) => $turn ? 'var(--primary-col)' : 'var(--idle-col)'};
    color: ${({$turn}) => $turn ? 'var(--text-lightest)' : 'var(--text-dark)'};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;


    &::before {
    content: '';
        display: ${({ $turn }) => ($turn ? 'block' : 'none')};
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${({ $turn }) => ($turn ? 'var(--primary-col)' : 'transparent')};
        position: absolute;
        top: -10px; 
        left: 50%;
        transform: translateX(-50%);
    }
    .name {
        text-align: center;
        font-size: var(--font-sz-300);
    }
    .lrg-name {
        display: none;
    }
    .pairs {
        font-size: var(--font-sz-700);
    }

    @media (min-width: 768px) {
        align-items: start;

        .name {
            font-size: var(--font-sz-500);
        }
        .sml-name {
            display: none;
        }
        .lrg-name {
            display: block
        }
        .pairs {
            font-size: var(--font-sz-900);
        }

    }

    @media (min-width: 1444px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`
export default function PlayerInfo({name, id, pairs, turn, singlePlayer, title, val}) {
    return (
        singlePlayer ? (
            <PlayerDiv $turn={false}>
                <div className="name">{title}</div>
                <div className="pairs">{val}</div>
            </PlayerDiv>
        ) : (
            <PlayerDiv $turn={turn} key={id}>
                <div className="sml-name name">
                    {name[0] + name[name.length -1]}
                </div>
                <div className="lrg-name name">
                    {name}
                </div>
                <div className="pairs">{pairs}</div>
            </PlayerDiv>
        )
    
    )
}
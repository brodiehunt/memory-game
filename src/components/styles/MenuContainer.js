import styled from 'styled-components';
const MenuContainer = styled.div`
    
    margin: 0 1.5rem;
    width: 100%;

    h1 {
        font-size: var(--font-sz-900);
        color: var(--text-lightest);
        text-align: center;
        margin-bottom: 2.9rem;
    }

    .menu {
        display: flex;
        flex-direction: column;
        max-width: 35rem;
        background-color: var(--light);
        padding: 1.5rem;
        border-radius: var(--br-S);
        margin: 0 auto;
    }

    .btn-group-container {
        margin-bottom: 1.5rem; 
    }

    .group-label {
        color: var(--text-lighter);
        font-size: var(--font-sz-300);
        margin-bottom: 0.7rem;
    }

    .btn-group {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 0.7rem;
    }

    .btn-group.two {
        grid-template-columns: repeat(2, 1fr);
    }
    

    @media (min-width: 768px) {
        margin: 0 3.5rem;

        h1 {
            font-size: var(--font-sz-1000);
            margin-bottom: 4.8rem;
        }

        .menu {
            padding: 3.5rem;
            border-radius: var(--br-M);

        }    

        .btn-group-container {
            margin-bottom: 2rem; 
        }

        .group-label {
            font-size: var(--font-sz-600);
            margin-bottom: 1rem;
        }

        .btn-group {
            grid-gap: 1.5rem;
        }
    }
    
    @media (min-width: 1444px) {

    }

`;

export default MenuContainer;
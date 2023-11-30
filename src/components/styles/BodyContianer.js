import styled from 'styled-components';

const BodyContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${({$background}) => $background === 'dark' ? 'var(--background-col)' : 'var(--text-lightest)'};

`;

export default BodyContainer;
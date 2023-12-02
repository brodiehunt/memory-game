import styled from 'styled-components';

const BodyContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100svh;
    background-color: ${({$background}) => $background === 'dark' ? 'var(--background-col)' : 'var(--text-lightest)'};

`;

export default BodyContainer;
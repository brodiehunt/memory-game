import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        --font-sz-100: 0.8125rem;
        --font-sz-200: 0.875rem;
        --font-sz-300: 0.9375rem;
        --font-sz-400: 1rem;
        --font-sz-500: 1.125rem;
        --font-sz-600: 1.25rem;
        --font-sz-700: 1.5rem;
        --font-sz-800: 1.625rem;
        --font-sz-900: 2rem;
        --font-sz-1000: 2.5rem;
        --font-sz-1100: 2.75rem;
        --font-sz-1200: 3rem;
        --br-S: 0.625rem;
        --br-M: 1.25rem;
        --br-L: 1.625rem;
        --br-XL: 2.185rem;
        --text-darkest: #152938;
        --text-dark: #304859;
        --text-lighter: #7191A5;
        --text-lightest: #FCFCFC;
        --background-col: #152938;
        --primary-col: #FDA214;
        --primary-hover: #FFB84A;
        --active-col: #304859;
        --idle-col: #BCCED9;
        --idle-hover: #6395B8;
        --neutral: #DFE7EC;
        --light: #FCFCFC;
        font-family: 'Atkinson Hyperlegible', sans-serif;
        font-size: 1rem;
        font-weight: 700;
    }
    button {
        font-family: 'Atkinson Hyperlegible', sans-serif;
    }
`;

export default GlobalStyles;
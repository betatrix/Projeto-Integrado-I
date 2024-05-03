import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;700;900&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Tajawal', sans-serif;
    }
`;

export default globalStyle;
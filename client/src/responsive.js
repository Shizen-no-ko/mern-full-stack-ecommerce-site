import {css} from 'styled-components';

export const mobile = (props) => {
    return css`
    @media only screen and (max-width: 600px) {
        ${props}
    };
    `
};

export const portraitTablet = (props) => {
    return css`
    @media only screen and (min-device-width: 600px) and (max-device-width: 768px) {
        ${props}
    };
    `     
};

export const landscapeTablet = (props) => {
    return css`
    @media only screen and (min-device-width: 768px) and (max-device-width: 1060px) {
        ${props}
    };
    `     
};

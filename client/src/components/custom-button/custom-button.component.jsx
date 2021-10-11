

// import './custom-button.styles.scss';
// PROBLEM WITH STYLED COMPONENTS!! NOT WORKING!
import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';


const CustomButton = ({ children, ...props }) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;


/*
// before using styled components

// now if we have the type submit passed into CustomButton, the button will get it through otherProps
// children: what have been types between the CustomButton component tags
const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button className={`${inverted ? 'inverted' : ''} 
                        ${isGoogleSignIn ? 'google-sign-in' : ''} 
                        custom-button`} 
                    {...otherProps}>
        {children}
    </button>
);
*/
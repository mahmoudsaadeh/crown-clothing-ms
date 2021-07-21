

import './custom-button.styles.scss';


// now if we have the type submit passed into CustomButton, the button will get it through
// otherProps
// children: what have been types between the CustomButton component tags
const CustomButton = ({children, ...otherProps}) => (
    <button className='custom-button' {...otherProps}>
        {children}
    </button>
);

export default CustomButton;
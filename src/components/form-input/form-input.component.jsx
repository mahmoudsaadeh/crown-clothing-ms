

import './form-input.styles.scss';

// binding handleChange and other props
const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps} />
        {
            // whenever a user has typed in anything, give shrink class to label
            label ?
            (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>)    
            : null 
        }
    </div>
);

export default FormInput;
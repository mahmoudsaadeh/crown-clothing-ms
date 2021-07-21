
import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        // prevents the default actions of a form so that we have more control
        // we specify when to submit or not
        event.preventDefault();

        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        // pull the value and name out of our event.target
        const {value, name} = event.target;

        // dynamically setting the keys in our state based on the names provided in FromInput
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        label="email"
                        required />
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required />

                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle}>
                        Sign in with Google
                    </CustomButton>
                </form>
            </div>
        );
    }
    // <input type='submit' value='Submit Form' />

}

export default SignIn;
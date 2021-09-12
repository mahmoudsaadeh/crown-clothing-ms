
import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { SignInContainer, SignInTitle, ButtonsBarContainer } from './sign-in.styles';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        // prevents the default actions of a form so that we have more control
        // we specify when to submit or not
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            // clear state if signing in succeeds
            this.setState({ email: '', password: '' });

        } catch (error) {
            console.error(error);
        }
    }

    handleChange = event => {
        // pull the value and name out of our event.target
        const { value, name } = event.target;

        // dynamically setting the keys in our state based on the names provided in FromInput
        this.setState({ [name]: value });
    }

    render() {
        return (
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
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
                    <ButtonsBarContainer>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        {/* isGoogleSignIn will return true or false*/}
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SignInContainer>
        );
    }
    // <input type='submit' value='Submit Form' />

}

export default SignIn;
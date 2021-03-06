
import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import './sign-in.styles.scss';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { SignInContainer, SignInTitle, ButtonsBarContainer } from './sign-in.styles';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignIn = ({ emailSignInStart }) => {
    /*constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }*/

    const [userCredentials, setCredentials] = useState({ email: '', password: '' });

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        // prevents the default actions of a form so that we have more control
        // we specify when to submit or not
        event.preventDefault();

        // const { email, password } = this.state;
        // we put them a level higher because we need to access them inside of the return()
        // const { email, password } = userCredentials; 

        //const { emailSignInStart } = this.props;
        emailSignInStart(email, password);

        /*
        // before sagas
        try {
            await auth.signInWithEmailAndPassword(email, password);
            // clear state if signing in succeeds
            this.setState({ email: '', password: '' });

        } catch (error) {
            console.error(error);
        }
        */
    }

    const handleChange = event => {
        // pull the value and name out of our event.target
        const { value, name } = event.target;

        // dynamically setting the keys in our state based on the names provided in FromInput
        // this.setState({ [name]: value });
        setCredentials({ ...userCredentials, [name]: value });
    }



    // const { googleSignInStart } = this.props;

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    value={email}
                    handleChange={handleChange}
                    label="email"
                    required />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label="password"
                    required />
                <ButtonsBarContainer>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    {/* isGoogleSignIn will return true or false*/}
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );

    // <input type='submit' value='Submit Form' />

    //  <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
    //      Sign in with Google
    // </CustomButton>

};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
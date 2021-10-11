
import React, { useState } from 'react';

// import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

import { signUpStart } from '../../redux/user/user.actions';


const SignUp = ({ signUpStart }) => {
    /*constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }*/

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        // same as in App.js when making google auth (but this time, we are manually creating it)
        // const { displayName, email, password, confirmPassword } = this.state;
        // const { displayName, email, password, confirmPassword } = userCredentials;

        // const { signUpStart } = this.props;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        signUpStart({ displayName, email, password });

        /*try {
            // we added brackets to 'user' because an object is returned
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });

            // this will clear our form
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (error) {
            console.error(error);
        }*/
    }

    const handleChange = event => {
        const { name, value } = event.target; // check in console for 'target'
        // this.setState({[name]: value});
        setUserCredentials({ ...userCredentials, [name]: value });
    }



    // const { displayName, email, password, confirmPassword } = this.state;

    return (
        <SignUpContainer>
            <SignUpTitle>I don't have an account</SignUpTitle>
            <span>Sign up with email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </SignUpContainer>
    );


};

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});


export default connect(null, mapDispatchToProps)(SignUp);
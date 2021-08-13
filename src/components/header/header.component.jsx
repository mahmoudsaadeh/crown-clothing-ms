// import React from 'react';
import {Link} from 'react-router-dom';

import './header.styles.scss';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { connect } from 'react-redux';


const Header = ({ currentUser }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                // we can omit the ()
                currentUser ? (
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                )
                :
                (
                    <Link className='option' to='/signin'>SIGN IN</Link>   
                ) 
            }
        </div>

    </div>
);

// this naming can be different but mapStateToProps is standard with redux code bases
// the state here is the top level root reducer
const mapStateToProps = (state) => ({
    // state: root reducer
    // user: the user prop in the root reducer
    // currentUser: we want the current user inside the user reducer

    // connect: first argument connects to the root reducer
    currentUser: state.user.currentUser
});

// mapStateToProps will return the value of our current user (will initially return null)

export default connect(mapStateToProps)(Header);
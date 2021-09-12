// import React from 'react';
// import {Link} from 'react-router-dom';

// import './header.styles.scss';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { connect } from 'react-redux';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

/* 
    currentUser and hidden are accessed through the props of this component (as every react component has props by default), where mapStateToProps maps the state (through root reducer) to the props of every component including this one. Here we specified that we want currentUser and hidden properties from the user and cart sub-states found in the root reducer
*/
const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {
                // we can omit the ()
                // the OptionLink is a link, but it is rendered as div (using as), it is overridden
                currentUser ? (
                    <OptionLink as='div' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </OptionLink>
                )
                :
                (
                    <OptionLink to='/signin'>
                        SIGN IN
                    </OptionLink>   
                ) 
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null: <CartDropdown />
        }
    </HeaderContainer>
);


/*const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
});*/

// this will pass the top level state to all the selectors automatically
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);


/*
// without styled components

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
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
            <CartIcon />
        </div>
        {
            hidden ? null: <CartDropdown />
        }
    </div>
);

*/


// this naming can be different but mapStateToProps is standard with redux code bases
// the state here is the top level root reducer
/*const mapStateToProps = (state) => ({
    // state: root reducer
    // user: the user prop in the root reducer
    // currentUser: we want the current user inside the user reducer

    // connect: first argument connects to the root reducer
    currentUser: state.user.currentUser
});*/


// an advanced way of destructuring (destructuring nested values)
// I want the value: currentUser of the user, 
// where the user is destructured of from the state (root state)

// So here we are passing the destructured values from the state to the props of this component so that we can access the state LEGALLY as redux wants! :)) 
/*const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
});*/

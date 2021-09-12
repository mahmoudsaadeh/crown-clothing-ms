
import React from 'react';

// import './cart-dropdown.styles.scss';

// import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer, CartDropdownButton } from './cart-dropdown.styles';


const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {
                cartItems.length ?
                    cartItems.map(cartItem =>
                        <CartItem key={cartItem.id} item={cartItem} />
                    )
                    :
                    // if length is zero, render an empty message
                    <EmptyMessageContainer>Your cart is empty!</EmptyMessageContainer>
            }
        </CartItemsContainer>
        <CartDropdownButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }
        }>
            GO TO CHECKOUT
        </CartDropdownButton>
    </CartDropdownContainer>
);


/*const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});*/

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

/*
connect brings out dispatch and makes it accessible in our props IF we DID NOT add another argument to connect (which is the mapDispatchToProp), so no need to write this function again
*/

export default withRouter(connect(mapStateToProps)(CartDropdown));


/*
// before using styled components

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                    cartItems.map(cartItem =>
                        <CartItem key={cartItem.id} item={cartItem} />
                    )
                    :
                    // if length is zero, render an empty message
                    <span className='empty-message'>Your cart is empty!</span>
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }
        }>
            GO TO CHECKOUT
        </CustomButton>
    </div>
);
*/

/*
// before using reselect
const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem =>
                    <CartItem key={cartItem.id} item={cartItem} />
                )
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);


const mapStateToProps = ({ cart: { cartItems } }) => ({
    cartItems
});
*/
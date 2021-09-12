
import React from 'react';

// import './cart-icon.styles.scss';

// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import { CartIconContainer, ShoppingIconContainer, ItemCountContainer } from './cart-icon.styles';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <ShoppingIconContainer />
        {/* This span represents our total number of icons */}
        <ItemCountContainer>
            {
                itemCount
            }
        </ItemCountContainer>
    </CartIconContainer>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

/*const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
});*/

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);


/*
// works really well (done by me)
const CartIcon = ({ toggleCartHidden, cartItems }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>
            {
                cartItems.reduce((accumulator, currentValue) =>
                    accumulator + currentValue.quantity
                , 0)
            }
        </span>
    </div>
);

const mapStateToProps = ({ cart: {cartItems} }) => ({
    cartItems
});
*/

/*
// before using reselect library
const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>
            {
                itemCount
            }
        </span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
    itemCount: cartItems.reduce((accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity
        , 0)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
*/
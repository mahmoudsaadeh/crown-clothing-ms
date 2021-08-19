import React from 'react';

import './collection-item.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {

    /* we are doing this because we need those properties in our item definition, but we also need access to the item itself */
    const { name, price, imageUrl } = item;

    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton>
        </div>
    );
};


const mapDispatchToProps = (dispatch) => ({
    // this first addItem below is the one that will be used in the props in our component
    addItem: (item) => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);


/*
const CollectionItem = ({ id, name, price, imageUrl }) => (
    <div className='collection-item'>
        <div
            className='image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />
        <div className='collection-footer'>
            <span className='name'>{ name }</span>
            <span className='price'>{ price }</span>
        </div>
        <CustomButton inverted>Add to cart</CustomButton>
    </div>
);
*/
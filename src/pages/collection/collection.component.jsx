
import React from 'react';

import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

const CollectionPage = ({ match, collection }) => {

    const { title, items } = collection;

    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </div>
        </div>
    );
};

/*
    - the 2nd prop in mapStateToProps is the props of the component that we are wrapping in our connect
    - to understand more, console log the match object and see how it looks like
    - because selectCollection is a function that returns a function (a curried function), we pass the function that comes out of this function which is the state
*/

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);

import React from 'react';

// import './collections-overview.styles.scss';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import { CollectionOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = ({ collections }) => (
    <CollectionOverviewContainer>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </CollectionOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
    // the selector here changes the SHOP_DATA from object to an array so that we can use map()
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
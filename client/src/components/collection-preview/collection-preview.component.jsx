import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

// import './collection-preview.styles.scss';

import { CollectionPreviewContainer, TitleContainer, PreviewContainer } from './collection-preview.styles';

const CollectionPreview = ({ title, items }) => (
    <CollectionPreviewContainer>
        <TitleContainer>{ title.toUpperCase() }</TitleContainer>
        <PreviewContainer>
            {
                items
                .filter((item, index) => index < 4)
                .map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </PreviewContainer>
    </CollectionPreviewContainer>
);

export default CollectionPreview;


/*
before styled comps (i forgot)
*/
/*
const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{ title.toUpperCase() }</h1>
        <div className='preview'>
            {
                items
                .filter((item, index) => index < 4)
                .map(({ id, ...otherItemProps }) => (
                    <CollectionItem key={id} {...otherItemProps} />
                ))
            }
        </div>
    </div>
);
*/
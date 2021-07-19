import React from 'react';

import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';


// this is the same as passing props and then calling props.title
// this is called destructuring
// `` --> string interpolation
// we made a new div and passed the styles to it
// since upon transition or scaling, we don't want the image to be bigger
// we just want to see the effect get bigger within our div when we hover over it
// issue: why don't we wrap the background-image div around our content div
// --> since if we increase the size of the first outer div, we don't want the inner div
// size to also increase, we want the content size to stay the same

// some matched url/linkUrl
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <div className={`${size} menu-item`} 
            onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div className='background-image' style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: size
            }}  
        />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

// this returns us a super powered MenuItem component with access to location, match,
// and history props that we need access to

export default withRouter(MenuItem);
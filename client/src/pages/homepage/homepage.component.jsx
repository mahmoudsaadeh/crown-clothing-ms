
import React from 'react';

import Directory from '../../components/directory/directory.component';

// import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

/*
const HomePage = () => (
    <div className='homepage'>
        <Directory />
    </div>
);
*/

/* 

<div className='homepage'>
        <div className='directory-menu'>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>HATS</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>

            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Jackets</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>

            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Sneakers</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>

            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Women</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>

            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>Men</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>
        </div>
    </div>

*/

export default HomePage;
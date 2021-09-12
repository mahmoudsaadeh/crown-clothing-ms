
import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// this is a HOC which returns a functional component
const withSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    )
    :
    <WrappedComponent {...otherProps} />
};

export default withSpinner;

import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// this is a HOC which returns a functional component
// An HOC is a component that takes a component as parameter and returns an enhanced component
const withSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        // styled components - styled divs that represent the spinner
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    )
    :
    <WrappedComponent {...otherProps} />
};

export default withSpinner;
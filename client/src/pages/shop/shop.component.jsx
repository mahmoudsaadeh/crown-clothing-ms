
import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';

//import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
//import { updateCollections } from '../../redux/shop/shop.actions';

// import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

// import { createStructuredSelector } from 'reselect';

// import withSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';



// const CollectionOverviewWithSpinner = withSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = ({ match, fetchCollectionsStart }) => {

    /*constructor() {
        super();

        this.state = {
            loading: true
        }
    }*/

    // this shorthand was available in newer versions of React, if we use state, React will know that we want it and allow us to access the constructor and the super method under the hood
    /*state = {
        loading: true
    };

    // this is a method, not a variable!
    unsubscribeFromSnapshot = null;*/

    useEffect(() => {
        // [fetchCollectionsStart] instead of [] because in the case if we were at the shop page and we refreshed, App.js will be re-rendered and thus all the respective methods will be triggered...causing useEffect() here and thus fetchCollectionsStart() to be triggered twice!
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    /*componentDidMount() {

        const { fetchCollectionsStart } = this.props;

        fetchCollectionsStart();
    }*/

    //componentDidMount() {

        //const { fetchCollectionsStart } = this.props;

        //fetchCollectionsStart();


        /*
        // before sagas
        const { fetchCollectionsStartAsync } = this.props;

        fetchCollectionsStartAsync();
        */

        /*
        // BEFORE USING THUNK (async redux)

        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections');*/

        // using observables and observers pattern to fetch data
        /*collectionRef.onSnapshot(async snapshot => {
            // console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // console.log(collectionsMap);
            updateCollections(collectionsMap);

            this.setState({ loading: false });
        });*/


        // using promises pattern to fetch data - this is the one finally used before thunk
        /*collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

            updateCollections(collectionsMap);

            this.setState({ loading: false });
        });*/


        // using the native REST API method to fetch data - A LOT OF NESTING TO REACH OUR VALUES! CHECK CONSOLE.LOG.
        /*fetch('https://firestore.googleapis.com/v1/projects/crown-clothing-db-3eef9/databases/(default)/documents/collections/')
        .then(response => response.json())
        .then(collections => console.log(collections));*/

    //}

    //render() {

    // render in Route: it is a method that takes a function where the parameters in the function are the params that the component will receive 
    // const { match } = this.props;

    //const { loading } = this.state;

    // const { isCollectionFetching, isCollectionsLoaded } = this.props;

    return (
        <div className='shop-page'>
            <Route
                exact
                path={`${match.path}`}
                component={CollectionsOverviewContainer}
            />
            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionPageContainer}
            />
        </div>
        /*
        <Route 
            exact 
            path={`${match.path}`} 
            render={(props) =>
                <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} /> 
            } />
        <Route 
            path={`${match.path}/:collectionId`} 
            render={(props) => 
                <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} /> 
            } />
        */
        /*<div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) =>
                <CollectionOverviewWithSpinner isLoading={loading} {...props} /> } />
            <Route path={`${match.path}/:collectionId`} render={(props) => 
                <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
        </div>*/
    );
    //}
};

/*
// before redux thunk
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});
*/

/*
// before sagas
const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});
*/

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

/*
// before using thunk
const mapDispatchToProps = (dispatch) => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});*/

// export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
export default connect(null, mapDispatchToProps)(ShopPage);


/*
render() {

        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
*/

/*
const ShopPage = ({match}) => (

    // - the match object will be used to get the current path that we are on
    // - we have access to the match object and 2 other objects (location and history) because the ShopPage component is nested inside a Route in App.js file, which passes those objects as props to the ShopPage component
    // - nested routing below + dynamic routing

    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
);
*/

/*
class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        // destructuring our collections
        const {collections} = this.state;
        return (
            <div className='shop-page'>
                {
                    collections.map(({ id, ...otherCollectionProps }) => (
                        <CollectionPreview key={id} {...otherCollectionProps} />
                    ))
                }
            </div>
        )
    }
}

export default ShopPage;
*/
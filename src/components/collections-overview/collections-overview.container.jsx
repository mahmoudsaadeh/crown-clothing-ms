
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import withSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
    // mafrod isFetching - NOO!! l2n isLoading hye prop bel wrapped component which is withSpinner
    isLoading: selectIsCollectionFetching
});

// const CollectionsOverviewContainer = connect(mapStateToProps)(withSpinner(CollectionsOverview));

// this is a neater way of wrapping and more readable
// compose evaluates from right to left, CollectionsOverview --> withSpinner --> connect
// it will pass CollectionsOverview to withSpinner, and withSpinner will be passed to connect
// curried functions
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
import './App.css';

import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Route, Switch, Redirect } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {

  /*constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }*/

  // this is a function (or an anonymous variable that can stay a var OR assigned as function)
  unsubscribeFromAuth = null;

  /*
  we don't have to manually fetch everytime to check if state has changed, this connection is always open as long as our App component is mounted on our DOM.
  */
  /*
   componentDidMount() {
       this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
           //this.setState({currentUser: user});
           //console.log(user);
 
           createUserProfileDocument(user);
       })
   }
  */

  // storing data in our app - in state (not db)
  componentDidMount() {

    
    /* 
      - we can pass any props to any component in react (class or functional) 
      - setCurrentUser is destructured from the props, and the props gets this value from root reducer --> user actions; using the map dispatch method below
    */
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if userAuth is not null
      if (userAuth) {
        // used to check if our db has updated at that ref with any new data
        const userRef = await createUserProfileDocument(userAuth);

        // use .data() to get all the properties of an object stored in the db
        // we used snapshot.id to get user id since .data() does not return the id
        userRef.onSnapshot(snapshot => {
          //console.log(snapshot);
          //console.log(snapshot.data());
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
        // console.log cannot go after setState because setState is asynchronous
        // meaning that there is a chance that when we call it, setState may have
        // not finished being called --> so use another function as 2nd parameter
        // in setState
        //console.log(this.state);
      }
      else {
        // set currentUser to null
        setCurrentUser(userAuth);
      }
    })
  }

  /*
  because it is an open subscription, so we also have to close subscriptions when unmount happens because we don't want memory leaks in our app
  */

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  // <Header currentUser={this.state.currentUser} /> -> it will pass the object OR null

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          {
            /* 
              - render: a js invocation that determines what component to return 
              - this.props.currentUser: does not relate to any of the currentUsers below, it gets the value from the root reducer (state) ---> remember that we wrapped the <App /> component with the Provider component, which gives the whole app access to the store which in turn gives us access to the root reducer (state)
            */
          }
          <Route exact path='/signin'
            render={() =>
              this.props.currentUser ?
                (<Redirect to='/' />) :
                (<SignInAndSignUpPage />)
            } />
        </Switch>
      </div>
    );
  }

}

// our app doesn't need current user anymore, because outside of passing it into
// our header, it only sets it, but it doesn't do anything with the current user
// value in its component itself

const mapDispatchToProps = (dispatch) => ({
  // dispatch is a way for redux to know that whatever object you're passing me,
  // is going to be an action object that I'm gonna pass to every reducer

  // setting the 'user' to setCurrentUser (first one here) which was in the ComponentDidMount, then passing that user object as the payload to the user.actions.js [explained by me]

  /* The setCurrentUser here is the same one defined in the componentDidMount function, because also the keys used in the dispatching process (in mapDispatchToProps) are mapped to props so that they are accessed from within our component */
  /* user here represents the value of setCurrentUser (the one before it), we are obliged to do so because this is the only way (using parameters) to pass setCurrentUser to a function */
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

// we are destructuring the user from the root reducer (the one big state object), which in turn redirects us to the user reducer and thus returning the state of the currentUser that we need here
/* 
  we are getting the currentUser from the user sub-state in the root reducer and setting it to the currentUser here (the 1st one), so that we can access it from within our App component through the props
*/
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default connect(null, mapDispatchToProps)(App);

// dynamically giving a path or a link
/*
const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>

    <Link to={`${props.match.url}/11`}>To topic 11</Link>
    <Link to={`${props.match.url}/15`}>To topic 15</Link>
    <Link to={`${props.match.url}/17`}>To topic 17</Link>
  </div>
)

const HatsPageDetails = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Hats Page Details {props.match.params.hatId}</h1>
      <Link to='/hats'>Hats (All)</Link>
      <button onClick = { () => props.history.push('/hats') }> hatsz (allz)</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/hats' component={HatsPage} />
        <Route path='/hats/:hatId' component={HatsPageDetails} />
      </Switch>
    </div>
  );
}
*/

/*

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

*/




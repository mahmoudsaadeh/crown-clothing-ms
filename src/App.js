import './App.css';

import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Route, Switch } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

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
   }*/

  // storing data in our app - in state (not db)
  componentDidMount() {
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
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            }, 
            () => {
              console.log(this.state);
            }
          );
        });
        // console.log cannot go after setState because setState is asynchronous
        // meaning that there is a chance that when we call it, setState may have
        // not finished being called --> so use another function as 2nd parameter
        // in setState
        //console.log(this.state);
      }
      else {
        this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }

}

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


export default App;

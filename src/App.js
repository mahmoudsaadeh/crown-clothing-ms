import './App.css';

import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Route, Switch } from 'react-router-dom';

import { auth } from './firebase/firebase.utils';


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
  componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
          this.setState({currentUser: user});

          console.log(user);
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

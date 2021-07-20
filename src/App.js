import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
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

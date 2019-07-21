import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthtoken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser} from './actions/authActions';

//Check for tokeni
if (localStorage.jwtToken){
  // set auth token header
  setAuthToken(localStorage.jwtToken);

  //decode 
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user isauthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //Clear current profile

    //Redirect the user to login
    window.location.href = '/login';
  } 
}


function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
        </div>        
        <Footer />

      </div>
    </Router>
    </Provider>
  );
}

export default App;

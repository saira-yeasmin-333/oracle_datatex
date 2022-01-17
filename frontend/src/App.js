import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/index.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages';
import About from './Pages/about';
import Services from './Pages/services';
import Contact from './Pages/contact';
import SignUp from './Pages/signup';
import SignIn from './Pages/signin';

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/about' component={About} />
                <Route path='/services' component={Services} />
                <Route path='/contact-us' component={Contact} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/sign-in' component={SignIn} />
            </Switch>
        </Router>
    );
}

export default App;
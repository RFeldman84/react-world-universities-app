import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import Navbar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Home from './components/Home';
import Universities from './components/Universities';
import UniversityDetails from './components/UniversityDetails';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar/>
      


        <Switch> 
        <Route exact path='/' component={Home} />
        <Route exact path='/schools' render={(props) => <Universities {...props} /> } /> 
        <Route exact path='/schools/:name' render={(props) => <UniversityDetails {...props} /> } /> 
        </Switch>
      </div>
    );
  }
}

export default App;





//https://github.com/Hipo/university-domains-list-api
//http://universities.hipolabs.com/search

// <Route exact path='/' component={Home} />
// <Route exact path="/products" render={(props) => <Products {...props} products={this.state.products}/> } />

//{
// country: "Canada",
// name: "Cégep de Saint-Jérôme",
// alpha_two_code: "CA",
// state-province: null,
// domains: [
// "cstj.qc.ca"
// ],
// web_pages: [
// "https://www.cstj.qc.ca",
// "https://ccmt.cstj.qc.ca",
// "https://ccml.cstj.qc.ca"
// ]
// },
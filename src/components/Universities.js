import React, { Component } from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom'
import axios from 'axios';


class Universities extends Component {
  state={
    universities: []
  }

 
    componentDidMount() {
      axios.get("http://universities.hipolabs.com/search")
      .then(res => {
        // console.log(res.data)
        let schools = res.data
        console.log({schools})
    // ASK HOW TO REMOVE EXACT DUPLICATES
    //     let seen = new Set();
    //  let removeDups = schools.filter(item => {
    //     return seen.has(item.name)  ? false : seen.add(item.name) ;
    // })
    // console.log({removeDups})
    // removeDups.sort((a,b)=> a.name.localeCompare(b.name))
    //     this.setState({universities: removeDups})
    //   })
   
    //   console.log({schools})
    // let seen = new Set();
    // let removeDups = schools.filter(item => {
    //     return seen.has(item.name) ? false : seen.add(item.name);
    // })
    //   console.log({removeDups})
    // removeDups.sort((a,b)=> a.name.localeCompare(b.name))
    //     this.setState({universities: removeDups})
    // })
        
       let result = schools.sort((a,b)=> a.name.localeCompare(b.name))
        this.setState({universities: result})
    })

  }
  
  showAllUniversities = ()=>{
   return this.state.universities.map((u,i)=>{
     return <li key={i}><Link to={`/schools/${u.name}`}>{u.name}</Link></li>


    })
  }

 

  handleSearch(e){
    console.log(e.target.value)
    let search = e.target.value
    // console.log(this.props)
    axios.get(`http://universities.hipolabs.com/search?name=${search}`)
      .then(res => {
    let schools = res.data
      console.log({schools})
    // ASK HOW TO REMOVE EXACT DUPLICATES
    // let seen = new Set();
    // let removeDups = schools.filter(item => {
    //     return seen.has(item.name) ? false : seen.add(item.name);
    // })
    //   console.log({removeDups})
    // removeDups.sort((a,b)=> a.name.localeCompare(b.name))
    //     this.setState({universities: removeDups})
    // })
        
    let result = schools.sort((a,b)=> a.name.localeCompare(b.name))
        this.setState({universities: result})
    })
  }


  render() {
    return (
      <div> 
      <SearchBar search={(e)=>this.handleSearch(e)} />
      <h1><u>World Universities</u></h1>
       {this.showAllUniversities()}
      </div>
    );
  }
}

export default Universities;


// 
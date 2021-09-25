import React, { Component } from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom'
import axios from 'axios';


class Universities extends Component {
  state={
    universities: [],
    countryList: [],
    filteredU: [],
    searchList:[],
  }

    componentDidMount() {
      axios.get("http://universities.hipolabs.com/search")
      .then(res => {
        // console.log(res.data)
        let schools = res.data
        console.log({schools})
        let countries = res.data.map(e=> e = e.country)
        console.log({countries})

        let countryList = []
        countries.forEach(item => {
          if(countryList.indexOf(item) < 0) {
            countryList.push(item);
          }
        });
        // console.log(countries.length)
        // console.log(countryList.length)
        
      let result = schools.sort((a,b)=> a.name.localeCompare(b.name))
        this.setState({
          universities: result, //use this to always have full data
          filteredU: result, // make a filtered for use with filters
          countryList,
        })
    })

  }
  
  showAllUniversities = ()=>{
  return this.state.filteredU.map((u,i)=>{
    return <li key={i}><Link to={`/schools/${u.name}`}>{u.name}</Link></li>


    })
  }



  handleSearch(e){
    console.log(e.target.value)

    const filtered = this.state.universities.filter(u => u.name.toLowerCase().includes(e.target.value.toLowerCase()))
        

    let searchCountries = filtered.map(e=> e = e.country)
    console.log({searchCountries})

        let searchCountryList = []
        searchCountries.forEach(item => {
          if(searchCountryList.indexOf(item) < 0) {
            searchCountryList.push(item);
          }
        });
        console.log(searchCountries.length)
        console.log(searchCountryList.length)

    searchCountryList.sort((a,b)=> a.localeCompare(b))
    filtered.sort((a,b)=> a.name.localeCompare(b.name))
    this.setState({
      filteredU: filtered,
      countryList: searchCountryList,
      searchList: filtered
    })

  }


  handleChange(e){
    console.log(e.target.value)
    let pickedCountry = this.state.universities.filter(u=> u.country === e.target.value)

    let pickedCountrySearch = this.state.searchList.filter(u=> u.country === e.target.value)

    // console.log(pickedCountry.length)
    // console.log('search country', pickedCountrySearch.length)
    // console.log('serach list', this.state.searchList.length)
    this.setState({
      filteredU: e.target.value === "all" && this.state.searchList.length === 0 ? this.state.universities : 
      this.state.searchList.length && e.target.value === "all" ? this.state.searchList : 
      this.state.searchList.length && e.target.value !== "all" ?pickedCountrySearch : pickedCountry
    })
  }


  render() {
    return (
      <div> 
      <SearchBar search={(e)=>this.handleSearch(e)} />
      <h1><u>World Universities</u></h1>
      <label for="country">Choose a Country:</label>
        <select onChange={(e)=>this.handleChange(e)} name="country" id="country">
        <option  value="all">ALL</option>
        {this.state.countryList.map((c,i)=> {
            return (
            <option key={i} value={c}>{c}</option>
            )
        })
        }
        </select>
        <hr />
      {this.showAllUniversities()}
      </div>
    );
  }
}

export default Universities;

// show all needs dropdown of countries so when pick a country show only schools from that country ✅
// searched schools have dropdown of only countries they are from ✅
// filter for search show search results for schools and what country picked from dropdown ✅



// ASK HOW TO REMOVE EXACT DUPLICATES *extra*
    // componentDidMount() {
    //   axios.get("http://universities.hipolabs.com/search")
    //   .then(res => {
    //     // console.log(res.data)
    //     let schools = res.data
    //     console.log({schools})
    // NEED TO FILTER OUT EXACT NAME & COUNTRY... this just does name
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
        
  //      let result = schools.sort((a,b)=> a.name.localeCompare(b.name))
  //       this.setState({universities: result})
  //   })

  // }


  // **example of using another endpoint axios call BUT *NOT recommended to make more calls than needed less calls less delays
  // handleSearch(e){
  //   console.log(e.target.value)
  //   let search = e.target.value
    // console.log(this.props)
    // axios.get(`http://universities.hipolabs.com/search?name=${search}`)
    //   .then(res => {
    // let schools = res.data
    //   console.log({schools})
    // ASK HOW TO REMOVE EXACT DUPLICATES
    // let seen = new Set();
    // let removeDups = schools.filter(item => {
    //     return seen.has(item.name) ? false : seen.add(item.name);
    // })
    //   console.log({removeDups})
    // removeDups.sort((a,b)=> a.name.localeCompare(b.name))
    //     this.setState({universities: removeDups})
    // })
        
  //   let result = schools.sort((a,b)=> a.name.localeCompare(b.name))
  //       this.setState({universities: result})
  //   })
  // }

import React, { Component } from "react"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"
import axios from "axios"

class Universities extends Component {
	state = {
		universities: [],
		countryList: [],
		select: "",
		search: "",
	}

	componentDidMount() {
		axios.get("http://universities.hipolabs.com/search").then(res => {
			// console.log(res.data)
			const countryList = this.filteredCountyList(res.data, this.state.search)
			let result = res.data.sort((a, b) => a.name.localeCompare(b.name))

			this.setState({
				universities: result, 
				countryList,
			})
		})
	}

	showAllUniversities = () => {
		// console.log(this.state)
		return this.state.universities.map((u, i) => {
			if (
				u.name.toLowerCase().includes(this.state.search.toLowerCase()) &&
				u.country.toLowerCase().includes(this.state.select.toLowerCase())
			) {
				return (
					<li key={i}>
						<Link to={`/schools/${u.name}`}>{u.name}</Link>
					</li>
				)
			}
		})
	}


	filteredCountyList(list, search) {
		let filterList = []
		list
			.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
			.map(e => (e = e.country))
			.forEach(item => {
				if (filterList.indexOf(item) < 0) {
					filterList.push(item)
				}
			})
		return filterList.sort((a, b) => a.localeCompare(b))
	}

	handleChange(e) {
		// console.log(e.target)
		const { name, value } = e.target
		console.log(e.target.value, this.state.search)
		const filtered =
			name === "search" && value !== this.state.search
				? this.filteredCountyList(this.state.universities, value)
				: this.state.countryList
		// console.log({filtered})

		// if (name === "search" && value === "") {
		// 	this.setState({
		// 		[name]: value,
		// 		select: name === "search" && value === "" ? "" : this.state.select,
		// 		countryList: filtered,
		// 	})
		// } else {
			this.setState({
				[name]: value,
				countryList: filtered,
			})
		// }
	}

	render() {
		return (
			<div>
				<SearchBar search={e => this.handleChange(e)} />
				<h1>
					<u>World Universities</u>
				</h1>
				<label for="country">Choose a Country:</label>
				<select
					onChange={e => this.handleChange(e)}
					name="select"
					id="country"
					value={this.state.select}
				>
					<option value="">ALL</option>
					{this.state.countryList.map((c, i) => {
						return (
							<option key={i} value={c}>
								{c}
							</option>
						)
					})}
				</select>
				<hr />
				{this.showAllUniversities()}
			</div>
		)
	}
}

export default Universities





//////~~~NOTES & OLD CODE ~~~~~~///////

// show all needs dropdown of countries so when pick a country show only schools from that country ✅
// searched schools have dropdown of only countries they are from ✅
// filter for search show search results for schools and what country picked from dropdown ✅





	// *** DOES NOT WORK FOR WHEN SEARCH CHANGES***
	// handleChange(e){
	//   console.log(e.target.value)
	//   let pickedCountry = this.state.universities.filter(u=> u.country === e.target.value)

	//   let pickedCountrySearch = this.state.searchList.filter(u=> u.country === e.target.value)

	//   // console.log(pickedCountry.length)
	//   // console.log('search country', pickedCountrySearch.length)
	//   // console.log('serach list', this.state.searchList.length)
	//   this.setState({
	//     filteredU: e.target.value === "all" && this.state.searchList.length === 0 ? this.state.universities :
	//     this.state.searchList.length && e.target.value === "all" ? this.state.searchList :
	//     this.state.searchList.length && e.target.value !== "all" ?pickedCountrySearch : pickedCountry
	//   })
	// }

// ***ONLY NEED ONE HANDLE CHANGE***
	// handleSearch(e){
	//   console.log(e.target.value)

	//   const filtered = this.state.universities.filter(u => u.name.toLowerCase().includes(e.target.value.toLowerCase()))

	//   let searchCountries = filtered.map(e=> e = e.country)
	//   console.log({searchCountries})

	//       let searchCountryList = []
	//       searchCountries.forEach(item => {
	//         if(searchCountryList.indexOf(item) < 0) {
	//           searchCountryList.push(item);
	//         }
	//       });
	//       console.log(searchCountries.length)
	//       console.log(searchCountryList.length)

	//   searchCountryList.sort((a,b)=> a.localeCompare(b))
	//   filtered.sort((a,b)=> a.name.localeCompare(b.name))
	//   this.setState({
	//     filteredU: filtered,
	//     countryList: searchCountryList,
	//     searchList: filtered
	//   })

	// }




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

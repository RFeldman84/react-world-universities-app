import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

class UniversityDetails extends Component {
  state={
    university:[]
  }

  componentDidMount(){
  //console.log(this.props.match.params);
  let name = this.props.match.params.name;
  console.log(name)
    axios.get(`http://universities.hipolabs.com/search?name=${name}
    `)
    .then(res => {
      console.log('university: ',res.data[0])
      console.log('webpage: ',res.data[0].web_pages[0])
      this.setState({
        university: res.data[0],
        webpage: res.data[0].web_pages[0]
      })
    })
    
  }


  render() {
    return (
      <div>
      <h2>University Details:</h2>
      <h2><u>{this.state.university.name}</u></h2>
      <h3>Country: {this.state.university.country}</h3>
      <a href={this.state.webpage} rel="noReferrer" target='_blank'>{this.state.university.name} Webpage</a>
      </div>
    )
  }
}


export default  UniversityDetails 
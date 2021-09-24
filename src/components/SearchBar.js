import React, { Component } from 'react';

class SearchBar extends Component {

  render() {
    // console.log('search props: ',this.props)
    return (
      <div className='search'>
        <label>Search 🔎<input type="text" name='search' onChange={this.props.search}/></label>
      </div>
    );
  }
}

export default SearchBar;
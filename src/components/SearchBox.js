import React, { Component } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';

import { Divider, Input, Segment } from 'semantic-ui-react';

import '../style/SearchBox.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      searchValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchValue: e.target.value
    });
    (e.target.value.length > 3) && this.getSearchSuggestions(e.target.value);
  }

  getSearchSuggestions(value) {
    axios.get(`https://api.discogs.com/database/search`, {
      params: {
        q: value,
        token: 'OKAFGfTucaaBaUSmmLucyymiHxryMsQjXAhNaDzD',
        per_page: 10,
        page: 1
      }
    })
    .then(res => {
      const results = res.data.results.map(obj => obj);
      this.setState({ results });
    });
  }

  render() {
    return (
      <Segment padded>
        <Input 
          placeholder='Search Discogs' 
          size='huge'
          icon='search' 
          value={this.state.value}
          onChange={this.handleChange} />
        <Divider horizontal className="b-search-divider">Results</Divider>
        <SearchResults results={this.state.results} searchValue={this.state.searchValue} />
      </Segment>
    );
  }
}

export default SearchBox;

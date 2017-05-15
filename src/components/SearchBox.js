import React, { Component } from 'react';
import axios from 'axios';
import { Divider, Input, Segment } from 'semantic-ui-react';

import SearchResults from './SearchResults';

import '../style/SearchBox.css';

class SearchBox extends Component {
  getSearchSuggestions: () => void;
  handleChange: () => void;

  constructor() {
    super();

    this.state = {
      results: [],
      searchValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
  }

  state: {
    results: Array<mixed>,
    searchValue: string
  };

  handleChange(e: Object & { currentTarget: { value: string } }) {
    this.setState({
      searchValue: e.currentTarget.value,
    });
    e.currentTarget.value.length > 3 &&
      this.getSearchSuggestions(e.currentTarget.value);
  }

  getSearchSuggestions(value: string) {
    axios
      .get('https://api.discogs.com/database/search', {
        params: {
          q: value,
          token: 'OKAFGfTucaaBaUSmmLucyymiHxryMsQjXAhNaDzD',
          per_page: 10,
          page: 1,
        },
      })
      .then((res) => {
        const results = res.data.results.map(obj => obj);
        this.setState({ results });
        console.log(results);
      });
  }

  render() {
    return (
      <Segment padded>
        <Input
          placeholder="Search Discogs"
          size="huge"
          icon="search"
          value={this.state.searchValue}
          onChange={this.handleChange}
        />
        <Divider horizontal className="b-search-divider">Results</Divider>
        <SearchResults
          results={this.state.results}
          searchValue={this.state.searchValue}
        />
      </Segment>
    );
  }
}

export default SearchBox;

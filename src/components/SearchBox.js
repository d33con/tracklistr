import React, { Component } from 'react';
import axios from 'axios';
import { Divider, Input, Segment } from 'semantic-ui-react';

import SearchResults from './SearchResults';

import '../style/SearchBox.css';

class SearchBox extends Component {
  constructor(props: { addReleaseToTracklist: Function }) {
    super(props);

    this.state = {
      results: [],
      searchValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  state: {
    results: Array<mixed>,
    searchValue: string
  };

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
      });
  }
  getSearchSuggestions: () => void;
  handleChange: () => void;
  addReleaseToTracklist: () => void;

  handleChange(e: Object & { currentTarget: { value: string } }) {
    this.setState({
      searchValue: e.currentTarget.value,
    });
    e.currentTarget.value.length > 3 &&
      this.getSearchSuggestions(e.currentTarget.value);
  }

  addReleaseToTracklist(result: Object) {
    this.props.addReleaseToTracklist(result);
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
          addReleaseToTracklist={this.addReleaseToTracklist}
        />
      </Segment>
    );
  }
}

export default SearchBox;

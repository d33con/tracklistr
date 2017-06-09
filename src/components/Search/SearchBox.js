import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Divider, Input, Segment } from "semantic-ui-react";

import SearchResults from "./SearchResults";

import "../../style/SearchBox.css";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      searchValue: "",
      shown: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
    this.getReleaseDetails = this.getReleaseDetails.bind(this);
    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  getSearchSuggestions(value) {
    axios
      .get("https://api.discogs.com/database/search", {
        params: {
          q: value,
          type: "master",
          token: "OKAFGfTucaaBaUSmmLucyymiHxryMsQjXAhNaDzD",
          per_page: 10,
          page: 1
        }
      })
      .then(res => {
        const results = res.data.results.map(obj => obj);
        this.setState({ results });
        console.log(results);
      });
  }

  handleChange(e) {
    this.setState({
      searchValue: e.currentTarget.value
    });
    return (
      e.currentTarget.value.length > 3 &&
      this.getSearchSuggestions(e.currentTarget.value)
    );
  }

  getReleaseDetails(releaseId) {
    axios
      .get("https://api.discogs.com/masters/" + releaseId, {
        params: {
          token: "OKAFGfTucaaBaUSmmLucyymiHxryMsQjXAhNaDzD"
        }
      })
      .then(result => {
        this.setState({
          result,
          shown: !this.state.shown
        });
        console.log(result);
      });
  }

  addReleaseToTracklist(result) {
    this.props.addReleaseToTracklist(result);
  }

  render() {
    return (
      <Segment padded>
        <Input
          placeholder="eg. Artist - Title"
          size="huge"
          icon="search"
          value={this.state.searchValue}
          onChange={this.handleChange}
          focus={true}
          fluid
        />
        <Divider horizontal className="b-search-divider">Results</Divider>
        <SearchResults
          results={this.state.results}
          searchValue={this.state.searchValue}
          addReleaseToTracklist={this.addReleaseToTracklist}
          getReleaseDetails={this.getReleaseDetails}
          result={this.state.result}
          shown={this.state.shown}
        />
      </Segment>
    );
  }
}

SearchBox.propTypes = {
  addReleaseToTracklist: PropTypes.func.isRequired
};

export default SearchBox;

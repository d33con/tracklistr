import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import axios from "axios";
import { Divider, Input, Segment } from "semantic-ui-react";

import SearchResults from "./SearchResults";

import "../../style/SearchBox.css";

@observer
class SearchBox extends Component {
  @observable results = [];
  @observable searchValue = "";
  @observable shown = false;

  getSearchSuggestions = value => {
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
        this.results = results;
      });
  };

  handleChange = e => {
    this.searchValue = e.currentTarget.value;
    return (
      e.currentTarget.value.length > 3 &&
      this.getSearchSuggestions(e.currentTarget.value)
    );
  };

  getReleaseDetails = (releaseId, showing) => {
    if (!showing) {
      axios
        .get("https://api.discogs.com/masters/" + releaseId, {
          params: {
            token: "OKAFGfTucaaBaUSmmLucyymiHxryMsQjXAhNaDzD"
          }
        })
        .then(result => {
          this.result = result;
          this.shown = true;
        });
    } else {
      this.result = null;
      this.shown = false;
    }
  };

  render() {
    return (
      <Segment padded>
        <Input
          placeholder="eg. Artist - Title or Catalogue Number"
          size="huge"
          icon="search"
          value={this.searchValue}
          onChange={this.handleChange}
          fluid
          autoFocus
        />
        <Divider horizontal className="b-search-divider">
          Results
        </Divider>
        <SearchResults
          results={this.results}
          searchValue={this.searchValue}
          getReleaseDetails={this.getReleaseDetails}
          result={this.result}
          shown={this.shown}
        />
      </Segment>
    );
  }
}

export default SearchBox;

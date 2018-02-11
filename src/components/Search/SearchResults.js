import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { List, Image, Icon } from "semantic-ui-react";
import TrackDetailsDropdown from "./TrackDetailsDropdown";

@observer
class SearchResults extends Component {
  @observable shown = this.props.shown;

  handleClick = id => {
    this.props.getReleaseDetails(id, this.shown);
    return (this.shown = this.shown ? false : true);
  };

  render() {
    const { results, searchValue, result } = this.props;
    return (
      <div>
        {(() => {
          if (searchValue.length > 3 && results.length !== 0) {
            return (
              <List divided>
                {results.map((trackDetail, track) => {
                  const { label, id, thumb, uri, title, format } = trackDetail;
                  track = result;
                  return (
                    <List.Item key={id}>
                      <Image avatar floated="left" src={thumb} />
                      <List.Content floated="left">
                        <List.Header>
                          <a href={`https://www.discogs.com${uri}`}>{title}</a>
                          {track && id === track.data.id && this.shown ? (
                            <Icon
                              name="caret up"
                              link
                              onClick={() => this.handleClick(id)}
                            />
                          ) : (
                            <Icon
                              name="caret down"
                              link
                              onClick={() => this.handleClick(id)}
                            />
                          )}
                        </List.Header>
                        <List.Description>
                          {label && label.length && label[0]} /{" "}
                          {format.length && format[0]}
                        </List.Description>
                        <List.List>
                          <List.Header>
                            {track &&
                              id === track.data.id && (
                                <TrackDetailsDropdown
                                  track={track.data}
                                  label={label}
                                />
                              )}
                          </List.Header>
                        </List.List>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            );
          } else if (searchValue && results.length === 0) {
            return <h3>No Results</h3>;
          }
          return <h3>Enter a search term</h3>;
        })()}
      </div>
    );
  }
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  result: PropTypes.object,
  shown: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  getReleaseDetails: PropTypes.func.isRequired
};

export default SearchResults;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Image, Icon } from "semantic-ui-react";
import TrackDetailsDropdown from "./TrackDetailsDropdown";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: this.props.shown
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState(prevState => ({ shown: !prevState.shown }));
    this.props.getReleaseDetails(id, this.state.shown);
  }

  render() {
    const { results, searchValue, addReleaseToTracklist, result } = this.props;
    return (
      <div>
        {(() => {
          if (searchValue.length > 3) {
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
                          <a href={`https://www.discogs.com${uri}`}>
                            {title}
                          </a>
                          {track && id === track.data.id && this.state.shown
                            ? <Icon
                                name="caret up"
                                link
                                onClick={() => this.handleClick(id)}
                              />
                            : <Icon
                                name="caret down"
                                link
                                onClick={() => this.handleClick(id)}
                              />}
                        </List.Header>
                        <List.Description>
                          {label && label.length && label[0]} /{" "}
                          {format.length && format[0]}
                        </List.Description>
                        <List.List>
                          <List.Header>
                            {track &&
                              id === track.data.id &&
                              <TrackDetailsDropdown
                                track={track.data}
                                label={label}
                                addReleaseToTracklist={addReleaseToTracklist}
                              />}
                          </List.Header>
                        </List.List>
                      </List.Content>
                      {/*<List.Content floated="right">
                        <Icon
                          name="plus square outline"
                          size="large"
                          color="blue"
                          link
                          onClick={() => addReleaseToTracklist({ result })}
                        />
                      </List.Content>*/}
                    </List.Item>
                  );
                })}
              </List>
            );
          } else if (searchValue.length > 0 && searchValue.length <= 3) {
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
  addReleaseToTracklist: PropTypes.func.isRequired,
  getReleaseDetails: PropTypes.func.isRequired
};

export default SearchResults;

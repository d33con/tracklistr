import React from "react";
import PropTypes from "prop-types";
import { List, Image, Icon } from "semantic-ui-react";
import TrackDetailsDropdown from "./TrackDetailsDropdown";

function SearchResults(props) {
  const {
    results,
    searchValue,
    addReleaseToTracklist,
    getReleaseDetails,
    result,
    shown
  } = props;
  return (
    <div>
      {(() => {
        if (searchValue.length > 3) {
          return (
            <List divided>
              {result &&
                <List.Description>
                  {result.data.title}
                </List.Description>}
              {results.map((trackDetail, track, visible) => {
                const { label, id, thumb, uri, title, format } = trackDetail;
                track = result;
                visible = shown;
                return (
                  <List.Item key={id}>
                    <Image avatar floated="left" src={thumb} />
                    <List.Content floated="left">
                      <List.Header>
                        <a href={`https://www.discogs.com${uri}`}>{title}</a>
                        {track && id === track.data.id && visible
                          ? <Icon
                              name="hide"
                              link
                              onClick={console.log("make this stateful")}
                            />
                          : <Icon
                              name="unhide"
                              link
                              onClick={() => getReleaseDetails(id)}
                            />}
                      </List.Header>
                      <List.Description>
                        {label && label.length && label[0]}
                        {" "}
                        /
                        {" "}
                        {format.length && format[0]}
                      </List.Description>
                      <List.List>
                        <List.Header>
                          {track &&
                            id === track.data.id &&
                            <TrackDetailsDropdown track={track.data} />}
                        </List.Header>
                      </List.List>
                    </List.Content>
                    <List.Content floated="right">
                      <Icon
                        name="plus square outline"
                        size="large"
                        color="blue"
                        link
                        onClick={() => addReleaseToTracklist({ result })}
                      />
                    </List.Content>
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

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchValue: PropTypes.string.isRequired,
  addReleaseToTracklist: PropTypes.func.isRequired
};

export default SearchResults;

import React from "react";
import PropTypes from "prop-types";
import { Button, List, Icon } from "semantic-ui-react";
import v4 from "uuid";

import "../../style/TrackDetailsDropdown.css";

function TrackDetailsDropdown({ addReleaseToTracklist, label, track }) {
  const { tracklist, uri } = track;
  function sendReleaseToTracklist(artist, title, label, id, position) {
    const trackTitle = `${artist} - ${title}`;
    const track = {
      trackTitle,
      trackUrl: uri.slice(23),
      trackLabel: label[0],
      releaseId: `${id}${position}`
    };

    addReleaseToTracklist(track);
  }
  return (
    <div>
      {tracklist.map((singleTrack, singleArtist) => {
        singleArtist = track.artists[0].name;
        const artists =
          track.artists && track.artists.length > 1
            ? track.artists.map(name => {
                return name.join.length > 0
                  ? `${name.name} ${name.join} `
                  : `${name.name}`;
              })
            : singleArtist;
        return (
          <List.Item key={v4()} className="b-track-details-list-item">
            {singleTrack.position}
            . {artists} - {singleTrack.title}
            <Button
              animated="fade"
              size="mini"
              color="blue"
              inverted
              style={{ marginLeft: "0.5em" }}
              className="b-track-details-list-item-button"
              onClick={() =>
                sendReleaseToTracklist(
                  artists,
                  singleTrack.title,
                  label,
                  track.id,
                  singleTrack.position
                )}
            >
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name="plus" />
              </Button.Content>
            </Button>
          </List.Item>
        );
      })}
    </div>
  );
}

TrackDetailsDropdown.propTypes = {
  track: PropTypes.object.isRequired,
  addReleaseToTracklist: PropTypes.func.isRequired,
  label: PropTypes.array.isRequired
};

export default TrackDetailsDropdown;

import React from "react";
import PropTypes from "prop-types";
import { Button, List, Icon } from "semantic-ui-react";
import v4 from "uuid";

function TrackDetailsDropdown(props) {
  const { tracklist } = props.track;
  function addReleaseToTracklist(artist, title, label, id) {
    const trackTitle = `${artist} - ${title}`;
    console.log(tracklist);
    const track = {
      trackTitle,
      trackUrl: props.track.uri.slice(23),
      trackLabel: label[0],
      releaseId: id
    };

    props.addReleaseToTracklist(track);
  }
  return (
    <div>

      {tracklist.map((track, singleArtist) => {
        singleArtist = props.track.artists[0].name;
        const artists = track.artists && track.artists.length > 0
          ? track.artists.map(name => {
              return name.join !== ","
                ? `${name.name} ${name.join} `
                : `${name.name}`;
            })
          : singleArtist;
        return (
          <List.Item key={v4()}>
            {track.position}
            .
            {" "}
            {artists}
            {" "}
            -
            {" "}
            {track.title}
            <Button
              animated="fade"
              size="tiny"
              color="blue"
              onClick={() =>
                addReleaseToTracklist(
                  artists,
                  track.title,
                  props.label,
                  props.track.id,
                  track
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
  track: PropTypes.object
};

export default TrackDetailsDropdown;

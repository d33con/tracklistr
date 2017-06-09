import React from "react";
import PropTypes from "prop-types";
import { List, Icon } from "semantic-ui-react";
import v4 from "uuid";

function TrackDetailsDropdown(props) {
  const { tracklist } = props.track;
  return (
    <div>

      {tracklist.map((track, singleArtist) => {
        singleArtist = props.track.artists[0].name;
        return (
          <List.Item key={v4()}>
            {track.position}
            .
            {" "}
            {track.artists && track.artists.length > 0
              ? track.artists.map(name => name.name)
              : singleArtist}
            {" "}
            -
            {" "}
            {track.title}
            <Icon
              name="plus square outline"
              color="blue"
              link

              //onClick={() => addReleaseToTracklist({ result })}
            />
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

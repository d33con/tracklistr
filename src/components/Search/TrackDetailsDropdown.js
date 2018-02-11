import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import { Button, List, Icon } from "semantic-ui-react";
import v4 from "uuid";

import "../../style/TrackDetailsDropdown.css";

@inject("store")
@observer
class TrackDetailsDropdown extends Component {
  sendReleaseToTracklist = (artist, title, label, id, position) => {
    const { uri } = this.props.track;
    const trackTitle = `${artist} - ${title}`;
    const track = {
      trackTitle,
      trackUrl: uri,
      trackLabel: label[0],
      releaseId: `${id}${position}`
    };

    this.props.store.addReleaseToTracklist(track);
  };
  render() {
    const { track, label } = this.props;
    const { tracklist } = this.props.track;
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
                  this.sendReleaseToTracklist(
                    artists,
                    singleTrack.title,
                    label,
                    track.id,
                    singleTrack.position
                  )
                }
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
}

TrackDetailsDropdown.propTypes = {
  track: PropTypes.object.isRequired,
  label: PropTypes.array.isRequired
};

export default TrackDetailsDropdown;

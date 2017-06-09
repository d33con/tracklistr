import React from "react";
import PropTypes from "prop-types";
import { List, Image, Icon } from "semantic-ui-react";

function ExpandedReleaseDetails(props) {
  const { release, addReleaseToTracklist } = props;
  return (
    <List>
      <List.Item key={release.id}>
        <Image avatar floated="left" src={release.thumb} />
        <List.Content floated="left">
          <List.Header>
            <a href={`https://www.discogs.com${release.uri}`}>
              {release.title}
            </a>
          </List.Header>
          <List.Description>
            {release.trackLabel}
            {" "}
            /
            {" "}
            {release.format}
          </List.Description>
        </List.Content>
        <List.Content floated="right">
          <Icon
            name="plus square outline"
            size="large"
            color="red"
            link
            onClick={() => addReleaseToTracklist({ release })}
          />
        </List.Content>
      </List.Item>
    </List>
  );
}

ExpandedReleaseDetails.propTypes = {
  release: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ExpandedReleaseDetails;

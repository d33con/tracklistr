import React, { Component } from "react";
import { Dimmer, Icon, Image } from "semantic-ui-react";
import Dropzone from "react-dropzone";

import testImg from "../../img/test.jpg";
import "../../style/AudioPlayer.css";

class ImageSelector extends Component {
  constructor() {
    super();
    this.state = {
      imgSrc: testImg
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  handleShow() {
    this.setState({
      active: true
    });
  }

  handleHide() {
    this.setState({
      active: false
    });
  }

  loadImage(file) {
    this.setState({
      imgSrc: file[0].preview
    });
  }

  render() {
    const { active, imgSrc } = this.state;
    const dropzoneStyle = {
      style: "none"
    };

    const content = (
      <Dropzone
        onDrop={this.loadImage}
        accept="image/*"
        multiple={false}
        style={dropzoneStyle}
      >
        <Icon link bordered name="upload" size="huge" />
      </Dropzone>
    );

    return (
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{
          active,
          content
        }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        src={imgSrc}
        size="large"
        className="b-audio-player--cover-img"
      />
    );
  }
}

export default ImageSelector;

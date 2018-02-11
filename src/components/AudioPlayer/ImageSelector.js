import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Dimmer, Icon, Image } from "semantic-ui-react";
import Dropzone from "react-dropzone";

import testImg from "../../img/test.jpg";
import "../../style/AudioPlayer.css";

@observer
class ImageSelector extends Component {
  @observable imgSrc = testImg;
  @observable active = false;

  handleShow = () => {
    this.active = true;
  };

  handleHide = () => {
    this.active = false;
  };

  loadImage = file => {
    this.imgSrc = file[0].preview;
  };

  render() {
    const { active, imgSrc, handleHide, handleShow, loadImage } = this;
    const dropzoneStyle = {
      style: "none"
    };

    const content = (
      <Dropzone
        onDrop={loadImage}
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
        dimmer={{ active, content }}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        src={imgSrc}
        size="large"
        className="b-audio-player--cover-img"
      />
    );
  }
}

export default ImageSelector;

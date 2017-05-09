import React, { Component } from 'react';
import { Button, Icon, Table, Dimmer, Header, Image, Segment } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class EditDimmer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDimmer: false
    };
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ showDimmer: false });
  }


  render() {
    return (
      <div>
        <Dimmer.Dimmable as={Segment} dimmed={this.state.showDimmer}>
          <Dimmer active={this.state.showDimmer} onClickOutside={this.handleHide} />

          <Header as='h3'>Overlayable Section</Header>

          <Image.Group size='small' className='ui small images'>
            <Image src='/assets/images/wireframe/image.png' />
            <Image src='/assets/images/wireframe/image.png' />
            <Image src='/assets/images/wireframe/image.png' />
          </Image.Group>

          <Image size='medium' src='/assets/images/wireframe/media-paragraph.png' />
        </Dimmer.Dimmable>
      </div>
    );
  }
}

EditDimmer.propTypes = {

};

export default EditDimmer;
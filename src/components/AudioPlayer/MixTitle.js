import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Input, Popup } from "semantic-ui-react";

class MixTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mixTitle: "",
      isInputBoxShowing: false
    };

    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
  }

  openPopup(e) {
    e.preventDefault();
    this.setState({
      isInputBoxShowing: true
    });
  }

  closePopup(e) {
    e.preventDefault();
    this.setState({
      isInputBoxShowing: false
    });
  }

  updateTitle(e) {
    this.setState({ mixTitle: e.target.value });
  }

  saveTitle(e) {
    e.preventDefault();
    this.setState({
      isInputBoxShowing: false
    });
    this.props.saveNewTitle(this.state.mixTitle);
  }

  render() {
    return (
      <div>
        {this.props.title}
        <div>
          <Popup
            trigger={<Icon link name="edit" />}
            on="click"
            position="bottom center"
            open={this.state.isInputBoxShowing}
            onOpen={this.openPopup}
            onClose={this.closePopup}
          >
            <Popup.Content>
              <Input
                placeholder="Enter title"
                autoFocus
                onChange={this.updateTitle}
                icon={
                  <Icon
                    name="add"
                    onClick={this.saveTitle}
                    link
                    circular
                    inverted
                    color="teal"
                  />
                }
              />
            </Popup.Content>
          </Popup>
        </div>
      </div>
    );
  }
}

MixTitle.propTypes = {
  title: PropTypes.string,
  saveNewTitle: PropTypes.func.isRequired
};

export default MixTitle;

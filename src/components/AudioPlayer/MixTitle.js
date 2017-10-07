import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Icon, Input, Popup } from "semantic-ui-react";

@inject("store")
@observer
class MixTitle extends Component {
  @observable isInputBoxShowing = false;
  @observable mixTitle = this.props.store.savedState.mixTitle;

  openPopup = e => {
    e.preventDefault();
    this.isInputBoxShowing = true;
  };

  closePopup = e => {
    e.preventDefault();
    this.isInputBoxShowing = false;
  };

  updateTitle = e => {
    this.mixTitle = e.target.value;
  };

  saveTitle = e => {
    e.preventDefault();
    this.isInputBoxShowing = false;
    this.props.store.saveMixTitle(this.mixTitle);
  };

  render() {
    return (
      <div>
        {this.mixTitle}
        <div>
          <Popup
            trigger={<Icon link name="edit" size="small" />}
            on="click"
            position="bottom center"
            open={this.isInputBoxShowing}
            onOpen={this.openPopup}
            onClose={this.closePopup}
          >
            <Popup.Content>
              <Input
                placeholder="Enter title"
                autoFocus
                size="large"
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

export default MixTitle;

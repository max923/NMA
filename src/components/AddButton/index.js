import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      open: false,
    }
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  };
  handleSendData() {
    this.handleClose()
  }

  render() {
    const {
      btnText
    } = this.props
    console.log(this.props)
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.handleClose()}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onClick={() => this.handleSendData()}
      />,
    ];

    return (
      <div style={{marginBottom: 15}}>
        <RaisedButton label={btnText} onClick={() => this.handleOpen()} />
        <Dialog
          title="Add patient"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        {this.props.children}
        </Dialog>
      </div>
    );
  }
}
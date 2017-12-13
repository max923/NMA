import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogModal extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      open: false,
    }
  }
  handleOpen() {
    this.setState({ open: true });
    this.props.handleClick()
  }
  handleClose() {
    this.setState({ open: false });
  };
  handleSubmit() {
    this.handleClose()
  }

  render() {
    const {
      btnText,
      title
    } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.handleClose()}
      />,
    ];

    return (
      <div style={{margin:'5px'}}>
        <RaisedButton label={btnText} onClick={() => this.handleOpen()} />
          <Dialog
            title={title}
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
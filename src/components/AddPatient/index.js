import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};
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
        <RaisedButton label="Add patient" onClick={() => this.handleOpen()} />
        <Dialog
          title="Add patient"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div>
            <TextField
              hintText="Custom Underline Focus Color"
              underlineFocusStyle={styles.underlineStyle}
            /><br />
            <TextField
              floatingLabelText="Styled Floating Label Text"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
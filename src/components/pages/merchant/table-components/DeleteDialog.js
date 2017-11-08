import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';

class DeleteDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleRequestOk = () => {
    this.setState({ open: false });
    this.props.deleteHandler();
  };


  render() {
    const { MerchantId } = this.props;
    return (
      <div>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={this.handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{"Delete Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to Delete Merchant with MerchantId
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestOk} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
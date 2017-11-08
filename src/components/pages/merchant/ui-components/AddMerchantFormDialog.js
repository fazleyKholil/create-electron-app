import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AddButton from './AddButton';

export default class AddMerchantFormDialog extends React.Component {
  state = {
    open: false,
    Merchant: {}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleRequestAdd = () => {
    this.setState({ open: false });

    var mName = document.getElementById('MerchantName').value;
    var mId = document.getElementById('MerchantId').value;
    var mCc = document.getElementById('MerchantCategoryCode').value;

    var merchant = {
      MerchantName: mName,
      MerchantId: mId,
      MerchantCategoryCode: mCc
    }

    this.setState({ Merchant: merchant });

    if (mName == "" || mId == "" || mCc == "")
      alert("Please enter all information.")
    else
      this.props.handleAdd(merchant);
  };

  render() {
    return (
      <div>
        <AddButton onClick={this.handleClickOpen} />
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Add Merchant</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Register a merchant
            </DialogContentText>
            <TextField autoFocus margin="dense" id="MerchantName" label="Merchant Name" type="text" fullWidth required />
            <TextField autoFocus margin="dense" id="MerchantId" label="Merchant Id" type="text" fullWidth required />
            <TextField autoFocus margin="dense" id="MerchantCategoryCode" label="Merchant Category Code" type="text" fullWidth required />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

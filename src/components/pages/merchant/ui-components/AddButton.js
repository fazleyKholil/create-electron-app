import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function AddButton(props) {
    const { classes, onClick } = props;
    return (
        <div>
            <Button fab color="primary" aria-label="add" className={classes.button} onClick={onClick}>
                <AddIcon />
            </Button>
        </div>
    );
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);
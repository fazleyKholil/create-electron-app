import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import FilterListIcon from 'material-ui-icons/FilterList';
import update from 'immutability-helper';
import EnhancedTableHead from './table-components/EnhancedTableHead';
import EnhancedTableToolbar from './table-components/EnhancedTableToolbar';
import Tablestyles from './table-components/TableTheme';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as merchantActions from '../../../redux/actions/MerchantActions';


class MerchantTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'MerchantId',
            selected: [],
            data: props.merchants,
            page: 0,
            rowsPerPage: 5,
        };

        this.handler = this.handler.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        this.state.selected = [];
        this.setState({ selected: newSelected });

        const { selected } = this.state;

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    ////////////////
    ///Custom handlers
    ////////////////
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        console.log(nextProps.merchants);
        if (nextProps.merchants !== this.state.data) {
            this.setState(prevState => ({
                data: nextProps.merchants
            }));
        }
    }

    handler = () => {

    };

    handleDelete = () => {
        console.log('deleting merchants');
    
        const mId = this.state.selected[0];
        const index = _.findIndex(this.state.data, function (o) { return o.MerchantId == mId; });

        var mer = {
            MerchantName: 'Name1',
            'MerchantId': mId,
            MerchantCategoryCode: '6039'
        };

        this.props.actions.deleteMerchant(mer);

        // this.setState((prevState) => ({
        //     data: update(prevState.data, { $splice: [[index, 1]] })
        // }));
    };

    handleEdit = () => {
        alert('Editing  ' + this.state.selected);
    };

    render() {

        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}
                    handleDelete={this.handleDelete}
                    handleEdit={this.props.addMerchant} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {this.state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                const isSelected = this.isSelected(n.MerchantId);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.handleClick(event, n.MerchantId)}
                                        onKeyDown={event => this.handleKeyDown(event, n.MerchantId)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.MerchantId}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                        <TableCell padding="none">{n.MerchantId}</TableCell>
                                        <TableCell numeric>{n.MerchantName}</TableCell>
                                        <TableCell numeric>{n.MerchantCategoryCode}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

MerchantTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        data: state.merchants
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Tablestyles)(MerchantTable));


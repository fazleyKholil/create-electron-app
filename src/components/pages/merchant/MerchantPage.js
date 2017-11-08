import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as merchantActions from '../../../redux/actions/MerchantActions';
import MerchantTable from './MerchantTable';
import AddButton from './ui-components/AddButton';
import AddMerchantFormDialog from './ui-components/AddMerchantFormDialog';

class MerchantPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            merchants: []
        };

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd = (data) => {
        console.log('adding merchant');
        console.log(data);

        this.props.actions.addMerchant(data);

        // this.setState((prevState) => ({
        //     data: update(prevState.data, { $splice: [[index, 1]] })
        // }));
    };

    componentDidMount() {
        this.props.actions.loadMerchants();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.merchants !== this.state.merchants) {
            this.setState(prevState => ({
                merchants: nextProps.merchants
            }));
        }
    }

    render() {
        return (
            <div>
                <h1>Merchant Registration ... [{this.state.merchants.length}]</h1>
                <AddMerchantFormDialog handleAdd={this.handleAdd} />
                <MerchantTable merchants={this.props.merchants} />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        merchants: state.merchants
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantPage);

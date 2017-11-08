import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function merchantReducer(state = initialState.merchants, action) {
    switch (action.type) {

        case types.LOAD_MERCHANT_SUCESS:
            return action.merchants;

        case types.ADD_MERCHANT_SUCESS:
            return action.merchants;
        // return [
        //     ...state,
        //     Object.assign({}, action.merchant)
        // ];

        case types.DELETE_MERCHANT_SUCESS:
            return action.merchants;

        default:
            return state;
    }
}
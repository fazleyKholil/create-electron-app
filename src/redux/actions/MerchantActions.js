import * as types from './actionTypes';
import axios from 'axios';

export function loadMerchantsSuccess(merchants) {
    return { type: types.LOAD_MERCHANT_SUCESS, merchants }
}

export function addMerchantSuccess(merchants) {
    return { type: types.ADD_MERCHANT_SUCESS, merchants }
}

export function deleteMerchantSuccess(merchants) {
    return { type: types.DELETE_MERCHANT_SUCESS, merchants }
}

export function loadMerchants() {
    return function (dispatch) {
        axios.get('http://localhost:53996/api/merchant')
            .then(function (response) {
                dispatch(loadMerchantsSuccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
                throw (error);
            });
    }
}

export function addMerchant(merchant) {
    return function (dispatch) {
        axios.post('http://localhost:53996/api/merchant', merchant, {
            headers: {
                'Content-Type': 'application/json',
            }}).then(function (response) {
                dispatch(addMerchantSuccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
                throw (error);
            });
    }
}

export function deleteMerchant(merchant) {
    return function (dispatch) {
        axios.post('http://localhost:53996/api/merchant/delete', merchant, {
            headers: {
                'Content-Type': 'application/json',
            }}).then(function (response) {
                dispatch(deleteMerchantSuccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
                throw (error);
            });
    }
}

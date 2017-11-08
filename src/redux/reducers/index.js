import { combineReducers } from 'redux';
import merchants from './MerchantReducer';

const rootReducer = combineReducers({
    merchants
});

export default rootReducer;
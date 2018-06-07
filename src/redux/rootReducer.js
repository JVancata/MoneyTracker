import { combineReducers } from 'redux';
import transactions from './modules/transactions'

const rootReducer = combineReducers({
    transactions: transactions
});

export default rootReducer;
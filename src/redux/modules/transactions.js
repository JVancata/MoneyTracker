import uuidv4 from 'uuid/v4';

const initialState = {
    transactions: [],
    monthTransactions: [],
    userId: getUserId(),
    currentMonth: 5,
    editing: ""
};


const ADD_TRANSACTION = 'ADD_TRANSACTION';
const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';
const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
const TOGGLE_EDIT = 'TOGGLE_EDIT';
const SWITCH_MONTH = 'SWITCH_MONTH';
const UPDATE_USER = 'UPDATE_USER';

export function getTransactionsByMonth(arr, month) {
    return arr.filter(transaction => transaction.month === month);
}

export function getUserId() {
    if (localStorage.userId) return localStorage.userId;
    else {
        const userId = uuidv4() + uuidv4();
        localStorage.userId = userId;
        return userId;
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TRANSACTION: {
            const transactions = [...state.transactions, action.payload];

            localStorage.transactions = JSON.stringify(transactions);
            return { ...state, transactions, monthTransactions: getTransactionsByMonth(transactions, state.currentMonth) };
        }
        case DELETE_TRANSACTION: {

            const transactions = state.transactions.filter(transaction => transaction._id !== action.payload._id);
            localStorage.transactions = JSON.stringify(transactions);

            return { ...state, transactions, monthTransactions: getTransactionsByMonth(transactions, state.currentMonth) };
        }
        case LOAD_TRANSACTIONS: {
            return { ...state, transactions: action.payload, monthTransactions: getTransactionsByMonth(action.payload, state.currentMonth) };
        }
        case UPDATE_TRANSACTION: {
            const transactions = state.transactions.map((transaction) => {
                if (transaction._id === action.payload._id) { return action.payload }
                else { return transaction }
            });

            return { ...state, transactions, monthTransactions: getTransactionsByMonth(transactions, state.currentMonth), editing: "" };
        }
        case SWITCH_MONTH: {
            return { ...state, currentMonth: action.payload, monthTransactions: getTransactionsByMonth(state.transactions, action.payload) };
        }
        case TOGGLE_EDIT: {
            return { ...state, editing: action.payload };
        }
        case UPDATE_USER: {
            localStorage.userId = action.payload;
            return { ...state, userId: action.payload };
        }
        default:
            return state;
    }
}

export const deleteTransaction = payload => dispatch => {
    if (payload.offline) dispatch({ type: DELETE_TRANSACTION, payload: payload.transaction });
    else {
        fetch("/transaction/delete", {
            body: JSON.stringify({ _id: payload.transaction._id, userId: payload.userId }),
            cache: 'no-cache', // 
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
            .catch(e => console.log("error, ", e))
            .then(() => dispatch({ type: DELETE_TRANSACTION, payload: payload.transaction }))
        //SAVE TRANSACTION FOR LATER DELETE
    }
}

export const updateTransaction = payload => dispatch => {
    console.log("playoad", payload)
    fetch("/transaction/update", {
        body: JSON.stringify({ transaction: payload.transaction, userId: payload.userId }),
        cache: 'no-cache', // 
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    })
        .catch(e => console.log("error, ", e))
        .then(() => dispatch({ type: UPDATE_TRANSACTION, payload: payload.transaction }))
}

export const changeMonth = payload => dispatch => {
    //TODO: Verification
    dispatch({ type: SWITCH_MONTH, payload });
}

export const updateUser = payload => dispatch => {
    dispatch({ type: UPDATE_USER, payload });
}

export const toggleEdit = payload => dispatch => {
    //TODO: Verification
    dispatch({ type: TOGGLE_EDIT, payload });
}

export const addTransaction = payload => dispatch => {
    //TODO: Validation
    const transaction = payload.transaction;
    fetch("/transaction/insert", {
        body: JSON.stringify({ ...transaction, userId: payload.userId }),
        cache: 'no-cache', // 
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    })
        .then(res => res.json())
        //TODO: Save object for offline use
        .catch(e => console.log("error, ", e))
        .then(data => {
            //console.log("data", data);
            dispatch({ type: ADD_TRANSACTION, payload: data });
        });

}
export const loadTransactions = payload => dispatch => {
    //TODO: GET FROM SERVER
    fetch("/transaction/get", {
        body: JSON.stringify({ userId: payload }),
        cache: 'no-cache', // 
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    })
        .then(res => res.json())
        .catch(e => console.log("error, ", e))
        .then(data => {
            dispatch({ type: LOAD_TRANSACTIONS, payload: data });
        });
    //const transactions = localStorage.transactions ? JSON.parse(localStorage.transactions) : [];
    //console.log(transactions)
    //dispatch({ type: LOAD_TRANSACTIONS, payload: transactions });
}

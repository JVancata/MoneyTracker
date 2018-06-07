const initialState = {
    transactions: [],
    userId: "kokot",
    currentMonth: 5
};

const ADD_TRANSACTION = 'ADD_TRANSACTION';
const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ADD_TRANSACTION: {
            const transaction = { ...action.payload, currentMonth: state.currentMonth };
            const transactions = [...state.transactions, action.payload];

            localStorage.transactions = JSON.stringify(transactions);
            return { ...state, transactions };
        }
        case LOAD_TRANSACTIONS: {
            //console.log("playload", action.payload)
            return { ...state, transactions: action.payload }
            //return { ...state };
        }
        default:
            return state;
    }
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

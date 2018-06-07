import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

const initialState = {};

const middleware = [thunk];

var store;
if (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) {
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        //applyMiddleware(...middleware)
    );
}
else {
    store = createStore(
        rootReducer,
        initialState,
        /*compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )*/
        applyMiddleware(...middleware)
    );
}

export default store;
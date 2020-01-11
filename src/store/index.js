import { createStore } from "redux";
import AllReducer from './../reducers/AllReducer';

const store = createStore(
    AllReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
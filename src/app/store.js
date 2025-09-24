// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import agendaReducer from './reducers/agendaReducer';

const rootReducer = combineReducers({
    agendas: agendaReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
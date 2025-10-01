// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducers/userReducer';
import lessonReducer from './reducers/lessonReducer';
import formationReducer from './reducers/formationReducer';
import exerciceReducer from './reducers/exerciceReducer';
import moduleReducer from './reducers/moduleReducer';

const rootReducer = combineReducers({
    users: userReducer,
    lessons :lessonReducer,
    formations :formationReducer,
    exercices :exerciceReducer,
    modules :moduleReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
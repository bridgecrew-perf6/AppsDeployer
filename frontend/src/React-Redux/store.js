import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userOTPReducer, userProfileReducer, userRegisterReducer } from './Reducer/userReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userOTP: userOTPReducer,
    userProfile: userProfileReducer,
})

const fromlocalstorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: fromlocalstorage }
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
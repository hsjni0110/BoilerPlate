import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import promiseMiddleware from 'redux-promise';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import {Provider} from 'react-redux';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(Reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__&&
			window.__REDUX_DEVTOOLS_EXTENSION__()
		)}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
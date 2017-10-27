import BR from '@blueeast/bluerain-os';
import ReduxPlugin from '../src/bluerain-plugin-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducer from '../src/reducers';
import { shallow, mount } from 'enzyme';
import { Plugin, BlueRainType } from '@blueeast/bluerain-os';
import {
	createStore as createReduxStore,
	applyMiddleware,
	compose,
	Store,
	Middleware,
	combineReducers
} from 'redux';

beforeAll(() => {
	BR.Plugins.register(ReduxPlugin);
});

beforeEach(() => {
	document.body.innerHTML = '<div class="app-container">' + '</div>';
});

describe('Redux Plugin Test', () => {
	it('registered the plugin successfully', () => {
		const Plugin = BR.Plugins.get(ReduxPlugin.slug);
		expect(Plugin).toBeTruthy();
	});

	it('should have redux store in ref', () => {
		BR.boot();
		expect(BR.refs.store).toBeTruthy();
	});

	it('It should return new state from reducer', () => {
		BR.Filters.add('bluerain.redux.reducers', function addstub(reducer) {
			return Object.assign({}, reducer, {
				stub: (state = 'newstate') => state
			});
		});
		BR.boot();
		let state = BR.refs.store.getState();
		expect(state.stub).toEqual('newstate');
	});

	it('It should return initialstate', () => {
		BR.Filters.add('bluerain.redux.reducers', function addstub(reducer) {
			return Object.assign({}, reducer, {
				stub: (state = 1, action) => {
					switch (action.type) {
						case 'DispatchAction':
							return Object.assign({}, state, {
								newState: 'Action Dispatched'
							});
						default:
							return state;
					}
				}
			});
		});
		BR.boot();
		let state = BR.refs.store.getState();
		expect(state.stub).toEqual(1);
	});

	it('It should return new state after dispatching action from reducer', () => {
		BR.Filters.add('bluerain.redux.reducers', function addstub(reducer) {
			return Object.assign({}, reducer, {
				stub: (state = 1, action) => {
					switch (action.type) {
						case 'DispatchAction':
							return Object.assign({}, state, {
								newState: 'ActionDispatched'
							});
						default:
							return state;
					}
				}
			});
		});
		BR.boot();
		let state = BR.refs.store.getState();
		console.log('state', state);
		expect(state.stub).toEqual(1);
		BR.refs.store.dispatch({
			type: 'DispatchAction'
		});
		state = BR.refs.store.getState();
		expect(state.stub.newState).toEqual('ActionDispatched');
	});
});

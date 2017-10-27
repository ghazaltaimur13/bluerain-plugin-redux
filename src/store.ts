import { BlueRainType } from '@blueeast/bluerain-os';
import {
	createStore as createReduxStore,
	applyMiddleware,
	compose,
	Store,
	Middleware
} from 'redux';

import getReducers from './reducers';

let initialState = {
	bluerain: {}
};

let store: Store<any>;

export const createStore = (ctx: BlueRainType) => {
	initialState = ctx.Filters.run('bluerain.redux.initialState', initialState);

	const reducers = getReducers(ctx);

	let middlewares: Middleware[] = [];
	middlewares = ctx.Filters.run('bluerain.redux.middlewares', middlewares);

	let enhancers = [applyMiddleware(...middlewares)];
	enhancers = ctx.Filters.run(
		'bluerain.redux.enhancers',
		enhancers,
		...middlewares
	);

	let composed = compose(...enhancers);
	composed = ctx.Filters.run('bluerain.redux.composed', composed, ...enhancers);

	store = createReduxStore(reducers, initialState, composed);
	ctx.Filters.run('bluerain.redux.store', store);
	return store;
};
export const getStore = () => store;
export const getInitialState = () => initialState;

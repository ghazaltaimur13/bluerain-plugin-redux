import { BlueRainType } from '@blueeast/bluerain-os';
import { combineReducers, Reducer } from 'redux';

const getReducers = (ctx: BlueRainType): Reducer<any> => {
	const bluerainReducers = ctx.Filters.run('bluerain.redux.reducers.bluerain', {
		// stub: (state = {}) => state
	});

	console.log('get Reducer', getReducers);
	let reducers = {
		bluerain: combineReducers(bluerainReducers)
	};

	reducers = ctx.Filters.run('bluerain.redux.reducers', reducers);
	return combineReducers(reducers);
};

export default getReducers;

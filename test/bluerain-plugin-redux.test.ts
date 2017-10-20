import BR from '@blueeast/bluerain-os';
import ReduxPlugin from '../src/bluerain-plugin-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducer from '../src/reducers';
import { shallow, mount } from 'enzyme';

beforeAll(() => {
	BR.Plugins.register(ReduxPlugin);
});

beforeEach(() => {
	document.body.innerHTML = '<div class="app-container">' + '</div>';
});

// Test of registering Plugin
describe('Redux Plugin Test', () => {
	it('registered the plugin successfully', () => {
		const Plugin = BR.Plugins.get(ReduxPlugin.slug);
		expect(Plugin).toBeTruthy();
	});

	// Test of initializaing store in ReduxPlugin
	// it('should have redux store in "ref"', () => {

	// 	const App =BR.boot({renderApp:false});

	// 		const component =mount(
	// 			<App />
	// 		);

	// 	//  expect(BR.refs.store).toBeTruthy();
	//  });

	// 	//Test of undefined filter
	// 	it('should throw error because filter is undefined', () => {
	// 		expect(() => BR.Filters.remove(undefined, 'func1')).toThrow('filter cannot be undefined');

	//     });

	describe('bluerain.redux.reducers.bluerain filter  Testcase in plugin', () => {
		it(' bluerain.redux.reducers.bluerain filter  should   run fine', () => {
			const func = () => undefined;
			BR.Filters.add('bluerain.redux.reducers.bluerain', func);
			expect(
				BR.Filters.FiltersTable['bluerain.redux.reducers.bluerain']
			).toBeDefined();
		});

		it('  should have length 3 of  bluerain.redux.reducers.bluerain filter', () => {
			BR.boot({
				renderApp: false
			});
			expect(
				BR.Filters.FiltersTable['bluerain.redux.reducers.bluerain'].length
			).toEqual(3);
		});
	});

	describe('bluerain.redux.reducers.bluerain filter  Testcase in plugin', () => {
		it(' bluerain.redux.reducers.bluerain filter  should   run fine', () => {
			const func = () => undefined;
			BR.Filters.add('bluerain.system.app', func);
			expect(BR.Filters.FiltersTable['bluerain.system.app']).toBeDefined();
		});

		it(' should have length 5 of  bluerain.system.app filter', () => {
			BR.boot({
				renderApp: false
			});
			expect(BR.Filters.FiltersTable['bluerain.system.app'].length).toEqual(5);
		});
	});

	describe(' bluerain.redux.initialState filter  Testcase in plugin', () => {
		it('  bluerain.redux.initialState  filter  should   run fine', () => {
			const initialState = { value: 1 };
			BR.Filters.add('bluerain.redux.initialState filte', initialState);
			expect(
				BR.Filters.FiltersTable['bluerain.redux.initialState']
			).toBeDefined();
		});

		it(' should have length 3 of  bluerain.redux.initialState filter ', () => {
			BR.boot({
				renderApp: false
			});
			expect(
				BR.Filters.FiltersTable['bluerain.redux.initialState'].length
			).toEqual(3);
		});
	});

	describe(' bluerain.redux.middlewares  filter  Testcase in plugin', () => {
		it('should have length 8 of   bluerain.redux.middlewares filter', () => {
			BR.boot({
				renderApp: false
			});

			expect(
				BR.Filters.FiltersTable['bluerain.redux.middlewares'].length
			).toEqual(8);
		});

		it('should run  bluerain.redux.middlewares filter and throw error', () => {
			expect(() => BR.Filters.run('bluerain.redux.middlewares')).toThrow();
		});

		it('  bluerain.redux.initialState  filter  should   run fine', () => {
			const func = () => undefined;

			BR.Filters.add('bluerain.redux.middlewares', func);
			expect(
				BR.Filters.FiltersTable['bluerain.redux.middlewares']
			).toBeDefined();
		});
	});
});

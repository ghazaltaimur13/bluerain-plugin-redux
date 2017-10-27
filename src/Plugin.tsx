import React from 'react';
import { Plugin, BlueRainType } from '@blueeast/bluerain-os';
import { Provider } from 'react-redux';

import { createStore } from './store';

/**
 * Add Redux state management to BlueRain Apps
 * @property {string} pluginName "Redux"
 * @property {string} slug "redux"
 */
class ReduxPlugin extends Plugin {
	static pluginName = 'Redux';
	static slug = 'redux';

	static initialize(config: {} = {}, ctx: BlueRainType) {


		type  ReduxPluginProps = {
			store: string,
		}
			

		// withRedux HOC Method
		const withRedux = (App: typeof React.Component) => (props: ReduxPluginProps) => {

			ctx.Filters.run('bluerain.redux.beforeInit');
			const store = createStore(ctx);
			console.log("createstore",store);
			


			/**
			 * This plugin saves `store` object in the BlueRain context. This can be accessed in the following way:
			 *
			 * ```javascript
			 * const store = ctx.refs.store;
			 * ```
			 *
			 * @namespace
			 */
			const StoreRef = store;
			ctx.refs.store = StoreRef;
			
            const ReduxProvider = ctx.Filters.run('bluerain.redux.provider', Provider);
			App = ctx.Filters.run('bluerain.redux.app', App);
	   
			return (<ReduxProvider store={store}><App {...props} /></ReduxProvider>);
		};

		// Add redux to main system app
		// tslint:disable-next-line:only-arrow-functions
		ctx.Filters.add('bluerain.system.app', function AddReduxToSystemApp(App: typeof React.Component) {
			return withRedux(App);
		});
	}
}

export default ReduxPlugin;

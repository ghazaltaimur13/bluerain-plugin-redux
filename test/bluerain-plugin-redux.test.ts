import BR from '@blueeast/bluerain-os';
import ReduxPlugin from '../src/bluerain-plugin-redux';

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

	it('should have redux store in "ref"', () => {
		BR.boot();
		expect(BR.refs.store).toBeTruthy();
	});
});
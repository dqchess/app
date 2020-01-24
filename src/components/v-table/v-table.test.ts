import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue, Wrapper } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

import VTable from './v-table.vue';

describe('Table', () => {
	let component: Wrapper<Vue>;

	beforeEach(() => (component = mount(VTable, { localVue })));
});

import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

import VCheckbox from '../v-checkbox/';
import VIcon from '../v-icon/';

localVue.component('v-checkbox', VCheckbox);
localVue.component('v-icon', VIcon);

import VTable from './v-table.vue';

describe('Table', () => {
	let component: Wrapper<Vue>;

	beforeEach(
		() => (component = mount(VTable, { localVue, propsData: { headers: [], items: [] } }))
	);

	it('Renders the correct amount of rows for the given items', async () => {
		component.setProps({ items: [{}, {}, {}] });
		await component.vm.$nextTick();
		expect(component.findAll('.v-table_table-row').length).toBe(3);
	});

	it('Adds the defaults to the passed headers', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				}
			]
		});

		await component.vm.$nextTick();

		expect((component.vm as any)._headers).toEqual([
			{
				text: 'Column 1',
				value: 'col1',
				sortable: true,
				align: 'left',
				width: null
			}
		]);
	});

	it('Sorts the items based on the passed props', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			sortBy: 'col1',
			sortDesc: false
		});

		await component.vm.$nextTick();

		expect((component.vm as any)._items).toEqual([
			{
				col1: 'A',
				col2: 3
			},
			{
				col1: 'B',
				col2: 2
			},
			{
				col1: 'C',
				col2: 1
			}
		]);
	});

	it('Calculates if all items are selected', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			selection: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			]
		});

		await component.vm.$nextTick();

		expect((component.vm as any).allItemsSelected).toEqual(true);
		expect((component.vm as any).someItemsSelected).toEqual(false);
	});

	it('Calculates if some items are selected', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			selection: [
				{
					col1: 'A',
					col2: 3
				}
			]
		});

		await component.vm.$nextTick();

		expect((component.vm as any).allItemsSelected).toEqual(false);
		expect((component.vm as any).someItemsSelected).toEqual(true);
	});

	it('Handles sort by updates coming from header', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			]
		});

		await component.vm.$nextTick();

		component.find('th .content').trigger('click');

		expect((component.vm as any)._sortBy).toEqual('col1');
		expect(component.emitted('update:sort-by')[0]).toEqual(['col1']);
	});

	it('Handles sort desc updates coming from header', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			sortBy: 'col1'
		});

		await component.vm.$nextTick();

		component.find('th .content').trigger('click');

		expect((component.vm as any)._sortDesc).toEqual(true);
		expect(component.emitted('update:sort-desc')[0]).toEqual([true]);
	});

	it('Updates selection correctly', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			selection: [],
			showSelect: true
		});

		await component.vm.$nextTick();

		component.find('.v-table_table-row .select > *').trigger('click');

		expect(component.emitted('select')[0]).toEqual([
			[
				{
					col1: 'A',
					col2: 3
				}
			]
		]);

		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			selection: [
				{
					col1: 'A',
					col2: 3
				}
			],
			showSelect: true,
			itemKey: 'col1'
		});

		await component.vm.$nextTick();

		component.find('.v-table_table-row .select > *').trigger('click');

		expect(component.emitted('select')[1]).toEqual([[]]);
	});

	it('Calculates selected state per row', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			selection: [
				{
					col1: 'A',
					col2: 3
				}
			],
			showSelect: true,
			itemKey: 'col1'
		});

		await component.vm.$nextTick();

		expect(
			(component.vm as any).getSelectedState({
				col1: 'A',
				col2: 3
			})
		).toEqual(true);

		expect(
			(component.vm as any).getSelectedState({
				col1: 'C',
				col2: 1
			})
		).toEqual(false);
	});

	it('Selects all items if header checkbox is clicked', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			selection: [
				{
					col1: 'A',
					col2: 3
				}
			],
			showSelect: true,
			itemKey: 'col1'
		});

		await component.vm.$nextTick();

		component.find('.v-table_table-header .select > *').trigger('click');

		expect(component.emitted('select')[0]).toEqual([
			[
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			]
		]);

		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1'
				},
				{
					text: 'Column 2',
					value: 'col2'
				}
			],
			items: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			selection: [
				{
					col1: 'A',
					col2: 3
				},
				{
					col1: 'C',
					col2: 1
				},
				{
					col1: 'B',
					col2: 2
				}
			],
			showSelect: true,
			itemKey: 'col1'
		});

		await component.vm.$nextTick();

		component.find('.v-table_table-header .select > *').trigger('click');

		expect(component.emitted('select')[1]).toEqual([[]]);
	});

	it('Sets the correct inline styles for given height', async () => {
		component.setProps({
			headers: [],
			items: [],
			height: 50
		});

		await component.vm.$nextTick();

		expect((component.vm as any).styles).toEqual({
			height: '50px'
		});
	});
});

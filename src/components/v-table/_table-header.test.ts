import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

import VCheckbox from '../v-checkbox/';
import VIcon from '../v-icon/';

localVue.component('v-checkbox', VCheckbox);
localVue.component('v-icon', VIcon);

import TableHeader from './_table-header.vue';

describe('Table / Header', () => {
	let component: Wrapper<Vue>;

	beforeEach(() => {
		component = mount(TableHeader, {
			localVue,
			propsData: {
				headers: [
					{
						text: 'Column 1',
						value: 'col1'
					}
				],
				sortDesc: false
			}
		});
	});

	it('Gets the right classes for the passed props', async () => {
		component.setProps({
			sortBy: 'col1',
			sortDesc: true
		});

		await component.vm.$nextTick();

		const classes = (component.vm as any).getClassesForHeader({
			text: 'Column 1',
			value: 'col1',
			align: 'center',
			sortable: true
		});

		expect(classes).toEqual(['align-center', 'sortable', 'sort-desc']);
	});

	it('Emits the correct update event on sorting changes', async () => {
		component.setProps({
			sortBy: null,
			sortDesc: true
		});

		await component.vm.$nextTick();

		component.find('th').trigger('click');
		expect(component.emitted('update:sort-by')[0]).toEqual(['col1']);
		expect(component.emitted('update:sort-desc')[0]).toEqual([false]);

		component.setProps({
			sortBy: 'col1',
			sortDesc: false
		});

		await component.vm.$nextTick();

		component.find('th').trigger('click');

		expect(component.emitted('update:sort-desc')[1]).toEqual([true]);

		component.setProps({
			sortBy: 'col1',
			sortDesc: true
		});

		await component.vm.$nextTick();

		component.find('th').trigger('click');
		expect(component.emitted('update:sort-by')[1]).toEqual([null]);
		expect(component.emitted('update:sort-desc')[2]).toEqual([false]);
	});

	it('Emits toggle-select-all on checkbox click', async () => {
		component.setProps({
			showSelect: true,
			sortDesc: false
		});

		await component.vm.$nextTick();

		component.find(VCheckbox).trigger('click');

		expect(component.emitted('toggle-select-all')[0]).toEqual([true]);
	});

	it('Prevents unsortable columns from being sorted', async () => {
		component.setProps({
			headers: [
				{
					text: 'Column 1',
					value: 'col1',
					sortable: false
				}
			],
			sortDesc: false
		});

		await component.vm.$nextTick();

		component.find('th').trigger('click');

		expect(component.emitted()).toEqual({});
	});

	it('Renders correct thead for provided headers', async () => {
		component.setProps({
			headers: [
				{
					text: 'Col1',
					value: 'col1',
					align: 'left',
					sortable: true
				},
				{
					text: 'Col2',
					value: 'col2',
					align: 'left',
					sortable: true
				}
			],
			sortDesc: false
		});

		await component.vm.$nextTick();

		expect(component.find('th:first-child').html()).toContain('Col1');
		expect(component.find('th:nth-child(2)').html()).toContain('Col2');
	});

	it('Adds the align class to the header', async () => {
		component.setProps({
			headers: [
				{
					text: 'Col1',
					value: 'col1',
					align: 'left'
				},
				{
					text: 'Col2',
					value: 'col2',
					align: 'center'
				},
				{
					text: 'Col3',
					value: 'col3',
					align: 'right'
				}
			],
			sortDesc: false
		});

		await component.vm.$nextTick();

		expect(component.find('th:first-child').classes()).toContain('align-left');
		expect(component.find('th:nth-child(2)').classes()).toContain('align-center');
		expect(component.find('th:nth-child(3)').classes()).toContain('align-right');
	});

	it('Renders the provided element in the nested scoped slot for the header', async () => {
		const component = mount(TableHeader, {
			localVue,
			propsData: {
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
				sortDesc: false
			},
			scopedSlots: {
				'header.col2': '<template slot-scope="{header}"><p>{{ header.text }}</p></template>'
			}
		});

		expect(component.find('.v-table_table-header th:nth-child(2) > *').html()).toEqual(
			'<p>Column 2</p>'
		);
	});
});

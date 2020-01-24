import VueCompositionAPI from '@vue/composition-api';
import { mount, createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

import VTable from './v-table.vue';

describe('Table', () => {
	let component: Wrapper<Vue>;

	beforeEach(
		() => (component = mount(VTable, { localVue, propsData: { headers: [], items: [] } }))
	);

	describe('Header', () => {
		it('Renders correct thead for provided headers', async () => {
			component.setProps({
				headers: [
					{
						text: 'Col1',
						value: 'col1'
					},
					{
						text: 'Col2',
						value: 'col2'
					}
				]
			});

			await component.vm.$nextTick();

			expect(component.find('th:first-child').html()).toContain('Col1');
			expect(component.find('th:nth-child(2)').html()).toContain('Col2');
		});
	});

	describe('Body', () => {
		it('Renders the correct amount of rows for the given items', async () => {
			component.setProps({ items: [{}, {}, {}] });
			await component.vm.$nextTick();
			expect(component.findAll('.v-table_table-row').length).toBe(3);
		});

		it('Renders right amount of cells per row', async () => {
			component.setProps({
				headers: [
					{
						text: 'col1',
						value: 'col1'
					},
					{
						text: 'col2',
						value: 'col2'
					}
				],
				items: [
					{
						col1: 'test1',
						col2: 'test2'
					}
				]
			});
			await component.vm.$nextTick();
			expect(component.find('.v-table_table-row').findAll('td').length).toBe(2);
		});
	});

	describe('Alignment', () => {
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
				]
			});

			await component.vm.$nextTick();

			expect(component.find('th:first-child').classes()).toContain('align-left');
			expect(component.find('th:nth-child(2)').classes()).toContain('align-center');
			expect(component.find('th:nth-child(3)').classes()).toContain('align-right');
		});

		it('Defaults to left aligning', async () => {
			component.setProps({
				headers: [
					{
						text: 'Col1',
						value: 'col1'
						// no align
					}
				]
			});

			await component.vm.$nextTick();

			expect(component.find('th').classes()).toContain('align-left');
		});
	});

	describe('Customized header / row', () => {
		it('Renders the provided element in the nested scoped slot for the header', async () => {
			const component = mount(VTable, {
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
					items: [
						{
							col1: 'Test 1 Col 1',
							col2: 'Test 1 Col 2'
						},
						{
							col1: 'Test 2 Col 1',
							col2: 'Test 2 Col 2'
						}
					]
				},
				scopedSlots: {
					'header.col2':
						'<template slot-scope="{header}"><p>{{ header.text }}</p></template>'
				}
			});

			expect(component.find('.v-table_table-header th:nth-child(2) > *').html()).toEqual(
				'<p>Column 2</p>'
			);
		});

		it('Renders the provided element in the nested scoped slot', async () => {
			const component = mount(VTable, {
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
					items: [
						{
							col1: 'Test 1 Col 1',
							col2: 'Test 1 Col 2'
						},
						{
							col1: 'Test 2 Col 1',
							col2: 'Test 2 Col 2'
						}
					]
				},
				scopedSlots: {
					'item.col2': '<template slot-scope="{item}"><p>{{ item.col2 }}</p></template>'
				}
			});

			expect(component.find('.v-table_table-row td:nth-child(2) > *').html()).toEqual(
				'<p>Test 1 Col 2</p>'
			);
		});
	});
});

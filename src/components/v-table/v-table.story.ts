import { withKnobs } from '@storybook/addon-knobs';

import Vue from 'vue';
import VTable from './v-table.vue';
import markdown from './v-table.readme.md';

Vue.component('v-table', VTable);

export default {
	title: 'Components / Table',
	component: VTable,
	decorators: [withKnobs],
	parameters: {
		notes: markdown
	}
};

export const simple = () => ({
	data() {
		return {
			headers: [
				{
					text: 'Name',
					value: 'name'
				},
				{
					text: 'Phone',
					value: 'tel'
				}
			],
			items: [
				{
					name: 'Amsterdam',
					tel: '(020) 333-0987'
				},
				{
					name: 'Beverly Hills',
					tel: '(123) 333-0987'
				},
				{
					name: 'New Haven',
					tel: '(203) 687-9900'
				},
				{
					name: 'Hong Kong',
					tel: '(430) 709-4011'
				},
				{
					name: 'Ahmedabad',
					tel: '(330) 777-3240'
				}
			]
		};
	},
	template: `
	<v-table
		:headers="headers"
		:items="items"
	/>
	`
});

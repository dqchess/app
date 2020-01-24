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

export const alignment = () => ({
	data() {
		return {
			headers: [
				{
					text: 'Name',
					value: 'name',
					align: 'left'
				},
				{
					text: 'Phone',
					value: 'tel',
					align: 'center'
				},
				{
					text: 'Contact',
					value: 'contact',
					align: 'right'
				}
			],
			items: [
				{
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
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

export const customRow = () => ({
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
				},
				{
					text: 'Contact',
					value: 'contact'
				}
			],
			items: [
				{
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				}
			]
		};
	},
	template: `
	<v-table
		:headers="headers"
		:items="items"
	>
		<template #item.name="{ item }">
			<v-button>{{ item.name }}</v-button>
		</template>
	</v-table>
	`
});

export const customHeader = () => ({
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
				},
				{
					text: 'Contact',
					value: 'contact'
				}
			],
			items: [
				{
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				}
			]
		};
	},
	template: `
	<v-table
		:headers="headers"
		:items="items"
	>
		<template #header.name="{ header }">
			<v-icon name="star" />
		</template>
	</v-table>
	`
});

export const sorting = () => ({
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
				},
				{
					text: 'Contact',
					value: 'contact'
				}
			],
			items: [
				{
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
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

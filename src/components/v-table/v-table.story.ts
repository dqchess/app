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
			<v-button x-small>{{ item.name }}</v-button>
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
					value: 'tel',
					sortable: false
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
			],
			sortBy: 'name',
			sortDesc: false
		};
	},
	template: `
	<div>
		<v-table
			:headers="headers"
			:items="items"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
		/>
		<p style="margin-top: 2rem;">Table syncs the sort-by and sort-desc props when using \`sync\` modifier:</p>
		<pre style="max-width: max-content; margin-top: 20px; background-color: #eee; font-family: monospace; padding: 0.5rem; border-radius: 8px;">
sort-by: {{ sortBy }}
sort-desc: {{ sortDesc }}</pre>
		<p style="margin-top: 2rem;">Defaults to first sortable column that's passed in (\`name\` in this example)</p>
	</div>
	`
});

export const selectable = () => ({
	data() {
		return {
			headers: [
				{
					text: 'Name',
					value: 'name'
				},
				{
					text: 'Phone',
					value: 'tel',
					sortable: false
				},
				{
					text: 'Contact',
					value: 'contact'
				}
			],
			items: [
				{
					id: 1,
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					id: 2,
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					id: 3,
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					id: 4,
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					id: 5,
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				}
			],
			selection: []
		};
	},
	template: `
		<div>
		<v-table
			:headers="headers"
			:items="items"
			item-key="id"
			v-model="selection"
			show-select
		/>
		<pre style="max-width: max-content; margin-top: 20px; background-color: #eee; font-family: monospace; padding: 0.5rem; border-radius: 8px;">
selection: {{ selection }}
		</pre>
	</div>
	`
});

export const fixedHeader = () => ({
	data() {
		return {
			headers: [
				{
					text: 'Name',
					value: 'name'
				},
				{
					text: 'Phone',
					value: 'tel',
					sortable: false
				},
				{
					text: 'Contact',
					value: 'contact'
				}
			],
			items: [
				{
					id: 1,
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					id: 2,
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					id: 3,
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					id: 4,
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					id: 5,
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				},
				{
					id: 6,
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					id: 7,
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					id: 8,
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					id: 9,
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					id: 10,
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				},
				{
					id: 11,
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					id: 12,
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					id: 13,
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					id: 14,
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					id: 15,
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				},
				{
					id: 16,
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					id: 17,
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					id: 18,
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					id: 19,
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					id: 20,
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				}
			]
		};
	},
	template: `
	<v-sheet><v-table :headers="headers" :items="items" :height="200" fixed-header /></v-sheet>
	`
});

export const loading = () => ({
	data() {
		return {
			headers: [
				{
					text: 'Name',
					value: 'name'
				},
				{
					text: 'Phone',
					value: 'tel',
					sortable: false
				},
				{
					text: 'Contact',
					value: 'contact'
				}
			],
			items: [
				{
					id: 1,
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					id: 2,
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					id: 3,
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					id: 4,
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					id: 5,
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				}
			]
		};
	},
	template: `
		<div>
		<v-table
			:headers="headers"
			:items="items"
			loading
		/>
	</div>
	`
});

export const loadingNoRows = () => ({
	data() {
		return {
			headers: [
				{
					text: 'Name',
					value: 'name'
				},
				{
					text: 'Phone',
					value: 'tel',
					sortable: false
				},
				{
					text: 'Contact',
					value: 'contact'
				}
			],
			items: []
		};
	},
	template: `
		<div>
		<v-table
			:headers="headers"
			:items="items"
			loading
			loading-text="Loading items from \`movies\` collection..."
		/>
	</div>
	`
});

loadingNoRows.title = 'Loading (No Rows)';

export const columnWidths = () => ({
	data() {
		return {
			headers: [
				{
					text: 'Name',
					value: 'name',
					width: 150
				},
				{
					text: 'Phone',
					value: 'tel',
					width: 150
				},
				{
					text: 'Contact',
					value: 'contact',
					width: 250
				}
			],
			items: [
				{
					id: 1,
					name: 'Amsterdam',
					tel: '(020) 333-0987',
					contact: 'Mariann Rumble'
				},
				{
					id: 2,
					name: 'Beverly Hills',
					tel: '(123) 333-0987',
					contact: 'Kathy Baughan'
				},
				{
					id: 3,
					name: 'New Haven',
					tel: '(203) 687-9900',
					contact: 'Fleur Tebbet'
				},
				{
					id: 4,
					name: 'Hong Kong',
					tel: '(430) 709-4011',
					contact: 'Rodolph Tofful'
				},
				{
					id: 5,
					name: 'Ahmedabad',
					tel: '(330) 777-3240',
					contact: 'Helenka Killely'
				}
			]
		};
	},
	template: `
		<div>
		<v-table
			:headers="headers"
			:items="items"
		/>
	</div>
	`
});

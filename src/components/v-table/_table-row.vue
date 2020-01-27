<template>
	<tr class="v-table_table-row">
		<td v-if="showSelect" class="select cell">
			<v-checkbox :inputValue="isSelected" @change="toggleSelect" />
		</td>
		<td
			class="cell"
			v-for="header in headers"
			:class="getClassesForHeader(header)"
			:key="header.value"
		>
			<slot :name="`item.${header.value}`" :item="item">{{ item[header.value] }}</slot>
		</td>
	</tr>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { Header } from './types';

export default createComponent({
	props: {
		headers: {
			type: Array as () => Header[],
			required: true
		},
		item: {
			type: Object,
			required: true
		},
		showSelect: {
			type: Boolean,
			default: false
		},
		isSelected: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		return { getClassesForHeader, toggleSelect };

		function getClassesForHeader(header: Header) {
			const classes: string[] = [];

			if (header.align) {
				classes.push(`align-${header.align}`);
			}

			return classes;
		}

		function toggleSelect() {
			emit('item-selected', {
				item: props.item,
				value: !props.isSelected
			});
		}
	}
});
</script>

<style lang="scss" scoped>
.v-table_table-row {
	.cell {
		border-bottom: 1px solid var(--table-row-border-color);
		height: 48px;
		padding: 0 16px;
		background-color: var(--table-background-color);
	}

	.select {
		width: 24px;
		padding-right: 0;
	}
}
</style>

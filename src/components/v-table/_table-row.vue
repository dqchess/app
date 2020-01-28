<template>
	<tr class="v-table_table-row" :class="{ subdued }">
		<td v-if="showSelect" class="select cell">
			<v-checkbox :inputValue="isSelected" @change="toggleSelect" />
		</td>
		<td
			class="cell"
			v-for="header in headers"
			:class="getClassesForCell(header)"
			:key="header.value"
		>
			<slot :name="`item.${header.value}`" :item="item">{{ item[header.value] }}</slot>
		</td>
	</tr>
</template>

<script lang="ts">
import { createComponent, PropType } from '@vue/composition-api';
import { Header } from './types';

export default createComponent({
	props: {
		headers: {
			type: Array as PropType<Header[]>,
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
		},
		subdued: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		return { getClassesForCell, toggleSelect };

		function getClassesForCell(header: Header) {
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
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&.subdued {
		opacity: 0.3;
	}
}
</style>

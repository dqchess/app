<template>
	<thead class="v-table_table-header">
		<tr :class="{ fixed }">
			<th v-if="showSelect" class="select cell">
				<v-checkbox
					:inputValue="allItemsSelected"
					:indeterminate="someItemsSelected"
					@change="toggleSelectAll"
				/>
			</th>
			<th
				v-for="header in headers"
				:key="header.value"
				:class="getClassesForHeader(header)"
				class="cell"
				@click="changeSort(header)"
			>
				<slot :name="`header.${header.value}`" :header="header">{{ header.text }}</slot>
				<v-icon v-if="header.sortable" name="sort" class="sort-icon" small />
			</th>
		</tr>
	</thead>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { Alignment, Header } from './types';

export default createComponent({
	props: {
		headers: {
			type: Array as () => Header[],
			required: true
		},
		sortDesc: {
			type: Boolean,
			required: true
		},
		sortBy: {
			type: String,
			default: null
		},
		showSelect: {
			type: Boolean,
			default: false
		},
		someItemsSelected: {
			type: Boolean,
			default: false
		},
		allItemsSelected: {
			type: Boolean,
			default: false
		},
		fixed: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		return { getClassesForHeader, changeSort, toggleSelectAll };

		function getClassesForHeader(header: Header) {
			const classes: string[] = [];

			if (header.align) {
				classes.push(`align-${header.align}`);
			}

			if (header.sortable) {
				classes.push('sortable');
			}

			if (props.sortBy === header.value) {
				if (props.sortDesc === false) {
					classes.push('sort-asc');
				} else {
					classes.push('sort-desc');
				}
			}

			return classes;
		}

		/**
		 * If current sort is not this field, use this field in ascending order
		 * If current sort is field, reverse sort order to descending
		 * If current sort is field and sort is desc, set sort field to null (default)
		 */
		function changeSort(header: Header) {
			if (header.sortable === false) return;

			if (header.value === props.sortBy) {
				if (props.sortDesc === false) {
					emit('update:sort-desc', true);
				} else {
					emit('update:sort-desc', false);
					emit('update:sort-by', null);
				}
			} else {
				emit('update:sort-by', header.value);
				emit('update:sort-desc', false);
			}
		}

		function toggleSelectAll() {
			emit('toggle-select-all', !props.allItemsSelected);
		}
	}
});
</script>

<style lang="scss" scoped>
.v-table_table-header {
	.sortable {
		cursor: pointer;

		.sort-icon {
			opacity: 0;
			transform: scaleY(-1);
			transition: opacity var(--fast) var(--transition);
		}

		&:hover .sort-icon {
			opacity: 0.5;
		}

		&.sort-asc,
		&.sort-desc {
			.sort-icon {
				opacity: 1;
			}
		}

		&.sort-desc {
			.sort-icon {
				transform: scaleY(1);
			}
		}
	}

	.cell {
		background-color: var(--table-background-color);
		padding: 0 16px;
		border-bottom: 1px solid var(--table-head-border-color);
		height: 48px;
		font-size: 14px;
		font-weight: var(--weight-bold);
	}

	.select {
		width: 24px;
		padding-right: 0;
	}

	.fixed th {
		position: sticky;
		top: 0;
	}
}
</style>

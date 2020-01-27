<template>
	<div class="v-table" :style="styles">
		<table>
			<table-header
				:headers="_headers"
				:sort-desc="_sortDesc"
				:sort-by="_sortBy"
				:show-select="showSelect"
				:some-items-selected="someItemsSelected"
				:all-items-selected="allItemsSelected"
				:fixed="fixedHeader"
				@toggle-select-all="onToggleSelectAll"
				@update:sort-by="onUpdateSortBy"
				@update:sort-desc="onUpdateSortDesc"
			>
				<template v-for="header in _headers" #[`header.${header.value}`]>
					<slot :header="header" :name="`header.${header.value}`" />
				</template>
			</table-header>
			<tbody>
				<table-row
					v-for="item in _items"
					:headers="_headers"
					:item="item"
					:key="item[itemKey]"
					:show-select="showSelect"
					:is-selected="getSelectedState(item)"
					@item-selected="onItemSelected"
				>
					<template v-for="header in _headers" #[`item.${header.value}`]>
						<slot :item="item" :name="`item.${header.value}`" />
					</template>
				</table-row>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { VNode } from 'vue';
import { createComponent, computed, ref, watch, Ref } from '@vue/composition-api';
import { Header, HeaderRaw, ItemSelectEvent } from './types';
import TableHeader from './_table-header.vue';
import TableRow from './_table-row.vue';
import { sortBy, clone } from 'lodash';

const HeaderDefaults: Header = {
	text: '',
	value: '',
	align: 'left',
	sortable: true
};

export default createComponent({
	components: {
		TableHeader,
		TableRow
	},
	model: {
		prop: 'selection',
		event: 'select'
	},
	props: {
		headers: {
			type: Array as () => HeaderRaw[],
			required: true
		},
		items: {
			type: Array as () => object[],
			required: true
		},
		itemKey: {
			type: String,
			default: 'id'
		},
		sortBy: {
			type: String,
			default: null
		},
		sortDesc: {
			type: Boolean,
			default: false
		},
		showSelect: {
			type: Boolean,
			default: false
		},
		selection: {
			type: Array as () => any[],
			default: () => []
		},
		fixedHeader: {
			type: Boolean,
			default: false
		},
		height: {
			type: Number,
			default: null
		}
	},
	setup(props, { slots, emit }) {
		// We keep a manual copy of the sort status instead of always relying on the parent in order
		// to support sorting for inline tables without any additional state management.
		let _sortBy = ref<string | null>(props.sortBy);
		let _sortDesc = ref<Boolean>(props.sortDesc);

		// This does mean that we have to watch the props, and update the local state manually on
		// changes of the props.
		watch(
			() => props.sortBy,
			(newSort: string) => (_sortBy.value = props.sortBy)
		);

		watch(
			() => props.sortDesc,
			(newSort: boolean) => (_sortDesc.value = props.sortDesc)
		);

		/**
		 * Headers prop merged with the default values for each Header
		 */
		const _headers = computed<Header[]>(() => {
			return props.headers.map((header: HeaderRaw) => ({
				...HeaderDefaults,
				...header
			}));
		});

		/**
		 * Items sorted based on sort-by and sort-desc props
		 */
		const _items = computed<object[]>(() => {
			const fallbackSortHeader: Header | undefined = _headers.value.find(
				(header: Header) => header.sortable === true
			);

			const fallbackSortProperty: string | null =
				(fallbackSortHeader && fallbackSortHeader.value) || null;

			let sortProperty: string | null = _sortBy.value || fallbackSortProperty;

			if (sortProperty === null) return props.items;

			const itemsSorted = sortBy(props.items, [sortProperty]);
			if (_sortDesc.value === true) return itemsSorted.reverse();
			return itemsSorted;
		});

		const allItemsSelected = computed<boolean>(() => {
			return props.selection.length === props.items.length;
		});

		const someItemsSelected = computed<boolean>(() => {
			return props.selection.length > 0 && allItemsSelected.value === false;
		});

		type Styles = {
			height?: string;
		};

		const styles = computed<object>(() => {
			const styles: Styles = {};

			if (props.height) {
				styles.height = props.height + 'px';
			}

			return styles;
		});

		return {
			_headers,
			_items,
			_sortBy,
			_sortDesc,
			allItemsSelected,
			getSelectedState,
			onItemSelected,
			onToggleSelectAll,
			onUpdateSortBy,
			onUpdateSortDesc,
			someItemsSelected,
			styles
		};

		function onUpdateSortBy(value: string) {
			_sortBy.value = value;
			emit('update:sort-by', value);
		}

		function onUpdateSortDesc(value: boolean) {
			_sortDesc.value = value;
			emit('update:sort-desc', value);
		}

		function onItemSelected(event: ItemSelectEvent) {
			emit('item-selected', event);

			const selection: any[] = clone(props.selection);

			if (event.value === true) {
				selection.push(event.item);
			} else {
				const itemIndex: number = selection.findIndex(
					(item: any) => item[props.itemKey] === event.item[props.itemKey]
				);

				selection.splice(itemIndex, 1);
			}

			emit('select', selection);
		}

		function getSelectedState(item: any) {
			const selectedKeys = props.selection.map((item: any) => item[props.itemKey]);
			return selectedKeys.includes(item[props.itemKey]);
		}

		function onToggleSelectAll(value: boolean) {
			if (value === true) {
				emit('select', clone(props.items));
			} else {
				emit('select', []);
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.v-table {
	position: relative;
	overflow: auto;

	table {
		border-spacing: 0;
		width: 100%;
	}

	::v-deep {
		.align-left {
			text-align: left;
		}

		.align-center {
			text-align: center;
		}

		.align-right {
			text-align: right;
		}
	}
}
</style>

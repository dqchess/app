<template>
	<div class="v-table" :style="styles" :class="{ loading }">
		<table>
			<table-header
				:headers="_headers"
				:sort="_sort"
				:show-select="showSelect"
				:show-resize="showResize"
				:some-items-selected="someItemsSelected"
				:all-items-selected="allItemsSelected"
				:fixed="fixedHeader"
				@toggle-select-all="onToggleSelectAll"
				@update:headers="onUpdateHeaders"
				@update:sort="onUpdateSort"
			>
				<template v-for="header in _headers" #[`header.${header.value}`]>
					<slot :header="header" :name="`header.${header.value}`" />
				</template>
			</table-header>
			<thead v-if="loading" class="loading-indicator">
				<th :colspan="_headers.length">
					<v-progress-linear indeterminate v-if="loading" :height="2" />
				</th>
			</thead>
			<tbody>
				<tr v-if="loading && items.length === 0" class="loading-text">
					<td :colspan="_headers.length">{{ loadingText }}</td>
				</tr>

				<table-row
					v-for="item in _items"
					:headers="_headers"
					:item="item"
					:key="item[itemKey]"
					:show-select="showSelect"
					:is-selected="getSelectedState(item)"
					:subdued="loading"
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
import { createComponent, computed, ref, watch, Ref, PropType } from '@vue/composition-api';
import { Header, HeaderRaw, ItemSelectEvent, Sort } from './types';
import TableHeader from './_table-header.vue';
import TableRow from './_table-row.vue';
import { sortBy, clone, mapValues } from 'lodash';

const { i18n } = require('@/lang/');

const HeaderDefaults: Header = {
	text: '',
	value: '',
	align: 'left',
	sortable: true,
	width: null
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
			type: Array as PropType<HeaderRaw[]>,
			required: true
		},
		items: {
			type: Array as PropType<object[]>,
			required: true
		},
		itemKey: {
			type: String,
			default: 'id'
		},
		sort: {
			type: Object as PropType<Sort>,
			default: (): Sort => ({
				by: null,
				desc: false
			})
		},
		showSelect: {
			type: Boolean,
			default: false
		},
		showResize: {
			type: Boolean,
			default: false
		},
		selection: {
			type: Array as PropType<any[]>,
			default: () => []
		},
		fixedHeader: {
			type: Boolean,
			default: false
		},
		height: {
			type: Number,
			default: null
		},
		loading: {
			type: Boolean,
			default: false
		},
		loadingText: {
			type: String,
			default: i18n.t('loading')
		},
		serverSort: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots, emit }) {
		/**
		 * Headers prop merged with the default values for each Header
		 */
		let _headers = ref<Header[]>(
			props.headers.map((header: HeaderRaw) => ({
				...HeaderDefaults,
				...header
			}))
		);

		const fallbackSortHeader: Header | undefined = _headers.value.find(
			(header: Header) => header.sortable === true
		);

		const fallbackSortProperty: string | null =
			(fallbackSortHeader && fallbackSortHeader.value) || null;

		let _sort = ref<Sort>(props.sort);

		watch(
			() => props.sort,
			(newSort: Sort) => {
				_sort.value = newSort;
			}
		);

		watch(
			() => props.headers,
			(newHeaders: HeaderRaw[]) =>
				(_headers.value = newHeaders.map((header: HeaderRaw) => ({
					...HeaderDefaults,
					...header
				})))
		);

		const _items = computed<object[]>(() => {
			if (props.serverSort === false) {
				if (_sort.value.by === null) return props.items;

				const itemsSorted = sortBy(props.items, [_sort.value.by]);
				if (_sort.value.desc === true) return itemsSorted.reverse();
				return itemsSorted;
			}

			return props.items;
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
			_sort,
			allItemsSelected,
			getSelectedState,
			onItemSelected,
			onToggleSelectAll,
			onUpdateSort,
			someItemsSelected,
			styles,
			onUpdateHeaders
		};

		function onUpdateSort(value: Sort) {
			_sort.value = value;
			emit('update:sort', value);
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

		function onUpdateHeaders(newHeaders: Header[]) {
			_headers.value = newHeaders;

			// We'll update the passed in headers, so we don't send the defaults up if we don't have to
			emit(
				'update:headers',
				props.headers.map((header: HeaderRaw, index: number) => {
					return mapValues(header, (value: any, key: keyof Header) => {
						return newHeaders[index][key];
					});
				})
			);
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
		table-layout: fixed;
	}

	&.loading {
		table {
			pointer-events: none;
		}

		.loading-indicator {
			height: auto;
			padding: 0;
			border: none;

			th {
				padding: 0;
			}
		}

		.loading-text {
			td {
				padding: 16px;
			}
			color: var(--input-placeholder-color);
			text-align: center;
		}
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

<template>
	<table class="v-table">
		<table-header
			:headers="_headers"
			:sort-desc="_sortDesc"
			:sort-by="_sortBy"
			@update:sort-by="onUpdateSortBy"
			@update:sort-desc="onUpdateSortDesc"
		>
			<template v-for="header in _headers" #[`header.${header.value}`]>
				<slot :header="header" :name="`header.${header.value}`" />
			</template>
		</table-header>
		<tbody>
			<table-row
				v-for="(item, index) in _items"
				:headers="_headers"
				:item="item"
				:key="index"
			>
				<template v-for="header in _headers" #[`item.${header.value}`]>
					<slot :item="item" :name="`item.${header.value}`" />
				</template>
			</table-row>
		</tbody>
	</table>
</template>

<script lang="ts">
import { VNode } from 'vue';
import { createComponent, computed, ref, watch, Ref } from '@vue/composition-api';
import { Header, HeaderRaw } from './types';
import TableHeader from './_table-header.vue';
import TableRow from './_table-row.vue';
import { sortBy } from 'lodash';

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
	props: {
		headers: {
			type: Array as () => HeaderRaw[],
			required: true
		},
		items: {
			type: Array as () => object[],
			required: true
		},
		sortBy: {
			type: String,
			default: null
		},
		sortDesc: {
			type: Boolean,
			default: false
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
		 * Items sorted based on sort-by and sort-desc props and with unique key added in $key
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

		return { _headers, _items, _sortBy, _sortDesc, onUpdateSortBy, onUpdateSortDesc };

		function onUpdateSortBy(value: string) {
			_sortBy.value = value;
			emit('update:sort-by', value);
		}

		function onUpdateSortDesc(value: boolean) {
			_sortDesc.value = value;
			emit('update:sort-desc', value);
		}
	}
});
</script>

<style lang="scss" scoped>
.v-table {
	border-spacing: 0;
	width: 100%;

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

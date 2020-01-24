<template>
	<table class="v-table">
		<table-header :headers="_headers" />
		<tbody>
			<table-row :headers="_headers" :item="item" v-for="(item, index) in items" :key="index">
				<template v-for="header in _headers" #[`item.${header.value}`]>
					<slot :item="item" :name="`item.${header.value}`" />
				</template>
			</table-row>
		</tbody>
	</table>
</template>

<script lang="ts">
import { VNode } from 'vue';
import { createComponent, computed } from '@vue/composition-api';
import { Header, HeaderRaw } from './types';
import TableHeader from './_table-header.vue';
import TableRow from './_table-row.vue';

const HeaderDefaults: Header = {
	text: '',
	value: '',
	align: 'left'
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
		}
	},
	setup(props, { slots }) {
		const _headers = computed<Header[]>(() => {
			return props.headers.map((header: HeaderRaw) => ({
				...HeaderDefaults,
				...header
			}));
		});

		const itemSlots = computed(() =>
			slots.filter((slot: VNode, name: string) => name.startsWith('item.'))
		);

		return { _headers, itemSlots };
	}
});
</script>

<style lang="scss" scoped>
.v-table {
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

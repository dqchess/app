<template>
	<table class="v-table">
		<table-header :headers="headers" />
		<tbody>
			<table-row
				:headers="headers"
				:item="item"
				v-for="(item, index) in items"
				:key="index"
			/>
		</tbody>
	</table>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { Header } from './types';
import TableHeader from './_table-header.vue';
import TableRow from './_table-row.vue';

export default createComponent({
	components: {
		TableHeader,
		TableRow
	},
	props: {
		headers: {
			type: Array as () => Header[],
			required: true
		},
		items: {
			type: Array as () => object[],
			required: true
		}
	}
});
</script>

<style lang="scss" scoped></style>

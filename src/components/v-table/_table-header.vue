<template>
	<thead class="v-table_table-header">
		<tr>
			<th
				v-for="header in headers"
				:key="header.value"
				:class="getClassesForHeader(header)"
				@click="updateSortBy(header.value)"
			>
				<slot :name="`header.${header.value}`">{{ header.text }}</slot>
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
		sortBy: {
			type: String,
			default: null
		}
	},
	setup(props, { emit }) {
		return { getClassesForHeader, updateSortBy };

		function getClassesForHeader(header: Header) {
			const classes: string[] = [];

			if (header.align) {
				classes.push(`align-${header.align}`);
			}

			return classes;
		}

		function updateSortBy(value: string) {
			emit('update:sort-by', value);
		}
	}
});
</script>

<style lang="scss" scoped>
.v-table_table-header {
}
</style>

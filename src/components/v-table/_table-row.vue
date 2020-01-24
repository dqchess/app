<template>
	<tr class="v-table_table-row">
		<td v-for="header in headers" :key="header.value" :class="getClassesForHeader(header)">
			{{ item[header.value] }}
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
		}
	},
	setup(props) {
		return { getClassesForHeader };

		function getClassesForHeader(header: Header) {
			const classes: string[] = [];

			if (header.align) {
				classes.push(`align-${header.align}`);
			}

			return classes;
		}
	}
});
</script>

<style lang="scss" scoped>
.v-table_table-row {
}
</style>

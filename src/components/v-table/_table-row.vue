<template>
	<tr class="v-table_table-row">
		<td v-for="header in headers" :key="header.value" :class="getClassesForHeader(header)">
			<slot :name="`item.${header.value}`">{{ item[header.value] }}</slot>
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
	td {
		border-bottom: 1px solid var(--table-row-border-color);
		height: 48px;
		padding: 0 16px;
	}
}
</style>

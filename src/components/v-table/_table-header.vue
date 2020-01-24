<template>
	<thead class="v-table_table-header">
		<tr>
			<th v-for="header in headers" :key="header.value" :class="getClassesForHeader(header)">
				{{ header.text }}
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
.v-table_table-header {
}
</style>

<template>
	<thead class="v-table_table-header">
		<tr>
			<th v-for="header in headers" :key="header.value">
				<span>{{ header.text }}</span>
			</th>
		</tr>
	</thead>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { Header } from './types';

export default createComponent({
	props: {
		headers: {
			type: Array as () => Header[],
			required: true
		}
	}
});
</script>

<style lang="scss" scoped>
.v-table_table-header {
}
</style>

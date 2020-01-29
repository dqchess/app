<template>
	<div class="v-slider" :style="styles">
		<slot name="prepend" @click="onPrependClick" />
		<div class="slider">
			<input
				type="range"
				:value="value"
				:max="max"
				:min="min"
				:step="step"
				@change="onChange"
				@input="onInput"
			/>
			<div v-if="ticks" class="ticks">
				<span class="tick" v-for="i in (max - min) / step" :key="i" />
			</div>
		</div>
		<slot name="append" @click="onAppendClick" />
	</div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';
import parseCSSVar from '@/utils/parse-css-var';
import { ChangeEvent } from 'react';

export default createComponent({
	props: {
		trackColor: {
			type: String,
			default: '--slider-track-color'
		},
		trackFillColor: {
			type: String,
			default: '--slider-track-fill-color'
		},
		thumbColor: {
			type: String,
			default: '--slider-thumb-color'
		},
		showThumbLabel: {
			type: Boolean,
			default: false
		},
		max: {
			type: Number,
			default: 100
		},
		min: {
			type: Number,
			default: 0
		},
		step: {
			type: Number,
			default: 1
		},
		ticks: {
			type: Boolean,
			default: false
		},
		value: {
			type: Number,
			default: 50
		}
	},
	setup(props, { emit }) {
		const styles = computed(() => ({
			'--_v-slider-track-color': parseCSSVar(props.trackColor),
			'--_v-slider-track-fill-color': parseCSSVar(props.trackColor),
			'--_v-slider-thumb-color': parseCSSVar(props.trackColor)
		}));

		return { styles, onChange, onInput, onPrependClick, onAppendClick };

		function onChange(event: ChangeEvent) {
			const target = event.target as HTMLInputElement;
			emit('change', Number(target.value));
		}

		function onInput(event: InputEvent) {
			const target = event.target as HTMLInputElement;
			emit('input', Number(target.value));
		}

		function onPrependClick(event: MouseEvent) {
			emit('click:prepend', event);
		}

		function onAppendClick(event: MouseEvent) {
			emit('click:append', event);
		}
	}
});
</script>

<style lang="scss" scoped>
.v-slider {
	.slider {
		position: relative;
		width: max-content;

		.ticks {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.tick {
				display: inline-block;
				width: 2px;
				height: 2px;
				background-color: var(--black);
			}
		}
	}
}
</style>

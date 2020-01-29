import Vue from 'vue';
import markdown from './v-slider.readme.md';
import VIcon from '../v-icon/';
import VSlider from './v-slider.vue';

Vue.component('v-slider', VSlider);
Vue.component('v-icon', VIcon);

export default {
	title: 'Components / Slider',
	component: VSlider,
	parameters: {
		notes: markdown
	}
};

export const interactive = () => ({
	data() {
		return {
			value: 50
		};
	},
	template: `
<div>
<v-slider v-model="value" />
<pre style="max-width: max-content; margin-top: 20px; background-color: #eee; font-family: monospace; padding: 0.5rem; border-radius: 8px;">
value: {{value}}
</pre>
</div>
`
});

export const withTicks = () => ({
	data() {
		return {
			value: 50
		};
	},
	template: `
	<v-slider :min="5" :max="15" v-model="value" ticks />
`
});

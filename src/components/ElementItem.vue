<template>
	{{ updateElements() }}
	<div class="content">
		<div class="flex-between">
			<span class="modalTitle noselect muted">{{ title }}</span>
		</div>
		<div class="flex-between">
			<p
				class="value" :style="value.length > 40  ? { 'font-size': '1rem' } : ''">
				{{ typeof value !== 'string' ? value : upperFirstLetter(value) }}
			</p>
			<div v-if="unitKey !== ''" class="dropdown">
				<button class="dropdown-button">{{ unitKey }}</button>
				<div class="dropdown-content">
					<a @click="convertUnit($event, true)" class="unitSelection" href="#">{{ unitKey }}</a>
					<div v-for="unit in units[unitKey]" v-bind:key="unit">
						<a @click="convertUnit($event)" class="unitSelection" href="#">{{ unit.target_unit }}</a>
					</div>
				</div>
			</div>
			<p v-if="unitFixed !== ''" class="fixed-unit muted" :style="unitFixed.length > 5  ? { 'font-size': '1rem' } : ''">{{ unitFixed }}</p>
		</div>
	</div>
</template>

<!-- 'flex-between': strLongerThan50(value), -->
<script>
	import UNITLIST from '@/resources/misc/units.js';

	export default {
		props: {
			title: String,
			value: [String, Number],
			unitKey: {
				default: '',
				type: String
			},
			unitFixed: {
				default: '',
				type: String
			},
			color: String
		},
		data() {
			return {
				defaultColor: "#fff",
				units: UNITLIST,
				// initialValue: this.value
			}
		},
		computed: {
			initialValue() {
				return this.value
			}
		},
		methods: {
			upperFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			},
			formatNumber (value) {
				if (value >= 0.01) {
					return Number(value.toFixed(100))
				} else {
					if (value < 0.00001) {
						return Number.parseFloat(Number(value.toFixed(100)))
						// .toExponential().toPrecision(2)
					}
					return value
				}
			},
			async convertUnit($event, _default = false) {
				const CLICKED = $event.target;
				CLICKED.parentElement.parentElement.parentElement.querySelector('.dropdown-button').textContent = CLICKED.textContent
				// document.querySelector('.dropdown-button').textContent = CLICKED.textContent
				const DEEPDIVE = CLICKED.parentElement.parentElement.parentElement.parentElement.parentElement

				// console.log(DEEPDIVE);

				const UNIT_KEY = CLICKED.textContent;
				const TARGET = DEEPDIVE.querySelector('.value');
				const TARGET_INITIAL_VALUE = this.initialValue

				const defaultFontSize = function(el) {
					return el.style.fontSize = '1.4rem'
				}
				
				if (_default) {
					TARGET.textContent = this.initialValue
					defaultFontSize(TARGET)
				}

				const objectItem = JSON.parse(JSON.stringify(this.units[this.unitKey])).find(({ target_unit }) => target_unit === UNIT_KEY);
				console.log(objectItem);

				const func = eval(objectItem?.formula) || function(num) { return num }
				TARGET.textContent = await this.formatNumber(func(Number(TARGET_INITIAL_VALUE)))
				if (TARGET.textContent.length >= 10) {
					TARGET.style.fontSize = '1rem'
				}
				if (TARGET.textContent.length >= 20) {
					TARGET.style.fontSize = '.8rem'
				}
				if (TARGET.textContent.length < 10) {
					defaultFontSize(TARGET)
				}
			},
			strLongerThan50(str) {
				return String(str).length < 50
			},
			updateElements() {
				document.querySelectorAll('details').forEach(function(slot) {
					if (slot.querySelector('div') !== null) {
						slot.classList.remove('inactive')
					}
					else slot.classList.add('inactive')
				})
			}
		},
		// computed: {
		// 	checkValue() {
		// 		if (this.value === '') this.remove()
		// 		return null
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.muted { opacity: .5; }
	.content {
		margin-top: .3rem;
		text-align: left;
		font-size: 1rem;
	}
	p, span { 
		margin-left: .2rem;
		margin-top: .3rem;
	}
	p {
		color: v-bind(color);
		font-size: 1.4rem;
	}
	.fixed-unit {
		width: 8rem;
		align-self: center;
		text-align: right;
	}
</style>
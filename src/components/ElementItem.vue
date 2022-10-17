<template>
	{{ updateElements() }}
	<div class="content">
		<div class="flex-between">
			<span class="modalTitle noselect muted">{{ title }}</span>
		</div>
		<div class="flex-between">
			<p @click="copyToClipboard($event)"
				class="value" :style="value.length > 40  ? { 'font-size': '1rem' } : ''">
				{{ typeof value !== 'string' ? formatNumber(value) : upperFirstLetter(value) }}
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
	const BigNumber = require('bignumber.js');

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
				units: UNITLIST
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
					return BigNumber(value).toFixed() //Number(value.toFixed(100))
				} else {
					if (value < 0.00001) {
						return BigNumber(value).toFixed()//Number.parseFloat(Number(value.toFixed(100)))
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

				TARGET.style.wordBreak = 'break-all'
				TARGET.style.marginRight = '3vw'
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
			},
			copyToClipboard($event) {
				if ($event.target.textContent === "Kopyalandı!") return
				const PARENT = $event.target.parentElement.parentElement
				const currentMetric = PARENT.querySelector('.dropdown-button')?.textContent || PARENT.querySelector('.fixed-unit')?.textContent || ''
				navigator.clipboard.writeText($event.target.textContent.replace('⬤ ', '') + " " + currentMetric)

				const twas = $event.target.textContent
				$event.target.classList.add('fade')
				$event.target.classList.add('inactive')
				$event.target.classList.remove('inactive')
				$event.target.textContent = "Kopyalandı!"

				function refreshDataTooltip(){
					$event.target.textContent = twas
					$event.target.classList.remove('fade')
				}

				setTimeout(refreshDataTooltip, 1100);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.muted { opacity: .5; }
	.content {
		margin-top: .3rem;
		text-align: left;
		font-size: 1rem;
	}
	.value {
		margin-right: 1vw;
		&:hover {
			color: #e5bb09;
			cursor: pointer;
		}
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
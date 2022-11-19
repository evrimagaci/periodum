<template>
	<div :class="{
		'modal hidden': toggleModal === true,
		'modal': toggleModal === false
	}">
		<!-- <div class="moreInfoBtn" @click.prevent="displayContent(element.ea_content_id)">
			<div v-show="!eaContentView">
				<a href="#">Okuma modu</a>
			</div>
			<a v-show="eaContentView" href="#">Detaylar</a>
		</div> -->
		<div class="modal_search">
			<input type="search" name="search" id="modalSearch" :placeholder="this.locale.misc.modalSearch_text" autocomplete="off" @input="modalSearching($event)">
		</div>

		<infoBar :infoText="locale.tooltip.click_to_copy" />
		<!-- Element Bilgileri -->
		<div v-if="!eaContentView" class="text-left">
			<div class="essentials">
				<!-- :style="{'border': `1px solid ${categoryColors[element.category] || '#fff'}`}" -->
				<div v-if="element.name"><ElementItem :title="this.locale.elements.modal_content.name" :value="element.name" /></div>
				<!-- <div v-if="element.name_en"><ElementItem title="İngilizce ismi" :value="element.name_en" /></div> -->
				<!-- <div v-if="element.symbol"><ElementItem title="Sembol" :value="element.symbol" /></div> -->
				<div v-if="element.symbol"><div style="z-index: -2"
					:style="{
									'background-image': `linear-gradient(127deg, ${categoryColors[element.category_code]} 46%, ${categoryColors[element.category_code+'_shade']} 100%)`}"
					class="modalSymbol"><h2>{{element.symbol}}</h2></div>
					<!-- 'box-shadow': '0 0 5px ' + categoryColors[element.category_code] -->
				</div>
				<div v-if="element.number"><ElementItem :title="this.locale.elements.modal_content.atomic_number" :value="element.number" /></div>
				<div v-if="element.gas_phase"><ElementItem :title="this.locale.elements.modal_content.gas_phase" :value="element.gas_phase" /></div>
				<div v-if="element.allotrope_names"><ElementItem :title="this.locale.elements.modal_content.allotrope_names" :value="element.allotrope_names" /></div>
				<div v-if="element.appearance"><ElementItem :title="this.locale.elements.modal_content.appearance" :value="element.appearance" /></div>
				<div v-if="element.refractive_index"><ElementItem :title="this.locale.elements.modal_content.refractive_index" :value="element.refractive_index" /></div>
				<div v-if="element.phase_at_stp"><ElementItem :title="this.locale.elements.modal_content.phase_at_stp" :value="element.phase_at_stp" /></div>
				<div v-show="this.misc.spectrum !== null" class="spectrum noselect" @click="imagezoom($event)"><span>{{ this.locale.elements.modal_content.spectrum }}</span><img :src="this.misc.spectrum" alt=""></div>

				<div class="flex-between">
					<div id="modal_link" style="justify-self: center; margin-top: 1rem;"><a :href="this.locale.elements.modal_content.article !== 'Wikipedia' ? 'http://evrimagaci.org/s/'+ element.ea_content_id : element.wikipedia" target="_blank"> {{ this.locale.elements.modal_content.article }}</a></div>
					<div id="modal_link" style="justify-self: center; margin-top: 1rem;"><socialButtons class="align-center" :locale="locale" :number="element.number" :name="element.name" /></div>
				</div>
			</div>
			<!-- <div class="spectrum"><img :src="require(`@/resources/img/misc/spectrum/${element.symbol}_hd.jpg`)" alt=""></div> -->

			<!-- Tanımlayıcı Numaralar -->
			<details>
				<summary class="modalTitle" id="modal_descriptive_numbers">{{ this.locale.elements.modal_content.descriptive_numbers }}</summary>
				<div v-if="handle(element.cas_number)"><ElementItem :title="this.locale.elements.modal_content.cas_number" :value="element.cas_number" /></div>
				<div v-if="element.cid_number"><ElementItem :title="this.locale.elements.modal_content.cid_number" :value="element.cid_number" /></div>
				<div v-if="element.dot_number"><ElementItem :title="this.locale.elements.modal_content.dot_number" :value="element.dot_number" /></div>
				<div v-if="element.rtecs_number"><ElementItem :title="this.locale.elements.modal_content.rtecs_number" :value="element.rtecs_number" /></div>
				<div v-if="element.mendeleev_number"><ElementItem :title="this.locale.elements.modal_content.mendeleev_number" :value="element.mendeleev_number" /></div>
			</details>

			<!-- Kütle -->
			<details>
				<summary class="modalTitle" id="modal_mass">{{ this.locale.elements.modal_content.mass }}</summary>
				<div v-if="element.atomic_mass"><ElementItem :title="this.locale.elements.modal_content.atomic_mass" :value="element.atomic_mass" :unitKey="'Da'" /></div>
				<div v-if="element.atomic_mass_uncertainty"><ElementItem :title="this.locale.elements.modal_content.atomic_mass_uncertainty" :value="element.atomic_mass_uncertainty" :unitKey="'Da'" /></div>
			</details>
			
			<!-- Koordinatlar -->
			<details>
				<summary class="modalTitle" id="modal_coordinates">{{ this.locale.elements.modal_content.coordinates }}</summary>
				<div v-if="element.xpos"><ElementItem :title="this.locale.elements.modal_content.xpos" :value="element.xpos" /></div>
				<div v-if="element.ypos"><ElementItem :title="this.locale.elements.modal_content.ypos" :value="element.ypos" /></div>
				<div v-if="element.period"><ElementItem :title="this.locale.elements.modal_content.period" :value="element.period" /></div>
				<div v-if="element.group"><ElementItem :title="this.locale.elements.modal_content.group" :value="element.group" /></div>
			</details>
			
			<!-- Sınıflandırma -->
			<details>
				<summary class="modalTitle" id="modal_classification">{{ this.locale.elements.modal_content.classification }}</summary>
				<div v-if="element.block"><ElementItem :title="this.locale.elements.modal_content.block" :value="element.block" /></div>
				<div v-if="element.category"><ElementItem :title="this.locale.elements.modal_content.category" :value="element.category" /></div>
				<div v-if="element.electrical_type"><ElementItem :title="this.locale.elements.modal_content.electrical_type" :value="element.electrical_type" /></div>
				<div v-if="element.geochemical_class"><ElementItem :title="this.locale.elements.modal_content.geochemical_class" :value="element.geochemical_class" /></div>
				<div v-if="element.goldschmidt_class"><ElementItem :title="this.locale.elements.modal_content.goldschmidt_class" :value="element.goldschmidt_class" /></div>
			</details>

			<!-- Bulunma Sıklığı -->
			<details>
				<summary class="modalTitle" id="modal_frequency_of_presence">{{ this.locale.elements.modal_content.frequency_of_presence }}</summary>
				<div v-if="element.abundance_urban_soil"><ElementItem :title="this.locale.elements.modal_content.abundance_urban_soil" :value="element.abundance_urban_soil" :unitFixed="'kg/kg'" /></div>
				<div v-if="element.abundance_seawater_w1"><ElementItem :title="this.locale.elements.modal_content.abundance_seawater_w1" :value="element.abundance_seawater_w1" :unitFixed="'kg/L'" /></div>
				<div v-if="element.abundance_sun_s1"><ElementItem :title="this.locale.elements.modal_content.abundance_sun_s1" :value="element.abundance_sun_s1" :unitFixed="this.locale.elements.modal_content.metrics.mol_ratio" /></div>
				<div v-if="element.abundance_in_earth_crust_c1"><ElementItem :title="this.locale.elements.modal_content.abundance_in_earth_crust_c1" :value="element.abundance_in_earth_crust_c1" :unitFixed="'kg/kg'" /></div>
				<div v-if="element.abundance_humans"><ElementItem :title="this.locale.elements.modal_content.abundance_humans" :value="element.abundance_humans" :unitFixed="'%'" /></div>
				<div v-if="element.abundance_solar_system_y1"><ElementItem :title="this.locale.elements.modal_content.abundance_solar_system_y1" :value="element.abundance_solar_system_y1" :unitFixed="this.locale.elements.modal_content.metrics.mol_ratio" /></div>
				<div v-if="element.abundance_meteorite"><ElementItem :title="this.locale.elements.modal_content.abundance_meteorite" :value="element.abundance_meteorite" :unitFixed="'%'" /></div> 
			</details>
			
			<!-- Renk -->
			<details>
				<summary class="modalTitle" id="modal_color">{{ this.locale.elements.modal_content.color }}</summary>
				<div v-if="element.jmol_color"><ElementItem :title="this.locale.elements.modal_content.jmol_color" :value="'⬤ #' + element.jmol_color" :color="'#' + element.jmol_color" /></div>
				<div v-if="element.molcas_gv_color"><ElementItem :title="this.locale.elements.modal_content.molcas_gv_color" :value="'⬤ #' + element.molcas_gv_color" :color="'#' + element.molcas_gv_color" /></div>
				<div v-if="element.cpk_color"><ElementItem :title="this.locale.elements.modal_content.cpk_color" :value="'⬤ #' + element.cpk_color" :color="'#' + element.cpk_color" /></div>
			</details>
			
			<!-- Atomik Yarıçap -->
			<details>
				<summary class="modalTitle" id="modal_atomic_radius">{{ this.locale.elements.modal_content.atomic_radius }}</summary>
				<div v-if="element.atomic_radius_empirical"><ElementItem :title="this.locale.elements.modal_content.atomic_radius_empirical" :value="element.atomic_radius_empirical" /></div>
				<div v-if="element.atomic_radius_calculated"><ElementItem :title="this.locale.elements.modal_content.atomic_radius_calculated" :value="element.atomic_radius_calculated" /></div>
				<div v-if="element.atomic_radius_vanderwaals"><ElementItem :title="this.locale.elements.modal_content.atomic_radius_vanderwaals" :value="element.atomic_radius_vanderwaals" /></div>
				<div v-if="element.vdw_radius_bondi"><ElementItem :title="this.locale.elements.modal_content.vdw_radius_bondi" :value="element.vdw_radius_bondi" /></div>
				<div v-if="element.vdw_radius_rt"><ElementItem :title="this.locale.elements.modal_content.vdw_radius_rt" :value="element.vdw_radius_rt" /></div>
				<div v-if="element.atomic_radius_rahm"><ElementItem :title="this.locale.elements.modal_content.atomic_radius_rahm" :value="element.atomic_radius_rahm" /></div>
				<div v-if="element.vdw_radius_dreiding"><ElementItem :title="this.locale.elements.modal_content.vdw_radius_dreiding" :value="element.vdw_radius_dreiding" /></div>
				<div v-if="element.vdw_radius_uff"><ElementItem :title="this.locale.elements.modal_content.vdw_radius_uff" :value="element.vdw_radius_uff" /></div>
				<div v-if="element.vdw_radius_mm3"><ElementItem :title="this.locale.elements.modal_content.vdw_radius_mm3" :value="element.vdw_radius_mm3" /></div>
				<div v-if="element.vdw_radius_alvarez"><ElementItem :title="this.locale.elements.modal_content.vdw_radius_alvarez" :value="element.vdw_radius_alvarez" /></div>
				<div v-if="element.covalent_radius_bragg"><ElementItem :title="this.locale.elements.modal_content.covalent_radius_bragg" :value="element.covalent_radius_bragg" /></div>
				<div v-if="element.atomic_radius_covalent_triple_bond"><ElementItem :title="this.locale.elements.modal_content.atomic_radius_covalent_triple_bond" :value="element.atomic_radius_covalent_triple_bond" /></div>
				<div v-if="element.atomic_radius_covalent_single_bond"><ElementItem :title="this.locale.elements.modal_content.atomic_radius_covalent_single_bond" :value="element.atomic_radius_covalent_single_bond" /></div>
				<div v-if="element.covalent_radius_cordero"><ElementItem :title="this.locale.elements.modal_content.covalent_radius_cordero" :value="element.covalent_radius_cordero" /></div>
				<div v-if="element.covalent_radius_pyykko"><ElementItem :title="this.locale.elements.modal_content.covalent_radius_pyykko" :value="element.covalent_radius_pyykko" /></div>
				<div v-if="element.covalent_radius_pyykko_double"><ElementItem :title="this.locale.elements.modal_content.covalent_radius_pyykko_double" :value="element.covalent_radius_pyykko_double" /></div>
				<div v-if="element.covalent_radius_pyykko_triple"><ElementItem :title="this.locale.elements.modal_content.covalent_radius_pyykko_triple" :value="element.covalent_radius_pyykko_triple" /></div>
				<div v-if="element.metallic_radius_mendeleev"><ElementItem :title="this.locale.elements.modal_content.metallic_radius_mendeleev" :value="element.metallic_radius_mendeleev" /></div>
				<div v-if="element.metallic_radius_c12"><ElementItem :title="this.locale.elements.modal_content.metallic_radius_c12" :value="element.metallic_radius_c12" /></div>
				<div v-if="element.atomic_radius_metallic"><ElementItem :title="this.locale.elements.modal_content.atomic_radius_metallic" :value="element.atomic_radius_metallic" /></div>
			</details>
			
			<!-- Sıcaklık Özellikleri -->
			<details>
				<summary class="modalTitle" id="modal_temperature_features">{{ this.locale.elements.modal_content.temperature_features }}</summary>
				<div v-if="element.melt_use"><ElementItem :title="this.locale.elements.modal_content.melt_use" :value="element.melt_use" :unitKey="'K'" /></div>
				<div v-if="element.boil_use"><ElementItem :title="this.locale.elements.modal_content.boil_use" :value="element.boil_use" :unitKey="'K'" /></div>
				<div v-if="element.critical_temperature"><ElementItem :title="this.locale.elements.modal_content.critical_temperature" :value="element.critical_temperature" :unitKey="'K'" /></div>
				<div v-if="element.flashpoint"><ElementItem :title="this.locale.elements.modal_content.flashpoint" :value="element.flashpoint" :unitKey="'K'" /></div>
				<div v-if="element.autoignition_point"><ElementItem :title="this.locale.elements.modal_content.autoignition_point" :value="element.autoignition_point" :unitKey="'K'" /></div>
				<div v-if="element.critical_pressure"><ElementItem :title="this.locale.elements.modal_content.critical_pressure" :value="element.critical_pressure" :unitKey="'MPa'" /></div>
			</details>

			<!-- Yoğunluk Özellikleri -->
			<details>
				<summary class="modalTitle" id="modal_density_features">{{ this.locale.elements.modal_content.density_features }}</summary>
				
				<details>
					<summary class="modalTitle" id="modal_solid_density">{{ this.locale.elements.modal_content.solid_density }}</summary>
					<div v-if="element.density_solid_WEL"><ElementItem :title="this.locale.elements.modal_content.density_solid_wel" :value="element.density_solid_WEL" :unitKey="'kg/m³'" /></div>
					<div v-if="element.density_solid_LNG"><ElementItem :title="this.locale.elements.modal_content.density_solid_lng" :value="element.density_solid_LNG" :unitKey="'kg/m³'" /></div>
					<div v-if="element.density_solid_CRC"><ElementItem :title="this.locale.elements.modal_content.density_solid_crc" :value="element.density_solid_CRC" :unitKey="'kg/m³'" /></div>
				</details>	<div v-if="element.density_rt"><ElementItem :title="this.locale.elements.modal_content.density_rt" :value="element.density_rt" :unitKey="'kg/m³'" /></div>
				<div v-if="element.density_liquid_cr2"><ElementItem :title="this.locale.elements.modal_content.density_liquid_cr2" :value="element.density_liquid_cr2" :unitKey="'kg/m³'" /></div>
				<div v-if="element.density_gas"><ElementItem :title="this.locale.elements.modal_content.density_gas" :value="element.density_gas" :unitKey="'kg/m³'" /></div>
			</details>
			
			<!-- Isı Özellikleri -->
			<details>
				<summary class="modalTitle" id="modal_heat_features">{{ this.locale.elements.modal_content.heat_features }}</summary>
				<div v-if="element.molar_volume"><ElementItem :title="this.locale.elements.modal_content.molar_volume" :value="element.molar_volume" :unitFixed="'cm3/mol'" /></div>
				<div v-if="element.atomic_volume"><ElementItem :title="this.locale.elements.modal_content.atomic_volume" :value="element.atomic_volume" :unitKey="'cm3'" /></div>
				<div v-if="element.enthalpy_of_fusion"><ElementItem :title="this.locale.elements.modal_content.enthalpy_of_fusion" :value="element.enthalpy_of_fusion" :unitKey="'kJ/mol'" /></div>
				
				<details>
					<summary class="modalTitle" id="modal_fusion_heat">{{ this.locale.elements.modal_content.fusion_heat }}</summary>
					<div v-if="element.heat_of_fusion_crc"><ElementItem :title="this.locale.elements.modal_content.heat_of_fusion_crc" :value="element.heat_of_fusion_crc" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_fusion_lng"><ElementItem :title="this.locale.elements.modal_content.heat_of_fusion_lng" :value="element.heat_of_fusion_lng" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_fusion_wel"><ElementItem :title="this.locale.elements.modal_content.heat_of_fusion_wel" :value="element.heat_of_fusion_wel" :unitKey="'kJ/mol'" /></div>
				</details>	
				<details>
					<summary class="modalTitle" id="modal_evaporation_heat">{{ this.locale.elements.modal_content.evaporation_heat }}</summary>
					<div v-if="element.evaporation_heat"><ElementItem :title="this.locale.elements.modal_content.evaporation_heat" :value="element.evaporation_heat" /></div>
					<div v-if="element.heat_of_vaporization_crc"><ElementItem :title="this.locale.elements.modal_content.heat_of_vaporization_crc" :value="element.heat_of_vaporization_crc" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_vaporization_lng"><ElementItem :title="this.locale.elements.modal_content.heat_of_vaporization_lng" :value="element.heat_of_vaporization_lng" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_vaporization_wel"><ElementItem :title="this.locale.elements.modal_content.heat_of_vaporization_wel" :value="element.heat_of_vaporization_wel" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_vaporization_zhang"><ElementItem :title="this.locale.elements.modal_content.heat_of_vaporization_zhang" :value="element.heat_of_vaporization_zhang" :unitKey="'kJ/mol'" /></div>
				</details>	<div v-if="element.heat_of_combustion"><ElementItem :title="this.locale.elements.modal_content.heat_of_combustion" :value="element.heat_of_combustion" /></div>
				<div v-if="element.molar_heat"><ElementItem :title="this.locale.elements.modal_content.molar_heat" :value="element.molar_heat" :unitFixed="'J/molK'" /></div>
				<div v-if="element.specific_heat_capacity"><ElementItem :title="this.locale.elements.modal_content.specific_heat_capacity" :value="element.specific_heat_capacity" :unitFixed="'J/gK'" /></div>
				
				<details>
					<summary class="modalTitle" id="modal_specific_heat">{{ this.locale.elements.modal_content.specific_heat }}</summary>
					<div v-if="element.specific_heat_crc"><ElementItem :title="this.locale.elements.modal_content.specific_heat_crc" :value="element.specific_heat_crc" :unitFixed="'J/molK'" /></div>
					<div v-if="element.specific_heat_wel"><ElementItem :title="this.locale.elements.modal_content.specific_heat_wel" :value="element.specific_heat_wel" :unitFixed="'J/molK'" /></div>
					<div v-if="element.specific_heat_lng"><ElementItem :title="this.locale.elements.modal_content.specific_heat_lng" :value="element.specific_heat_lng" :unitFixed="'J/molK'" /></div>
				</details>	<div v-if="element.thermal_conductivity"><ElementItem :title="this.locale.elements.modal_content.thermal_conductivity" :value="element.thermal_conductivity" :unitFixed="'W/m*K'" /></div>
				<div v-if="element.thermal_expansion"><ElementItem :title="this.locale.elements.modal_content.thermal_expansion" :value="element.thermal_expansion" :unitFixed="'m/m*K'" /></div>
				<div v-if="element.adiabatic_index"><ElementItem :title="this.locale.elements.modal_content.adiabatic_index" :value="element.adiabatic_index" /></div>
			</details>

			<!-- Ses Hızı Özellikleri -->
			<details>
				<summary class="modalTitle" id="modal_sound_speed_features">{{ this.locale.elements.modal_content.sound_speed_features }}</summary>
				<div v-if="element.speed_of_sound_longitudinal"><ElementItem :title="this.locale.elements.modal_content.speed_of_sound_longitudinal" :value="element.speed_of_sound_longitudinal" :unitKey="'m/s'" /></div>
				<div v-if="element.speed_of_sound_transversal"><ElementItem :title="this.locale.elements.modal_content.speed_of_sound_transversal" :value="element.speed_of_sound_transversal" :unitKey="'m/s'" /></div>
				<div v-if="element.speed_of_sound_extensional"><ElementItem :title="this.locale.elements.modal_content.speed_of_sound_extensional" :value="element.speed_of_sound_extensional" :unitKey="'m/s'" /></div>
			</details>

			<!-- Elektriksel Direnç -->
			<details>
				<summary class="modalTitle" id="modal_electrical_resistance">{{ this.locale.elements.modal_content.electrical_resistance }}</summary>
				<div v-if="element.electrical_resistivity_80K"><ElementItem :title="this.locale.elements.modal_content.electrical_resistivity_80K" :value="element.electrical_resistivity_80K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_273K"><ElementItem :title="this.locale.elements.modal_content.electrical_resistivity_273K" :value="element.electrical_resistivity_273K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_293K"><ElementItem :title="this.locale.elements.modal_content.electrical_resistivity_293K" :value="element.electrical_resistivity_293K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_298K"><ElementItem :title="this.locale.elements.modal_content.electrical_resistivity_298K" :value="element.electrical_resistivity_298K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_300K"><ElementItem :title="this.locale.elements.modal_content.electrical_resistivity_300K" :value="element.electrical_resistivity_300K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_500K"><ElementItem :title="this.locale.elements.modal_content.electrical_resistivity_500K" :value="element.electrical_resistivity_500K" :unitFixed="'nΩm'" /></div>
			</details>
			
			<!-- Manyetik Özellikler -->
			<details>
				<summary class="modalTitle" id="modal_magnetic_features">{{ this.locale.elements.modal_content.magnetic_features }}</summary>
				<div v-if="element.magnetic_ordering"><ElementItem :title="this.locale.elements.modal_content.magnetic_ordering" :value="element.magnetic_ordering" /></div>
				<div v-if="element.neel_point"><ElementItem :title="this.locale.elements.modal_content.neel_point" :value="element.neel_point" :unitKey="'K'" /></div>
				<div v-if="element.magnetic_susceptibility"><ElementItem :title="this.locale.elements.modal_content.magnetic_susceptibility" :value="element.magnetic_susceptibility" :unitFixed="'m3/kg'" /></div>
			</details>

			<!-- Elastik Özellikler -->
			<details>
				<summary class="modalTitle" id="modal_elastic_features">{{ this.locale.elements.modal_content.elastic_features }}</summary>
				<div v-if="element.shear_modulus"><ElementItem :title="this.locale.elements.modal_content.shear_modulus" :value="element.shear_modulus" :unitFixed="'GPa'" /></div>
				<div v-if="element.bulk_modulus"><ElementItem :title="this.locale.elements.modal_content.bulk_modulus" :value="element.bulk_modulus" :unitFixed="'GPa'" /></div>
				<div v-if="element.poisson_ratio"><ElementItem :title="this.locale.elements.modal_content.poisson_ratio" :value="element.poisson_ratio" /></div>
				<div v-if="element.youngs_modulus"><ElementItem :title="this.locale.elements.modal_content.youngs_modulus" :value="element.youngs_modulus" :unitFixed="'GPa'" /></div>
			</details>

			<!-- Sertlik -->
			<details>
				<summary class="modalTitle" id="modal_toughness">{{ this.locale.elements.modal_content.toughness }}</summary>
				<div v-if="element.mohs_hardness"><ElementItem :title="this.locale.elements.modal_content.mohs_hardness" :value="element.mohs_hardness" /></div>
				<div v-if="element.brinell_hardness"><ElementItem :title="this.locale.elements.modal_content.brinell_hardness" :value="element.brinell_hardness" /></div>
				<div v-if="element.vickers_hardness"><ElementItem :title="this.locale.elements.modal_content.vickers_hardness" :value="element.vickers_hardness" /></div>
			</details>

			<!-- Etimolojik Özellikler -->
			<details>
				<summary class="modalTitle" id="modal_etymological_features">{{ this.locale.elements.modal_content.etymological_features }}</summary>
				<div v-if="element.description"><ElementItem :title="this.locale.elements.modal_content.description" :value="element.description" /></div>
				<div v-if="element.language_of_origin"><ElementItem :title="this.locale.elements.modal_content.language_of_origin" :value="element.language_of_origin" /></div>
				<div v-if="element.origin_of_word"><ElementItem :title="this.locale.elements.modal_content.origin_of_word" :value="element.origin_of_word" /></div>
				<div v-if="element.original_word"><ElementItem :title="this.locale.elements.modal_content.original_word" :value="element.original_word" /></div>
				<div v-if="element.meaning"><ElementItem :title="this.locale.elements.modal_content.meaning" :value="element.meaning" /></div>
				<div v-if="element.symbol_origin"><ElementItem :title="this.locale.elements.modal_content.symbol_origin" :value="element.symbol_origin" /></div>
				<div v-if="element.etymological_description"><ElementItem :title="this.locale.elements.modal_content.etymological_description" :value="element.etymological_description" /></div>
			</details>
			
			<!-- Keşif & İzolasyon Özellikleri -->
			<details id="pagetour_item">
				<summary class="modalTitle" id="modal_discovery_features">{{ this.locale.elements.modal_content.discovery_features }}</summary>
				<div v-if="element.observed_predicted_by"><ElementItem :title="this.locale.elements.modal_content.observed_predicted_by" :value="element.observed_predicted_by" /></div>
				<div v-if="element.observation_or_discovery_year"><ElementItem :title="this.locale.elements.modal_content.observation_or_discovery_year" :value="element.observation_or_discovery_year" /></div>
				<div v-if="element.discovery_location"><ElementItem :title="this.locale.elements.modal_content.discovery_location" :value="element.discovery_location" /></div>
				<div v-if="element.isolated_sampled_by"><ElementItem :title="this.locale.elements.modal_content.isolated_sampled_by" :value="element.isolated_sampled_by" /></div>
				<div v-if="element.isolation_sample_year"><ElementItem :title="this.locale.elements.modal_content.isolation_sample_year" :value="element.isolation_sample_year" /></div>
				<div v-if="element.named_by"><ElementItem :title="this.locale.elements.modal_content.named_by" :value="element.named_by" /></div>
			</details>
			
			<!-- Üretim & Kullanım -->
			<details>
				<summary class="modalTitle" id="modal_production_use">{{ this.locale.elements.modal_content.production_use }}</summary>
				<div v-if="element.sources"><ElementItem :title="this.locale.elements.modal_content.sources" :value="element.sources" /></div>
				<div v-if="element.uses"><ElementItem :title="this.locale.elements.modal_content.uses" :value="element.uses" /></div>
			</details>
			
			<!-- Radyoaktif Özellikler -->
			<details>
				<summary class="modalTitle" id="modal_radioactive_properties">{{ this.locale.elements.modal_content.radioactive_properties }}</summary>
				<div v-if="element.is_radioactive"><ElementItem :title="this.locale.elements.modal_content.is_radioactive" :value="element.is_radioactive" /></div>
				<div v-if="element.decay_mode"><ElementItem :title="this.locale.elements.modal_content.decay_mode" :value="element.decay_mode" /></div>
				<div v-if="element.half_life"><ElementItem :title="this.locale.elements.modal_content.half_life" :value="element.half_life" /></div>
				<div v-if="element.lifetime"><ElementItem :title="this.locale.elements.modal_content.lifetime" :value="element.lifetime" /></div>
				<div v-if="element.neutron_mass_absorption"><ElementItem :title="this.locale.elements.modal_content.neutron_mass_absorption" :value="element.neutron_mass_absorption" /></div>
				<div v-if="element.neutron_cross_section"><ElementItem :title="this.locale.elements.modal_content.neutron_cross_section" :value="element.neutron_cross_section" /></div>
				<div v-if="element.proton_affinity"><ElementItem :title="this.locale.elements.modal_content.proton_affinity" :value="element.proton_affinity" /></div>
			</details>
			
			<!-- Elektron İlgisi -->
			<details>
				<summary class="modalTitle" id="modal_electron_affinity">{{ this.locale.elements.modal_content.electron_affinity }}</summary>
				<div v-if="element.electron_affinity_eV"><ElementItem :title="this.locale.elements.modal_content.electron_affinity_eV" :value="element.electron_affinity_eV" :unitFixed="'eV'" /></div>
				<div v-if="element.electron_affinity_kJmol"><ElementItem :title="this.locale.elements.modal_content.electron_affinity_kJmol" :value="element.electron_affinity_kJmol" :unitFixed="'kj/mol'" /></div>
				<div v-if="element.electronegativity_pauling"><ElementItem :title="this.locale.elements.modal_content.electronegativity_pauling" :value="element.electronegativity_pauling" :unitFixed="'pauling'" /></div>
				<div v-if="element.electronegativity_allen"><ElementItem :title="this.locale.elements.modal_content.electronegativity_allen" :value="element.electronegativity_allen" :unitFixed="'allen'" /></div>
				<div v-if="element.electronegativity_ghosh"><ElementItem :title="this.locale.elements.modal_content.electronegativity_ghosh" :value="element.electronegativity_ghosh" :unitFixed="'gosh'" /></div>
			</details>
			
			<!-- Dipol Kutuplanabilirliği -->
			<details>
				<summary class="modalTitle" id="modal_dipole_polarity">{{ this.locale.elements.modal_content.dipole_polarity }}</summary>
				<div v-if="element.dipole_polarizability"><ElementItem :title="this.locale.elements.modal_content.dipole_polarizability" :value="element.dipole_polarizability" /></div>
				<div v-if="element.dipole_polarizability_unc"><ElementItem :title="this.locale.elements.modal_content.dipole_polarizability_unc" :value="element.dipole_polarizability_unc" /></div>
				<div v-if="element.c6_gb"><ElementItem :title="this.locale.elements.modal_content.c6_gb" :value="element.c6_gb" /></div>
				<div v-if="element.c6_coeff"><ElementItem :title="this.locale.elements.modal_content.c6_coeff" :value="element.c6_coeff" /></div>
			</details>
			
			<!-- Kafes Özellikleri -->
			<details>
				<summary class="modalTitle" id="modal_cage_features">{{ this.locale.elements.modal_content.cage_features }}</summary>
				<div v-if="element.lattice_constant_internal_default_radii"><ElementItem :title="this.locale.elements.modal_content.lattice_constant_internal_default_radii" :value="element.lattice_constant_internal_default_radii" /></div>
				<div v-if="element.lattice_constant"><ElementItem :title="this.locale.elements.modal_content.lattice_constant" :value="element.lattice_constant" /></div>
				<div v-if="element.lattice_structure"><ElementItem :title="this.locale.elements.modal_content.lattice_structure" :value="element.lattice_structure" /></div>
				<div v-if="element.lattice_angles"><ElementItem :title="this.locale.elements.modal_content.lattice_angles" :value="element.lattice_angles" /></div>

			</details>
			
			<!-- Elektron & Kuantum Özellikleri -->
			<details>
				<summary class="modalTitle" id="modal_electron_quantum_properties">{{ this.locale.elements.modal_content.electron_quantum_properties }}</summary>
				<div v-if="element.oxidation_states"><ElementItem :title="this.locale.elements.modal_content.oxidation_states" :value="element.oxidation_states" /></div>
				<div v-if="element.electron_configuration"><ElementItem :title="this.locale.elements.modal_content.electron_configuration" :value="element.electron_configuration" /></div>
				<div v-if="element.quantum_number"><ElementItem :title="this.locale.elements.modal_content.quantum_number" :value="element.quantum_number" /></div>
				<div v-if="element.electron_configuration_semantic"><ElementItem :title="this.locale.elements.modal_content.electron_configuration_semantic" :value="element.electron_configuration_semantic" /></div>
				
				<details>
						<summary class="modalTitle" id="modal_shell">{{ this.locale.elements.modal_content.shell }}</summary>
						<div v-for="i in 7" :key="i">
								<div v-if="element[`shells-${i-1}`] !== 'NULL'"> 
									<ElementItem :title="this.locale.elements.modal_content.shell + ' ' + String(i-1) + ':'" :value="element[`shells-${i-1}`]" />
								</div>
						</div>
				</details>
					
				<div v-if="element[`ionization_energies-0`] !== ''">
					<details>
							<summary class="modalTitle" id="modal_ionization_energy">{{ this.locale.elements.modal_content.ionization_energy }}</summary>
					<div v-for="i in 29" :key="i">
							<div v-if="element[`ionization_energies-${i-1}`]"> 
									<ElementItem :title="this.locale.elements.modal_content.ionization_energy + ' ' + String(i-1) + ':'" :value="element[`ionization_energies-${i-1}`]" />
							</div>
					</div>
					</details>
				</div>
			</details>
		</div>

		<!-- Evrim Ağacı Makalesi -->
		<div class="vhtml" v-else>
			<img :src="this.eacontent.image"/>
			<div v-html="this.eacontent.html"></div>
			<div v-show="this.eacontent.references.length !== 0">
				<h2>Kaynaklar</h2>
				<div v-for="[key, reference] of Object.entries(this.eacontent.references)" v-bind:key="key">
					<div style="float: left; margin-right: .5vw;">{{ key }}:</div>
					<div style="margin-bottom: .5vw;" v-html="formatReference(reference)"></div>
				</div>
			</div>
		</div>

	</div>
	<div :class="{
		'overlay hidden': toggleModal === true,
		'overlay': toggleModal === false
	}">
	</div>
	<button class="close-modal flex-center" id="modalExit">&times;</button>

	<!-- &times; ≡ -->
	
</template>

<script>
	import ElementItem from './ElementItem.vue';
	import infoBar from '../addons/infoBar.vue';
	import socialButtons from '../addons/socialButtons.vue';
	// eslint-disable-next-line no-unused-vars
	import { nextTick } from 'vue'

	export default {
		components: { ElementItem, infoBar, socialButtons },
		props: {
			element: Object,
			toggleModal: Boolean,
			locale: Object
		},
		data() {
			return {
				eaContentView: false,
				eacontent: {
					title: '',
					subtitle: '',
					html: '',
					url: '',
					image: '',
					references: ''
				},
				// lang: this.locale.elements.modal_content,
				categoryColors: {
					'alkaline_metals': '#ffaf80',          // turuncu
					'alkaline_metals_shade': '#ef9851',

					'alkaline_earth_metal': '#80ff8e',   // yeşi
					'alkaline_earth_metal_shade': '#44e053',

					'transition_metal': '#ffef80',          // sarı
					'transition_metal_shade': '#c1b45f',

					'post_transition_metal': '#80d5ff',  // mavi
					'post_transition_metal_shade': '#52c5fe',

					'metalloid': '#8095ff',               // slate
					'metalloid_shade': '#526efe',

					'reactive_nonmetal': '#ff80d4',        // pembe
					'reactive_nonmetal_shade': '#fe52c4',

					'noble_gas': '#aa80ff',               // lila
					'noble_gas_shade': '#8b52fe',

					'lanthanides': '#c3ff80',              // yeşil
					'lanthanides_shade': '#adfe52',

					'actinides': '#80fffc',               // teal
					'actinides_shade': '#52fefa',

					'unknown': '#fff',               // beyaz
					'unknown_shade': '#e0e0e0'
				},
				misc: {
					spectrum: String,
				}
			}
		},
		methods: {
			displayTempature(input) {
				if (typeof input !== 'number') return '-';
				const value = Number(input)
				return `${+value.toFixed(2)}K (${+(value- 273.15).toFixed(2)}C°)`;
			},
			// async displayContent(contentID) {
			// 	this.eaContentView = !this.eaContentView
			// 	console.log(contentID);
			// 	// fetch(`/content/${contentID}.json`)
			// 	await fetch(`/content/9846.json`)
			// 		.then(r => r.json())
			// 		.then(data => {
			// 		const CONTENT = data['content']
			// 		this.eacontent.title            = CONTENT['title'];
			// 		this.eacontent.subtitle         = CONTENT['subtitle'];
			// 		this.eacontent.html             = CONTENT['html'];
			// 		this.eacontent.url              = CONTENT['url'];
			// 		this.eacontent.image            = CONTENT['image'];
			// 		this.eacontent.references       = CONTENT['references'];
			// 		},
			// 	response => {
			// 	console.log('Error loading json:', response)
			// 	});
			// },
			formatReference(ref) {
				return ref.replace('Alındığı Yer:', '<br />Alındığı Yer:')
			},
			modalSearching($event) {
				const INPUT = $event.target.value.toLowerCase()

				document.querySelectorAll('details').forEach(function(detail) {
					try {
						detail.childNodes.forEach(function(child) {
							const PARENT = child.parentElement
							PARENT.classList.remove('inactive')
							if (PARENT.textContent.toLowerCase().includes(INPUT)) {
								PARENT.classList.remove('inactive')
							}
							else {
								PARENT.classList.add('inactive')
							}
						})
					} catch (err) {console.log(err)}
				})
			},
			// getImage(symbol) {
			// 	return require('../resources/img/misc/spectrum/' + symbol + '_hd.jpg')
			// },
			handle(content) {
				return content === 'NULL' || content === "" ? null : content
			},
			imagezoom($event) {
				const target = $event.target
				if (!target.src) { return }

				target.src = this.misc.spectrum
				
				if (!target.classList.contains('fullscreen')) {
					target.classList.add('fullscreen')
					// target.style.outline = '100vh solid black'
					// document.querySelector('.fullscreen-overlay').classList.remove('inactive')
				}
				else {
					target.classList.remove('fullscreen')
					// target.style.outline = "unset"
					// document.querySelector('.fullscreen-overlay').classList.add('inactive')
				}

			}
		},
		beforeMount: async function () {
			// this.$nextTick(function () {
				await nextTick()

				try {
					this.misc.spectrum = require('../resources/img/misc/spectrum/' + this.element.symbol + '_hd.jpg')
				}catch {this.misc.spectrum = null}
			// })
		}
	}
</script>
		
<style lang="scss" scoped>
	// .vhtml {
	// 	::v-deep {
	// 		text-align: left;
	// 		img {
	// 			margin-top: 1vw;
	// 			align-self: center;
	// 		}
	// 		h2, h3 {
	// 			margin-top: 1vw;
	// 			margin-bottom: 1vw;
	// 			color: #e5bb09;
	// 		}
	// 		h3 {
	// 			&::before {
	// 				content: '• ';
	// 			}
	// 		}
	// 		li {
	// 			list-style: none;
	// 			&::before {
	// 				content: '• ';
	// 			}
	// 		}
	// 	}
	// }
	.text-left {
		text-align: left;
	}
	.hidden {
		display: none;
	}
	.muted {
		opacity: .5;
	}
	.flex-between {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.align {
		justify-self: center;
	}
	.spectrum {
		// transition: all 100ms linear;
		margin-top: .5rem;
		span {
			opacity: .5;
			margin-left: .2rem;
			text-align: left;
			font-size: 1rem;
		}
		img {
			margin-top: .5rem;
			&:hover {
				cursor: pointer;
			}
			border-radius: .3rem;
		}
		
		.fullscreen {
			z-index: 9999;
			position: fixed;
			margin: 0 auto;
			width: 90%;
			height: 20%;
			top: 40%;
			left: 5%;
			// background-color: rgb(0, 0, 0);
			box-shadow: 0 0 10px rgba($color: #000, $alpha: .5);
			border-radius: .5rem;
			img {
				width: 100%;
				height: 2rem;
			}
		}

	}

	#modal_link {
		margin-left: .2rem;
	}
	img {
		width: 100%;
	}
	p {
		position: relative;
		margin: 0;
		text-align: right;
	}
	details > summary {
		cursor: pointer;
		list-style-type: '✛ ';
		// list-style-type: '⚌ ';
		// ☰

    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
	}

	details {
		width: 100%;
		padding: .3rem;
		background-color: #232a38;
		border: 1px solid rgba($color: #fff, $alpha: .1);
		border-radius: .3rem;
		margin: .5rem 0;

		summary {
			padding: .5rem .3rem;
		}
	}
	.details {
		// list-style-type: '⚋ ';
		list-style-type: '✛ ';
	}

	details[open] > summary {
		// list-style-type: '⚊ ';
		text-align: center;
		list-style-type: '';
		background-color: #343f54;
		border-radius: .3rem;
		padding: .5rem .3rem;
		color: #e5bb09;
	}

	.modal {
		position : fixed;
		top: 0; left: 0;
		width: 25rem; height: 100vh;
		background: rgba($color: #1d232f, $alpha: 1);
		// background-image: linear-gradient(136deg, #202631 0%, #1d232f 100%);
		padding: 1rem;
		padding-bottom: 10rem;
		
		z-index: 2;
		overflow:auto;
	}
	.close-modal {
		position: fixed;
		top:.9rem;
		left: 24.8rem;
		font-size:2rem;
		color:#d6d6d6;
		cursor: pointer;
		border: none;
		background: #1d232f;
		padding: .4rem .4rem;
		border-radius: .2rem;
		// filter: drop-shadow(2px 2px 5px black);
		z-index: 1;
		> * {
			margin-top: 2rem;
		}
	}
	@media screen and (max-width: 700px) {
		.modal {
			position : fixed;
			width: 100%; height: 100%;
			padding: 2rem;
			padding-bottom: 3rem;
			z-index: 2;
			overflow: scroll;
		}
		
		.close-modal {
			position : fixed;
			left: -.05rem;
			bottom: 0;
			top:unset;
			width: 100%;
			z-index: 10;
			padding: 0 1rem;
			backdrop-filter: blur(5px);
			filter: opacity(.7);
			background: #1c222e;
			background-image: linear-gradient(0deg, #1c222e 10%, #1c222e 70%);
		}
	}

	.overlay {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 120vw;
		height: 120vh;
		background-color: rgba(0, 0, 0, .4);
		// backdrop-filter: blur(.05vw);
		z-index: 1;
	}
	.essentials {
		position: relative;
		padding: .5rem;
		border: 1px solid rgba($color: #fff, $alpha: .1);
		border-radius: .3rem;
		margin: 0 0 1rem 0;

		.modalSymbol {
			position:absolute;
			display: flex;
			background: #272f3f;
			border-radius: .3rem;
			color: black;
			top: 1rem; right: 1rem;
			width: 5rem; height: 5rem;
			h2 {
				padding: .3rem;
				font-size: 2.3rem;
				align-self: center;
				text-align: center;
				width: 5rem;
			}
		}
	}
	.moreInfoBtn {
		background-color: #232a38;
		padding: .5rem;
		font-size: 1rem;
		text-align: center;
		margin: 0 0 1rem 0;
		border-radius: .3rem;

		&:hover {
			a {
				color: white;
			}
			cursor: pointer;
		}
	}

	.modal_search {
		background-color: #1c222e;
		text-align: center;
		margin: 0 0 1rem 0;
		border-radius: .3rem;

		height: 3.3rem;

		#modalSearch {
			font-size: 1rem;
			width: 100%;
			height: 100%;
		}

		&:hover {
			a {
				color: white;
			}
			cursor: pointer;
		}
	}

	/* width */
	::-webkit-scrollbar {
		width: 0;
	}

	/* Track */
	::-webkit-scrollbar-track {
		display: none;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		display: none;
	}
</style>
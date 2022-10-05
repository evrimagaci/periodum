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
		<div class="search">
			<input type="search" name="search" id="modalSearch" placeholder="Başlık, alt başlık, içerik ara..." autocomplete="off" @input="modalSearching($event)">
		</div>
		<!-- Element Bilgileri -->
		<div v-if="!eaContentView" class="text-left">
			<div class="essentials">
				<!-- :style="{'border': `1px solid ${categoryColors[element.category] || '#fff'}`}" -->
				<div v-if="element.name_tr !== ''"><ElementItem title="Türkçe ismi" :value="element.name_tr" /></div>
				<div v-if="element.name_en !== ''"><ElementItem title="İngilizce ismi" :value="element.name_en" /></div>
				<!-- <div v-if="element.symbol !== ''"><ElementItem title="Sembol" :value="element.symbol" /></div> -->
				<div v-if="element.symbol !== ''"><div style="z-index: -2"
					:style="{
									'background-image': `linear-gradient(127deg, ${categoryColors[element.category]} 46%, ${categoryColors[element.category+'_shade']} 100%)`,
									'box-shadow': '0 0 5px ' + categoryColors[element.category]}"
					class="modalSymbol"><h2>{{element.symbol}}</h2></div>
				</div>
				<div v-if="element.number !== ''"><ElementItem title="Atom Numarası" :value="element.number" /></div>
				<div v-if="element.gas_phase !== ''"><ElementItem title="Gaz Fazı" :value="element.gas_phase" /></div>
				<div v-if="element.allotrope_names !== ''"><ElementItem title="Allotrop İsimleri" :value="element.allotrope_names" /></div>
				<div v-if="element.appearance !== ''"><ElementItem title="Görünüm" :value="element.appearance" /></div>
				<div v-if="element.refractive_index !== ''"><ElementItem title="Kırılma İndisi" :value="element.refractive_index" /></div>
				<div v-if="element.phase_at_stp !== ''"><ElementItem title="Faz (NŞA)" :value="element.phase_at_stp" /></div>
			</div>
			

			<!-- Tanımlayıcı Numaralar -->
			<details>
				<summary>Tanımlayıcı Numaralar</summary>
				<div v-if="element.cas_number !== ''"><ElementItem title="CAS Numarası" :value="element.cas_number" /></div>
				<div v-if="element.cid_number !== ''"><ElementItem title="CID Numarası" :value="element.cid_number" /></div>
				<div v-if="element.dot_number !== ''"><ElementItem title="DOT Numarası" :value="element.dot_number" /></div>
				<div v-if="element.rtecs_number !== ''"><ElementItem title="RTECS Numarası" :value="element.rtecs_number" /></div>
				<div v-if="element.mendeleev_number !== ''"><ElementItem title="Mendeleev Numarası" :value="element.mendeleev_number" /></div>
			</details>

			<!-- Kütle -->
			<details>
				<summary>Kütle</summary>
				<div v-if="element.atomic_mass !== ''"><ElementItem title="Atomik Kütle" :value="element.atomic_mass" :unitKey="'Da'" /></div>
				<div v-if="element.atomic_mass_uncertainty !== ''"><ElementItem title="Atomik Kütle Belirsizliği" :value="element.atomic_mass_uncertainty" :unitKey="'Da'" /></div>
			</details>
			
			<!-- Koordinatlar -->
			<details>
				<summary>Koordinatlar</summary>
				<div v-if="element.xpos !== ''"><ElementItem title="X Pozisyonu" :value="element.xpos" /></div>
				<div v-if="element.ypos !== ''"><ElementItem title="Y Pozisyonu" :value="element.ypos" /></div>
				<div v-if="element.period !== ''"><ElementItem title="Periyot" :value="element.period" /></div>
				<div v-if="element.group !== ''"><ElementItem title="Grup" :value="element.group" /></div>
			</details>
			
			<!-- Sınıflandırma -->
			<details>
				<summary>Sınıflandırma</summary>
				<div v-if="element.block !== ''"><ElementItem title="Blok" :value="element.block" /></div>
				<div v-if="element.category !== ''"><ElementItem title="Kategori" :value="element.category" /></div>
				<div v-if="element.electrical_type !== ''"><ElementItem title="Elektrik Tipi" :value="element.electrical_type" /></div>
				<div v-if="element.geochemical_class !== ''"><ElementItem title="Jeokimyasal Sınıf" :value="element.geochemical_class" /></div>
				<div v-if="element.goldschmidt_class !== ''"><ElementItem title="Goldschmidt Sınıfı" :value="element.goldschmidt_class" /></div>
			</details>

			<!-- Bulunma Sıklığı -->
			<details>
				<summary>Bulunma Sıklığı</summary>
				<div v-if="element.abundance_urban_soil !== ''"><ElementItem title="Şehir Toprağında" :value="element.abundance_urban_soil" :unitFixed="'kg/kg'" /></div>
				<div v-if="element.abundance_seawater_w1 !== ''"><ElementItem title="Deniz Suyunda" :value="element.abundance_seawater_w1" :unitFixed="'kg/L'" /></div>
				<div v-if="element.abundance_sun_s1 !== ''"><ElementItem title="Güneşte" :value="element.abundance_sun_s1" :unitFixed="'silisyuma göre mol oranı'" /></div>
				<div v-if="element.abundance_in_earth_crust_c1 !== ''"><ElementItem title="Dünya Kabuğunda" :value="element.abundance_in_earth_crust_c1" :unitFixed="'kg/kg'" /></div>
				<div v-if="element.abundance_humans !== ''"><ElementItem title="İnsan Vücudunda" :value="element.abundance_humans" :unitFixed="'%'" /></div>
				<div v-if="element.abundance_solar_system_y1 !== ''"><ElementItem title="Güneş Sisteminde" :value="element.abundance_solar_system_y1" :unitFixed="'silisyuma göre mol oranı'" /></div>
				<div v-if="element.abundance_meteorite !== ''"><ElementItem title="Meteoritlerde" :value="element.abundance_meteorite" :unitFixed="'%'" /></div> 
			</details>
			
			<!-- Renk -->
			<details>
				<summary>Renk</summary>
				<div v-if="element.jmol_color !== ''"><ElementItem title="Jmol" :value="'⬤ #' + element.jmol_color" :color="'#' + element.jmol_color" /></div>
				<div v-if="element.molcas_gv_color !== ''"><ElementItem title="MOLCAS GV" :value="'⬤ #' + element.molcas_gv_color" :color="'#' + element.molcas_gv_color" /></div>
				<div v-if="element.cpk_color !== ''"><ElementItem title="CPK" :value="'⬤ #' + element.cpk_color" :color="'#' + element.cpk_color" /></div>
			</details>
			
			<!-- Atomik Yarıçap -->
			<details>
				<summary>Atomik Yarıçap</summary>
				<div v-if="element.atomic_radius_empirical !== ''"><ElementItem title="Deneysel Ölçüm" :value="element.atomic_radius_empirical" /></div>
				<div v-if="element.atomic_radius_calculated !== ''"><ElementItem title="Hesaplanmış Ölçüm" :value="element.atomic_radius_calculated" /></div>
				<div v-if="element.atomic_radius_vanderwaals !== ''"><ElementItem title="van der Waals Yarıçapı" :value="element.atomic_radius_vanderwaals" /></div>
				<div v-if="element.vdw_radius_bondi !== ''"><ElementItem title="Bondi" :value="element.vdw_radius_bondi" /></div>
				<div v-if="element.vdw_radius_rt !== ''"><ElementItem title="Oda Sıcaklığında" :value="element.vdw_radius_rt" /></div>
				<div v-if="element.atomic_radius_rahm !== ''"><ElementItem title="Rahm" :value="element.atomic_radius_rahm" /></div>
				<div v-if="element.vdw_radius_dreiding !== ''"><ElementItem title="Dreiding" :value="element.vdw_radius_dreiding" /></div>
				<div v-if="element.vdw_radius_uff !== ''"><ElementItem title="Uff" :value="element.vdw_radius_uff" /></div>
				<div v-if="element.vdw_radius_mm3 !== ''"><ElementItem title="mm3" :value="element.vdw_radius_mm3" /></div>
				<div v-if="element.vdw_radius_alvarez !== ''"><ElementItem title="Alvarez" :value="element.vdw_radius_alvarez" /></div>
				<div v-if="element.covalent_radius_bragg !== ''"><ElementItem title="Kovalent (Bragg)" :value="element.covalent_radius_bragg" /></div>
				<div v-if="element.atomic_radius_covalent_triple_bond !== ''"><ElementItem title="Kovalent (Üçlü Bağ)" :value="element.atomic_radius_covalent_triple_bond" /></div>
				<div v-if="element.atomic_radius_covalent_single_bond !== ''"><ElementItem title="Kovalent (Tek Bağ)" :value="element.atomic_radius_covalent_single_bond" /></div>
				<div v-if="element.covalent_radius_cordero !== ''"><ElementItem title="Kovalent (Cordero)" :value="element.covalent_radius_cordero" /></div>
				<div v-if="element.covalent_radius_pyykko !== ''"><ElementItem title="Kovalent (Pyykko)" :value="element.covalent_radius_pyykko" /></div>
				<div v-if="element.covalent_radius_pyykko_double !== ''"><ElementItem title="Kovalent (Pyykko, Çift)" :value="element.covalent_radius_pyykko_double" /></div>
				<div v-if="element.covalent_radius_pyykko_triple !== ''"><ElementItem title="Kovalent (Pyykko, Üçlü)" :value="element.covalent_radius_pyykko_triple" /></div>
				<div v-if="element.metallic_radius_mendeleev !== ''"><ElementItem title="Mendeleev" :value="element.metallic_radius_mendeleev" /></div>
				<div v-if="element.metallic_radius_c12 !== ''"><ElementItem title="C12" :value="element.metallic_radius_c12" /></div>
				<div v-if="element.atomic_radius_metallic !== ''"><ElementItem title="Metalik" :value="element.atomic_radius_metallic" /></div>
			</details>
			
			<!-- Sıcaklık Özellikleri -->
			<details>
				<summary>Sıcaklık Özellikleri</summary>
				<div v-if="element.melt_use !== ''"><ElementItem title="Erime/Donma" :value="element.melt_use" :unitKey="'K'" /></div>
				<div v-if="element.boil_use !== ''"><ElementItem title="Kaynama/Yoğunlaşma" :value="element.boil_use" :unitKey="'K'" /></div>
				<div v-if="element.critical_temperature !== ''"><ElementItem title="Kritik Sıcaklık" :value="element.critical_temperature" :unitKey="'K'" /></div>
				<div v-if="element.flashpoint !== ''"><ElementItem title="Tutuşma Noktası" :value="element.flashpoint" :unitKey="'K'" /></div>
				<div v-if="element.autoignition_point !== ''"><ElementItem title="Ototutuşma Noktası" :value="element.autoignition_point" :unitKey="'K'" /></div>
				<div v-if="element.critical_pressure !== ''"><ElementItem title="Kritik Basınç" :value="element.critical_pressure" :unitKey="'MPa'" /></div>
			</details>

			<!-- Yoğunluk Özellikleri -->
			<details>
				<summary>Yoğunluk Özellikleri</summary>
				
				<details>
					<summary class="details">Katı Yoğunluğu</summary>
					<div v-if="element.density_solid_WEL !== ''"><ElementItem title="Katı Yoğunluğu (WEL)" :value="element.density_solid_WEL" :unitKey="'kg/m3'" /></div>
					<div v-if="element.density_solid_LNG !== ''"><ElementItem title="Katı Yoğunluğu (LNG)" :value="element.density_solid_LNG" :unitKey="'kg/m3'" /></div>
					<div v-if="element.density_solid_CRC !== ''"><ElementItem title="Katı Yoğunluğu (CRC)" :value="element.density_solid_CRC" :unitKey="'kg/m3'" /></div>
				</details>	<div v-if="element.density_rt !== ''"><ElementItem title="Yoğunluk (NŞA)" :value="element.density_rt" :unitKey="'kg/m3'" /></div>
				<div v-if="element.density_liquid_cr2 !== ''"><ElementItem title="Sıvı Yoğunluğu" :value="element.density_liquid_cr2" :unitKey="'kg/m3'" /></div>
				<div v-if="element.density_gas !== ''"><ElementItem title="Gaz Yoğunluğu" :value="element.density_gas" :unitKey="'kg/m3'" /></div>
			</details>
			
			<!-- Isı Özellikleri -->
			<details>
				<summary>Isı Özellikleri</summary>
				<div v-if="element.molar_volume !== ''"><ElementItem title="Molar Hacim" :value="element.molar_volume" :unitFixed="'cm3/mol'" /></div>
				<div v-if="element.atomic_volume !== ''"><ElementItem title="Atomik Hacim" :value="element.atomic_volume" :unitKey="'cm3'" /></div>
				<div v-if="element.enthalpy_of_fusion !== ''"><ElementItem title="Füzyon Entalpisi" :value="element.enthalpy_of_fusion" :unitKey="'kJ/mol'" /></div>
				
				<details>
					<summary class="details">Füzyon Isısı</summary>
					<div v-if="element.heat_of_fusion_crc !== ''"><ElementItem title="— Füzyon Isısı (CRC)" :value="element.heat_of_fusion_crc" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_fusion_lng !== ''"><ElementItem title="— Füzyon Isısı (LNG)" :value="element.heat_of_fusion_lng" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_fusion_wel !== ''"><ElementItem title="— Füzyon Isısı (WEL)" :value="element.heat_of_fusion_wel" :unitKey="'kJ/mol'" /></div>
				</details>	
				<details>
					<summary class="details">Buharlaşma Isısı</summary>
					<div v-if="element.evaporation_heat !== ''"><ElementItem title="— Buharlaşma Isısı" :value="element.evaporation_heat" /></div>
					<div v-if="element.heat_of_vaporization_crc !== ''"><ElementItem title="— Buharlaşma Isısı (CRC)" :value="element.heat_of_vaporization_crc" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_vaporization_lng !== ''"><ElementItem title="— Buharlaşma Isısı (LNG)" :value="element.heat_of_vaporization_lng" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_vaporization_wel !== ''"><ElementItem title="— Buharlaşma Isısı (WEL)" :value="element.heat_of_vaporization_wel" :unitKey="'kJ/mol'" /></div>
					<div v-if="element.heat_of_vaporization_zhang !== ''"><ElementItem title="— Buharlaşma Isısı (Zhang)" :value="element.heat_of_vaporization_zhang" :unitKey="'kJ/mol'" /></div>
				</details>	<div v-if="element.heat_of_combustion !== ''"><ElementItem title="Yanma Isısı" :value="element.heat_of_combustion" /></div>
				<div v-if="element.molar_heat !== ''"><ElementItem title="Molar Isısı" :value="element.molar_heat" :unitFixed="'J/molK'" /></div>
				<div v-if="element.specific_heat_capacity !== ''"><ElementItem title="Spesifik Isı Kapasitesi" :value="element.specific_heat_capacity" :unitFixed="'J/gK'" /></div>
				
				<details>
					<summary class="details">Spesifik Isı</summary>
					<div v-if="element.specific_heat_crc !== ''"><ElementItem title="— Spesifik Isı (CRC)" :value="element.specific_heat_crc" :unitFixed="'J/molK'" /></div>
					<div v-if="element.specific_heat_wel !== ''"><ElementItem title="— Spesifik Isı (WEL)" :value="element.specific_heat_wel" :unitFixed="'J/molK'" /></div>
					<div v-if="element.specific_heat_lng !== ''"><ElementItem title="— Spesifik Isı (LNG)" :value="element.specific_heat_lng" :unitFixed="'J/molK'" /></div>
				</details>	<div v-if="element.thermal_conductivity !== ''"><ElementItem title="Termal İletkenlik" :value="element.thermal_conductivity" :unitFixed="'W/m*K'" /></div>
				<div v-if="element.thermal_expansion !== ''"><ElementItem title="Termal Genleşme" :value="element.thermal_expansion" :unitFixed="'m/m*K'" /></div>
				<div v-if="element.adiabatic_index !== ''"><ElementItem title="Adiyabatik İndis" :value="element.adiabatic_index" /></div>
			</details>

			<!-- Ses Hızı Özellikleri -->
			<details>
				<summary>Ses Hızı Özellikleri</summary>
				<div v-if="element.speed_of_sound_longitudinal !== ''"><ElementItem title="Uzunlamasına" :value="element.speed_of_sound_longitudinal" :unitKey="'m/s'" /></div>
				<div v-if="element.speed_of_sound_transversal !== ''"><ElementItem title="Enine" :value="element.speed_of_sound_transversal" :unitKey="'m/s'" /></div>
				<div v-if="element.speed_of_sound_extensional !== ''"><ElementItem title="Ekstensiyonel" :value="element.speed_of_sound_extensional" :unitKey="'m/s'" /></div>
			</details>

			<!-- Elektriksel Direnç -->
			<details>
				<summary>Elektriksel Direnç</summary>
				<div v-if="element.electrical_resistivity_80K !== ''"><ElementItem title="80K" :value="element.electrical_resistivity_80K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_273K !== ''"><ElementItem title="273K" :value="element.electrical_resistivity_273K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_293K !== ''"><ElementItem title="293K" :value="element.electrical_resistivity_293K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_298K !== ''"><ElementItem title="298K" :value="element.electrical_resistivity_298K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_300K !== ''"><ElementItem title="300K" :value="element.electrical_resistivity_300K" :unitFixed="'nΩm'" /></div>
				<div v-if="element.electrical_resistivity_500K !== ''"><ElementItem title="500K" :value="element.electrical_resistivity_500K" :unitFixed="'nΩm'" /></div>
			</details>
			
			<!-- Manyetik Özellikler -->
			<details>
				<summary>Manyetik Özellikler</summary>
				<div v-if="element.magnetic_ordering !== ''"><ElementItem title="Manyetik Sıralanma" :value="element.magnetic_ordering" /></div>
				<div v-if="element.neel_point !== ''"><ElementItem title="Neel Noktası" :value="element.neel_point" :unitKey="'K'" /></div>
				<div v-if="element.magnetic_susceptibility !== ''"><ElementItem title="Manyetik Duyarlılık" :value="element.magnetic_susceptibility" :unitFixed="'m3/kg'" /></div>
			</details>

			<!-- Elastik Özellikler -->
			<details>
				<summary>Elastik Özellikler</summary>
				<div v-if="element.shear_modulus !== ''"><ElementItem title="Kesme Modülü" :value="element.shear_modulus" :unitFixed="'GPa'" /></div>
				<div v-if="element.bulk_modulus !== ''"><ElementItem title="Esneklik Modülü" :value="element.bulk_modulus" :unitFixed="'GPa'" /></div>
				<div v-if="element.poisson_ratio !== ''"><ElementItem title="Poisson Oranı" :value="element.poisson_ratio" /></div>
				<div v-if="element.youngs_modulus !== ''"><ElementItem title="Young Modülü" :value="element.youngs_modulus" :unitFixed="'GPa'" /></div>
			</details>

			<!-- Sertlik -->
			<details>
				<summary>Sertlik</summary>
				<div v-if="element.mohs_hardness !== ''"><ElementItem title="Mohs Sertliği" :value="element.mohs_hardness" /></div>
				<div v-if="element.brinell_hardness !== ''"><ElementItem title="Brinell Sertliği" :value="element.brinell_hardness" /></div>
				<div v-if="element.vickers_hardness !== ''"><ElementItem title="Vickers Sertliği" :value="element.vickers_hardness" /></div>
			</details>

			<!-- Etimolojik Özellikler -->
			<details>
				<summary>Etimolojik Özellikler</summary>
				<div v-if="element.description !== ''"><ElementItem title="Tanım" :value="element.description" /></div>
				<div v-if="element.language_of_origin !== ''"><ElementItem title="Orijinal Kelime Dili" :value="element.language_of_origin" /></div>
				<div v-if="element.origin_of_word !== ''"><ElementItem title="Kelimenin Kökeni" :value="element.origin_of_word" /></div>
				<div v-if="element.original_word !== ''"><ElementItem title="Orijinal Kelime" :value="element.original_word" /></div>
				<div v-if="element.meaning !== ''"><ElementItem title="Anlam" :value="element.meaning" /></div>
				<div v-if="element.symbol_origin !== ''"><ElementItem title="Sembolün Kökeni" :value="element.symbol_origin" /></div>
				<div v-if="element.etymological_description !== ''"><ElementItem title="Etimolojik Tanım" :value="element.etymological_description" /></div>
			</details>
			
			<!-- Keşif & İzolasyon Özellikleri -->
			<details id="pagetour_item">
				<summary>Keşif & İzolasyon Özellikleri</summary>
				<div v-if="element.observed_predicted_by !== ''"><ElementItem title="Gözleyen/Öngören" :value="element.observed_predicted_by" /></div>
				<div v-if="element.observation_or_discovery_year !== ''"><ElementItem title="Gözlem/Keşif Yılı" :value="element.observation_or_discovery_year" /></div>
				<div v-if="element.discovery_location !== ''"><ElementItem title="Keşif Yeri" :value="element.discovery_location" /></div>
				<div v-if="element.isolated_sampled_by !== ''"><ElementItem title="İlk Örneği Toplayan" :value="element.isolated_sampled_by" /></div>
				<div v-if="element.isolation_sample_year !== ''"><ElementItem title="İlk Örnek Yılı" :value="element.isolation_sample_year" /></div>
				<div v-if="element.named_by !== ''"><ElementItem title="İsimlendiren" :value="element.named_by" /></div>
			</details>
			
			<!-- Üretim & Kullanım -->
			<details>
				<summary>Üretim & Kullanım</summary>
				<div v-if="element.sources !== ''"><ElementItem title="Kaynak" :value="element.sources" /></div>
				<div v-if="element.uses !== ''"><ElementItem title="Kullanım Alanları" :value="element.uses" /></div>
			</details>
			
			<!-- Radyoaktif Özellikler -->
			<details>
				<summary>Radyoaktif Özellikler</summary>
				<div v-if="element.is_radioactive !== ''"><ElementItem title="Radyoaktivite" :value="element.is_radioactive" /></div>
				<div v-if="element.decay_mode !== ''"><ElementItem title="Bozunma Modu" :value="element.decay_mode" /></div>
				<div v-if="element.half_life !== ''"><ElementItem title="Yarı Ömür" :value="element.half_life" /></div>
				<div v-if="element.lifetime !== ''"><ElementItem title="Ömür" :value="element.lifetime" /></div>
				<div v-if="element.neutron_mass_absorption !== ''"><ElementItem title="Nötron Kütle Emilimi" :value="element.neutron_mass_absorption" /></div>
				<div v-if="element.neutron_cross_section !== ''"><ElementItem title="Nötron Kesiti" :value="element.neutron_cross_section" /></div>
				<div v-if="element.proton_affinity !== ''"><ElementItem title="Proton İlgisi" :value="element.proton_affinity" /></div>
			</details>
			
			<!-- Elektron İlgisi -->
			<details>
				<summary>Elektron İlgisi</summary>
				<div v-if="element.electron_affinity_eV !== ''"><ElementItem title="Elektron İlgisi" :value="element.electron_affinity_eV" :unitFixed="'eV'" /></div>
				<div v-if="element.electron_affinity_kJmol !== ''"><ElementItem title="Elektron İlgisi" :value="element.electron_affinity_kJmol" :unitFixed="'kj/mol'" /></div>
				<div v-if="element.electronegativity_pauling !== ''"><ElementItem title="Elektron İlgisi" :value="element.electronegativity_pauling" :unitFixed="'pauling'" /></div>
				<div v-if="element.electronegativity_allen !== ''"><ElementItem title="Elektron İlgisi" :value="element.electronegativity_allen" :unitFixed="'allen'" /></div>
				<div v-if="element.electronegativity_ghosh !== ''"><ElementItem title="Elektron İlgisi" :value="element.electronegativity_ghosh" :unitFixed="'gosh'" /></div>
			</details>
			
			<!-- Dipol Kutuplanabilirliği -->
			<details>
				<summary>Dipol Kutuplanabilirliği</summary>
				<div v-if="element.dipole_polarizability !== ''"><ElementItem title="Kabul Edilen" :value="element.dipole_polarizability" /></div>
				<div v-if="element.dipole_polarizability_unc !== ''"><ElementItem title="Belirsizlik" :value="element.dipole_polarizability_unc" /></div>
				<div v-if="element.c6_gb !== ''"><ElementItem title="C6 GB" :value="element.c6_gb" /></div>
				<div v-if="element.c6_coeff !== ''"><ElementItem title="C6 Katsayısı" :value="element.c6_coeff" /></div>
			</details>
			
			<!-- Kafes Özellikleri -->
			<details>
				<summary>Kafes Özellikleri</summary>
				<div v-if="element.lattice_constant_internal_default_radii !== ''"><ElementItem title="Kafes Sabiti İç Yarıçap" :value="element.lattice_constant_internal_default_radii" /></div>
				<div v-if="element.lattice_constant !== ''"><ElementItem title="Kafes Sabitleri" :value="element.lattice_constant" /></div>
				<div v-if="element.lattice_structure !== ''"><ElementItem title="Kafes Yapısı" :value="element.lattice_structure" /></div>
				<div v-if="element.lattice_angles !== ''"><ElementItem title="Kafes Açıları" :value="element.lattice_angles" /></div>

			</details>
			
			<!-- Elektron & Kuantum Özellikleri -->
			<details>
				<summary>Elektron & Kuantum Özellikleri</summary>
				<div v-if="element.oxidation_states !== ''"><ElementItem title="Oksidasyon Durumları" :value="element.oxidation_states" /></div>
				<div v-if="element.electron_configuration !== ''"><ElementItem title="Elektron Konfigürasyonu" :value="element.electron_configuration" /></div>
				<div v-if="element.quantum_number !== ''"><ElementItem title="Kuantum Sayısı" :value="element.quantum_number" /></div>
				<div v-if="element.electron_configuration_semantic !== ''"><ElementItem title="Elektron Konfigürasyonu (Semantik)" :value="element.electron_configuration_semantic" /></div>
				
				<details>
						<summary class="details">Kabuk</summary>
						<div v-for="i in 7" :key="i">
								<div v-if="element[`shells-${i-1}`] !== ''"> 
									<ElementItem :title="'Kabuk ' + String(i-1) + ':'" :value="element[`shells-${i-1}`]" />
								</div>
						</div>
				</details>
					
					<details>
							<summary class="details">İyonizasyon Enerjisi</summary>
					<div v-for="i in 29" :key="i">
							<div v-if="element[`ionization_energies-${i-1}`] !== ''"> 
									<ElementItem :title="'İyonizasyon Enerjisi ' + String(i-1) + ':'" :value="element[`ionization_energies-${i-1}`]" />
							</div>
					</div>
					</details>
	

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
	
</template>

<script>
	import ElementItem from './ElementItem.vue';

	export default {
		components: { ElementItem },
		props: {
			element: Object,
			toggleModal: Boolean
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
				categoryColors: {
					'alkali metal': '#ffaf80',          // turuncu
					'alkali metal_shade': '#ef9851',

					'toprak alkali metal': '#80ff8e',   // yeşi
					'toprak alkali metal_shade': '#44e053',

					'geçiş metali': '#ffef80',          // sarı
					'geçiş metali_shade': '#c1b45f',

					'geçiş sonrası metali': '#80d5ff',  // mavi
					'geçiş sonrası metali_shade': '#52c5fe',

					'metalsi': '#8095ff',               // slate
					'metalsi_shade': '#526efe',

					'reaktif ametal': '#ff80d4',        // pembe
					'reaktif ametal_shade': '#fe52c4',

					'soy gaz': '#aa80ff',               // lila
					'soy gaz_shade': '#8b52fe',

					'lantanit': '#c3ff80',              // yeşil
					'lantanit_shade': '#adfe52',

					'aktinit': '#80fffc',               // teal
					'aktinit_shade': '#52fefa',

					'bilinmiyor': '#fff',               // beyaz
					'bilinmiyor_shade': '#e0e0e0'
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
			}
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
		background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
		background: rgba($color: #1d232f, $alpha: 1);
		padding: 1rem;
		padding-bottom: 10rem;
		
		z-index: 10;
		overflow: auto;
	}
	.close-modal {
		position: fixed;
		top:0;
		left: 25.5rem;
		font-size:3rem;
		color:#d6d6d6;
		cursor: pointer;
		border: none;
		background: none;
		z-index: 1;
	}
	@media screen and (max-width: 700px) {
		.modal {
			position : fixed;
			top: 50%; left: 50%;
			transform: translate(-50%, -50%);
			width: 100%; height: 100%;
			padding: 2rem;
			padding-bottom: 5rem;
			border-radius: .5rem;
			z-index: 10;
			overflow: scroll;
		}
		
		.close-modal {
			position : fixed;
			left: 0;
			bottom: 0;
			top:unset;
			width: 100%;
			z-index: 10;
			padding: 0 1rem;
			backdrop-filter: blur(5px);
			filter: opacity(.8);
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
		background-color: rgba(0, 0, 0, 0.2);
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
			// border: 1px solid black;
			color: black;
			top: 1rem; right: 1rem;
			width: 5rem; height: 5rem;
			h2 {
				padding: .3rem;
				font-size: 2.5rem;
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

	.search {
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
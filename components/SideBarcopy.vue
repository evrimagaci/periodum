<template>
  <div :class="$store.getters.isOriented ? 'oriented-sidebar' : $store.getters.isMobile ? 'mobile-sidebar' : 'sidebar'">
    <div class="close-btn" @click="$emit('close')">
      <img src="../assets/icons/icons-close.svg" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
export default {
  props: {
    element: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
      textLimit: 12,
      generalInfoKeys: [
        {
          key: 'name_tr',
          label: 'Türkçe İsim',
        },
        {
          key: 'name_en',
          label: 'İngilizce İsim',
        },
        {
          key: 'alternate_name',
          label: 'Alternatif İsim',
        },
        {
          key: 'symbol',
          label: 'Sembol',
        },
        {
          key: 'number',
          label: 'Atom Numarası',
        },
        {
          key: 'gas_phase',
          label: 'Gaz Fazı',
        },
        {
          key: 'allotrope_names',
          label: 'Allotrop İsimleri',
        },
        {
          key: 'appearance',
          label: 'Görünüm',
        },
        {
          key: 'refractive_index',
          label: 'Kırılma İndisi',
        },
        {
          key: 'phase_at_stp',
          label: 'Faz (NŞA)',
        },
      ],
      descriptiveNumberKeys: [
        {
          key: 'cas_number',
          label: 'CAS Numarası',
        },
        {
          key: 'cid_number',
          label: 'CID Numarası',
        },
        {
          key: 'dot_number',
          label: 'DOT Numarası',
        },
        {
          key: 'rtecs_number',
          label: 'RTECS Numarası',
        },
        {
          key: 'mendeleev_number',
          label: 'Mendeleev Numarası',
        },
        {
          key: 'pettifor_number',
          label: 'Pettifor Numarası',
        },
        {
          key: 'eu_number',
          label: 'EU Numarası',
        },
        {
          key: 'space_group_number',
          label: 'Uzay Grup Numarası',
        },
        {
          key: 'glawe_number',
          label: 'Glawe Numarası',
        },
      ],
      massKeys: [
        {
          label: 'Atomik Kütle',
          key: 'atomic_mass',
        },
        {
          label: 'Atomik Kütle Belirsizliği',
          key: 'atomic_mass_uncertainty',
        },
      ],
      radiusKeys: [
        {
          key: 'atomic_radius_empirical',
          label: 'Deneysel Ölçüm',
        },
        {
          key: 'atomic_radius_calculated',
          label: 'Hesaplanmış Ölçüm',
        },
        {
          key: 'atomic_radius_vanderwaals',
          label: 'van der Waals Yarıçapı',
        },
        {
          key: 'vdw_radius_bondi',
          label: 'Bondi',
        },
        {
          key: 'vdw_radius_truhlar',
          label: 'Ruhlar',
        },
        {
          key: 'vdw_radius_rt',
          label: 'Oda Sıcaklığında',
        },
        {
          key: 'atomic_radius_rahm',
          label: 'Rahm',
        },
        {
          key: 'vdw_radius_batsanov',
          label: 'Batsanov',
        },
        {
          key: 'vdw_radius_dreiding',
          label: 'Dreiding',
        },

        {
          key: 'vdw_radius_uff',
          label: 'Uff',
        },
        {
          key: 'vdw_radius_mm3',
          label: 'mm3',
        },
        {
          key: 'vdw_radius_alvarez',
          label: 'Alvarez',
        },
        {
          key: 'covalent_radius_bragg',
          label: 'Kovalent (Bragg)',
        },

        {
          key: 'atomic_radius_covalent_single_bond',
          label: 'Kovalent (Tek Bağ)',
        },
        {
          key: 'atomic_radius_covalent_triple_bond',
          label: 'Kovalent (Üçlü Bağ)',
        },
        {
          key: 'covalent_radius_cordero',
          label: 'Kovalent (Cordero)',
        },
        {
          key: 'covalent_radius_pyykko',
          label: 'Kovalent (Pyykko)',
        },

        {
          key: 'covalent_radius_pyykko_double',
          label: 'Kovalent (Pyykoo, Çift)',
        },
        {
          key: 'covalent_radius_pyykko_triple',
          label: 'Kovalent (Pyykoo, Üçlü)',
        },
        {
          key: 'metallic_radius_mendeleev',
          label: 'Mendeleev',
        },
        {
          key: 'metallic_radius_c12',
          label: 'C12',
        },
        {
          key: 'atomic_radius_metallic',
          label: 'Metalik',
        },
      ],
      coordinateKeys: [
        {
          key: 'xpos',
          label: 'x Pozisyonu',
        },
        {
          key: 'ypos',
          label: 'y Pozisyonu',
        },
        {
          key: 'period',
          label: 'Periyot',
        },
        {
          key: 'group',
          label: 'Grup',
        },
      ],
      classificationKeys: [
        {
          key: 'block',
          label: 'Blok',
        },
        {
          key: 'category',
          label: 'Kategori',
        },
        {
          key: 'electrical_type',
          label: 'Elektrik Tipi',
        },
        {
          key: 'geochemical_class',
          label: 'Jeokimyasal Sınıf',
        },
        {
          key: 'goldschmidt_class',
          label: 'Goldschmidt Sınıfı',
        },
      ],
      colorKeys: [
        {
          key: 'jmol_color',
          label: 'Jmol',
        },
        {
          key: 'molcas_gv_color',
          label: 'MOLCAS GV',
        },
        {
          key: 'cpk_color',
          label: 'CPK',
        },
      ],
      showKnownIsotopes: false,
      showStableIsotopes: false,
      isMonoIsotopic: false,
      abundanceLevels: [
        {
          label: 'Şehir Toprağında Bulunma Sıklığı',
          key: 'abundance_urban_soil',
        },
        {
          label: 'Deniz Suyunda Bulunma Sıklığı',
          values: [
            {
              label: 'CRC Handbook',
              key: 'abundance_seawater_w1',
            },
            {
              label: 'Kaye & Laby',
              key: 'abundance_seawater_w2',
            },
          ],
        },
        {
          label: 'Güneşte Bulunma Sıklığı',
          values: [
            {
              label: 'Kaye & Laby',
              key: 'abundance_sun_s1',
            },
          ],
        },
        {
          label: 'Dünya Kabuğunda Bulunma Sıklığı',
          values: [
            {
              label: 'CRC Handbook',
              key: 'abundance_in_earth_crust_c1',
            },
            {
              label: 'Kaye and Laby',
              key: 'abundance_in_earth_crust_c2',
            },
            {
              label: 'Greenwood',
              key: 'abundance_in_earth_crust_c3',
            },
            {
              label: 'Ahrens (Taylor)',
              key: 'abundance_in_earth_crust_c4',
            },
            {
              label: 'Ahrens (Wänke)',
              key: 'abundance_in_earth_crust_c5',
            },
            {
              label: 'Ahrens (Weaver)',
              key: 'abundance_in_earth_crust_c6',
            },
            {
              label: 'Ahrens (Taylor)',
              key: 'abundance_in_earth_crust_u1',
            },
            {
              label: 'Ahrens (Shaw)',
              key: 'abundance_in_earth_crust_u2',
            },
          ],
        },
        {
          label: 'İnsan Vücudunda Bulunma Sıklığı',
          values: [
            {
              label: 'Ölçüm 1',
              key: 'abundance_humans',
            },
            {
              label: 'Ölçüm 2',
              key: 'abundance_in_humans_2',
            },
          ],
        },
        {
          label: "Güneş Sistemi'nde Bulunma Sıklığı",
          values: [
            {
              label: 'Kaye & Laby',
              key: 'abundance_solar_system_y1',
            },
            {
              label: 'Ahrens (ve Belirsizlik Yüzdesi)',
              key: 'abundance_solar_system_y2',
            },
          ],
        },
        {
          label: 'Meteoritlerde Bulunma Sıklığı',
          key: 'abundance_meteorite',
        },
      ],
      temperatureLevels: [
        {
          label: 'Erime/Donma Sıcaklığı',
          values: [
            {
              key: 'melt_use',
              label: 'Kabul Edilen',
            },
            {
              key: 'melt_WEL',
              label: 'WEL',
            },
            {
              key: 'melt_CRC',
              label: 'CRC',
            },
            {
              key: 'melt_LNG',
              label: 'LNG',
            },
          ],
        },
        {
          label: 'Kaynama/Yoğunlaşma Sıcaklığı',
          values: [
            {
              key: 'boil_use',
              label: 'Kabul Edilen',
            },
            {
              key: 'boil_WEL',
              label: 'WEL',
            },
            {
              key: 'boil_CRC',
              label: 'CRC',
            },
            {
              key: 'boil_LNG',
              label: 'LNG',
            },
            {
              key: 'boil_Zhang',
              label: 'Zhang',
            },
          ],
        },
        {
          label: 'Curie Noktası',
          key: 'curie_point',
        },
        {
          label: 'Kritik Sıcaklık',
          key: 'critical_temperature',
        },
        {
          label: 'Tutuşma Noktası',
          key: 'flashpoint',
        },
        {
          label: 'Süperiletken Noktası',
          key: 'superconducting_point',
        },
        {
          label: 'Ototutuşma Noktası',
          key: 'autoignition_point',
        },
        {
          label: 'Kritik Basınç',
          key: 'critical_pressure',
        },
      ],
      densityLevels: [
        {
          label: 'Katı Yoğunluğu',
          values: [
            {
              key: 'density_solid_WEL',
              label: 'WEL',
            },
            {
              key: 'density_solid_LNG',
              label: 'LNG',
            },
            {
              key: 'density_solid_CRC',
              label: 'CRC',
            },
          ],
        },
        {
          label: 'Yoğunluk (NŞA)',
          key: 'density_rt',
        },
        {
          label: 'Sıvı Yoğunluğu',
          key: 'density_liquid_cr2',
        },
        {
          label: 'Gaz Yoğunluğu',
          key: 'density_gas',
        },
      ],
      heatLevels: [
        {
          label: 'Molar Hacim',
          key: 'molar_volume',
        },
        {
          label: 'Atomik Hacim',
          key: 'atomic_volume',
        },
        {
          label: 'Füzyon Entalpisi',
          key: 'enthalpy_of_fusion',
        },
        {
          label: 'Füzyon Isısı',
          values: [
            {
              key: 'heat_of_fusion_crc',
              label: 'CRC',
            },
            {
              key: 'heat_of_fusion_lng',
              label: 'LNG',
            },
            {
              key: 'heat_of_fusion_wel',
              label: 'WEL',
            },
          ],
        },
        {
          label: 'Buharlaşma Isısı',
          values: [
            {
              key: 'evaporation_heat',
              label: 'Kabul Edilen',
            },
            {
              key: 'heat_of_vaporization_crc',
              label: 'CRC',
            },
            {
              key: 'heat_of_vaporization_lng',
              label: 'LNG',
            },
            {
              key: 'heat_of_vaporization_wel',
              label: 'WEL',
            },
            {
              key: 'heat_of_vaporization_zhang',
              label: 'Zhang',
            },
          ],
        },
        {
          label: 'Yanma Isısı',
          key: 'heat_of_combustion',
        },
        {
          label: 'Molar Isı',
          key: 'molar_heat',
        },
        {
          label: 'Spesifik Isı Kapasitesi',
          key: 'specific_heat_capacity',
        },
        {
          label: 'Spesifik Isı',
          values: [
            {
              key: 'specific_heat_crc',
              label: 'CRC',
            },
            {
              key: 'specific_heat_wel',
              label: 'WEL',
            },
            {
              key: 'specific_heat_lng',
              label: 'LNG',
            },
          ],
        },
        {
          label: 'Termal İletkenlik',
          key: 'thermal_conductivity',
        },
        {
          label: 'Termal Genleşme',
          key: 'thermal_expansion',
        },
        {
          label: 'Adiyabatik İndis',
          key: 'adiabatic_index',
        },
      ],
      speedOfSoundLevels: [
        {
          label: 'Uzunlamasına',
          key: 'speed_of_sound_longitudinal',
        },
        {
          label: 'Enine',
          key: 'speed_of_sound_transversal',
        },
        {
          label: 'Ekstensiyonel',
          key: 'speed_of_sound_extensional',
        },
        {
          label: 'Akışkan İçinde',
          key: 'speed_of_sound_fluid',
        },
      ],
      electricalResistivityLevels: [
        {
          label: ' 80 K',
          key: 'electrical_resistivity_80K',
        },
        {
          label: '273 K',
          key: 'electrical_resistivity_273K',
        },
        {
          label: '293 K',
          key: 'electrical_resistivity_293K',
        },
        {
          label: '298 K',
          key: 'electrical_resistivity_298K',
        },
        {
          label: '300 K',
          key: 'electrical_resistivity_300K',
        },
        {
          label: '500 K',
          key: 'electrical_resistivity_500K',
        },
      ],
      magneticLevels: [
        {
          label: 'Manyetik Sıralanma',
          key: 'magnetic_ordering',
        },
        {
          label: 'Neel Noktası',
          key: 'neel_point',
        },
        {
          label: 'Manyetik Duyarlılık',
          key: 'magnetic_susceptibility',
        },
      ],
      elasticLevels: [
        {
          label: 'Kesme Modülü',
          key: 'shear_modulus',
        },
        {
          label: 'Esneklik Modülü',
          key: 'bulk_modulus',
        },
        {
          label: 'Poisson Oranı',
          key: 'poisson_ratio',
        },
        {
          label: 'Young Modülü',
          key: 'youngs_modulus',
        },
      ],
      hardnessLevels: [
        {
          label: 'Mohs Sertliği',
          key: 'mohs_hardness',
        },
        {
          label: 'Brinell Sertliği',
          key: 'brinell_hardness',
        },
        {
          label: 'Vickers Sertliği',
          key: 'vickers_hardness',
        },
      ],
      etymologicalLevels: [
        {
          label: 'Tanım',
          key: 'description',
        },
        {
          label: 'Orijinal Kelime Dili',
          key: 'language_of_origin',
        },
        {
          label: 'Kelimenin Kökeni',
          key: 'origin_of_word',
        },
        {
          label: 'Orijinal Kelime',
          key: 'original_word',
        },
        {
          label: 'Anlam Kelime',
          key: 'meaning',
        },
        {
          label: 'Sembolün Kökeni',
          key: 'symbol_origin',
        },
        {
          label: 'Etimolojik Tanım',
          key: 'etymological_description',
        },
      ],
      isolationLevels: [
        {
          label: 'Gözleyen/Öngören',
          key: 'observed_predicted_by',
        },
        {
          label: 'Gözlem/Keşif Yılı',
          key: 'observation_or_discovery_year',
        },
        {
          label: 'Keşif Yeri',
          key: 'discovery_location',
        },
        {
          label: 'İlk Örneği Toplayan',
          key: 'isolated_sampled_by',
        },
        {
          label: 'İlk Örnek Yılı',
          key: 'isolation_sample_year',
        },
        {
          label: 'İsimlendiren',
          key: 'named_by',
        },
      ],
      radioactiveLevels: [
        {
          label: 'Radyoaktivite',
          key: 'is_radioactive',
          type: 'Boolean',
        },
        {
          label: 'Bozunma Modu',
          key: 'decay_mode',
        },
        {
          label: 'Yarı Ömür',
          key: 'half_life',
        },
        {
          label: 'Ömür',
          key: 'lifetime',
        },
        {
          label: 'Nötron Kütle Emilimi',
          key: 'neutron_mass_absorption',
        },
        {
          label: 'Nötron Kesiti',
          key: 'neutron_cross_section',
        },
        {
          label: 'Proton İlgisi',
          key: 'proton_affinity',
        },
      ],
      sourcesAndUsesLevels: [
        {
          label: 'Üretim',
          key: 'sources',
        },
        {
          label: 'Kullanım Alanları',
          key: 'uses',
        },
      ],
      electronAffinityLevels: [
        {
          label: 'Elektron İlgisi',
          key: 'electron_affinity_eV',
        },
        {
          label: 'Elektron İlgisi',
          key: 'electron_affinity_kJmol',
        },
      ],
      electronegativityLevels: [
        {
          label: 'Pauling',
          key: 'electronegativity_pauling',
        },
        {
          label: 'Allen',
          key: 'electronegativity_allen',
        },
        {
          label: 'Ghosh',
          key: 'electronegativity_ghosh',
        },
      ],
      dipolLevels: [
        {
          label: 'Kabul Edilen',
          key: 'dipole_polarizability',
        },
        {
          label: 'Belirsizlik',
          key: 'dipole_polarizability_unc',
        },
        {
          label: 'C6 GB',
          key: 'c6_gb',
        },
        {
          label: 'C6 Katsayısı',
          key: 'c6_coeff',
        },
      ],
      latticeLevels: [
        {
          label: 'Kafes Sabiti İç Yarıçap',
          key: 'lattice_constant_internal_default_radii',
        },
        {
          label: 'Kafes Sabitleri',
          key: 'lattice_constant',
        },
        {
          label: 'Kafes Yapısı',
          key: 'lattice_structure',
        },
        {
          label: 'Kafes Açıları',
          key: 'lattice_angles',
        },
      ],
      quantumLevels: [
        {
          label: 'Oksidasyon Durumları',
          key: 'oxidation_states',
        },
        {
          label: 'Elektron Konfigürasyonu',
          key: 'electron_configuration',
        },
        {
          label: 'Kuantum Sayısı',
          key: 'quantum_number',
        },
        {
          label: 'Elektron Konfigürasyonu (Semantik)',
          key: 'electron_configuration_semantic',
        },
        ...[...Array(7).keys()].map((i) => ({
          label: `Kabuk ${i}`,
          key: `shells-${i}`,
        })),
        ...[...Array(29).keys()].map((i) => ({
          label: `İyonizasyon Enerjisi ${i}`,
          key: `ionization_energies-${i}`,
        })),
      ],
      knownIsotopeNumbers: [],
      knownIsotopes: [],
      stableIsotopes: [],
      selectedIsotopeIndex: 0,
      isotope: {},
      loadingInstance: null,
    }
  },
  computed: {
    isIsotopeActive() {
      return this.selectedIsotopeIndex > 0
    },
    ...mapGetters(['isotopes']),
  },
  watch: {
    element() {
      this.init()
    },
    '$store.getters.isIsotopeFetched'(newVal) {
      if (newVal) {
        this.init()
        this.loadingInstance.close()
      }
    },
  },
  created() {
    if (!this.$store.getters.isIsotopeFetched) {
      this.loadingInstance = Loading.service({ background: 'rgba(0, 0, 0, 0.7)', lock: true })
    } else {
      this.init()
    }
  },
  methods: {
    activateInfoModal() {
      this.$store.commit('SET_SELECTED_CONTENT_ID', this.element.ea_content_id)
      this.$store.commit('SHOW_INFO_MODAL', true)
    },
    init() {
      this.reset()
      const found = _.find(this.isotopes, { atomic_number_unique: this.element.number })
      if (found) {
        this.isotope = found
        this.isMonoIsotopic = found.is_monoisotopic
        if (found.stable_isotopes) {
          this.stableIsotopes = found.stable_isotopes.split(', ')
        }
        if (found.known_isotopes) {
          this.knownIsotopes = found.known_isotopes.split(', ')
          this.knownIsotopeNumbers = this.knownIsotopes
            .map((isotope) => {
              return isotope
                .split('')
                .filter((char) => !isNaN(Number(char)))
                .join('')
            })
            .map(Number)
            .filter((atomicNumber) => _.find(this.isotopes, { atomic_number_notunique: this.element.number, mass_number: atomicNumber }))
            .sort()
        }
      }
    },
    onSliderChange(val) {
      this.selectedIsotopeIndex = val
    },
    reset() {
      this.selectedIsotopeIndex = 0
      this.showKnownIsotopes = false
      this.showStableIsotopes = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.sidebar {
  height: calc(100vh - 53px);
  width: 300px;
  padding: 20px 0 36px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  z-index: 8;
  position: absolute;
  top: 53px;
  left: 0;
  .wrapper {
    position: relative;
    overflow: auto;
    max-height: calc(100vh - 80px);
  }
}

.mobile-sidebar {
  height: calc(100vh - 104px);
  width: 300px;
  padding: 20px 0 36px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  z-index: 8;
  position: absolute;
  top: 53px;
  left: 0;
  .wrapper {
    position: relative;
    overflow: auto;
    max-height: calc(100vh - 124px) !important;
  }
}

.oriented-sidebar {
  height: calc(100vw - 76px);
  width: 300px;
  padding: 20px 0 36px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  z-index: 8;
  position: absolute;
  top: 53px;
  left: 0;
  .wrapper {
    position: relative;
    overflow: auto;
    max-height: calc(100vw - 94px) !important;
  }
}

.element {
  width: 120px;
  height: 120px;
  margin-left: 20px;
  padding: 8px;
  .element-wrapper {
    margin: 4px 3px;
  }
  .number {
    font-size: 10px;
    font-weight: bold;
  }
  .symbol {
    font-size: 40px;
    font-weight: 900;
    margin-top: 20px;
  }
  .name {
    margin-top: 4px;
    font-size: 10px;
    font-weight: bold;
  }
  .atomic-mass {
    opacity: 0.6;
    font-size: 10px;
    margin-top: 1px;
  }
}

.close-btn {
  position: absolute;
  cursor: pointer;
  width: 34px;
  height: 34px;
  padding: 10px 10px 21px;
  border-radius: 0 12px 12px 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  right: -34px;
  top: 0;
  font-size: 12px;
  color: $white;
}

@supports not (backdrop-filter: blur()) {
  .sidebar,
  .mobile-sidebar,
  .oriented-sidebar,
  .close-btn {
    background-color: rgba(10, 12, 16, 1);
  }
}
</style>

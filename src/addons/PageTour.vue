<template>
  <div class="pageTourContainerTable">
    <section id="highlightContainer">
      <canvas id="highlight" style="border:1px solid #d3d3d3;"></canvas>
    </section>

    <div id="part-0">
      <section id="section-filter">
        <img class="arrow" id="rightArrow" :src="arrows.right">
        <div class="text">
          <h2>Filtreleme</h2>
          <h4>Bloğa ve kategoriye göre filtreleme yapabilirsin.</h4>
        </div>
      </section>
    </div>

    <div id="part-1" class="inactive">
      <section id="section-search">
        <img class="arrow" id="rightArrow" :src="arrows.right">
        <div class="text">
          <h2>Arama</h2>
          <h4>Bu kısımda arama yapabilirsin.</h4>
        </div>
      </section>
    </div>

    <div id="part-2" class="inactive">
      <section id="section-searchElement">
      <img class="arrow" id="rightArrow" :src="arrows.right">
        <div class="text">
          <h2>Element Detayları</h2>
          <h4>Elementlere tıklayarak detaylı bilgiye ulaşabilirsin.</h4>
        </div>
      </section>
    </div>

    <div id="part-3" class="inactive">
      <section id="section-modal">
        <div class="text">
          <h2>Detaylara Göz At</h2>
          <h4>Seçilen element ile ilgili tüm bilgiyi burada bulabilirsin.</h4>
        </div>
      </section>
    </div>

    <div id="part-4" class="inactive">
    </div>

    <div id="part-5" class="inactive">
    </div>

    <div id="part-6" class="inactive">
      <section id="section-heat">
      <img class="arrow" id="upArrow" :src="arrows.up">
        <div class="text">
          <h2>Sıcaklık Modülü</h2>
          <h4>Elementlerin farklı sıcaklıktaki hallerini görmeni sağlar.</h4>
        </div>
      </section>
    </div>
    
    <div id="part-7" class="inactive">
      <section id="section-heat-slider">
      <img class="arrow" id="upArrow" :src="arrows.up">
        <div class="text">
          <h2>Derece Ayarı</h2>
          <h4>Sıcaklığı, Kelvin, Celcius ve Fahrenheit üzerinden değiştirebilirsin.</h4>
        </div>
      </section>
      <section id="section-heat-statebuttons">
        <img class="arrow" id="rightArrow" :src="arrows.right">
        <div class="text">
          <h2>Maddenin Halleri</h2>
          <h4>Mevcut sıcaklıktaki hallere göre filtrelemeni sağlar.</h4>
        </div>
      </section>
    </div>

    <div id="part-8" class="inactive">
      <section id="section-heat">
      <img class="arrow" id="upArrow" :src="arrows.up">
        <div class="text">
          <h2>Grup Modülü</h2>
          <h4>Elementlerin farklı sıcaklıktaki hallerini görmeni sağlar.</h4>
        </div>
      </section>
    </div>
    
    <!-- <div class="part-overlay mask"></div> -->
    <button @click.prevent="nextPart()" class="next-button">İleri</button>
  </div>
</template>

<script>
export default {
  data() {    
    return {
      currentPart: 0,
      arrows: {
        up: require("../resources/img/misc/pagetour_arrow_up.svg"),
        right: require("../resources/img/misc/pagetour_arrow_right.svg"),
      }
    }
  },
  methods: {
    nextPart() {
      document.querySelector('#part-'+this.currentPart).classList.add('inactive')
      this.currentPart++
      const currentPart = document.querySelector('#part-'+this.currentPart)
      currentPart.classList.remove('inactive')

      const stylize_item = function(element) {
          element.style.color = '#e5bb09'
          element.style.backgroundColor = '#1A1F2A'
          element.style.padding = '1vw 2vw'
          element.style.borderRadius = '.3rem'
          element.style.border = '1px solid #e5bb09'
          element.style.opacity = '1'
        }

      // ARAMA TANITMA
      if (this.currentPart === 1) {
        // document.querySelector('#tableSearch').style.boxShadow = '0 0 10px white'
        
        this.highlight({
          x: '47.7vmax',
          y: '-16.4vw',
          w: '22.5vw',
          h: '2.8vw'
        })
        // Arama kutusuna girdiyi engelle
        document.querySelector('#tableSearch').disabled = true
      }

      // RODYUM ARAMASI YAP
      else if (this.currentPart === 2) {
        // document.querySelector('#tableSearch').style.boxShadow = 'none'
        
        this.highlight({
          x: '30.1vmax',
          y: '-.4vw',
          w: '5vw',
          h: '5vw'
        })

        document.querySelector('#tableSearch').value = 'Rodyum'
        document.querySelector('#tableSearch').dispatchEvent(new Event('input'))
        
        document.querySelector('#table45').addEventListener('click', function() {
          document.querySelector('.next-button').dispatchEvent(new Event('click'))
        }, {once : true});

        document.querySelector('.next-button').classList.add('inactive')
      }

      // MODALİ TANIT
      else if (this.currentPart === 3) {
        document.querySelector('.next-button').classList.remove('inactive')
        document.querySelector('#highlightContainer').classList.add('inactive')
      }
      
      // MODAL ARAMA YAP
      else if (this.currentPart === 4) {
        document.querySelector('#modalSearch').value = 'Gözlem'
        document.querySelector('#modalSearch').dispatchEvent(new Event('input'))

        // const MODAL_SEARCH_INFOTEXT = document.createElement('div')
        // MODAL_SEARCH_INFOTEXT.textContent = 'Başlık, içerik, veri ile arama yapabilirsin.'
        // MODAL_SEARCH_INFOTEXT.id = 'temp_modal_search_info'
        // stylize_item(MODAL_SEARCH_INFOTEXT)

        const MODAL_REFULT_INFOTEXT = document.createElement('div')
        MODAL_REFULT_INFOTEXT.textContent = 'Başlığa tıklayarak detayları inceleyebilirsin.'
        MODAL_REFULT_INFOTEXT.id = 'temp_modal_result_info'
        stylize_item(MODAL_REFULT_INFOTEXT)
        
        // document.querySelector('#modalSearch').parentNode.insertBefore(MODAL_SEARCH_INFOTEXT, document.querySelector('#modalSearch').nextSibling)
        document.querySelector('#pagetour_item').parentNode.insertBefore(MODAL_REFULT_INFOTEXT, document.querySelector('#pagetour_item').nextSibling)

        // pagetour_item

        document.querySelector('.next-button').classList.remove('inactive')

      }

      // MODAL'DAN ÇIK
      else if (this.currentPart === 5) {        
        // ARAMA KUTUSUNU TEMİZLE ve GİRDİ ENGELİNİ KALDIR
        // document.querySelector('#temp_modal_search_info').remove()
        document.querySelector('#temp_modal_result_info').remove()
        document.querySelector('#modalSearch').value = ''
        document.querySelector('#modalSearch').dispatchEvent(new Event('input'))


        document.querySelector('.close-modal').style.borderRadius = '.3rem'
        document.querySelector('.close-modal').style.backgroundColor = '#e5bb09'
        document.querySelector('.close-modal').style.paddingLeft = '1rem'
        document.querySelector('.close-modal').style.color = 'black'

        const MODAL_EXIT_INFOTEXT = document.createElement('div')
        MODAL_EXIT_INFOTEXT.textContent = "X'e tıklayarak pencereyi kapatabilirsin."
        MODAL_EXIT_INFOTEXT.id = 'temp_modal_result_info'
        stylize_item(MODAL_EXIT_INFOTEXT)
        MODAL_EXIT_INFOTEXT.style.fontSize = '1vw'
        MODAL_EXIT_INFOTEXT.style.marginLeft = '1vw'
        MODAL_EXIT_INFOTEXT.style.alignSelf = 'center'

        document.querySelector('.close-modal').appendChild(MODAL_EXIT_INFOTEXT)
        
        document.querySelector('.close-modal').addEventListener('click', function() {
          document.querySelector('.next-button').dispatchEvent(new Event('click'))
        }, {once : true});

        document.querySelector('.next-button').classList.add('inactive')
      }

      // SICAKLIK MODÜLÜNÜ GÖSTER
      else if (this.currentPart === 6) {
        document.querySelector('#highlightContainer').classList.remove('inactive')
        // MODAL EXIT HIGHLIGHT'ı KAPAT
        // document.querySelector('.close-modal').style.boxShadow = 'none
        document.querySelector('.close-modal').style.borderRadius = '0'
        document.querySelector('.close-modal').style.backgroundColor = 'transparent'
        document.querySelector('.close-modal').style.paddingLeft = '0'
        document.querySelector('.close-modal').style.color = 'white'
        document.querySelector('#temp_modal_result_info').remove()

        // ARAMA KUTUSUNU TEMİZLE ve GİRDİ ENGELİNİ KALDIR
        document.querySelector('#tableSearch').disabled = false
        document.querySelector('#tableSearch').value = ''
        document.querySelector('#tableSearch').dispatchEvent(new Event('input'))
        
        
        this.highlight({
          x: '7.1vmax',
          y: '-16.3vw',
          w: '4.52vw',
          h: '2.8vw'
        })

        // Kullanıcının modüle tıklamasını sağla

        // document.querySelector('#heatmode').style.boxShadow = '0 0 10px white'
        document.querySelector('#table_moduleBtn_heatMode').addEventListener('click', function() {
          document.querySelector('.next-button').dispatchEvent(new Event('click'))
        }, {once : true});
      }

      // SICAKLIK MODÜLÜNÜ TANIT
      // eslint-disable-next-line no-unreachable
      else if (this.currentPart === 7) {
        document.querySelector('.next-button').textContent = 'Tamamla'
        
        this.highlight({
          x: '3.8vmax',
          y: '-13vw',
          w: '44vw',
          h: '9vw'
        })
        
        document.querySelector('.next-button').classList.remove('inactive')
      }
      
      else {
        document.querySelector('#highlightContainer').classList.add('inactive')

        document.querySelector('.pageTourContainerTable').remove()
        document.querySelector('#table_moduleBtn_filterMode').dispatchEvent(new Event('click'))
        
        localStorage.setItem('visited_before', 'true')
      }
    },
    highlight(options) {
      const HIGHLIGHT = document.querySelector('#highlight')

      HIGHLIGHT.style.top = options.y
      HIGHLIGHT.style.left = options.x
      HIGHLIGHT.style.width = options.w
      HIGHLIGHT.style.height = options.h
    }
  }
}
</script>

<style lang="scss" scoped>

  @media screen and (max-width: 720px) {
    // LIST
    .pageTourContainerTable {
      display: none;
    }
  }

  section {
    position: absolute;
    font-size: 1vmax;
    color: #e5bb09;
		z-index: 1;
    pointer-events: none;

    .text {
      background-color: #1A1F2A;
      padding: 1vw 2vw;
      border-radius: .3rem;
      border: 1px solid #e5bb09;
      z-index: 10;
    }
  }

  #highlightContainer {
    position: relative;
      left: 5vmax;
      bottom:22vw;
    }
  
    #highlight {
      box-shadow: 0 0 0 100vw rgba($color: #000000, $alpha: .5);
      border-radius: .3rem;
      position: absolute;
      z-index: 0;
      pointer-events: none;

      left: 3.8vmax;
      top: -13vw;
      width: 44vw;
      height: 9vw;
    }

  #part-0 {
    position: relative;
    #section-filter {
      left: 5vmax;
      bottom:18vw;

      #rightArrow {
        height: 8vw;
      }
    }
  }

  #part-1 {
    position: relative;
    #section-search {
      left: 45vmax;
      bottom: 26vw;
      
      #rightArrow {
        height: 8vw;
      }
    }
  }

  #part-2 {
    position: relative;
    #section-searchElement {
      left: 27vmax;
      bottom: 10vw;

      #rightArrow {
        height: 8vw;
      }
    }
  }

  #part-3 {
    position: relative;
    #section-modal {
      left: 27vmax;
      bottom: 14vw;
    }
  }

  #part-4 {
    position: relative;
    #section-searchModal {
      left: 5vmax;
      bottom: 30vw;

      #upArrow {
        height: 8vw;
      }
    }
    #section-modalResult {
      left: 4vmax;
      bottom: 8vw;

      #upArrow {
        height: 8vw;
      }
    }
  }

  #part-5 {
    position: relative;
    #section-modalExit {
      left: 9vmax;
      bottom: 31vw;

      #upArrow {
        height: 8vw;
      }
    }
  }

  #part-6 {
    position: relative;
    #section-heat {
      left: 13vmax;
      bottom: 23vw;

      #upArrow {
        height: 8vw;
      }
    }
  }

  #part-7 {
    position: relative;
    #section-heat-slider {
      left: 33vmax;
      bottom:18vw;

      #upArrow {
      height: 8vw;
      }
    }

    #section-heat-statebuttons {
      left: 5vmax;
      bottom:18vw;

      #rightArrow {
        height: 8vw;
      }
    }
  }

  .next-button {
    position: fixed;
    font-size: 1vw;
    padding: .5vw 1vw;

    width: 10vw;
    text-align: center;
    justify-self: center;
    
    color: #e5bb09;
    background-color: #1A1F2A;
    padding: .5rem 1rem;
    border-radius: .3rem;
    border: 1px solid #e5bb09;

    left: 70%;
    transform: translateX(-50%);
    bottom: 5vw;

		z-index: 2;

    &:hover {
      cursor: pointer;
      color: white;
    }
  }
</style>
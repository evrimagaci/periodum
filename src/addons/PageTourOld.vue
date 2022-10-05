<template>
  <div class="pageTourContainer">
    <section v-if="currentPart === 0" class="flex-between flex-row" id="pageTourContent">
      <h2>Arama Yap</h2>
      <img :src="images.searchbar" alt="Arama kutusu">
      <div>
        <h4>Sayfanın üst kısmında bulunan arama kutusuna element adı, numarası, kütlesi yazarak arama yapabilirsin.</h4>
        <button @click.prevent="nextPart()" class="next-button">İleri</button>
      </div>
    </section>
    
    <section v-if="currentPart === 1" class="flex-between flex-row" id="pageTourContent">
      <h2>Blok ve Kategori Filtresi</h2>
      <img :src="images.groupbar" alt="Grup Filtresi">
      <div>
        <h4>Elementleri, Grup Modülündeki bloklara ve kategorilere göre filtreleyebilirsin.</h4>
        <button @click.prevent="nextPart()" class="next-button">İleri</button>
      </div>
    </section>
    
    <section v-if="currentPart === 2" class="flex-between flex-row" id="pageTourContent">
      <h2>Sıcaklık Filtresi</h2>
      <img :src="images.heatfilter" alt="Sıcaklık Filtresi">
      <div>
        <h4>Sıcaklık derece ayarını kaydırarak veya sıcaklık kutusuna yazarak, elementlerin hallerini inceleyebilir, hallere göre filtreleyebilir ve diğer sıcaklık ölçü birimlerine göre öne çıkarabilirsin.</h4>
        <button @click.prevent="nextPart()" class="next-button">İleri</button>
      </div>
    </section>
    
    <section v-if="currentPart === 3" class="flex-between flex-row" id="pageTourContent">
      <h2>Detaylı Bilgi</h2>
      <img :src="images.modal" alt="Element Bilgileri">
      <div>
        <h4>Elementlere tıklayarak detaylı bilgi alabilir, verileri farklı ölçü birimlerine dönüştürerek inceleyebilirsin.</h4>
        <button @click.prevent="nextPart()" class="next-button">İleri</button>
      </div>
    </section>

    <div class="part-overlay"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPart: 0,
      images: {
        searchbar: require("../resources/img/misc/pagetour_searchbar.png"),
        groupbar: require("../resources/img/misc/pagetour_group.png"),
        heatfilter: require("../resources/img/misc/pagetour_heatfilter.png"),
        modal: require("../resources/img/misc/pagetour_modal.png"),
        
      }
    }
  },
  methods: {
    action() {
      document.querySelector('.search').style.zIndex = '1'
    },
    nextPart() {
      this.currentPart++
      if (this.currentPart === 4) {
        document.querySelector('.pageTourContainer').remove()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 720px) {
    // LIST
    .pageTourContainer {
      display: none;
    }
  }
  
	.part-overlay {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 120vw;
		height: 120vh;
		background-color: rgba(0, 0, 0, .4);
		z-index: 1;
	}
  section {
    position: absolute;
    font-size: 1vmax;
    color: #e5bb09;
		z-index: 2;
    
    .text {
      background-color: #1A1F2A;
      padding: 1rem 2rem;
      border-radius: .3rem;
      border: 1px solid #e5bb09;
    }
  }
  #pageTourContent {
    background: #1A1F2A;
    border-radius: 0.3rem;
    box-shadow: 0 0 20px rgba(black, 1);
    left: 50%;
    padding: 2vw;
    max-width: 100%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    // width: 30vw;
    text-align: left;
    max-height: 60vw;
    display: flex;
    flex-direction: column;

    img {
      align-self: center;
      width: fit-content;
      max-width: 100%;
      margin: 1rem 0;
      border-radius: 0.3rem;
    }
  }

  .next-button {
    font-size: 1vw;
    padding: .5rem 1rem;

    width: 10vw;
    text-align: center;
    justify-self: center;
    
    color: #e5bb09;
    background-color: #1A1F2A;
    padding: .5rem 1rem;
    border-radius: .3rem;
    border: 1px solid #e5bb09;

    margin: 1rem 0;

		z-index: 2;

    &:hover {
      cursor: pointer;
      color: white;
    }
  }


</style>
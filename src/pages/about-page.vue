<template>
  <div class="fade container flex-column">
    <div class="content">
      <h3 class="text-primary">{{ loc.pages.about.what_is.title }}</h3>      
      <div v-for="text in loc.pages.about.what_is.content" :key="text[0]">
        <p>{{ text }}</p>
      </div>
    </div>

    <div class="content">
      <h3 class="text-primary">{{ loc.pages.about.brief_info.title }}</h3>
      <div v-for="text in loc.pages.about.brief_info.content" :key="text[0]">
        <p>{{ text }}</p>
      </div>
    </div>

    <div class="content" id="updates">
      <h3 class="versionNumber">v{{ versionNumber }}</h3>
        <h3>{{ loc.pages.about.updates.visual }}</h3>
        <li>Ana menünün görünümünde değişiklikler yapıldı.</li>
        <li>Dil değiştirme butonunun görünümünde değişiklikler yapıldı.</li>
        <li>Sıcaklık modülünün görünümünde değişiklikler yapıldı.</li>
        <li>Mobil moddaki açılır menünün görünümünde değişiklikler yapıldı.</li>
        <li>Detaylı bilgi penceresine animasyon eklendi.</li>
        <li>Animasyonlar hızlandırıldı.</li>

        <h3>{{ loc.pages.about.updates.tech }}</h3>
        <li>Detaylı bilgi penceresindeki değer dönüştürme sorunu düzeltildi.</li>
        <li>Detaylı bilgi penceresindeki NULL değerler gizlendi.</li>
      <br />

      <h3 class="versionNumber">v2.0.8</h3>
        <h3>{{ loc.pages.about.updates.visual }}</h3>
        <li>İngilizce desteği eklendi.</li>
        <li>Tablo ve Liste görünümündeki bazı sorunlar düzeltildi.</li>

        <h3>{{ loc.pages.about.updates.tech }}</h3>
        <li>Menüye dil değiştirme özelliği eklendi.</li>
        <li>İngilizce version: Detaylı bilgi penceresine Wikipedia kısayolu eklendi.</li>
      <br />

      <h3 class="versionNumber">v2.0.1</h3>
        <h3>{{ loc.pages.about.updates.visual }}</h3>
        <li>Ufak problemler düzeltildi.</li>
        <li>Tablo ve Liste görünüşleri değiştirildi.</li>

        <h3>{{ loc.pages.about.updates.tech }}</h3>
        <li>Arama özelliği geliştirildi.</li>
        <li>Detaylı bilgi penceresine Evrim Ağacı Makale kısayolu eklendi.</li>
        <li>Künyeye Evrim Ağacı Profil bağlantıları eklendi.</li>
        <li>Öğretici tur geliştirildi.</li>
      <br />

      <h3 class="versionNumber">v2.0.0</h3>
        <h3>{{ loc.pages.about.updates.visual }}</h3>
        <li>Hem bilgisayar hem de mobil cihaz ekranlarına uyumlu, iki mod (liste ve tablo) tasarlandı.</li>
        <li>Detaylı element bilgi penceresi tasarımı güncellendi.</li>
        
        <h3>{{ loc.pages.about.updates.tech }}</h3>
        <li>Tablo modunda Modüler sistem geliştirildi. Grup ve Sıcaklık modülleri eklendi.</li>
        <li>Grup Modülü: Blok veya kategori bilgisine göre elementleri filtreleme özelliği.</li>
        <li>Sıcaklık Modülü: Kelvin, Celcius ve Fahrenheit üzerinden sıcaklık belirlenip, elementlerin durumlarını görselleştiren mod.</li>
        <li>Detaylı element bilgi penceresine arama özelliği eklendi.</li>
        <li>Tablo ve Liste modunda arama özelliği eklendi.</li>
        <li>Mobil modda sıcaklık ve arama özellikleri için sanal klavyeler eklendi.</li>
        <li>Sıcaklık filtre özelliği geliştirildi ve varsayılan sıcaklık 25C° (77F°, 298.15K) olarak belirlendi.</li>

      <div class="flex-between">
        <div></div>
        <a id="about_suggestReportLink" href="mailto:info@evrimagaci.org">{{ loc.pages.about.updates.report }}</a>
        <div></div>
      </div>
    </div>

    <div class="flex-between mute">
      <div class="miniNav">
        <!-- <a href="/" @click="purgeSettings('pagetour')">Ayarları sıfırla</a> -->
        <a id="about_pagetourLink" href="/" @click="purgeSettings('pagetour')">Öğretici turu yinele</a>
      </div>
      <a id="about_evrimagaciLink" href="https://evrimagaci.org">Evrim Ağacı © 2022</a>
    </div>
  </div>
</template>

<script>
  import { version } from "../../package.json";
  export default {
    props: {
      loc: Object
    },
    computed: {
      versionNumber() {
        return version
      } 
    },
    methods: {
      purgeSettings(sector) {
        if (sector === 'pagetour') {
          localStorage.setItem('visited_before', 'false')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miniNav a {
    margin-right: 1rem;
  }
  .container {
    color: whitesmoke;
    align-items: center;
    width: 70vw;

    @media screen and (max-width: 720px) {
      width: 90vw;
    }
  }
  .content {
    margin-bottom: .5rem;

    list-style:disc;
    background-color: #232936;
    border-radius: .3rem;
    padding: 2rem;
    h3 {
      margin-bottom: .5rem;
    }
  }
  #updates {
    h3 {
      margin-top: 1rem;
      color: #e5bb09;
    }
    .versionNumber {
      padding: .2rem .5rem;
      background-color: #e5bb09;
      width:max-content;
      border-radius: .3rem;
      font-size: smaller;

      color: black;
    }
  }
  .divider {
    margin: .2rem 0;
  }
  li {
    margin-bottom: .3vw;
  }
  a#about_suggestReportLink::after {
    content: "✉";
    color:#e5bb09;
    margin: 0 3px 0 5px;
  }
  #about_suggestReportLink {
    margin-top: 2vw;
  }
</style>
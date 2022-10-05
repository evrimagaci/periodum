<template>
  <div class="fade container">
    <div class="content">
      <h3 class="text-primary">Periodum Nedir?</h3>
      <hr class="divider">
      <p>Periodum, Evrim Ağacı ve bionluk işbirliğiyle hazırlanan bir kimya platformudur. Platform hakkında daha fazla bilgi <a href="https://evrimagaci.org/periodum-turkiyenin-periyodik-tablosu-simdi-yayinda-11356">buradan</a> alınabilir.</p>
      <p>Sitenin amacı, merkezine periyodik tabloyu alan ve giderek kapsamı genişleyen bir kimya platformuna dönüşmektir.</p>
    </div>

    <div class="content">
      <h3 class="text-primary">Periodum periyodik tablonun temelleri, 2 grubun işbirliği ile atılmıştır:</h3>
      <hr class="divider">
        <li><a href="https://evrimagaci.org/">Evrim Ağacı</a>, Türkiye’nin en büyük ve en çok ziyaret edilen popüler bilim oluşumudur.</li>
        <li><a href="https://bionluk.com/">bionluk</a>; yetenekli, tecrübeli ve yaratıcı freelancer’larla, yenilikçi ve girişimci start-up’ları, kullanışlı ve kolay işleyen online bir platformda bir araya getirerek birlikte çalışmalarına olanak sağlayan bir platformdur.</li>
    </div>

    <div class="content" id="updates">
        <h3 class="text-primary">Güncellemeler (v{{ versionNumber }})</h3>
      <hr class="divider">
      <h3>Görünüş</h3>
      <li>Hem bilgisayar hem de mobil cihaz ekranlarına uyumlu, iki mod (liste ve tablo) tasarlandı.</li>
      <li>Detaylı element bilgi penceresi tasarımı güncellendi.</li>
      
      <h3>Teknolojik</h3>
      <li>Tablo modunda Modüler sistem geliştirildi. Grup ve Sıcaklık modülleri eklendi.</li>
      <li>Grup Modülü: Blok veya kategori bilgisine göre elementleri filtreleme özelliği.</li>
      <li>Sıcaklık Modülü: Kelvin, Celcius ve Fahrenheit üzerinden sıcaklık belirlenip, elementlerin durumlarını görselleştiren mod.</li>
      <li>Detaylı element bilgi penceresine arama özelliği eklendi.</li>
      <li>Tablo ve Liste modunda arama özelliği eklendi.</li>
      <li>Mobil modda sıcaklık ve arama özellikleri için sanal klavyeler eklendi.</li>
      <li>Sıcaklık filtre özelliği geliştirildi ve varsayılan sıcaklık 25C° (77F°, 298.15K) olarak belirlendi.</li>
      <div class="flex-between">
        <div></div>
        <a id="mail" href="mailto:info@evrimagaci.org">Öneri/Sorun Bildir</a>
        <div></div>
      </div>
    </div>

    <div class="flex-between mute">
      <div class="miniNav">
        <!-- <a href="/" @click="purgeSettings('pagetour')">Ayarları sıfırla</a> -->
        <a href="/" @click="purgeSettings('pagetour')">Öğretici turu yinele</a>
      </div>
      <a href="https://evrimagaci.org">Evrim Ağacı © 2022</a>
    </div>
  </div>
</template>

<script>
  import { version } from "../../package.json";
  export default {
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
    display: grid;
    color: whitesmoke;
    align-items: center;
    width: 60vw;

    @media screen and (max-width: 650px) {
      width: 25rem;
    }
  }
  .content {
    margin-bottom: .5rem;

    list-style:disc;
    background-color: #232936;
    border-radius: .5rem;
    padding: 3rem;
  }
  #updates {
    h3 {
      color: #e5bb09;
    }
  }
  .divider {
    margin: .5vw 0;
  }
  li {
    margin-bottom: .3vw;
  }
  a#mail::after {
    content: "✉";
    color:#e5bb09;
    margin: 0 3px 0 5px;
  }
  #mail {
    margin-top: 2vw;
  }
</style>
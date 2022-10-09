<template>
  <div class="fade container">
    <div class="header">
      <h3>{{ loc.pages.credits.project_leaders }}</h3>
    </div>
    <div class="person">
      <img class="image" src="../resources/img/credits/arin_ozkinay.jpg" alt="Nice Uysal | Tasarımcı" />
      <div class="info">
        <h2 class="name">Arın Kutay Özkınay</h2> <h3 class="tag">{{ loc.pages.credits.titles.developer }}</h3>
        <p class="about">Üniversite öğrencisi, grafik tasarımcı ve yazılımcı.</p>
      
        <div class="social">
          <a href="https://evrimagaci.org/arin" target=”_blank”><img :src="this.social.evrimagaci" alt="Evrim Ağacı logo" /></a>
          <a href="https://www.linkedin.com/in/arın-özkınay-747708221/" target=”_blank”><img :src="this.social.linkedin" alt="linkedin logo" /></a>
          <a href="https://twitter.com/arinozk" target=”_blank”><img :src="this.social.twitter" alt="twiiter logo" /></a>
          <a href="https://instagram.com/arinozkinay" target=”_blank”><img :src="this.social.instagram" alt="instagram logo" /></a>
        </div>
      </div>
    </div>
    <div class="person">
      <img class="image" src="../resources/img/credits/eyup_can_akman.jpg" alt="Eyüp Can Akman | Veri Sağlayıcı, Yazılım Geliştirici" />
      <div class="info">
        <h2 class="name">Eyüp Can Akman</h2> <h3 class="tag">{{ loc.pages.credits.titles.data }}, {{ loc.pages.credits.titles.developer }}</h3>
        <p class="about">Yazılımcı, skeptik ve popüler bilim takipçisidir. 2017'den beri Evrim Ağacı'nın teknik sorumlusu olarak görev almaktadır. Evrim Ağacı'nın altyapısından, geliştirilmesinden ve teknik projelerinden sorumludur.</p>
      
        <div class="social">
          <a href="https://evrimagaci.org/eyupcanakman" target=”_blank”><img :src="this.social.evrimagaci" alt="Evrim Ağacı logo" /></a>
          <a href="https://www.linkedin.com/in/eyupcanakman" target=”_blank”><img :src="this.social.linkedin" alt="linkedin logo" /></a>
          <a href="https://twitter.com/eyupcanakman" target=”_blank”><img :src="this.social.twitter" alt="twiiter logo" /></a>
        </div>
      </div>
    </div>
    <div class="person">
      <img class="image" src="../resources/img/credits/cagri_mert_bakirci.jpeg" alt="Çağrı Mert Bakırcı | Bilim Danışmanı" />
      <div class="info">
        <h2 class="name">Çağrı Mert Bakırcı</h2> <h3 class="tag">{{ loc.pages.credits.titles.science_consultant }}</h3>
        <p class="about">Evrim Ağacı’nın kurucusu ve idari sorumlusu. Lisansını 2013 yılında ODTÜ’de, doktorasını 2018 yılında Texas Tech Üniversitesi’nde tamamladı. Ayrıca çok sayıda popüler bilim kitabının yazarı ve/veya editörü. Bilim iletişimi alanındaki çalışmalarına devam ediyor.</p>
      
        <div class="social">
          <a href="https://evrimagaci.org/cagrimertbakirci" target=”_blank”><img :src="this.social.evrimagaci" alt="Evrim Ağacı logo" /></a>
          <a href="https://www.linkedin.com/in/cagrimertbakirci" target=”_blank”><img :src="this.social.linkedin" alt="linkedin logo" /></a>
          <a href="https://twitter.com/cagrimbakirci" target=”_blank”><img :src="this.social.twitter" alt="twiiter logo" /></a>
        </div>
      </div>
    </div>

    <div class="header">
      <h3>{{ loc.pages.credits.sponsor_support }}</h3>
    </div>

    <div class="person">
      <img class="image" src="../resources/img/credits/bionluk_renkli.png" alt="Nice Uysal | Tasarımcı" />
      <div class="info">
        <h2 class="name">bionluk</h2> <h3 class="tag">{{ loc.pages.credits.titles.freelancer_community }}</h3>
        <p class="about">Proje geliştirme sürecindeki yardımlarından ötürü bionluk'a teşekkürler..</p>
      
        <div class="social">
          <a href="https://bionluk.com/" target=”_blank”><img :src="this.social.bionluk" alt="bionluk logo" /></a>
        </div>
      </div>
    </div>

    <div class="person">
      <img class="image" src="../resources/img/credits/nice_uysal.jpg" alt="Nice Uysal | Tasarımcı" />
      <div class="info">
        <h2 class="name">Nice Uysal</h2> <h3 class="tag">{{ loc.pages.credits.titles.designer }}</h3>
        <p class="about">Yıldız Teknik Üniversitesi'nde Görsel İletişim Tasarımı okuduktan sonra çeşitli ajanslara tasarımın farklı alanlarında projeler yaptı. Son yıllarda UI/UX alanında işler üretiyor. Kendisi amatör bir tasarımcı ve profesyonel bir kurabiye canavarı.</p>
      
        <div class="social">
          <a href="http://www.behance.net/pancarkedi" target=”_blank”><img :src="this.social.behance" alt="behance logo" /></a>
          <a href="https://twitter.com/nice_uysal" target=”_blank”><img :src="this.social.twitter" alt="twiiter logo" /></a>
        </div>
      </div>
    </div>
    
    <div class="person">
      <img class="image" src="../resources/img/credits/dilan_ceylan_emektar.jpg" alt="Dilan Ceylan Emektar | Proje Yöneticisi" />
      <div class="info">
        <h2 class="name">Dilan Ceylan Emektar</h2> <h3 class="tag">{{ loc.pages.credits.titles.supervisor }}</h3>
        <p class="about">Kariyerine metin yazarlığı ve topluluk yönetimi ile başlayarak, 9 yılı aşkın süredir farklı endüstrilerde yaratıcı süreçlere odaklanan projelerde yer aldı. Şimdi ise aktif olarak İçerik Pazarlama ve Strateji alanlarında lokal ve global markalar ile çalışmaya devam diyor. Sanata olan tutkusundan markaların hikayelerini inşa etme süreçlerinde faydalanırken, iş yaşamında yaratıcılığın ve disiplinlerarası çalışmaların ön planda olduğu işlere odaklanmayı seviyor.</p>
      
        <div class="social">
          <a href="https://www.linkedin.com/in/dilanceylanemektar/" target=”_blank”><img :src="this.social.linkedin" alt="linkedin logo" /></a>
        </div>
      </div>
    </div>

    <div class="person">
      <img class="image" src="../resources/img/credits/utku_subakan.jpg" alt="Utku Subakan | Proje Yapımcısı" />
      <div class="info">
        <h2 class="name">Utku Subakan</h2> <h3 class="tag">{{ loc.pages.credits.titles.producer }}</h3>
        <p class="about">Kod yazarı, gitarist ve hayalperest. Bionluk ortak kurucu ve yönetici ortağı.</p>
      </div>
    </div>

    <div class="person">
      <img class="image" src="../resources/img/credits/haluk_keskin.jpg" alt="Haluk Keskin | Yazılım Geliştirici" />
      <div class="info">
        <h2 class="name">Haluk Keskin</h2> <h3 class="tag">{{ loc.pages.credits.titles.developer }}</h3>
        <p class="about">Birçok startup ve kurumsal şirketlerde full stack geliştirici rolünde farklı projelerde yer aldı. Şimdi ise Bionluk’ta technical lead.</p>
      
        <div class="social">
          <a href="https://www.linkedin.com/in/halukkeskin/" target=”_blank”><img :src="this.social.linkedin" alt="linkedin logo" /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loc: Object
    },
    data() {
      return {
        social: {
          linkedin: require("../resources/img/credits/linkedin.svg"),
          twitter: require("../resources/img/credits/twitter.svg"),
          behance: require("../resources/img/credits/behance.svg"),
          instagram: require("../resources/img/credits/instagram.svg"),
          bionluk: require("../resources/img/credits/bionluk.png"),
          evrimagaci: require("../resources/img/credits/evrimagaci.svg"),
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  body {
    box-sizing:content-box;
  }
  .container {
    display: grid;
    color: whitesmoke;
    align-items: center;
    width: 25rem;
  }
  .header {
    position: relative;
    margin-bottom: .5rem;

    background-color: #232936;
    border-radius: .3rem;
    padding: 1rem 2rem;
    
    color:#ffce07;
    font-size: large;
    p {
      color: white;
    }
  }
  .person {
    position: relative;
    margin-bottom: .5rem;
    min-height: 226px;

    background-color: #232936;
    border-radius: .3rem;
    padding: 2rem;
  }
  .image {
    position: relative;
    width: 10rem;
    height: 10rem;
    border-radius: .3rem;
    margin-right: 2vw;
  }
  
  .name {
    color:#ffce07;
    margin-top: 1rem;
    font-size: large;
  }
  .tag {
    color:gray;
  }
  .about {
    margin: .5rem 0;
    font-size:medium;
  }

  .social {
    display: flex;
    img {
      height: 32px; width: 32px;
      margin-top: .3rem;
      margin-right: .5rem;
      padding: .1rem;

      &:hover {
        // filter: brightness(2);
        // filter: drop-shadow(0 0 2px black);
        cursor: pointer;
      }
    }
    justify-items: center;
    & > a {
      margin-right: .5rem;
      filter: drop-shadow(0 0 2px rgba(0,0,0,.7));
    }
  }

  @media screen and (min-width: 650px) {
    .container {
      width: 60vw;
    }
    .person {
      display: flex;
    }
    .name {
      margin-top: 0;
    }
  }
</style>
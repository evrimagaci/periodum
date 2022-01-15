# periodium

## Kurulum Bilgileri

```bash
# install dependencies
$ npm install

# copy .env.development as .env file and change database credentials

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

download [db.sql.zip](https://evrimagaci.org/public/periodum/db.sql.zip)



# Yol Haritası

Bu kısımda, Periodum Projesi'nin şu anki durumu ve yapılması gereken güncellemeler ve geleceğe yönelik planlarla ilgili bilgi alabilirsiniz.

*Son Güncelleme: 15 Ocak 2022, 20:45 GMT+3

* **Proje Koordinatörü'nün belirlenmesi:** Bu projenin ihtiyaçlarını yönlendirebilecek ve kendisi Vue.js gibi araçları kullanabilecek bir gönüllü bulmamız gerekiyor.
  * Projenin görünümünü ve kurallarını bizimle birlikte çerçevelendirecek.
  * Proje akışını belirleyecek ve yönlendirecek.
* **Acil İhtiyaçlar:**
  * **Boyutlandırma:** Farklı ekran çözünürlüklerine uyarlama (şu anda belli ekran boyutlarında çalışıyor)
  * **Tarayıcılar:** Farklı tarayıcılardaki tutarsızlıkların giderilmesi (şu anda büyük oranda Chrome özelinde tasarlandı)
    * Firefox'ta sol menüde transparan özellik çalışmıyor.
  * **Mobil:** Mobilde sayfayı çevirmeyi ve mümkünse PC'ye geçmeyi öneriyoruz. Bu kısım geliştirilebilir. 
  * **Detaylı Bilgiler:** Elementlerin üzerine tıklandığında çıkan "Detaylı Bilgi" ekranının tasarımı geliştirilebilir.
* **Öncelikli Geliştirmeler:**
  * Sağ panelde bir bileşiğe ulaşmak biraz zor. Dolayısıyla "Örnek Bileşik" göstermemiz gerekiyor. Örneğin Hidrojen elementi sürüklendiğinde, onunla inşa edilebilecek en basit birkaç bileşik önerilebilir.
  * Dikey ekranlar için bir geliştirme düşünülebilir.

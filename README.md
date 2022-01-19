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

Periodum Veritabanı buradan indirebilirsiniz. [db.sql.zip](https://evrimagaci.org/public/periodum/db.sql.zip)

Her türlü soru, sorun ve destek için için: info@evrimagaci.org

# Geliştirme

## Teknoloji Stackleri
 - Backend: NodeJS (v16.13.0)
 - Frontend: VueJS (v2.6.14)
 - Veritabanı: MYSQL (v8.0.27)

Periodum'u yerel bilgisayarınızda ilgili ve gerekli teknoloji stacklerini yüklemeden sanal ortamda çalıştırmanız için [Docker](https://docker.com/) öneririz. 

Dilerseniz de kendi makinenizde **MYSQL** ve **NodeJS** kurarak da geliştirme yapabilirsiniz.

## Docker
Bilgisayarınızda [Docker](https://docker.com/) kurulu değilse [buradan](https://docs.docker.com/engine/install/) yükleme önergelerini izleyerek kurabilirsiniz.

Docker Container'larini daha kolay ve konfigürasyonlu yönetebilmek için [Docker-Compose](https://docs.docker.com/compose/install/)'a da ihtiyacımız var. Bu adım [Docker Desktop](https://docs.docker.com/desktop/) kullanıcıları için opsiyoneldir. Bu durumda `docker-compose` komutu yerine `docker compose` kullanmanız gerekecektir. ⚠️

Yukarıdaki gereksinimleri tamamladıktan sonra ilgili işletim sisteminiz için aşağıdaki yönergeleri izleyiniz.

### Ortak adımlar

Bilgisayarınıza Periodum [veritabanını](https://evrimagaci.org/public/periodum/db.sql.zip) indirerek, zipli dosyayı istediğiniz bir konuma açın.

Geliştirme ortamı için gerekli parametreleri [dev.env](dev.env) dosyası içinde ayarlayınız.

*MySQL* yönetici parolası için `MYSQL_ROOT_PASSWORD`, ve *Periodum* veritabanı kullanıcı parolası olan `MYSQL_PASSWORD` değişkenlerini dilediğiniz bir parolaya ayarlayınız.

İhtiyaçlarınız doğrultusunda diğer parametreleri de değiştirebilirsiniz.

### Unix tabanlı işletim sistemleri için (MacOS ve Linux Dağıtımları)

1. Önceklikle MySQL container'ini arkaplanda (-d ile) çalıştırın. `docker-compose --env-file ./dev.env up -d db`
1. `docker-compose logs -f db` ile loglara bakip sorunsuz çalıştığından emin olunuz.
1. Daha önce indirmiş olduğunuz Periodum veritabanının `db.sql` dosyasını projedeki `db` klasörüne kopyalabilirsiniz. *`db` klasörü kod versiyonlamada hariç tutulmuştur.*
1. Bir sonraki komut için parameterleri otomatik eklemek için ortam parameterleri hafızaya yükleyelim. `source dev.env`
1. Şimdi Periodum veritabanını MySQL containerimizin içine aktaralım. `docker exec -i periodum_db sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < db/db.sql`
1. Son olarak artık geliştirme ortamınız hazır hale gelecektir. `docker-compose --env-file ./dev.env up app` ile geliştirmeye başlayabilirsiniz. İyi kodlamalar!

### Opsiyonel işlem
Dilerseniz [adminer](https://www.adminer.org/) ile veritabanını içini görüntülemek için `docker-compose --env-file ./dev.env up adminer` komutunu çalıştırabilirsiniz.

### Diğer Docker Komutları
  * `-d` ile containeri _deattached_ olarak çalıştırabilirsiniz.
  * Projenin ana klasöründe iken `docker-compose logs` ile tüm containerların loglarına bakabilirsiniz. `-f` parametresiyle sürekli olarak izleyebilir ya da sonuna _container_ ismini ekleyerek sadece o _container_'a ait logları görüntüleyebilirsiniz.
  Örnek: `docker-compose logs -f app`
  * `docker-compose ps` ile tüm (bu projedeki) çalışan containerlari listeyelebilirsiniz. `-a` ile inaktif olanları da listeyelebilirsiniz.
  * `docker-compose stop` ile tüm containerlari durdurabilirsiniz.
  * `docker-compose rm` ile tüm containerları silebilirsiniz. Sorun yok. :)

  Daha fazlası için Docker [dokümanlarını](https://docs.docker.com/) tavsiye ederiz.

### TLDR;
Tabi `wget` ve `unzip` sizin sorumluluğunuzda :). Onların kurulu olduğunu varsıyorum. Bunlar veritabanını dosyasını otomatik indirmek ve açmak için gereklidir. Tabi o işlemleri manuel olarak da yapabilirsiniz.
```bash
# Projenin ana klasöründe şu komutları çalıştırın \
docker-compose --env-file ./dev.env up -d db && \
# Kasıtlı olarak dosyanın üzerine yazma uygulandı \
wget https://evrimagaci.org/public/periodum/db.sql.zip -P db/ && \
# Kasıtlı olarak dosyanın üzerine yazma uygulandı \
unzip db/db.sql.zip -d db/ && \
source dev.env &&  \
docker exec -i periodum_db sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < db/db.sql && \
echo "Veritabanı içe aktarıldı." \
# Şimdi son adım olan uygulamayı çalıştırıp, kodlamaya başlayalım. \
docker-compose --env-file ./dev.env up app
```
### Troubleshooting
Docker hatalarıyla ilgili bir çok sorunu aşağıdaki komutlarla halledebilirsiniz. Burayı zamanla geliştirebiliriz. Karşılaştığınız hataları bize bildirmeyi ihmal etmeyiniz, lütfen.
 - `docker-compose down` ile containerları durdurup, silebilirsiniz. `db` klasöründeki verileriniz gitmeyecektir.
 - ⚠ Temiz bir kurulum için her zaman güvenle `db` klasörünü silebilirsiniz. `rm -rf db` Ancak; bununla beraber MySQL container'inizin veritabanı ve ayarları da gidecektir.
 
# Yol Haritası

**Projenin geliştirilmesine dahil olmak ve yol haritasını görmek için:** https://github.com/evrimagaci/periodum/projects/1

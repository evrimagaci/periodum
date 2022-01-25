# Periodum: Türkçe ve İnteraktif Periyodik Tablo Projesi

## Önemli Bağlantılar
- **Periodum Periyodik Tablo (Güncel Versiyon):** https://periodum.com/
- **Proje İhtiyaçları & Yol Haritası:** https://github.com/evrimagaci/periodum/projects/1
- **Adobe XD Tasarım Dosyası:** https://dar.vin/4Ksrj

## Kurulum Bilgileri

### Adımlar

1. `mysql` kurulumunu [bu linkten](https://dev.mysql.com/doc/refman/8.0/en/installing.html) tamamlayın.
2. [db.sql.zip](https://evrimagaci.org/public/periodum/db.sql.zip) veri tabanı dosyasını indirin.
3. İndirilen dosyadaki `db.sql` dosyasını projenin ana dizinine çıkartın.
4. Terminalden projenin ana dizinine giderek, `sh setup.sh` komutunu çalıştırın.

### Komutlar
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Test
Testlerimiz için [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library) kütüphanesini kullanıyoruz. Buradan [kopya kağıdına](https://testing-library.com/docs/vue-testing-library/cheatsheet) bakabilir ve [örnek testleri](https://testing-library.com/docs/vue-testing-library/examples) inceleyebilirsiniz. 

Test düzeni ve formatı için [GitLab'ın test stili yönergeleri](https://docs.gitlab.com/ee/development/testing_guide/frontend_testing.html)ni takip ediyoruz.

## [Katkı Yönergeleri](https://github.com/evrimagaci/periodum/blob/main/CONTRIBUTING.md)


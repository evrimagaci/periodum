# Katkı Yönergeleri

Evrim Ağacı sadece okur ve izleyen desteğiyle 2010'dan beri Türkiye'de bilim anlatıcılığı yapan bir ekip. "Bu katkılara neden Github komünite desteğini de eklemeyelim ki?" dedik ve Periodum adını verdiğimiz bu interaktif ve Türkçe periyodik tablo projesini açık kaynak olarak geliştirmeye karar verdik. Siz de Periodum'un Türkiye'de kimya eğitimine yön veren bir kimya platformuna dönüşmesinde rol almak isterseniz, aşağıdaki yönergeleri takip ederek bize yardımcı olabilirsiniz. 

Projeye şu şekillerde destek olabilirsiniz:

- Hataları raporlayabilirsiniz ("issue").
- Kodun mevcut durumunu inceleyebilirsiniz/tartışabilirsiniz.
- Değişim istekleri ("pull request" veya kısaca "PR") gönderebilirsiniz.
- Yeni özellikler önerebilirsiniz.

## Değişiklik Yönergeleri

Değişiklikler için [Github Flow](https://guides.github.com/introduction/flow/index.html)'u takip edeceğiz. Özetle:
1. Repo'yu forklayın ve kendi branch'inizi oluşturun.
2. Test edilmesi gereken bir kod eklediyseniz, uygun testleri ekleyin.
3. Kodunuzun testleri geçtiğinden emin olun.
5. Kodunuzun linterlarda hata vermediğinden emin olun.
6. **PR'larınıza hâlihazırda var olan issue'yu ekleyin; yoksa, yeni bir issue oluşturup öyle ekleyin.**

## Pull Requests (PRs)

Gönderdiğiniz [PR'ları](https://github.com/evrimagaci/periodum/pulls) incelemek ve onaylamak bazen zaman alabiliyor. Yaptığınız katkıların hızlıca onaylanması ve ana koda alınması için bazı önerilerimizi aşağıda bulabilirsiniz.

**1. Kısa Tutun**

PR'ları _olabilecek en az sayıda dosyayı değiştirecek şekilde_ göndermek, inceleme ve onay sürecini hızlandıracaktır. Aynı zamanda değişiklikler ne kadar _hedefe yönelik ve küçük_ olursa, projeyi/kodları okunaklı ve temiz tutmak daha kolay olacaktır.

**2. Kodunuzu İnceleyin**
Taslak olarak bir PR oluşturup, değişikliklerinizi inceleyin. Bu sayede daha en başından muhtemel birçok hatanın önüne geçerek, kodu inceleyecek insanlar için süreci hızlandırabilirsiniz. Aynı zamanda bu adım, -varsa- kodun daha efektif/optimize çalışmasını sağlayabilecek alternatif yaklaşımları bulmayı da kolaylaştıracaktır.

**3. Temizlik**

Kodlarda kalmış olan bazı *görünmez boşluk (white space)*, *kod formatı değişikleri*, *kütüphane içe aktarımları* gibi PR ile alakasız değişikler, git üzerinde şişmelere neden olabildiği gibi, kimi zaman da geliştirme ortamının bozulmasına sebep olabilmektedir. Bu tarz değişikliklerin önüne geçmek için `npm run lint` komutunu çalıştırıp kodunuzu temizlik ve format açısından kontrol edebilirsiniz.

**4. Anlamlı Başlık**

Oluşturacağınız PR için kısa ve değişikliğinizin yaptığı işi iyi özetleyen bir başlık girin. Branch ismini oluştururken verdiğiniz isim, bunu belirlemekte size yardımcı olabilir.

**5. Açıklama**

**Her PR için mutlaka açıklama girin.** Açıklama kısmında;

- Değişiklerinizin ne işe yaradığını ayrıntılı bir biçimde anlatın. 
- İnceleyecekler için notlar ve/veya sorular bırakın. 
- Değişiklerinizi uygulama üstünde nasıl görüp/test edeceğimizi anlatın.
- Mutlaka ekran görüntüsü ve/veya ekran video kaydı gönderin.

**6. Her Yorumu Dikkate Alın**

Periodum projesi açık kaynak bir proje olup; gönüllü insanlarca yürütülmektedir. Yaptığınız değişiklere gelecek yorumların, sizin katkılarınızı eniyileştirmek adına, sizin gibi diğer gönüllü insanlar tarafından yazıldığını unutmayın. İletişimin bir yazılımcıda olması gereken en önemli özellik olduğunu ve bunun da çoğu özelliğimiz gibi kullanıldıkça gelişen bir yapıda olduğuna inanıyoruz/biliyoruz. 

Küfür, hakaret, nefret söylemi, müstehcen içerik bulunan rahatsız edici yorumları [bize bildirebilirsiniz](mailto:info@evrimagaci.org).

## Lisans

Gönderdiğiniz kod değişiklikleri, bütün projeyi de kapsamakta olan [OSL-3.0 License](https://github.com/evrimagaci/periodum/blob/main/LICENSE) altındadır. Bu konuyla ilgili herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz.

## Hata Raporları (Issues)
Uygulamada bulunan [sorunları](https://github.com/evrimagaci/periodum/issues) Github'ın [yeni hata bildir / new issue](https://github.com/evrimagaci/periodum/issues/new) kısmından kolayca bize ulaştırabilirsiniz.

Hataları başarılı olarak inceleyebilmek ve en hızlı şekilde düzeltebilmek için belirli bir şablonda raporlanması gerekmektedir. 

### Hata Raporu Örneği
Şablon olarak kullanabileceğiniz bir örnek için [buraya tıklayın.](https://github.com/evrimagaci/periodum/issues/18)

### Hata Raporu Şablon Açıklaması
Şablon açıklamasını ve ek örnekleri aşağıda bulabilirsiniz.

- **Hata Başlığı**: Hatanın kısaca özetini anlatan bir cümle yazın. Bunu aynı zamanda "issue title" olarak kullanın. Gereğinden fazla spesifik olmayın. Örn: *Sıcaklık kaydırma çubuğu bir kereden sonra çalışmıyor*

- **Açıklama**: Birkaç cümleyle sorunun detaylarını, hatanın sizce neden kaynaklanıyor olabileceğini, denediğiniz çözümleri ve çözüm önerilerini paylaşabilirsiniz. Başlık yeterince açıksa, bu kısmı atlayabilirsiniz. Ne kadar kısa, öz ve açık olursanız o kadar iyi.

- **Hata URL Adresi**: Hatanın hangi URL adresinde meydana geldiğini ekleyin. Örn: *https://periodum.com/bir/url/yolu*

- **Adımlar**: Hatayı alırken izlediğiniz adımları ekleyin. Bu bizim hatayı yakalayabilmemiz için en önemli adım. Örneğin:
    1. *Anasayfa açılıyor.*
    2. *Sıcaklık kaydırma çubuğu hareket ettiriliyor.*
    3. *Çubuk bırakılıyor.*
    4. *Sıcaklık kaydırma çubuğu hareket ettiriliyor.*

- **Beklenen Sonuç vs. Gerçekleşen Sonuç**: Hata alınan veya düzgün çalışmayan modülün veya sayfanın aslında yapması gereken ve gerçekte olan sonucunu yazın. 
Ör: 
    - ***Beklenen Sonuç**: Detaylı Bilgi butonuna basınca, detaylı bilgi penceresi gelmesi gerekiyor.*
    - ***Gerçekleşen Sonuç**: Detaylı Bilgi butonuna basınca, detaylı bilgi penceresi gelmiyor.*

- **Ekran Görüntüsü/Videosu**: Hatayı daha iyi inceleyebilmek için hatanın oluştuğu yerin ekran görüntüsü veya ekran video kaydını ekleyebilirsiniz.

- **Kullanıcı Oturumu**: Hatayı alırken kullandığınız cihazın şu bilgilerini ekleyin:
    - İnternet tarayıcısı ve versiyonu (Örn: *Google Chrome 97.0.4692.71 (Official Build) (64-bit)*)
    - İşletim sistemi ve versiyonunu/yapım numarası (Örn: *Ubuntu 20.04.3 LTS*)

- **Önem Derecesi**: Hatanın uygulamanın çalışmasını ve kullanımını ne kadar etkilediğini yazın.

    - **Kritik (Critical):** Uygulamanın hiç yüklenmediği, uygulamaya erişiminin durduğu veya yüklendiği ancak hiçbir işlemin gerçekleşmediği hatalar için kullanabilirsiniz.
    - **Yüksek (High):** Karşılaşıldığında uygulamanın çalışmasını tamamen veya büyük ölçüde durduran hatalar için kullanabilirsiniz.
    - **Orta (Medium):** Uygulamanın çalışmasını durdurmayan; sadece belirli bir modülün çalışmasını engelleyen hatalar için kullanabilirsiniz. Genelde bu hatalar sayfayı yenilediğinizde veya uygulama içerisinde dolaştığınızda, siz tekrar hatayı aldığınız adımları izleyince kadar yok olur.
    - **Düşük (Low):** Uygulamanın çalışmasını etkilemeyen estetik hataları, resimlerdeki hatalar, konsol uyarıları/hataları için kullanabilirsiniz.

- **Kod Numunesi:** Hatanın gerçekleştiği kod bloğunu veya aynı hataya sebep olan başka bir kod bloğunu yazabilirsiniz.
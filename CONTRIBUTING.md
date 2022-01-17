# Katkı Yönergeleri

Evrim Ağacı'nın sadece sizlerin destekleriyle ilerleyen bir platform olduğunu daha önce birçok kez dile getirdik. Geliştirmekte olduğumuz Periodum projesine katkıda bulunarak bize yardımcı olabilirsiniz. 

Projeye;

- Hataları raporlayarak,
- Kodun durumunu inceleyerek/tartışarak,
- Değişim istekleri(PR) göndererek,
- Yeni özellikler önererek

destek olabilirsiniz.

## Değişiklikler için [Github Flow](https://guides.github.com/introduction/flow/index.html)u Takip Edin

1. Repoyu forklayın ve kendi branchinizi oluşturun.
2. Test edilmesi gereken bir kod eklediyseniz, test ekleyin.
3. Testlerin geçtiğinden emin olun.
5. Kodunuzun linterlarda hata vermediğinden emin olun.
6. **Hata raporunu**(issue) **değişim isteği**nize(PR) ekleyin, hata raporu yoksa oluşturup öyle ekleyin.

## Değişim İstekleri(D.İ.ler) | [PRs](https://github.com/evrimagaci/periodum/pulls)

Gönderdiğiniz **değişim isteklerini**(d.i.) incelemek ve onaylamak bazen zaman alabiliyor. Yaptığınız katkıların hızlıca onaylanması ve ana koda alınması için aşağıdaki maddelerde d.i.ler için önerilerimizi paylaşıyoruz.

### **1. Küçük Tutun**

D.i.leri olabilecek en az sayıda dosyayı değiştirecek şekilde göndermek, inceleme ve onay sürecini hızlandıracaktır. Aynı zamanda değişiklikler ne kadar hedefe yönelik ve küçük olursa, projeyi/kodları okunaklı ve temiz tutmak daha kolay olacaktır.

### **2. Kodunuzu İnceleyin**
Taslak olarak bir d.i. oluşturup, değişikliklerinizi inceleyin. Bu noktada muhtemel birçok hatanın önüne geçerek, süreci kodu inceleyecek insanlar için hızlandırabilirsiniz. Aynı zamanda bu adım, -varsa- kodun daha efektif/optimize çalışmasını sağlayabilecek diğer alternatif yaklaşımları bulmayı da kolaylaştıracaktır.

### **3. Temizlik**

Kodlarda kalmış olan bazı *görünmez boşluk(white space)*, *kod formatı değişikleri*, *kütüphane içe aktarımları* gibi d.i. ile alakasız değişikler, git üzerinde şişmelere neden olabildiği gibi, kimi zaman da geliştirme ortamının bozulmasına sebep olabilmektedir. Bu tarz değişikliklerin önüne geçmek için `npm run lint` komutunu çalıştırıp kodunuzu temizlik ve format açısından kontrol edebilirsiniz.

### **4. Anlamlı Başlık**

Oluşturacağınız d.i. için kısa ve değişikliğinizin yaptığı işi iyi özetleyen bir başlık girin. Branch ismini oluştururken verdiğiniz isim size yardımcı olabilir.

### **5. Açıklama**

D.i.ler için en önemli alanlardan biri olan açıklama kısmında;

- Değişiklerinizin ne işe yaradığını ayrıntılı bir biçimde anlatın. 
- İnceleyecekler için notlar ve/veya sorular bırakın. 
- Değişiklerinizi uygulama üstünde nasıl görüp/test edeceğimizi anlatın.
- Mutlaka ekran görüntüsü ve/veya ekran video kaydı gönderin.

### **6. Her Yorumu Dikkate Alın**

Periodum projesi açık kaynak bir proje olup; gönüllü insanlarca yürütülmektedir. Yaptığınız değişiklere gelecek yorumların, sizin katkılarınızı eniyileştirmek adına, sizin gibi diğer gönüllü insanlar tarafından yazıldığını unutmayın. İletişimin bir yazılımcıda olması gereken en önemli özellik olduğunu ve bunun da çoğu özelliğimiz gibi kullanıldıkça gelişen bir yapıda olduğuna inanıyoruz/biliyoruz. 

Küfür, hakaret, nefret söylemi, müstehcen içerik bulunan rahatsız edici yorumları bize bildirebilirsiniz.

## Yaptığınız Bütün Değişiklikler MIT Yazılım Lisansı(MIT Software License) Altında

Kısaca, gönderdiğiniz kod değişiklikleri, bütün projeyi de kapsamakta olan [MIT Lisansı](http://choosealicense.com/licenses/mit/) altındadır. Bu konuyla ilgili herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz.

## Hata Raporları | [Issues](https://github.com/evrimagaci/periodum/issues)
Uygulamada bulunan sorunları Github'ın [yeni hata bildir](https://github.com/evrimagaci/periodum/issues/new) kısmından kolayca bize ulaştırabilirsiniz.
Hataları başarılı olarak inceleyebilmek ve en hızlı şekilde düzeltebilmek için belirli bir şablonda raporlanması gerekmektedir. 

**Şablon örneğini aşağıda bulabilirsiniz.**

>**Hata Başlığı**: Hatanın kısaca özetini anlatan bir cümle yazın. Bunu aynı zamanda issue title olarak kullanın. Ör *Sıcaklık kaydırma çubuğu bir kereden sonra çalışmıyor*
>
>**Hata URL Adresi**: Hatanın hangi URL adresinde meydana geldiğini ekleyin. Ör: *https://periodum.com/bir/url/yolu*
>
>**Adımlar**: Hatayı alırken izlediğiniz adımları ekleyin. Bu bizim hatayı yakalayabilmemiz için en önemli adım. 
>
>Ör:
>>1. *Anasayfa açılıyor*
>>2. *Sıcaklık kaydırma çubuğu hareket ettiriliyor*
>>3. *Çubuk bırakılıyor*
>>4. *Sıcaklık kaydırma çubuğu hareket ettiriliyor*
>
>**Beklenen Sonuç – Gerçekleşen Sonuç**: Hata alınan veya düzgün çalışmayan modülün veya sayfanın aslında yapması gereken ve gerçekte olan sonucunu yazın. 
Ör: 
>>***Beklenen Sonuç**: Detaylı Bilgi butonuna basınca, detaylı bilgi penceresi gelmesi gerekiyor.*
>>
>>***Gerçekleşen Sonuç**: Detaylı Bilgi butonuna basınca, detaylı bilgi penceresi gelmiyor.*
>
>**Ekran Görüntüsü/Videosu**: Hatayı daha iyi inceleyebilmek için hatanın oluştuğu yerin ekran görüntüsü veya ekran video kaydını ekleyebilirsiniz.
>
>**Kullanıcı Oturumu**: Hatayı alırken kullandığınız;
>- İnternet tarayıcısını ve versiyonunu
>- İşletim sistemini ve versiyonunu/yapım numarasını
>
>ekleyin.
>
>Ör: 
>>- *Google Chrome 97.0.4692.71 (Official Build) (64-bit)*
>>- *Ubuntu 20.04.3 LTS*
>
>**Önem Derecesi**: Hatanın uygulamanın çalışmasını ve kullanımını ne kadar etkilediğini yazın.
>
>>**Kritik (Critical):** Uygulamanın hiç yüklenmediği, uygulamaya erişiminin durduğu veya yüklendiği ancak hiçbir işlemin gerçekleşmediği hatalar için kullanabilirsiniz.
>>
>>**Yüksek (High):** Karşılaşıldığında uygulamanın çalışmasını tamamen veya büyük ölçüde durduran hatalar için kullanabilirsiniz.
>>
>>**Orta (Medium):** Uygulamanın çalışmasını durdurmayan; sadece belirli bir modülün çalışmasını engelleyen hatalar için kullanabilirsiniz. Genelde bu hatalar sayfayı yenilediğinizde veya uygulama içerisinde dolaştığınızda, siz tekrar hatayı aldığınız adımları izleyince kadar yok olur.
>>
>>**Düşük (Low):** Uygulamanın çalışmasını etkilemeyen estetik hataları, resimlerdeki hatalar, konsol uyarıları/hataları için kullanabilirsiniz.
>
>**Açıklamalar:** Hatanın sizce neden kaynaklanıyor olabileceğini, denediğiniz çözümleri ve çözüm önerilerini paylaşabilirsiniz.
>
>**Kod Numunesi:** Hatanın gerçekleştiği kod bloğunu veya aynı hataya sebep olan başka bir kod bloğunu yazabilirsiniz.
>

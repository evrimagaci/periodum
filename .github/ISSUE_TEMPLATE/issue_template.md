---
name: Hata Raporu Şablonu
about: Bir hata raporu oluşturarak Periodum'u geliştirmemize yardımcı olun.
title: ''
labels: bug
assignees: ''

---

**Açıklama**: Birkaç cümleyle sorunun detaylarını, hatanın sizce neden kaynaklanıyor olabileceğini, denediğiniz çözümleri ve çözüm önerilerini paylaşabilirsiniz. Başlık yeterince açıksa, bu kısmı atlayabilirsiniz. Ne kadar kısa, öz ve açık olursanız o kadar iyi.

**Hata URL Adresi**: Hatanın hangi URL adresinde meydana geldiğini ekleyin. Örn: *https://periodum.com/bir/url/yolu*

**Adımlar**: Hatayı alırken izlediğiniz adımları ekleyin. Bu bizim hatayı yakalayabilmemiz için en önemli adım. Örneğin:
  1. *Anasayfa açılıyor.*
  2. *Sıcaklık kaydırma çubuğu hareket ettiriliyor.*
  3. *Çubuk bırakılıyor.*
  4. *Sıcaklık kaydırma çubuğu hareket ettiriliyor.*

**Beklenen Sonuç vs. Gerçekleşen Sonuç**: Hata alınan veya düzgün çalışmayan modülün veya sayfanın aslında yapması gereken ve gerçekte olan sonucunu yazın. 
Ör: 
  - ***Beklenen Sonuç**: Detaylı Bilgi butonuna basınca, detaylı bilgi penceresi gelmesi gerekiyor.*
  - ***Gerçekleşen Sonuç**: Detaylı Bilgi butonuna basınca, detaylı bilgi penceresi gelmiyor.*

**Ekran Görüntüsü/Videosu**: Hatayı daha iyi inceleyebilmek için hatanın oluştuğu yerin ekran görüntüsü veya ekran video kaydını ekleyebilirsiniz.

**Kullanıcı Oturumu**: Hatayı alırken kullandığınız cihazın şu bilgilerini ekleyin:
  - İnternet tarayıcısı ve versiyonu (Örn: *Google Chrome 97.0.4692.71 (Official Build) (64-bit)*)
  - İşletim sistemi ve versiyonunu/yapım numarası (Örn: *Ubuntu 20.04.3 LTS*)

**Önem Derecesi**: Hatanın uygulamanın çalışmasını ve kullanımını ne kadar etkilediğini yazın.

  - **Kritik (Critical):** Uygulamanın hiç yüklenmediği, uygulamaya erişiminin durduğu veya yüklendiği ancak hiçbir işlemin gerçekleşmediği hatalar için kullanabilirsiniz.
  - **Yüksek (High):** Karşılaşıldığında uygulamanın çalışmasını tamamen veya büyük ölçüde durduran hatalar için kullanabilirsiniz.
  - **Orta (Medium):** Uygulamanın çalışmasını durdurmayan; sadece belirli bir modülün çalışmasını engelleyen hatalar için kullanabilirsiniz. Genelde bu hatalar sayfayı yenilediğinizde veya uygulama içerisinde dolaştığınızda, siz tekrar hatayı aldığınız adımları izleyince kadar yok olur.
  - **Düşük (Low):** Uygulamanın çalışmasını etkilemeyen estetik hataları, resimlerdeki hatalar, konsol uyarıları/hataları için kullanabilirsiniz.

**Kod Numunesi:** Hatanın gerçekleştiği kod bloğunu veya aynı hataya sebep olan başka bir kod bloğunu yazabilirsiniz.

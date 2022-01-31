#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

clear
echo "Lütfen mysql root kullanıcı parolanızı girin"
mysql_config_editor set --login-path=periodum --host=localhost --user=root --password --skip-warn >/dev/null

clear
echo "Bu işlem uzun sürebilir! Lütfen ${bold}'Kurulum tamamlandı!'${normal} yazısını görene kadar bekleyin!"

echo ''

echo 'Kurulum yapılıyor...'

echo ''
echo 'Veritabanı oluşturuluyor...'
echo ''
mysql --login-path=periodum -e "CREATE DATABASE periodum /*\!40100 DEFAULT CHARACTER SET utf8 */;" >/dev/null || { echo 'Veritabanı oluşturulamadı!' ; exit 1; }
echo 'Veritabanı oluşturuldu.'
echo ''
echo 'Veritabanı için kullanıcı oluşturuluyor...'
echo ''
mysql --login-path=periodum -e "CREATE USER 'periodum'@'localhost' IDENTIFIED BY '1234Periodum';" >/dev/null || { echo 'Periodum kullanıcısı oluşturulamadı!' ; exit 1; }
echo 'Kullanıcı oluşturuldu.'
echo ''
echo 'Veritabanı kullanıcısı yetkilendiriliyor...'
echo ''
mysql --login-path=periodum -e "GRANT ALL PRIVILEGES ON periodum.* TO 'periodum'@'localhost';" >/dev/null || { echo 'Kullanıcıya izinler sağlanamadı!' ; exit 1; }
echo 'Kullanıcıya tüm izinler verildi.'
echo ''
echo 'Kullancının veritabanındaki izinleri ayarlanıyor...'
echo ''
mysql --login-path=periodum -e "FLUSH PRIVILEGES;" >/dev/null || { echo 'Kullanıcı izinleri yüklenemedi!' ; exit 1; }
echo 'Kullancının izinleri yeniden yüklendi.'
echo ''
echo 'Veritabanına veriler yükleniyor...'
echo ''
mysql --login-path=periodum periodum < ./db.sql >/dev/null || { echo 'Veriler yüklenemedi!' ; exit 1; }
echo 'Veritabanına veriler yüklendi.'
echo ''

# Environment Setup
echo '.env dosyası oluşturuluyor...'
echo ''
cp ./.env.development ./.env >/dev/null || { echo '.env dosyası oluşturulamadı!' ; exit 1; }
echo '.env dosyası oluşturuldu.'
echo ''

# Load packages
echo 'Paketler yükleniyor...'
echo ''
yarn >/dev/null || { echo 'Paketler yüklenemedi!' ; exit 1; }
echo 'Paketler yüklendi.'
echo ''

echo "${bold}Kurulum tamamlandı!${normal} Sonraki adımları takip edebilirsiniz."

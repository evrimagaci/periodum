#!/bin/bash

spin()
{
    sp="/-\|"
    echo -n 'Kurulum yapılıyor  '
    while :
    do
        echo -ne "\b${sp:i++%${#sp}:1}"
        sleep 0.1
    done
}

bold=$(tput bold)
normal=$(tput sgr0)

echo "Lütfen mysql root kullanıcı parolanızı girin"
mysql_config_editor set --login-path=periodum --host=localhost --user=root --password --skip-warn >/dev/null 2>/dev/null

clear
echo "Bu işlem uzun sürebilir! Lütfen ${bold}'Kurulum tamamlandı!'${normal} yazısını görene kadar bekleyin!"

echo ''

spin &

SPIN_PID=$!

mysql --login-path=periodum -e "CREATE DATABASE periodum /*\!40100 DEFAULT CHARACTER SET utf8 */;" >/dev/null 2>/dev/null
mysql --login-path=periodum -e "CREATE USER 'periodum'@'localhost' IDENTIFIED BY '1234Periodum';" >/dev/null 2>/dev/null
mysql --login-path=periodum -e "GRANT ALL PRIVILEGES ON periodum.* TO 'user'@'localhost';" >/dev/null 2>/dev/null
mysql --login-path=periodum -e "FLUSH PRIVILEGES;" >/dev/null 2>/dev/null
mysql --login-path=periodum periodum < ./db.sql >/dev/null 2>/dev/null


# Environment Setup
cp ./.env.development ./.env >/dev/null 2>/dev/null

# Load packages
npm install >/dev/null 2>/dev/null

kill -9 $SPIN_PID
echo -ne '\r'

echo -n "${bold}Kurulum tamamlandı!${normal} Sonraki adımları takip edebilirsiniz."
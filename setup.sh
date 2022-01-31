#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

clear
echo "Please enter your MySQL root password:"
mysql_config_editor set --login-path=periodum --host=localhost --user=root --password --skip-warn >/dev/null

clear
echo "This process might take a while! Please wait until the line: ${bold}'Setup Complete!'${normal}"

echo ''

echo 'Starting Setup...'

echo ''
echo 'Creating Database...'
echo ''
mysql --login-path=periodum -e "CREATE DATABASE periodum /*\!40100 DEFAULT CHARACTER SET utf8 */;" >/dev/null || { echo 'Failed to create Database!' ; exit 1; }
echo 'Database successfully created.'
echo ''
echo 'Creating a new user for Database...'
echo ''
mysql --login-path=periodum -e "CREATE USER 'periodum'@'localhost' IDENTIFIED BY '1234Periodum';" >/dev/null || { echo 'Failed to create User!' ; exit 1; }
echo 'User successfully created.'
echo ''
echo 'Authorizing User...'
echo ''
mysql --login-path=periodum -e "GRANT ALL PRIVILEGES ON periodum.* TO 'periodum'@'localhost';" >/dev/null || { echo 'Failed to authorize User!' ; exit 1; }
echo 'User successfully authorized.'
echo ''
echo 'Adding Database privileges to the User...'
echo ''
mysql --login-path=periodum -e "FLUSH PRIVILEGES;" >/dev/null || { echo 'Failed to add privileges to the User!' ; exit 1; }
echo 'Database privileges successfully added.'
echo ''
echo 'Importing Data to Database...'
echo ''
mysql --login-path=periodum periodum < ./db.sql >/dev/null || { echo 'Failed to import Data!' ; exit 1; }
echo 'Data successfully imported to Database.'
echo ''

# Environment Setup
echo 'Creating .env(Enviorement Variables) file...'
echo ''
cp ./.env.development ./.env >/dev/null || { echo 'Failed to create .env file!' ; exit 1; }
echo '.env file successfully created.'
echo ''

# Load packages
echo 'Installing Packages...'
echo ''
yarn >/dev/null || { echo 'Failed to install Packeges!' ; exit 1; }
echo 'Packages successfully installed.'
echo ''

echo "${bold}Setup Complete!${normal}"
echo ''
echo 'Now you can follow the next steps.'

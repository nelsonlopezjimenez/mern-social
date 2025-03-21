wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc |  gpg --dearmor | sudo tee /usr/share/keyrings/mongodb.gpg > /dev/null
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install mongodb-org

sudo apt-get install wget gpg
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor > packages.mongodb.gpg
sudo install -D -o root -g root -m 644 packages.mongodb.gpg /etc/apt/keyrings/packages.mongodb.gpg
echo "deb [ arch=amd64,arm64 signed-by=/etc/apt/keyrings/packages.mongodb.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
rm -f packages.mongodb.gpg
sudo apt-get install -y mongodb-org

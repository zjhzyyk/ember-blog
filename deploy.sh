yum -y update
yum -y groupinstall "Development Tools"
cd /usr/src
wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
tar zxf node-v0.10.24.tar.gz
cd node-v0.10.24
./configure
make
make install

iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000

printf '[mongodb]\nname=MongoDB Repository\nbaseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/\ngpgcheck=0\nenabled=1' > /etc/yum.repos.d/mongodb.repo
yum -y install mongo-10gen mongo-10gen-server

npm install -g pm2

cd /home
git clone https://github.com/zjhzyyk/ember-blog.git
cd ember-blog
npm install
bower install

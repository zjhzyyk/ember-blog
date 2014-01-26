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

#mongo mongosetup.js
# service mongodb stop
#sed -i "s/^\#auth = true$/auth = true/" /etc/mongod.conf
#service mongodb start
echo "bind_ip = 127.0.0.1" >> /etc/mongod.conf
service mongodb restart

yum -y install ruby
npm install -g grunt-cli
npm install -g bower
yum -y install rubygems
gem update --system
gem install compass

cd /home/yukang
git clone https://github.com/zjhzyyk/ember-blog.git
cd ember-blog
npm install
bower install

NODE_ENV=production forever start app.js

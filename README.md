#Ember blog
This is a blog system by Ember.js, Express.js, and Mongodb. 

[Here is a live demo.](http://yukang.info)

The demo is my personal blog so you won't be able to login and edit. If you want to try all features please follow steps in setup section. Some steps are only necessary for production environment in server. You don't need to do all of them if you only want to try the blog in your localhost.

##Features
* anti xss and csrf
   
   blog contents are filtered by [js-xss](https://github.com/leizongmin/js-xss). A csrf token is generated for every page that contains http request other than Get. [Helmet](https://github.com/evilpacket/helmet) is used to add security http headers to the blog.
* user authentication

   The system checks if the user is logged in at both front end and back end. Password are encrypted before transfering to the server. The server encrpyts password by Bcrypt before storing them into database.
* pagination

   You are able to set the number of blogs in each pages at server/config.js
* inline edit

   tinymce is used for an inline what you see is what you get editor.

##Setup
1. install Node.js, Mongodb and bower.
2. redirect 80 port to 3000 port because running on 80 port needs admin privilege but we are supposed to run by a non-admin user. (for server):
```
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
```
3. setup up your Mongodb to only allow access from localhost (for server):
```
echo "bind_ip = 127.0.0.1" >> /etc/mongod.conf
service mongodb restart
```
4. if you have apache or any other web server installed, please stop them. (for server)
5. login as a non-admin user. (for server)
6. run
```
npm install
bower install
```
to install all dependencies.
7. clone this repostitory to your server, modify security token in /app.js and compile the project by Grunt. For more information, please follow instruction of Grunt. If you only want to try in localhost, you can just switch to production branch.
8. Now you are able run the blog by either node.js, nodemon, forever, or pm2. 
```
NODE_ENV=production forever start app.js
```

##Known issues
Now the blog only fetches data on blogs page and archive page. I will need to let it able to fetch data on each blog page. I will fix this as soon as possible.

If you find any problem in my code or in this README.md, please feel free to contact me at zjhzyyk{at}gmail{dot}com or create an issue in this repository.

##License
This project is released under the MIT License. http://www.opensource.org/licenses/mit-license
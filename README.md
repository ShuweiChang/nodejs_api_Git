# nodejs_api_Git
nodejs_api_Git

# Windows nodejs

should install nodejs windows version


# install npm Module
npm install mysql

npm install request

# Express application generator
Use the application generator tool, express, to quickly create a application skeleton.
Install it with the following command.
$ npm install express-generator -g


Display the command options with the -h option:
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass) (defaults to plain css)
    -f, --force         force on non-empty directory


For example, the following creates an Express app named myapp in the current working directory.
$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www


Then install dependencies:
$ cd myapp 
$ npm install


Run the app (on MacOS or Linux):
$ DEBUG=myapp npm start


On Windows, use this command:
> set DEBUG=myapp & npm start


Then load http://localhost:3000/ in your browser to access the app.
The generated app directory structure looks like the following.
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files

# Keep nodejs app running
If you’d like to follow in my footsteps, install Forever by doing the following:
Install Forever for NodeJS
Shell
1
npm install -g forever
If your site is uploaded and NPM and Forever are configured correctly, it is time to start the NodeJS instance.  If you’re using ExpressJS like I am, run the following command to start a Forever instance:
Start ExpressJS with Forever
Shell
1
forever start ./bin/www

# hapi-jwt-auth-es6
<code>npm install</code>

<code>node bootstrap.js</code>

Project based on https://github.com/auth0-blog/hapi-jwt-authentication

And conversion to ES6 inspired from this article https://scotch.io/tutorials/making-a-restful-api-with-hapi-js


### NOTE ###
This project is just for the purpose of learning Hapijs, JWT and ES6 syntax. The codes that I changed are very minimal. For example
<code>const Hapi = require('hapi')</code> to <code>import Hapi from 'hapi'</code>. Hope this help and feel free to improve the codes (especially the ES6 syntax), as I am still new to these technology.

09-Feb-2017: Add logging utility for server using <code>Good</code>
09-Feb-2017: Add <code>Mongoose.Promise = global.Promise</code> before <code>Mongoose.connect</code> but still got this message: (node:5056) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html when adding new user.
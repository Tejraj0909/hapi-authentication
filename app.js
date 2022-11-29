const Hapi = require("@hapi/hapi");
const Fs = require('fs');
const dotenv = require('dotenv')
dotenv.config()

const init = async () => {
  let server = Hapi.Server({
    port: 3000,
    host: "localhost",
    tls: {
      key: Fs.readFileSync('key.pem'),
      cert: Fs.readFileSync('cert.pem')
    }

  });
  await server.register(require('@hapi/cookie'));
  await server.register(require('hapi-auth-cookie-jwt'));

  //   server.auth.strategy('session', 'cookie', {
  //     cookie: {
  //         name: 'auth',
  //         password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
  //         isSecure: false
  //     }   
  // });

  server.auth.strategy('token', 'jwt-cookie', {
    key: process.env.TOKEN_SECRET

  });
  server.auth.default('token');

  await server.register(require('./routes/user'), {
    routes: {
      prefix: '/user'
    }
  });

  server.start();

  console.log(`Server started at ${server.info.uri}`);
}

init();

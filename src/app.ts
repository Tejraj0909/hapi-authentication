import * as Hapi from '@hapi/hapi';
import { Server, ServerRoute } from '@hapi/hapi';
import appConstants from './utils/appConstants';
import Fs from 'fs';



const init = async () => {
  const server: Server = Hapi.server({
    port: 3000,
    host: 'localhost',
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
    key: appConstants.TOKEN_SECRET
  });
  server.auth.default('token');

  await server.register(require('./routes/user'), {
    routes: {
      prefix: '/user'
    }
  });



  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
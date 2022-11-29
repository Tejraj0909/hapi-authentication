import * as Hapi from '@hapi/hapi';
import { Server, ServerRoute } from '@hapi/hapi';



const init = async () => {
  const server: Server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

//   await server.register(require('hapi-auth-jwt2'));
//   await server.register(require('@hapi/basic'));



  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
import Fastify from 'fastify';
import cors from '@fastify/cors'
import { appRoutes } from './routes';

const app = Fastify();

app.register(cors);
/*app.register(cors, {
  origin: ['http://localhost', 'http://192.168.0.169'], 
  methods: ['GET', 'POST', 'PUT'], 
});
*/
app.register(appRoutes)


app.listen({
  port: 3333,
  //fixar host para testes no mobile 
  //host: '192.168.0.169',
}).then(() => {
  console.log('HTTP Server running')
})


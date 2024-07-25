import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

import { Callback,Handler, Context, APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import * as serverlessExpress from 'aws-serverless-express';
import { Server } from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

let server: Server;

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  /* await app.listen(port); */
  await app.init();
  console.log('serverlessExpress:', serverlessExpress);

  const expressApp = app.getHttpAdapter().getInstance();
  
  const server = serverlessExpress.createServer(expressApp);
  return server;

}


export const handler: Handler = async (event: any, context: Context, callback: Callback ) => {
  try {
    if (!server) {
      server = await bootstrap();
    }
    return serverlessExpress.proxy(server, event, context, 'CALLBACK', callback);
  } catch (error) {
    console.error('Error during handling the request:', error);
    callback(error);
  }
};






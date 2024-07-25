import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  

    const nestLambda = new lambda.Function(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'src/main.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')),
      environment: {
        DATABASE_HOST: process.env.DB_HOST || 'bakerydb.czuueys6ip67.eu-west-1.rds.amazonaws.com',
        DATABASE_PORT: process.env.DB_PORT || '5432', 
        DATABASE_USER: process.env.DB_NAME || '',
        DATABASE_PASSWORD: process.env.DB_PASSWORD || '',
        DATABASE_NAME: process.env.DB_NAME || 'bakerydb',
      },
      timeout: cdk.Duration.seconds(900),
    });


    
    const api = new apigateway.LambdaRestApi(this, 'NestApi', {
      handler: nestLambda,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      }
    });
  }
}

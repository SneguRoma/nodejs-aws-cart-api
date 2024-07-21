import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* const nestLambda = new lambda.Function(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda.zip')), 
      handler: 'dist/src/main.lambda.handler', 
      environment: {
        DATABASE_HOST: 'bakerydb.czuueys6ip67.eu-west-1.rds.amazonaws.com',
        DATABASE_PORT: '5432', 
        DATABASE_USER: 'postgres',
        DATABASE_PASSWORD: 'postgres',
        DATABASE_NAME: 'bakerydb',
      },
    }); */

    const nestLambda = new lambda.Function(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'src/main.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')),
      environment: {
        DATABASE_HOST: 'bakerydb.czuueys6ip67.eu-west-1.rds.amazonaws.com',
        DATABASE_PORT: '5432', 
        DATABASE_USER: 'postgres',
        DATABASE_PASSWORD: 'postgres',
        DATABASE_NAME: 'bakerydb',
      },
    });

    
    /* new apigateway.LambdaRestApi(this, 'NestApi', {
      handler: lambdaFunction,
    }); */

    
    const api = new apigateway.LambdaRestApi(this, 'NestApi', {
      handler: nestLambda,
    });
  }
}

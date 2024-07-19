import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestLambda = new lambda.Function(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')), 
      handler: 'main.lambda.handler', // Укажите правильный путь к handler
      environment: {
       
      },
    });

    
    const api = new apigateway.LambdaRestApi(this, 'NestApi', {
      handler: nestLambda,
    });
  }
}

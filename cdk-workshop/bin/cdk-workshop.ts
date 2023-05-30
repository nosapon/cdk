#!/usr/bin/env node
// このスクリプトをNode.js環境で実行するための設定

import * as cdk from 'aws-cdk-lib';
// AWS CDKのライブラリをインポート。これによりAWSの各種リソースをプログラムで操作できるようになる

import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';
// '../lib/cdk-workshop-stack' ファイルからCdkWorkshopStackクラスをインポート

const app = new cdk.App();
// CDKアプリケーションのインスタンスを生成。これはAWSのリソースをデプロイするための基盤となる

new CdkWorkshopStack(app, 'CdkWorkshopStack');
// CdkWorkshopStackクラスの新しいインスタンスを生成し、appというCDKアプリケーションを親として関連づける。
// 'CdkWorkshopStack' はこのスタックの一意な識別子

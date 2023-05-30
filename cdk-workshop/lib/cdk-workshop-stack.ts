import { Duration, Stack, StackProps } from 'aws-cdk-lib';
// AWS CDKの基本的なクラスと機能をインポートします。
// StackはAWSリソースの集合を定義するクラス、
// StackPropsはスタックのオプションやプロパティを定義するためのインターフェイス、
// Durationは時間の長さを表現するためのユーティリティクラスです。
import * as sns from 'aws-cdk-lib/aws-sns';
// AWS SNSを操作するためのCDKのクラスと関数をインポートします。
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
// SNSのサブスクリプションを管理するためのCDKのクラスと関数をインポートします。
import * as sqs from 'aws-cdk-lib/aws-sqs';
// AWS SQSを操作するためのCDKのクラスと関数をインポートします。
import { Construct } from 'constructs';
// ConstructはAWSのリソースなどのクラスのベースとなるクラスです。全てのCDKクラスはConstructを継承しています。


// CdkWorkshopStackという新しいクラスを定義します。
// このクラスはStackクラスを継承しており、AWSのリソースの集合を定義します。
export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) { // スタックのコンストラクタ。スタックが作られるときに呼ばれます。
    super(scope, id, props);  // スコープ（親コンストラクト）、ID、プロパティを引数にとります。

    // 新しいSQSキューを作成します。
    // 'CdkWorkshopQueue'はこのキューの一意な識別子で、
    // visibilityTimeoutはメッセージがキューに入ってから消費されるまでの時間を定義します。
    const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
      visibilityTimeout: Duration.seconds(300)
    });
    
    // 新しいSNSトピックを作成します。'CdkWorkshopTopic'はこのトピックの一意な識別子です。
    const topic = new sns.Topic(this, 'CdkWorkshopTopic');
    
    // 作成したSNSトピックに、作成したSQSキューをサブスクリプションとして追加します。
    // これにより、トピックにメッセージが投稿されると、そのメッセージがSQSキューに自動的に送られるようになります。
    topic.addSubscription(new subs.SqsSubscription(queue));
    }
}

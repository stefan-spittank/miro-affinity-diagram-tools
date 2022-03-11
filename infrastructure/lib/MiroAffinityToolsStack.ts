import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";

export class MiroAffinityToolsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pluginBucket = new s3.Bucket(this, "MiroAffinityToolsBucket", {
      bucketName: `miro-affinity-tools-${this.account}-${this.region}`,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const cloudFrontSecurityHeadersFunction = new cloudfront.Function(
      this,
      "CFSecurityHeadersFunction",
      {
        functionName: `${this.region}-CFSecurityHeaders`,
        code: cloudfront.FunctionCode.fromFile({
          filePath: "./lib/cloudfront-functions/securityHeaders.js",
        }),
      }
    );

    const myHostedZone = new HostedZone(this, "MiroAffinityToolsZone", {
      zoneName: "miro-affinity-tools.codecentric.io",
    });

    const certificate = new DnsValidatedCertificate(
      this,
      "MiroAffinityToolsCertificate",
      {
        domainName: "miro-affinity-tools.codecentric.io",
        hostedZone: myHostedZone,
        region: "us-east-1",
      }
    );

    new cloudfront.Distribution(this, "MiroAffinityToolsDistribution", {
      defaultRootObject: "index.html",
      domainNames: ["miro-affinity-tools.codecentric.io"],
      certificate,
      defaultBehavior: {
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        origin: new S3Origin(pluginBucket),
        functionAssociations: [
          {
            function: cloudFrontSecurityHeadersFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_RESPONSE,
          },
        ],
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
    });
  }
}

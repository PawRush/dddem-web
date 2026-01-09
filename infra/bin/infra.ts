#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { execSync } from "child_process";
import { FrontendStack } from "../lib/stacks/frontend-stack";
import { PipelineStack } from "../lib/stacks/pipeline-stack";

const app = new cdk.App();

const getDefaultEnvironment = (): string => {
  try {
    const username = process.env.USER || execSync("whoami").toString().trim();
    return `preview-${username}`;
  } catch {
    return "preview-local";
  }
};

const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || "us-east-1";

const codeConnectionArn = app.node.tryGetContext("codeConnectionArn");
const repositoryName = app.node.tryGetContext("repositoryName") || "PawRush/dddem-web";
const branchName = app.node.tryGetContext("branchName") || "main";

// If CodeConnection provided, deploy pipeline stack
if (codeConnectionArn) {
  new PipelineStack(app, "DDDEMWebPipelineStack", {
    env: { account, region },
    description: "CI/CD Pipeline for DDD East Midlands Web",
    codeConnectionArn,
    repositoryName,
    branchName,
    terminationProtection: true,
  });
} else {
  // Otherwise deploy frontend stacks directly
  const environment = app.node.tryGetContext("environment") || getDefaultEnvironment();
  const buildOutputPath = app.node.tryGetContext("buildPath") || "../out";

  new FrontendStack(app, `DDDEMWebFrontend-${environment}`, {
    env: { account, region },
    environment,
    buildOutputPath,
    description: `DDD East Midlands static website hosting - ${environment}`,
    terminationProtection: environment === "prod",
  });
}

cdk.Tags.of(app).add("Project", "DDDEMWeb");
cdk.Tags.of(app).add("ManagedBy", "CDK");

---
published: true
title: Deploy .NET 6 Minimal API to AWS Lambda via GitHub
date: 2022-03-21T08:00:00.000Z
author: fabiocozzolino
layout: post
permalink: /deploy-net-6-minimal-api-to-aws-lambda/
image: /assets/img/headline/Dotnet-on-AWS-1024x652.png
tags:
  - .NET 6
  - Serverless
  - AWS
  - Lambda
  - GitHub
  - DevOps
---
<p align="center">
  <img src="/assets/img/headline/Dotnet-on-AWS-1024x652.png" alt="Create the pipeline">
</p>

Serverless currently is for sure one of the most popular words of the last few years, at least in the Cloud Computing world. But, what does it mean? This is one of the most simple definitions I found: 
> Serverless is a cloud-native development model that allows developers to build and run applications without having to manage servers 
> ([RedHat](https://www.redhat.com/en/topics/cloud-native-apps/what-is-serverless)). 

So, this means that servers are still there (fiuuu...). 

Serverless doesn't mean "without server", but it is more related to ownership of resources, load balancing, scalability, and the other server things that a developer doesn't need to manage. Servers technologies are abstracted away from development.

AWS currently has a lot of services useful to implement serverless applications. One of the most well knows is AWS Lambda. An AWS Lambda is composed of two-part: a function, the code and runtime that process events, and a trigger, the AWS service or application that causes the function execution. In this post we are going to see out to deploy an AWS Lambda function developed with the new .NET 6 Minimal API, using GitHub as a source repository.

# Toolbox
Before we get into the steps, a few words about the AWS services and tools we are going to use:
* AWS Lambda: _a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers_. One of the most important points is that you _only pay for what you use_, which in that case means that you only pay for the execution time. More info at the [official page](https://aws.amazon.com/lambda/).
* AWS CodePipeline: _a fully managed continuous delivery service. With CodePipeline you can automate the build and deploy service_. Check the [official page](https://aws.amazon.com/codepipeline/).
* AWS Lambda Tools for .NET Core: a set of commands to create and deploy .NET-based Lambda applications. See [here](https://github.com/aws/aws-lambda-dotnet) for more info.
* GitHub: the git repository that we are going to use for our source code. You can use what you prefer, like Bitbucket.
* Visual Studio Code: the cross-platform editor to write our .NET AWS Lambda application.

So, now let's start and see what happens.

# Create the .NET Lambda serverless project
The .NET Core CLI is the easiest way to create a .NET Lambda project. As always, you need to use the predefined AWS Lambda .NET Project templates with the `dotnet new` command. First, if you need to install the templates, open your command line tool, or terminal on macOS, and use the `dotnet new -i` command to install the Lambda Project Templates:

``` 
dotnet new -i Amazon.Lambda.Templates
``` 

after the installation was completed, you can proceed with creating the project. So, in your command line program, go to the base directory of your repository and use the `serverless.AspNetCoreMinimalAPI` as shown here:

``` 
dotnet new serverless.AspNetCoreMinimalAPI -n myAwesomeLambda
``` 

the project is now ready. Under the folder `src/myAwesomeLambda`, in the `Program.cs`, you'll find all the useful code to run your _Minimal API_. You can change the code and implement the APIs based on your needs. 

# Setup your project for AWS CodePipeline
For this post, it is useful to look at these two specific files created by the serverless template:

- `aws-lambda-tools-defaults.json`
- `serverless.template`

the `aws-lambda-tools-defaults.json` contains all the deployment info that you can use in the command line to deploy the lambda function. We'll see the command line instruction later. The `serverless.template`, instead, is the JSON template that allows the creation of the serverless service by using _AWS CloudFormation_. you can find more info [here](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/lambda-cli-publish.html). In this article we are going to use only the AWS Lambda Tools for .NET Core.

As seen in the [previous post](/deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/), we need to use the `buildspec.yml` file to build our solution by using AWS CodePipeline. Before we can proceed with the build and deploy command, we need to be sure that all the CLI are correctly installed on the build machine. To do that, we first need to install the latest dotnet version and then install, or update, the `Amazon.Lambda.Tools` by using the `dotnet tool update` command, as you can see in the following file `buildspec.yml` file:

``` yaml
version: 0.2

phases:
    install:
        commands:
            - /usr/local/bin/dotnet-install.sh --channel LTS
            - dotnet tool update -g Amazon.Lambda.Tools
            
    build:
        commands:
            - dotnet lambda deploy-function myAwesomeLambda --project-location ./src/myAwesomeLambda/ --function-role myAwesomeLambdaRole --config-file aws-lambda-tools-defaults.json
```

The `dotnet lambda deploy-function` is the command you can call to build, package, and deploy your AWS Lambda function written in .NET. As written above, all the options specified here can be set also in the `aws-lambda-tools-defaults-json` file. Here is an example:

``` json
{
  "profile": "default",                                                            
  "region": "eu-west-1",                                                           
  "configuration": "Release",                                                      
  "function-runtime": "dotnet6",                                               
  "function-memory-size": 256,                                                     
  "function-timeout": 30,                                                          
  "function-handler": "myAwesomeLambda", 
  "s3-prefix": "myAwesomeLambda/"
}
```

Now we can push our first repository version and then start configuring our `AWS CodePipeline`.

# Configuring and building the AWS CodePipeline
In a very similar way to what we have done in the [previous post](/deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/), we are going to create our _AWS CodePipeline_ to build and publish the .NET AWS Lambda function and publish. The _AWS CodePipeline_ will pull the source code from GitHub and pass the artifact to the build server. 

So, first of all, we need to go to _CodePipeline_ section on our _AWS Console_, and click the _Create Pipeline_ button:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_1.png" alt="Create the pipeline">
</p>

Define the Pipeline name and click on _Next_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_2.png" alt="Select the source">
</p>

Select _GitHub (Version 2)_ as _Source provider_. Then create a new GitHub connection by clicking on _Connect to GitHub_ button:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_3.png" alt="Connect to GitHub">
</p>

## Configure the GitHub connection
To use GitHub as a source, we first need to connect to our account. So on this page, set a name for the new connection and click _Connect to GitHub_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_4.png" alt="Set the connection name">
</p>

Click _Install a new app_ to install _AWS Connector for GitHub_ on your GitHub account and follow the instructions on the page. Then click _Connect_ to complete this step:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_5.png" alt="Install AWS Connector for GitHub">
</p>

Now you can complete the GitHub source configuration by selecting the Repository and the Branch name and clicking to _Next_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_6.png" alt="Configure GitHub repository and branch">
</p>

## Setting up the build stage
After defining the source code repository, we need to create the build stage. In our project, we select _AWS CodeBuild_ as the engine for the build. Specify your preferred region and create a new build project by clicking _Create project_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_7.png" alt="Create the build project">
</p>

Here, after setting the _Project name_, go to the _Environment_ section and choose _Ubuntu_ as the operating system, as you can see in the image below:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_8.png" alt="Select the operating system for build">
</p>

Make sure that the _Use a buildspec file_ option is already selected in the _Buildspec_ section. As above specified, we are going to use the `buildspec.yml`:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_9.png" alt="Use a buildspec file">
</p>

## Define the Deploy stage
Since the deployment is made by the build server, we don't need to set the _Deploy_ stage, so we can skip this step.

# Run the pipeline
We are ready. Now we can push our code to the remote repository and start the pipeline. At this time, you could encounter this error message:

```
Error creating Lambda function: User: arn:aws:sts::assumed-role/build-role/AWSCodeBuild-xxx is not authorized to perform: iam:PassRole on resource: arn:aws:iam::xxx:role/myAwesomeLambdaRole because no identity-based policy allows the iam:PassRole action
```

To solve the issue, we need to assign the `iam:PassRole` permission to the running role of codebuild. So, go to IAM > Roles, select the role created for the AWS CodeBuild service, then create a specific policy by clicking on _Add permission_ > _Create inline policy_:

<p align="center">
  <img src="/assets/img/lambda_net_addpermission.png" alt="Add permission">
</p>

and then select the rules as in the following image (be sure to have the target Lambda service role ARN):

<p align="center">
  <img src="/assets/img/lambda_net_inlinepolicy.png" alt=".NET on Lambda inline policy">
</p>

After a few minutes, you can go to the AWS Lambda console section and test your running code.

# Test your Lambda function
Now all the things are ready. Based on our configuration, the pipeline runs after each change in the GitHub source repository. In the end, you can go to the Lambda section, select your Lambda function instance and check if it is running fine.
In AWS console, you can also test your Lambda function. Simply click on Test tab and select your preferred template from the list:

<p align="center">
  <img src="/assets/img/lambdanet_testtemplate.png" alt="Lambda test template selection">
</p>

The simpler way to test the Lambda function is by using the _API Gateway AWS Proxy_ template. Our Lambda function is built to reply to HTTP requests. An HTTP request can be made internally in your private network or could come from an external client, through an API Gateway. We'll see this alternative way in the next post. 
For the sake of this post, to test the call, we can use the following JSON document and set all the attributes useful to execute the request by invoking the HTTP GET method:

``` json
{
  "body": "",
  "resource": "/{proxy+}",
  "path": "/",
  "httpMethod": "GET"
}
```

Now you can push the _Test_ button on upper right corner and see the result:

<p align="center">
  <img src="/assets/img/lambdanet_testresult.png" alt="Lambda test result">
</p>

As always, any feedback is welcome!

Enjoy!

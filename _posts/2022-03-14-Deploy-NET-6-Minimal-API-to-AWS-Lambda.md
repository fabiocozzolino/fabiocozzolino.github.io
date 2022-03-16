---
published: false
title: Deploy .NET 6 Minimal API to AWS Lambda via GitHub
date: 2022-03-14T08:00:00.000Z
author: fabiocozzolino
layout: post
permalink: /deploy-net-6-minimal-api-to-aws-lambda/
feature-img: /assets/img/headline/Dotnet-on-AWS-1024x652.png
tags:
  - .NET 6
  - Serverless
  - AWS
  - Lambda
  - GitHub
  - DevOps
---
Serverless is currently one of the most used word. Period. But, what does it means? Wikipedia say that serverless "is a cloud computing execution model in which the cloud provider allocates machine resources on demand, taking care of the servers on behalf of their customers". It's important to underline that serverless don't mean "without server" because server is still used to host our applications, but in that case we don't care things like resources management, load balancing, and scalability.

In this post we are going to see out to deploy an AWS Lambda function developed with the new .NET 6 Minimal API, using GitHub as a source repository.

# Toolbox
Before we get into the steps, a few words about the AWS services we will be using:
* AWS Lambda: _a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers. You can trigger Lambda from over 200 AWS services and software as a service (SaaS) applications, and only pay for what you use_. More info at the [official page](https://aws.amazon.com/lambda/).
* AWS API Gateway: _the "front door" for applications to access data, business logic, or functionality from your backend services_. Go to the [official page](https://aws.amazon.com/api-gateway/) to get more info.
* AWS CodePipeline: _a fully managed continuos delivery service. With CodePipeline you can automate the build and deploy service_. More info at the [official page](https://aws.amazon.com/codepipeline/).
* AWS .NET Core CLI: a set of command to create and deploy .NET-based Lambda applications. More info [here](https://docs.aws.amazon.com/lambda/latest/dg/csharp-package-cli.html).
* GitHub: the git repository that we are going to use for our source code. You can use what you prefer, like Bitbucket.
* Visual Studio Code: the cross-platform editor to write our .NET AWS Lambda application.

# Create the .NET Lambda serverless project
To create the .NET Lambda project, you can use the AWS .NET Core CLI. So we first needs to install the required templates:

``` 
dotnet new -i Amazon.Lambda.Templates
``` 

after installing was completed, we can proceed with creating the project. So, open your command line program and go on the base directory of your repository and then, by using the `serverless.AspNetCoreMinimalAPI` and the `dotnet new` command:

``` 
dotnet new serverless.AspNetCoreMinimalAPI -n myAwesomeLambda
``` 

the project is now ready. Under the folder `src/myAwesomeLambda`, in the `Program.cs`, you'll find all the useful code to run your _Minimal API_. Obviuously, you can change the code and implement the API that you need. 
For the purpose of this post, it is useful to look at these two specific files created by the serverless template:

- `aws-lambda-tools-defaults.json`
- `serverless.template`

the `aws-lambda-tools-defaults.json` contains all the deployment info that you can use in command line to deploy the lambda function. We'll see the command line istruction later. The `serverless.template`, instead, is the json template that allows the creation of the serverless service by using AWS CloudFormation. However, in this article we are going to use only the AWS .NET Core CLI.

As seen in the [previous post](/deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/), we need to use the `buildspec.yml` file to build our solution by using AWS CodePipeline. Before we can proceed with the build and deploy command, we need to be sure that all the CLI are correctly installed on build machine. To do that, we first need to install the latest dotnet version, and then install, or update, the `Amazon.Lambda.Tools` by using the `dotnet tool update` command, as you can see in the following file `buildspec.yml` file:

``` yaml
version: 0.2

phases:
    install:
        commands:
            - /usr/local/bin/dotnet-install.sh --channel LTS
            - dotnet tool update -g Amazon.Lambda.Tools
            
    build:
        commands:
            - dotnet lambda deploy-function myAwesomeLambda --project-location ./src/myAwesomeLambda/ --function-role myAwesomeLambdaRole --region eu-west-1 --function-runtime dotnet6 --config-file aws-lambda-tools-defaults.json
```

The `dotnet lambda deploy-function` is the command you can call to build, package, and deploy your AWS Lambda function written in .NET. As written above, all the options specified here can be set in the `aws-lambda-tools-defaults-json` file. Here is an example:

``` json
{
  "profile":"default",                                                            
  "region" : "eu-west-1",                                                           
  "configuration" : "Release",                                                      
  "function-runtime":"6",                                               
  "function-memory-size" : 256,                                                     
  "function-timeout" : 30,                                                          
  "function-handler" : "myAwesomeLambda", 
  "s3-prefix": "myAwesomeLambda/"
}
```

Now we can push our first repository version and then start configuring our `AWS CodePipeline`.

# Configuring and building the AWS CodePipeline
In a very similar way to what we have done in the [previous post](/deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/), we are going to create our _AWS CodePipeline_ to build and publish the .NET AWS Lambda function and publish. The _AWS CodePipeline_ will pull the source code from GitHub and pass the artifact to the build server. So, first of all, we need to go to _CodePipeline_ and click the _Create Pipeline_ button:

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
Since the deployment is made by the build server, we doesn't need to set the _Deploy_ stage, so we can skip this step.

# Run the pipeline
We are ready. Now we can push our code on the remote repository and start the pipeline. After some minutes, you can go on AWS Lambda console section and test your running code.

Now all the things are ready. Based on our configuration, the pipeline runs after each change in the GitHub source repository. At the end, you can go to the Elastic Beanstalk instance, click on the instance urls, and enjoy your Blazor WASM app:

<p align="center">
  <img src="/assets/img/blazoraws_result_1.png" alt="Blazor app running on AWS">
</p>

As always, any feedback is welcome!

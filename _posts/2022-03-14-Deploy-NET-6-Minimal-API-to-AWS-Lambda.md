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

# Create the project on local machine
First, we create the Beanstalk project that will host the application. In the AWS console, we can search for _Beanstalk_ and select the appropriate scope:

<p align="center">
  <img src="/assets/img/blazoraws1.png" alt="Select the AWS Elastic Beanstalk">
</p>

To run our Blazor application on AWS, we need to create a new Windows environment in the Elastic Beanstalk section. To do this, click on _Create a new environment_:

<p align="center">
  <img src="/assets/img/blazoraws2.png" alt="Create a new environment">
</p>

then select _Web server environment_:

<p align="center">
  <img src="/assets/img/blazoraws3.png" alt="Select environment tier">
</p>

and finally, after setting the name, we need to set the _.NET on Windows Server_ platform:

<p align="center">
  <img src="/assets/img/blazoraws5.png" alt="Select the environment platform">
</p>

Be sure to leave _Sample Application_ selected on _Application Code_, this is a good starting point to have a preconfigured environment, and then click the _Create environment_ button at the bottom of the page. After a few minutes the environment is ready and we can start the next step: building the pipeline.

# Build with AWS CodePipeline
With _CodePipeline_, you can create your build pipeline on AWS, pull source code from GitHub, and deploy all artifacts to _Elastic Beanstalk_. Now go to _CodePipeline_ and click the _Create Pipeline_ button:

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

Make sure that the _Use a buildspec file_ option is already selected in the _Buildspec_ section. This file is needed for configuring the build phase in the Blazor project. We'll talk about the `buildspec.yml` file later:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_9.png" alt="Use a buildspec file">
</p>

## Define the Deploy stage
At the end of the pipeline, all artifacts in our environment must be deployed. So, configure the deployment phase for AWS Elastic Beanstalk, as you can see in the figure below:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_10.png" alt="Create the deploy stage">
</p>


# Configure the Blazor project
The final step is project configuration. AWS CodeBuild, which is used by AWS CodePipeline, requires a set of specific instructions to build your project. All of these instructions must be written in the `buildspec.yml`, a build specification file. This file must be located in the root directory of your source code. For more information about this file, see the [following page](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html).

To build a Blazor project, I found the following 'buildspec.yml' very useful and simple:

``` yaml
version: 0.2

phases:
    install:
        commands:
            - /usr/local/bin/dotnet-install.sh --channel LTS
            
    build:
        commands:
            - dotnet build -c Release ./BlazorOnAWS.csproj
            - dotnet publish -o dist
            
artifacts:
    files:
        - dist/**/*
        - aws-windows-deployment-manifest.json
```

The above file consists of two main parts: the phase definition and the artifact output. In the phase definition, we first need to be sure that the latest .NET versions is already installed. Unfortunately, the images used in AWS CodeBuild don't currently support .NET 6. Therefore, we need to use the `dotnet-install.sh` command to install it just before the build commands. For more information about the script, see [this page](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script).
After the installation phase is complete, the build phase runs the `dotnet build` and the `dotnet publish` commands and copies the output to the `dist`, the custom output folder.
The final step is to create a package with the output from the `dist/**/*` directory and the `aws-windows-deployment-manifest.json` file, which the Elastic Beanstalk Windows container reads to determine how to deploy the application. Here's the content of the file I used in my example:

``` json
{
    "manifestVersion": 1,
    "deployments": {
        "aspNetCoreWeb": [
        {
            "name": "test-dotnet-core",
            "parameters": {
                "appBundle": "dist",
                "iisPath": "/",
                "iisWebSite": "Default Web Site"
            }
        }
        ]
    }
}
```

The manifest file, stored in the generated artifact as a zip file, indicate the `dist` folder as `appBundle`, giving instruction on AWS Elastic Beanstalk on how to deploy the application. More info about the file specification are available [here](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/deployment-beanstalk-custom-netcore.html).

# Run the app
Now all the things are ready. Based on our configuration, the pipeline runs after each change in the GitHub source repository. At the end, you can go to the Elastic Beanstalk instance, click on the instance urls, and enjoy your Blazor WASM app:

<p align="center">
  <img src="/assets/img/blazoraws_result_1.png" alt="Blazor app running on AWS">
</p>

As always, any feedback is welcome!

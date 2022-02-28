---
published: true
title: Deploy .NET 6 Blazor WebAssembly on AWS Elastic Beanstalk
date: 2022-02-28T08:00:00.000Z
author: fabiocozzolino
layout: post
permalink: /deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/
tags:
  - Blazor
  - WebAssembly
  - AWS
  - Elastic Beanstalk
---
This post is the first in a new series looking at .NET on AWS. Why AWS? The answer is ... why not! Perhaps not everyone knows that .NET is a first class citizen on AWS. Right after the Java SDK, .NET SDK was one of the first SDKs released in early 2010.

In this post, we will explore one of the alternative ways to deploy a Blazor WebAssembly application on AWS Elastic Beanstalk. We will use GitHub as the repository and AWS CodePipeline to retrieve the source code, build the project, generate the required artifacts, and then deploy it to the AWS Elastic Beanstalk instance. And the target framework for the project is .NET 6.

Before we get into the steps, a few words about the AWS services we will be using:
* AWS Elastic Beanstalk: an easy-to-use service for deploying and scaling web applications and services. This means that we can simply work on our code and the engine automatically handles the environment stuff needed to successfully execute the application, like deployment, capacity, load balancing, auto-scaling, and things like that. If you prefer, you can also modify all the environment settings to better fit your needs. More info at the [official page](https://aws.amazon.com/elasticbeanstalk/?nc1=h_ls).
* AWS CodePipeline: a fully managed continuos delivery service. With CodePipeline you can automate the build and deploy service. More info at the [official page](https://aws.amazon.com/codepipeline/?nc1=h_ls).

# Create the AWS Elastic Beanstalk instance
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

---
published: true
title: Deploy .NET 6 Blazor WebAssembly on AWS Elastic Beanstalk
date: 2022-02-23T21:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/
tags:
  - Blazor
  - WebAssembly
  - AWS
  - Beanstalk
---
> This post is the first of a new series dedicated to .NET on AWS. Maybe not everyone knows that .NET is a first-class citizen on AWS. Just after the Java SDK, the .NET SDK was one of the first SDKs released in early 2010.

In this post, we are going to explore one of the alternatives ways to deploy a Blazor WebAssembly application on AWS Elastic Beanstalk. We'll use GitHub as repository and AWS CodePipeline to retrieve source, build the project, create the necessary artifacts, and then deploy it to the AWS Elastic Beanstalk instance. And project target framework is .NET 6.

Before going in the different steps, just few words about the AWS services we are going to use:
* AWS Elastic Beanstalk: an easy-to-use service for deploying and scaling web applications and services. This means that we can simply work on our code and the engine automatically handles the environment stuff needed to successfully execute the application, like deployment, capacity, load balancing, auto-scaling, and things like that. If you prefer, you can also modify all the environment settings to better fit your needs. More info at the [official page](https://aws.amazon.com/elasticbeanstalk/?nc1=h_ls).
* AWS CodePipeline: a fully managed continuos delivery service. With CodePipeline you can automate the build and deploy service. More info at the [official page](https://aws.amazon.com/codepipeline/?nc1=h_ls).

# Create the AWS Elastic Beanstalk instance
First of all, we'll create the Beanstalk project that will be the application hosting. In AWS console, we can search for _Beanstalk_ and select the appropriate section:

<p align="center">
  <img src="/assets/img/blazoraws1.png" alt="Select the AWS Elastic Beanstalk">
</p>

On Elastic Beanstalk section, to run our Blazor application on AWS, we need to create a new environment based on Windows. So, first click on _Create a new environment_:

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

Be sure to keep selected _Sample application_ on _Application code_, this will be a good starting point to have a preconfigured environment, and then click on _Create environment_ button at the bottom of the page. After few minutes, the environment is ready and we can go with the next step: build the pipeline.

# Build with AWS CodePipeline
With _CodePipeline_ you can create your own build pipeline on AWS, getting the source from GitHub and deploy all the artifacts to Elastic Beanstalk. So, now go to the CodePipeline and click on _Create pipeline_ button.

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
To use GitHub as a source, we first needs to create a connection to our account. So, in this page, define a name for the new connection and click on _Connect to GitHub_

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_4.png" alt="Set the connection name">
</p>

Click on _Install a new app_ to install _AWS Connector for GitHub_ on your GitHub account and follow the instructions. Then click to _Connect_ to complete this step.

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_5.png" alt="Install AWS Connector for GitHub">
</p>

Now you can complete the GitHub source configuration by selecting the Repository and the Branch name and clicking to _Next_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_6.png" alt="Select the operating system for build">
</p>

## Setting up the build stage
After the source repository definition, we need to create the build stage. In our project, we choose to select _AWS CodeBuild_ as the engine to use for the build. Set your preferred region and create a new build project by clicking on _Create project_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_7.png" alt="Use a buildspec file">
</p>

Here, after setting the _Project name_, go to the _Environment_ section and choose _Ubuntu_ as operating system, as you can see in the image below:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_8.png" alt="Create the deploy stage">
</p>

Be sure that in the _Buildspec_ section, the _Use a buildspec file_ option is already selected. This file will be useful to configure the build stage in the Blazor project. We'll talk later about the `buildspec.yml`:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_9.png" alt="Create a new environment">
</p>

## Define the Deploy stage
At the end of the pipeline, all the artifact needs to be deployed in our environment. So, configure the deploy stage to AWS Elastic Beanstalk as you can see in the image below:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_10.png" alt="Create a new environment">
</p>


# Configure the Blazor project
The final step is the project configuration. AWS CodeBuild, used by AWS CodePipeline, requires a set of specific instruction to be able to build your project. All these instructions need to be written in the `buildspec.yml`, a build specification file. That file need to placed in the root of your source directory. More info about the file can be founded on the [following page](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html).

To build a Blazor project, I found very useful, and easy, using the following `buildspec.yml`:

``` yaml
version: 0.2

phases:
    install:
        commands:
            - /usr/local/bin/dotnet-install.sh --channel LTS
            
    build:
        commands:
            - dotnet build -c Release ./BlazorOnAWS.csproj
            - dotnet publish -o deployfolder
            
artifacts:
    files:
        - deployfolder/**/*
        - aws-windows-deployment-manifest.json
```

The above file is composed into two main parts: phases definition and artifacts output. In the phase definition, first we needs to install the latest .NET versions. Unfortunately, at the moment, the images used in the AWS CodeBuild doesn't still support .NET 6, so we needs to use the `dotnet-install.sh`. Then, we can proceed with the `dotnet build` and the `dotnet publish` commands and copy the output to the `deployfolder`.
Then, the final step, requires to create a packages with the output, taken from the directory `deployfolder/**/*` and the `aws-windows-deployment-manifest.json`, which the Elastic Beanstalk Windows container reads to determine how to deploy the application. Here the file content that I have used in my sample:

``` json
{
    "manifestVersion": 1,
    "deployments": {
        "aspNetCoreWeb": [
        {
            "name": "test-dotnet-core",
            "parameters": {
                "appBundle": "deployfolder",
                "iisPath": "/",
                "iisWebSite": "Default Web Site"
            }
        }
        ]
    }
}
```

More info about the file specification are available [here](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/deployment-beanstalk-custom-netcore.html).

# Run the app
Now all the things are ready. Based on our configuration, the pipeline runs after each change in the GitHub source repository. At the end, you can go to the Elastic Beanstalk instance, click on the instance urls, and enjoy your Blazor WASM app:

<p align="center">
  <img src="/assets/img/blazoraws_result_1.png" alt="Create a new environment">
</p>

As always, feedback are welcome!

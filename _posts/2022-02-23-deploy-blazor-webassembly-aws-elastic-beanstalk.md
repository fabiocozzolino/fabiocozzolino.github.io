---
published: false
title: Deploy Blazor WebAssembly on AWS Elastic Beanstalk
date: 2022-02-23T21:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /deploy-blazor-webassembly-aws-elastic-beanstalk/
tags:
  - Blazor
  - WebAssembly
  - AWS
  - Beanstalk
---
This post is the first of a new series dedicated to .NET on AWS. Maybe not everyone knows that .NET is a first-class citizen on AWS. Just after the Java SDK, the .NET SDK was released in early 2010.

In this post, we are going to explore one of the alternatives ways to deploy a Blazor WebAssembly application on AWS Elastic Beanstalk. And we are going to do that by using GitHub as repository and AWS Pipeline to retrieve source, build the project, create the necessary artifacts, and then deploy it to the Beanstalk project. 

# Create the AWS Elastic Beanstalk 
First of all, we'll create the Beanstalk project that will be the application hosting. In AWS console, we can search for _Beanstalk_ and select the appropriate section:

<p align="center">
  <img src="/assets/img/blazoraws1.png" alt="Create a new environment">
</p>

On Elastic Beanstalk section, to run our Blazor application on AWS, we need to create a new environment based on Windows. So, first click on _Create a new environment_:

<p align="center">
  <img src="/assets/img/blazoraws2.png" alt="Create a new environment">
</p>

then select _Web server environment_:

<p align="center">
  <img src="/assets/img/blazoraws3.png" alt="Create a new environment">
</p>

and finally, after setting the name, we need to set the _.NET on Windows Server_ platform and then we can click on _Create environment_ button at the bottom of the page:

<p align="center">
  <img src="/assets/img/blazoraws5.png" alt="Create a new environment">
</p>

Be sure to keep selected _Sample application_ on _Application code_, this will be a good starting point to have a preconfigured environment. After few minutes, the environment is ready and we can go with the next step: build the pipeline.

# Build with AWS CodePipeline
With _CodePipeline_ you can create your own build pipeline on AWS, getting the source from GitHub and deploy all the artifacts to Elastic Beanstalk. So, now go to the CodePipeline and click on _Create pipeline_ button.

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_1.png" alt="Create a new environment">
</p>

Define the Pipeline name and click on _Next_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_2.png" alt="Create a new environment">
</p>

Select _GitHub (Version 2)_ as _Source provider_. Then create a new GitHub connection by clicking on _Connect to GitHub_ button:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_3.png" alt="Create a new environment">
</p>

Then select a name for the new connection and click on _Connect to GitHub_

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_4.png" alt="Create a new environment">
</p>

Click on _Install a new app_ to install _AWS Connector for GitHub_ on your GitHub account and follow the instructions. Then click to _Connect_ to complete this step.

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_5.png" alt="Create a new environment">
</p>

Now you can complete the GitHub source configuration by selecting the Repository and the Branch name and clicking to _Next_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_6.png" alt="Create a new environment">
</p>

In the build stage, select _AWS CodeBuild_, set your preferred region, and create a new build project by clicking on _Create project_:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_7.png" alt="Create a new environment">
</p>

Here, after setting the _Project name_, go to the _Environment_ section and choose your preferred operating _Windows Server 2019_ as operating system, as you can see in the image below:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_8.png" alt="Create a new environment">
</p>

Be sure that in the _Buildspec_ section, the _Use a buildspec file_ option is already selected. This file will be useful to configure the build stage in the Blazor project:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_9.png" alt="Create a new environment">
</p>

To finalize the pipeline, create the deploy stage:

<p align="center">
  <img src="/assets/img/blazoraws_pipeline_10.png" alt="Create a new environment">
</p>


# Configure the Blazor project


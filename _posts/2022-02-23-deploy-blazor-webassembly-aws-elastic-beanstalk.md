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

(link image)

After that, we need to click on _Create a new environment_, then select _Web server environment_ and finally, after setting the name, we need to set the _.NET on Windows Server_ platform and then we can click on _Create environment_ button at the bottom of the page.

(link image)


---
published: true
title: Deploy a Blazor app on GitHub Pages
date: 2018-12-13T08:58:11.000Z
author: fabiocozzolino
layout: post
permalink: /deploy-blazor-on-github-pages/
tags:
  - ASP.NET
  - Blazor
  - Visual Studio Code for Mac
---
In my previous post, I've introduced Blazor and how you can create a new project by using Visual Studio Code on MacOS. Now we'll se how to publish our Blazor app to GitHub Pages.

# Create deployment
As we already known, with .NET you can use the CLI (Command Line Interface) to do a lot things, like create or build a project. By using the same approach, we can create the deployment files with the `dotnet publish` command:

![Install Blazor templates](/assets/img/dotnet-publish.png)

now, as you can see, you'll find the output in the `publish` folder. Now go to 'MyAwesomeProject', the project name, and then open the dist folder. You'll find the deployment files. 

# Deploy on GitHub Pages
First of all, you need to create your GitHub Pages site by following the instruction on [this page](https://guides.github.com/features/pages/). Copy the deployment files to your GitHub Page repository. Finally, add an empty `.nojekyll` file to disable the default [Jekyll](https://github.com/jekyll/jekyll) interpreter for GitHub Pages.

Now, you are ready to run your GitHub Pages build with Blazor.

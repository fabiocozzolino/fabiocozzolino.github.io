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
In my [previous post](http://www.fabiocozzolino.eu/develop-blazor-project-visual-studio-code-mac/), I've introduced Blazor and how you can create a new project by using Visual Studio Code on MacOS. Now we'll see how to publish our Blazor app to GitHub Pages. This is possible since Blazor is a frontend framework and you can deploy it on any static web server host, just like GitHub Pages. 

# Create deployment files
As you already know, with .NET you can use the CLI (Command Line Interface) to do a lot of things, like create or build a project from Terminal. By using the same approach, we can create the deployment files with the `dotnet publish -c Release` command:

![Publish Blazor app](/assets/img/dotnet-publish.png)

now, as you can see in the last row, you'll find the output in the `publish` folder. Now go on *yourprojectname* folder, and then open the dist folder. Here you'll find the deployment files. 

![Deployment files](/assets/img/blazor-deployment-files.png)

# Deploy on GitHub Pages
Now, the final steps:
> You need to create your GitHub Pages repository before continue, see [this page](https://guides.github.com/features/pages/)

1. Clone your GitHub Pages repository https://github.com/yourusername/yourusername.github.io
2. Copy the deployment files from the `dist` folder to your GitHub local repository
3. Add an empty `.nojekyll` file to disable the default [Jekyll](https://github.com/jekyll/jekyll) interpreter for GitHub Pages

> You can also manage 404 error or handling redirect by creating [the 404.html page](https://github.com/blazor-demo/blazor-demo.github.io/blob/master/404.html) 

That's all, you are ready to run your GitHub Pages build with Blazor.

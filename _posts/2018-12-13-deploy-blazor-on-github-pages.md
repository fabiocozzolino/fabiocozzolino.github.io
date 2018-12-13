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
In my [previous post](http://www.fabiocozzolino.eu/develop-blazor-project-visual-studio-code-mac/), I've introduced Blazor and how you can create a new project by using Visual Studio Code on MacOS. Now we'll se how to publish our Blazor app to GitHub Pages.

# Create deployment files
As we already known, with .NET you can use the CLI (Command Line Interface) to do a lot of things, like create or build a project from Terminal. By using the same approach, we can create the deployment files with the `dotnet publish -c Release` command:

![Publish Blazor app](/assets/img/dotnet-publish.png)

now, as you can see in the last row, you'll find the output in the `publish` folder. Now go on *yourprojectname* folder, and then open the dist folder. You'll find the deployment files. 

![Deployment files](/assets/img/blazor-deployment-files.png)

# Deploy on GitHub Pages
First of all, you need to create your GitHub Pages site by following the instruction on [this page](https://guides.github.com/features/pages/). Now, the final steps:

1. Clone your repository https://github.com/*yourusername*/*yourusername.github.io*
2. Copy the deployment files from the `dist` folder to your GitHub local repository
3. Add an empty `.nojekyll` file to disable the default [Jekyll](https://github.com/jekyll/jekyll) interpreter for GitHub Pages

That's all, you are ready to run your GitHub Pages build with Blazor.

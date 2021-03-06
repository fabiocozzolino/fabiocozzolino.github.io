---
published: true
title: Develop a Blazor project with Visual Studio Code on Mac
date: 2018-12-02T08:58:11.000Z
author: fabiocozzolino
layout: post
permalink: /develop-blazor-project-visual-studio-code-mac/
tags:
  - ASP.NET
  - Blazor
  - Visual Studio Code for Mac
---
Blazor is a new, experimental, framework for develop Single Page Application by using the same framework, library and language: C#. It is really powerful and you can use it on every OS and on every browser that supports WebAssembly.
In this post we will see how you can create a project by using MacOS and Visual Studio Code

# Create a new project with CLI
The Command Line Interface is the most simple way to create a new project. To create a Blazor project, first of all you need to install the Blazor templates. On Visual Studio Code, open the terminal window by going to View -> Terminal, then write the `dotnet new -i Microsoft.AspNetCore.Blazor.Templates::*` command:

![Install Blazor templates](/assets/img/dotnet-new-blazor.png)

then, you can simply write the `dotnet new blazor` command:

![Create new Blazor project](/assets/img/dotnet-install-blazor-templates.png)

The above command download the template files and then execute dotnet restore to download all dependencies. The final project name will be the same of the container folder.

We have created the most simpler project, but you can create four different types of Blazor project:

Command | Description
------------ | -------------
dotnet new blazorhosted | Blazor hosted in ASP.NET server
dotnet new blazorlib | Blazor Library
dotnet new blazorserverside | Blazor Server-side in ASP.NET Core
dotnet new blazor | Blazor standalone application


# Run your project
Now, you will be able to run the project by simply execute the `dotnet run` command:

![Run a Blazor app on mac](/assets/img/dotnet-run.png)

# And if something goes wrong...
Be sure to have the latest .NET Core version installed on your development machine. Go to [Microsoft Download](https://dotnet.microsoft.com/download)


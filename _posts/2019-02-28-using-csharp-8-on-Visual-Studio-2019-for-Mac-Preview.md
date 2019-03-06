---
published: true
title: Using C# 8 on Visual Studio 2019 for Mac Preview 2
date: 2019-02-28T21:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /using-csharp-8-on-Visual-Studio-2019-for-Mac-Preview/
tags:
  - .NET
  - .NET Standard
  - .NET Core
  - C#
---
With Visual Studio 2019 Preview you can start to play with C# 8 and its great new features. While on Windows you only needs to install Visual Studio 2019 and .NET Core 3.0, on Mac you needs some additionally trick to make it works. In this post we'll see how you can use C# 8 Preview with Visual Studio 2019 for Mac Preview.

# Prepare your Mac
First of all, you need to download and install the following packages:
- [Visual Studio 2019 for Mac](https://visualstudio.microsoft.com/vs/preview/?os=mac)
- [.NET Core 3.0](https://dotnet.microsoft.com/download/dotnet-core/3.0)

After installation is complete, start Visual Studio 2019 and create a .NET Core Console Application:
<p align="center">
  <img src="/assets/img/create-consolle-app.png" alt="Create Console Application">
</p>

# Setting up your project
Now, click on projects `Options > General` and then set `Target Framework` to `.NET Core 3.0`:
<p align="center">
  <img src="/assets/img/set-target-framework.png" alt="Set Target Framework">
</p>

To successfully build the project, you need to add the `Microsoft.Net.Compilers` package, preview version, from `NuGet`: 
<p align="center">
  <img src="/assets/img/add-nuget-compilers.png" alt="Add Microsoft.Net.Compilers package">
</p>

Finally, edit the `.csproj` and add the following xml elements:
```xml
<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|AnyCPU' ">
  <LangVersion>Preview</LangVersion>
</PropertyGroup>
<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|AnyCPU' ">
  <LangVersion>Preview</LangVersion>
</PropertyGroup>
```

You can check the full list of `LangVersion` [here](https://devblogs.microsoft.com/dotnet/an-update-to-c-versions-and-c-tooling/).

# Start to play with C# 8
Ready to write you first C# 8 app? Go!
<p align="center">
  <img src="/assets/img/csharp-8-on-mac.png" alt="Your first C# 8">
</p>

You'll see some strange warning, by the way ... it's a preview!

Check [here](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8) what's new in C# 8 and give it a try!

> **Note** Most of the C# 8.0 language features will run on any version of .NET, but a few of them, like Async streams, indexers and ranges, all rely on new framework types that will be part of .NET Standard 2.1

# UPDATE Visual Studio 2019 Preview 3 for Mac
With the [recently released Preview 3](https://devblogs.microsoft.com/visualstudio/visual-studio-2019-for-mac-preview-3/), you can set the C# language to Preview directly on project options:
<p align="center">
  <img src="/assets/img/vs-preview-csharp.png" alt="Visual Studio 2019 Preview 3">
</p>

Update it if you have already installed!

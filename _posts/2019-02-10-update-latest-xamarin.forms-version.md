---
published: false
title: Update Portable Class Library project to .NET Standard
date: 2019-02-10T09:45:11.000Z
author: fabiocozzolino
layout: post
permalink: /update-latest-xamarin.forms-version/
tags:
  - Xamarin.Forms
  - .NET
  - Xamarin
---
Recently, I decided to upgrade my TitiusLabs.Xamarin library to the latest version of Xamarin.Forms and to .NET Standard 2.0. Here a small guide you need to follow if you want to upgrade your project from a very old version. 

# Update your project to .NET Standard 2.0
The first step in my path is the update of the TitiusLabs.Core project, a Portable Class Library (PCL) project, to a .NET Standard Library. To proceed, you need to be sure to have the right .NET Core version installed so, if not, go to the [download page](https://dotnet.microsoft.com/download) and install it!

Now, simply open the .csproj file and full replace it with the following xml:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <Folder Include="Properties\" />
  </ItemGroup>
</Project>
```

# Check your job
Reopen your solution, or refresh it, and check if all projects correcly loads and reference your .NET Standard project.

That's all!

---
published: true
title: Update Portable Class Library project to .NET Standard
date: 2019-02-23T09:45:11.000Z
author: fabiocozzolino
layout: post
permalink: /update-portable-class-library-project-to-.net-standard/
tags:
  - .NET
  - .NET Standard
  - .NET Core
---
Recently, I decided to upgrade my TitiusLabs.Xamarin library to the latest version of Xamarin.Forms and to .NET Standard 2.0. Here a small guide you need to follow if you want to upgrade your project from a very old version. 

# Update your project to .NET Standard 2.0
The first step in my path is the update of the TitiusLabs.Core project, a Portable Class Library (PCL) project, to a .NET Standard Library. To proceed, you need to be sure to have the right .NET Core version installed so, if not, go to the [download page](https://dotnet.microsoft.com/download) and install it!

Now, simply open the ```.csproj``` file and full replace it with the following xml:

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

# Check your solution
Reopen your solution, or refresh it, and check if all projects correcly loads and reference your .NET Standard project. Most probably, you'll get the following errors:

<p align="center">
  <img src="/assets/img/net-standard-errors.png" alt=".NET Standard errors">
</p>

If you want to still use ```AssemblyInfo.cs```, then add the following xml element into the ```.csproj```:

```xml
<PropertyGroup>
   <GenerateAssemblyInfo>false</GenerateAssemblyInfo>
</PropertyGroup> 
```

Now your code will work fine. To choose the correct version, be sure to check .NET Standard compatibility [on this page](https://github.com/dotnet/standard/blob/master/docs/versions.md).

That's all!

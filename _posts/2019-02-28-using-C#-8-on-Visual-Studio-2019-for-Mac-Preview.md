---
published: false
title: Using C# 8 on Visual Studio 2019 for Mac Preview 2
date: 2019-02-28T10:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /-using-C#-8-on-Visual-Studio-2019-for-Mac-Preview/
tags:
  - .NET
  - .NET Standard
  - .NET Core
  - C#
---

download Visual Studio 2019 for Mac
https://visualstudio.microsoft.com/vs/preview/?os=mac

download .NET Core 3.0
https://dotnet.microsoft.com/download/dotnet-core/3.0

https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references

create project console

change .net standard to 3.0
change language to preview on csproj

add nuget Microsoft.Compiler

As you can see in [my last post](/update-portable-class-library-project-to-.net-standard/), I'm moving my [TitiusLabs.Core](https://github.com/fabiocozzolino/TitiusLabs.Xamarin) PCL to .NET Standard. After project migration, you can choose to maintain AssemblyInfo - and in [my previous post](/update-portable-class-library-project-to-.net-standard/) you can see how to do it - or move to an auto generation model, as we'll see in this post.

To auto generate the ```AssemblyInfo.cs```, simply put the following ```PropertyGroup``` element in your ```.csproj```:

```xml
<PropertyGroup>
  <Company>TitiusLabs</Company>
  <Authors>Fabio Cozzolinon</Authors>
  <PackageId>TitiusLabs.Core</PackageId>
  <Version>1.0.0</Version>
  <AssemblyVersion>1.0.0.0</AssemblyVersion>
  <FileVersion>1.0.0.0</FileVersion>
</PropertyGroup>
```

To avoid the ```Duplicate 'System.Reflection.AssemblyCompanyAttribute' attribute (CS0579)```, be sure the remove the ```AssemblyInfo.cs``` and set to ```true``` the ```GenerateAssemblyInfo``` in ```.csproj```:

```xml
<PropertyGroup>
   <GenerateAssemblyInfo>true</GenerateAssemblyInfo>
</PropertyGroup>
```

And that's all!

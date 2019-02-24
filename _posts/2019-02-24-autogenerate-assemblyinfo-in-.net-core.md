---
published: false
title: Auto generate AssemblyInfo.cs in .NET Core
date: 2019-02-24T10:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /autogenerate-assemblyinfo-in-.net-core/
tags:
  - .NET
  - .NET Standard
  - .NET Core
---
As you can see in [my last post](/update-portable-class-library-project-to-.net-standard/), I'm moving my [TitiusLabs.Core](https://github.com/fabiocozzolino/TitiusLabs.Xamarin) PCL to .NET Standard. After project migration, you can choose to maintain AssemblyInfo - and in [my previous post](/update-portable-class-library-project-to-.net-standard/) you can see how to do it - or move to an auto generation model, as we'll see in this post.

To auto generate the AssemblyInfo, simply put the following ```PropertyGroup``` element in your ```.csproj```:

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

be sure the remove the ```AssemblyInfo.cs``` and set to ```true``` the ```GenerateAssemblyInfo``` in ```.csproj```:

```xml
<PropertyGroup>
   <GenerateAssemblyInfo>true</GenerateAssemblyInfo>
</PropertyGroup>
```

And that's all!

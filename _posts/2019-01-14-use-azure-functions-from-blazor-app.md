---
published: false
title: Use Azure Functions from Microsoft Blazor app
date: 2019-01-18T08:58:11.000Z
author: fabiocozzolino
layout: post
permalink: /use-azure-functions-from-microsoft-blazor-app/
tags:
  - ASP.NET
  - .NET
  - Azure
  - Azure Functions
  - Blazor
---
Azure Functions is a great way to build serverless functions. You can create a new API and host in Azure without worrying about server infrastructure. 

# Just few steps
To build your own Azure Functions, you can follow just few simple steps:

1. Go to the [Azure Portal](https://portal.azure.com) and login by using your credentials or create a new account
2. Click on `New Resources` and then write `Function App`
<p align="center">
  <img src="/assets/img/new-function-app.png" alt="Function App">
</p>
3. Then select `Function App` item and then click on `Create` button
<p align="center">
  <img src="/assets/img/new-function-app-link.png" alt="Function App">
</p>
4. Now set function name
<p align="center">
  <img src="/assets/img/new-function-name.png" alt="Function App">
</p>
5. Now you'll find the new Azure Function in the relative section
<p align="center">
  <img src="/assets/img/functions-link.png" alt="Function App">
</p>

# Now it's time to write code


This is the first post of a series dedicated to strings usage in .NET. Strings is one of the most popular reference type in .NET. They are largely used in .NET framework: if you try to check memory with a profiler, you'll see a lot of strings allocated. This is not a problem per se, but probably it deserve our attention.
In .NET, strings have special threatment: they are immutable. In other words, you can't change their value without create a new string and destroy the old one. From [MSDN](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/index)

> A string is an object of type String whose value is text. Internally, the text is stored as a sequential read-only collection of Char objects.



Check the following code:

```csharp
string t1 = "Fabio";
t1 += " is the";
t1 += " owner";
t1 += " of this blog";
```

this will cause temporary three strings allocation.




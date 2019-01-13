---
published: false
title: The True story about Strings
date: 2018-12-18T08:58:11.000Z
author: fabiocozzolino
layout: post
permalink: /the-true-story-about-strings/
tags:
  - .NET
  - Strings
  - Memory
---
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




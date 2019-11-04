---
published: true
title: Using gRPC in x86 .NET applications
date: 2019-10-07T18:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /using-grpc-in-x86-net-applications/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
In [this post](/speed-up-your-net-microservice-with-grpc/) we introduced gRPC and its .NET implementations. In some cases, you'll need to use a gRPC client from a legacy Win32 process but, since the NuGet package of gRPC C# is based on the x64 C++ native library, it will not work as expected.

Luckly, a solution is really simple:
* clone the [gRPC repository from github](https://github.com/grpc/grpc)
* open the Grpc.sln in `src/grpc-csharp` folder
* create a new build configuration and set it to x86

Before start to build, you need to build the C++ library. You can proceed in two ways:
* follow the steps on [building page](https://github.com/grpc/grpc/blob/master/BUILDING.md)
* be sure that you have the x86 version of `grpc_csharp_ext.dll` in `cmake\build\x86\Release` (or `Debug`) folder

To get the libraries, create a new project and add a nuget reference to Grpc package. Then go to `packages\Grpc.Core.2.24.0\runtimes\win\native` and copy the `grpc_csharp_ext.x86.dll` library in the previously mentioned `cmake\build\x86\Release` folder. Finally, be sure to rename the library in `grpc_csharp_ext.dll`. Now you'll be able to build from Visual Studio 2019.

Enjoy!

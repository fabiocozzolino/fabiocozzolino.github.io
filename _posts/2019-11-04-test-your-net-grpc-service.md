---
published: true
title: Test your .NET gRPC service
date: 2019-11-04T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /test-your-net-grpc-service/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
One of the most critical issue in the developer work is the test phase. If you want to test a SOAP service, SoapUI is one of the most well known tools. If you want to test a REST service, you can build your requests by using Fiddler or Postman. But, if you want to test a gRPC service, what you can use?

Searching for a tool, I found [BloomRPC](https://github.com/uw-labs/bloomrpc). Inspired by Postman and developed with Electron and React, it's free and open source, works on Windows, Linux and MacOS, and, in my opinion, is one of the most simpler tool for testing gRPC.

The usage is really simple: 

1. add you `.proto` file to the project
2. set the endpoint
3. fill up your request with sample data
4. press play button

<p align="center">
  <img src="/assets/img/grpc-bloomrpc.png" alt="BloomRPC example">
</p>

In this example I'm runing and testing the [Greeter server example](https://github.com/grpc/grpc-dotnet/tree/master/examples/Greeter) from [gRPC-dotnet](https://github.com/grpc/grpc-dotnet/tree/master/examples/Greeter). 

You can download and check BloomRPC from GitHub: https://github.com/uw-labs/bloomrpc

Enjoy!

Disclaimer: I'm not affiliated, associated, authorized, endorsed by, or in any way officially connected with the BloomRPC project.

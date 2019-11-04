---
published: false
title: Test your gRPC service
date: 2019-11-04T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /test-your-grpc-service/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
One of the most critical issue in the developer work is the test phase. If you want to test a SOAP service, SoapUI is one of the most well known tools. If you want to test a REST service, you can build your requests by using Fiddler or Postman. But, if you want to test a gRPC service, what you can use?

Currently, I've founded BloomRPC, inspired by Postman, as one of the most simpler tool for testing gRPC. The usage is really simple: add you `.proto` file to the project, set the endpoint, fill up your request and press play button.

<p align="center">
  <img src="/assets/img/grpc-bloomrpc.png" alt="BloomRPC example">
</p>

In this example I'm runing and testing the [Greeter server example](https://github.com/grpc/grpc-dotnet/tree/master/examples/Greeter) from [gRPC-dotnet](https://github.com/grpc/grpc-dotnet/tree/master/examples/Greeter). 

You can download and check BloomRPC from GitHub: https://github.com/uw-labs/bloomrpc

Enjoy!

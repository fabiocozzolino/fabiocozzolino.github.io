---
published: true
title: Speed up your .NET microservice with gRPC
date: 2019-09-28T11:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /speed-up-your-net-microservice-with-grpc/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
For those who still don't know, gRPC is a RPC (Remote Procedure Call) framework with high performance in mind. Born in Google and used for years, it has been recently released to the open source world and now is supported in about 10 specific languages: from C# to Java, C++ or Go.

In this post we'll made a really basic overview focusing on the basic concepts of gRPC and its main characteristics. Follow me.

# On my way to gRPC
RPC is not a new concept. We starts to talk about RPC in the late sixties but the first real implementation comes in the early 80s. It become very popular only in the nineties with Java Remote Method Invocation. In the following years we try to manage RPC in many ways: CORBA, .NET Remoting and WCF are just some example of this attempt. 

But, why gRPC? Well, in the last few years, new scenarios comes - think about the increased number of connection from mobile device - and we needs to adapt software architecture to responde to this new requirements: interoperability, openness, scalability, performance. gRPC was created with exactly these characteristics in mind and is based on two different technology: HTTP/2 and Protobuf.

<p align="center">
  <img src="/assets/img/multiplexing01.svg" alt="HTTP/2 stream">
</p>

HTTP/2 represents the evolution of the most famous HTTP/1.1 protocol, providing the best way to transport data by supporting binary and an optimized connection use (single connection vs multiple connection). You can read the HTTP/2 [RFC 7540](https://tools.ietf.org/html/rfc7540) or get a short description [here](https://developers.google.com/web/fundamentals/performance/http2). The transmitted binary data, when using gRPC, is represented by the use of [Protobuf](https://developers.google.com/protocol-buffers). 

Protobuf is a "Google’s mature open source mechanism for serializing structured data". So, what this means? One of the big problem with REST is that you don't have something like a WSDL doc that describe the service and helps you build a client, but you need documentation or samples before you can do it. With Protobuf you can write the service and data structure in a metalanguage and, later, you can use language-specific generator to build your client and server code.

Take this example:

```protobuf
message RequestMessage
{
  string FirstName = 1;
  string LastName = 2;
}

message ResponseMessage
{
  string FullName = 1;
}

service NameService
{
  rpc GetFullName (RequestMessage) returns (ResponseMessage) {}
}
```

You can build any supported language-specific code starting from this `.proto` file, so you can simply share that file with any client that needs to interact with your service. Wonderful! 

# gRPC in .NET
You can write services and clients in C# with gRPC by using two different libraries: 
* gRPC C#: implementation based on Core native library https://www.nuget.org/packages/Grpc
* gRPC for .NET: managed implementation

The first one supports .NET Framework 4.5 and .NET Standard 1.5/2.0 while the second one supports .NET Standard 2.1 so you can use it only with .NET Core 3.0.

In the next posts we'll explore the two implementations, checking the difference and how you can use it. In the meantime, on the [official gRPC site](https://grpc.io), you can find guides and tutorials to start using the brand new microservice framework.

Enjoy!

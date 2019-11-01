---
published: false
title: gRPC: speed up your microservice
date: 2019-04-24T11:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /gRPC-speed-up-your-microservice/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
For those who still don't know, gRPC is a RPC (Remote Procedure Call) framework with high performance in mind. Born in Google and used for years, it has been recently released to the open source world and now is supported in about 10 specific languages: from C# to Java, C++ or Go.

# On my way to gRPC
RPC is not a new concept. We starts to talk about RPC in the late sixties but the first real implementation comes in the early 80s. It become very popular only in the nineties with Java Remote Method Invocation. In the following years we try to manage RPC in many ways: CORBA, .NET Remoting and WCF are just some example of this attempt. 
But, why gRPC? Well, in the last few years, new scenarios comes - think about the increased number of connection from mobile device - and we needs to adapt software architecture to responde to this new requirements: interoperability, openness, scalability, performance. gRPC was created with exactly these characteristics in mind and is based on two different technology: HTTP/2 and Protobuf.
HTTP/2 represents the evolution of the most famous HTTP/1.1 protocol, providing the best way to transport data by supporting binary and an optimized connection use (single connection vs multiple connection). The transmitted binary data, in the gRPC case, is represented by the use of Protobuf. 



Enjoy!

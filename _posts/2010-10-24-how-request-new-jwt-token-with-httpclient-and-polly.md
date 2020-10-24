---
published: false
title: How to automatically request a new JWT token with HttpClient and Polly
date: 2020-10-03T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /how-request-new-jwt-token-with-httpclient-and-polly/
tags:
  - .NET
  - Architecture
  - Security
---
JWT token is slightly becoming the new standard for security. One of the most used scenario is with JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants, defined in [RFC 7523](https://tools.ietf.org/html/rfc7523).


As you know, security is a first-class citizen. You must think about it in the first phase of your architecture design. 



* and more... 


the [official documentation wiki](https://github.com/rebus-org/Rebus/wiki).
cept of **Transport**. B
*FileSystem*.

# Extending Rebus: Implements ISubscriptionStorage interface
The first thing we need to do is implement the `ISubscriptionStorage` interface: 
``` csharp
public interface ISubscriptionStorage
``` 


# Conclusion
In this post we have explored one way to extend Rebus. Today, a framework with extensibility built in mind is a great starting point. You can use it as is, or you can join the wonderful community and extend it.

Enjoy!

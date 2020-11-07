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
JWT token is slightly becoming the new standard for security. One of the most used scenario is with JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants, defined in [RFC 7523](https://tools.ietf.org/html/rfc7523). In this post, we'll see how a client can make HTTP requests and obtain a new JWT token every times it is needed. To achieve this result, we'll use [Polly](https://github.com/App-vNext/Polly).

# How to use Polly
Polly, as declared in the official repository, is a .NET resilience and transient-fault-handling library that allows developers to express policies such as Retry, Circuit Breaker, Timeout, Bulkhead Isolation, and Fallback in a fluent and thread-safe manner. This means that you can define your own policy to invoke a service.

In our scenario, the idea is to use Polly to handle the 401 Unauthorized error and request a new token. First of all, we'll create a new Policy that helps us intercept the 401 error and define a way to retrieve a new token. 

``` csharp
using Polly;
using Polly.Retry;
...
private AsyncRetryPolicy<HttpResponseMessage> CreateTokenRetrieverPolicy () {
    var policy = Policy
        .HandleResult<HttpResponseMessage> (message => message.StatusCode == HttpStatusCode.Unauthorized)
        .RetryAsync (1, async (result, retryCount, context) => {
            var tokenRetriever = new TokenRetriever ();
            context["access_token"] = await tokenRetriever.GetNewToken ();
        });

    return policy;
}
``` 

The `TokenRetriever` class code is omitted for brevity.

Now, we can use the policy fot a GET call in this way:

``` csharp
var policy = CreateTokenRequestPolicy ();
var response = await policy.ExecuteAsync (async (Context context) => {
    var client = await GetAuthorizedClientAsync (context);
    return await client.GetAsync (uri);
}, new Dictionary<string, object> () { { "access_token", currentToken }
});
```

The `ExecuteAsync` get two parameters: the first is the action that needs to be executed, the second is a set of parameters passed to the policy handler and 

``` csharp
private async Task<HttpClient> GetAuthorizedClientAsync (Context context) {
    return await Task.Run (() => {
        var token = context.FirstOrDefault (c => c.Key == "access_token").Value?.ToString ();
        var client = new HttpClient ();
        if (!string.IsNullOrEmpty (token)) {
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue ("Bearer", token);
            currentToken = token;
        }

        return client;
    });
}
```


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

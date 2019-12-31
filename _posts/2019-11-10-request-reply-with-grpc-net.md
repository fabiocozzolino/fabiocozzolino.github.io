---
published: false
title: Implementing request-reply service in gRPC for .NET
date: 2019-11-10T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /request-reply-with-grpc-net/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
With this post it's time to get into the first service build with gRPC. First, we'll use the dotnet command to create our solution:
<p align="center">
  <img src="/assets/img/grpc-createnew.png" alt="gRPC Create New">
</p>

When finished, in Visual Studio Code the project will looks like this:
<p align="center">
  <img src="/assets/img/grpc-project.png" alt="gRPC Project">
</p>

We need to check the project and take a look into this items:
1. The `Services\*.cs` files: contains the server-side implementation;
2. The `Protos\*.proto` files: contains the Protocol Buffer file descriptors;
3. The `Startup.cs` file: register the gRPC service by calling the `MapGrpcService` method;

## Build our BookshelfService
Our first version of `BookshelfService` implements a simple method that allows to save a Book into our Bookshelf. To proceed, we need to change the default greet.proto by renaming to our brand new bookshelf.proto and changing its content with the following code:

``` csharp
syntax = "proto3";

option csharp_namespace = "Bookshelf";

package Bookshelf;

// The bookshelf service definition.
service BookshelfService {
  // Save a Book
  rpc Save (NewBookRequest) returns (NewBookReply);
}

// The request message containing the book's title and description.
message NewBookRequest {
  string title = 1;
  string description = 2;
}

// The response message containing the book id.
message NewBookReply {
  string id = 1;
}
```

Now, we can open the `GreeterService.cs` and rename the class, and the file, into `BookshelfServiceImpl`. Something like this:
``` csharp
namespace Bookshelf
{
    public class BookshelfServiceImpl : BookshelfService.BookshelfServiceBase
    {
        private readonly ILogger<BookshelfServiceImpl> _logger;
        public BookshelfServiceImpl(ILogger<BookshelfServiceImpl> logger)
        {
            _logger = logger;
        }

        public override Task<NewBookReply> Save(NewBookRequest request, ServerCallContext context)
        {
            return Task.FromResult(new NewBookReply
            {
                Id = Guid.NewGuid().ToString()
            });
        }
    }
}
```

Finally, be sure to change the `MapGrpcService` into your `Startup.cs` with this line:
``` csharp
endpoints.MapGrpcService<BookshelfServiceImpl>();
``` 

Now, you're ready to run your first gRPC service.

## Wait, what happens?


Enjoy!

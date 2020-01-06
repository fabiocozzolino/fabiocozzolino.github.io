---
published: true
title: Server streaming with .NET Core gRPC service
date: 2019-12-15T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /server-streaming-with-net-core-grpc/
tags:
  - gRPC
  - .NET Core
  - ASP.NET Core
---
In [the first post of this .NET Core gRPC services](/request-reply-with-grpc-net) we have seen how to build a simple request-reply service by using .NET Core 3 and the brand new [grpc-dotnet](https://github.com/grpc/grpc-dotnet) library entirely written in C#.

Now, it's the time to extend our scenario by exploring the next kind of service: server streaming. 

> **_NOTE:_** Remember that gRPC offers four kind of service: request-reply, server streaming, client streaming and bidirectional streaming. We'll see the others in dedicated posts

## Server Streaming Scenarios
First of all, what is server streaming? This is an except from the gRPC site: 
> Server streaming RPCs where the client sends a request to the server and gets a stream to read a sequence of messages back. The client reads from the returned stream until there are no more messages. gRPC guarantees message ordering within an individual RPC call.

Tipically, server streaming may be useful when you have a set of data that needs to be continuosly send to the client while the server is still working on that. Let me explain with some example: imagine you need to send back a list of items. Instead of send a full list, with bad performance, you can send back a block of n items per message, allowing the client start their operations asynchronously. This is a very basic usage of server streaming.

## Ok, now we can start coding
Based on the `BookshelfService` implemented in the [previous post](/request-reply-with-grpc-net) and available on [my github repository](https://github.com/fabiocozzolino/samples/BookshelfService), we must update the `bookshelf.proto` by adding a new service called `GetAllBooks` and the related `AllBooksRequest` and `AllBooksReply`. That service will returns the full list of books from our shelf:
``` csharp
// The bookshelf service definition.
service BookService {
  // Get full list of books
  rpc GetAllBooks (AllBooksRequest) returns (stream AllBooksReply);
}

// The request message containing the book's title and description.
message AllBooksRequest {
  int32 itemsPerPage = 1;
}

// The request message containing the book's title and description.
message AllBooksReply {
  repeated Book Books = 1;
}

// The Book message represent a book instance
message Book {
  string title = 1;
  string description = 2;
}
```

After changing the `.proto` file, now you'll be able to override the GetAllBooks method in the BookshelfService class to implement the server-side logic:
``` csharp
public override async Task GetAllBooks(AllBooksRequest request, IServerStreamWriter<AllBooksReply> responseStream, ServerCallContext context)
{
    var pageIndex = 0;
    while (!context.CancellationToken.IsCancellationRequested)
    {
        var books = BooksManager.ReadAll(++pageIndex, request.ItemsPerPage);
        if (!books.Any())
        {
            break;
        }

        var reply = new AllBooksReply();
        reply.Books.AddRange(books);
        await responseStream.WriteAsync(reply);
    }
}
```

Finally, we can run the service with the `dotnet run` command and test it with [BloomRPC](/test-your-net-grpc-service/):
<p align="center">
  <img src="/assets/video/grpc-server-streaming-test.png" alt="gRPC Server Streaming">
</p>

In the next post we'll see how to create the client for the server streaming service type.

Enjoy!

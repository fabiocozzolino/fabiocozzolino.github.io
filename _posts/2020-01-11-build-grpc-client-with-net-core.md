---
published: false
title: Build gRPC Client with .NET Core
date: 2020-01-11T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /build-grpc-client-with-net-core/
tags:
  - gRPC
  - .NET Core
---
We seen [how to build a simple gRPC request/reply service](/request-reply-with-grpc-net) by using .NET Core and the new [grpc-dotnet](https://github.com/grpc/grpc-dotnet) managed library entirely written in C#. In the next step, we'll see how to build a .NET gRPC client. And it is really easy to do.

## Create and configure our client project


## Let's start coding
Based on the `BookshelfService` (full code available on [my github repository](https://github.com/fabiocozzolino/samples/tree/master/BookshelfService), we need to get the `bookshelf.proto` and add to our client project:
``` csharp
syntax = "proto3";

option csharp_namespace = "BookshelfService";
import "google/protobuf/any.proto";
package BookshelfService;

// The bookshelf service definition.
service BookService {
  // Get full list of books
  rpc GetAllBooks (AllBooksRequest) returns (stream AllBooksReply);
  // Save a Book
  rpc Save (NewBookRequest) returns (NewBookReply);
  //
  rpc Send(SendRequest) returns (SendReply);
}

message SendRequest
{
  google.protobuf.Any Content = 1;
}

message SendReply
{
  google.protobuf.Any Content = 1;
}

// The request message containing the book's title and description.
message AllBooksRequest {
  int32 itemsPerPage = 1;
}

// The request message containing the book's title and description.
message AllBooksReply {
  repeated Book Books = 1;
}

message Book {
  string title = 1;
  string description = 2;
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

> check full code on [github](https://github.com/fabiocozzolino/samples/tree/master/BookshelfService)

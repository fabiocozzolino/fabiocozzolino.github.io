---
published: true
title: Build gRPC Client with .NET Core
date: 2020-01-11T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /build-grpc-client-with-net-core/
tags:
  - gRPC
  - .NET Core
---
In this post series about gRPC, we have seen [how to build a simple gRPC request/reply service](/request-reply-with-grpc-net) and [a gRPC server streaming service](/server-streaming-with-net-core-grpc/) by using .NET Core and the new [grpc-dotnet](https://github.com/grpc/grpc-dotnet), the managed library entirely written in C#. Now it's the time to create and build a .NET gRPC client. And it's really easy to do.

## Create and configure our client project
First of all, we need to create a client project.  For the purpose of this article, a simple console project will be enough. So, you can open the terminal, go to your preferred folder and execute the following command:
```
dotnet new console -o GrpcClient
```

Then go to the folder just created and add the necessary reference with the following commands:
```
dotnet add package Google.Protobuf
dotnet add package Grpc.Net.Client
dotnet add package Grpc.Tools
```

Now, we can create the `bookshelf.proto` file (full code available on [my github repository](https://github.com/fabiocozzolino/samples/tree/master/BookshelfService):
``` csharp
syntax = "proto3";

option csharp_namespace = "BookshelfService";

package BookshelfService;

// The bookshelf service definition.
service BookService {
  // Get full list of books
  rpc GetAllBooks (AllBooksRequest) returns (stream AllBooksReply);
  // Save a Book
  rpc Save (NewBookRequest) returns (NewBookReply);
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

We can then add the just created file to the project by using dotnet-grpc CLI. If you haven't installed yet, execute the following command:
```
dotnet tool install -g dotnet-grpc
```

then add the `bookshelf.proto` to the client project:
```
dotnet grpc add-file bookshelf.proto --services Client
```

Finally, be sure to set the right `GrpcService` value of the `Protobuf` element in your `.csproj` file:
> You can set the GrpcService attribute to decide the kind of grpc generated code. The accepted values are: Both, Client, Default, None, Server. 

``` xml
<ItemGroup>
  <Protobuf Include="..\Protos\bookshelf.proto" GrpcServices="Client" />
</ItemGroup>
```

## Let's start coding
Calling a Grpc Service is a very simple operation. Just create the channel, connect to the service endpoint, and then pass it to the generated client as a constructor parameter. Now you can use the client instance to invoke the service methods:
``` csharp
using (var channel = GrpcChannel.ForAddress("http://localhost:5000"))
{
    var request = new NewBookRequest();
    request.Title = "1984";
    request.Description = "A George Orwell novel";

    var client =  new BookService.BookServiceClient(channel);
    client.Save(request);
}
```

> NOTE: if you are on macOs, [HTTP/2 on TLS is still not supported](/HTTP2-over-TLS-is-not-supported-on-macOS/), so you need to deactivate it by using the following instruction before connect to the service: `AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);`

Enjoy!

> check full code on [github](https://github.com/fabiocozzolino/samples/tree/master/BookshelfService)

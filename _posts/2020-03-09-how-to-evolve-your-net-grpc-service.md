---
published: true
title: How to evolve your .NET gRPC service
date: 2020-03-09T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /how-to-evolve-your-net-grpc-service/
tags:
  - gRPC
  - .NET Core
  - ASP.NET Core
---
Evolving is a necessary step to survive and the software architecture is not an exception. Also designing a gRPC service means that something may change in the future. So, what happen if we change the ProtoBuf definition? 
Evolving a contract definition means that we can add a new field, for example, or remove an existing one. Or we could introduce a new service and deprecate an existing one. And obviusly we'd like that the client still continue to work.
Let's see what happens.

# Break the ProtoBuf definition
We can start with the previously seen `.proto` file:
``` csharp
// The bookshelf service definition
service BookService {
  // Get full list of books
  rpc SaveBook (BookRequest) returns (BookReply);
}

// The Book message represents a book instance
message BookRequest {
  string title = 1;
  string description = 2;
}

// The Book message represents a book instance
message BookReply {
  int32 bookId = 1;
  string title = 2;
  string description = 3;
}
```

what will happens if we change the message? Let me explore the different ways we can break the contract!

# Adding new fields
In the brand new version of our service we need to carry on author information in the BookRequest message. To do that, we add a new message called Author and a new author field:

```
message BookRequest {
  string title = 1;
  string description = 2;
  Author author = 3;
}

message Author {
  string firstName = 1;
  string lastName = 2;
}
```

Adding new fields will not break the contract, so all the previusly generated clients will still work fine! The new fields will simply have their default value. Note that fields are optional by default, but you can declare them mandatory by using the keyword `required`.
**The most important thing is not the field name, but only the field number**. Preserve it, don't change the field types, and your contract will not be broken.

> **_NOTE:_** The message fields name or their order are not important. Each field in the message definition has a unique field number, used to identify your field in the message binary format. Don't change it in live environment, it ill break the contract!

# Remove a field
We can remove a field from a message? Obviusly we can do it, but all the old clients still continue to send unnecessary data. Note that if a client send an unexpected field, the server will ignore it without throwing exception.

You need to establish a plan to softly replace the property with the new one:
1. Introduce the new field int the message contract and leave the old field
2. In the next release, introduce a warning when old client still doesn't send new field
3. Finaly, two release after new field introduction, remove the old field and accept value only from the new field

Obviously you could adapt the plan as you wish!
Note that if you want to use a new field name without change its type or order, do it, no one will notice.

# Conclusion
Things can change and your gRPC service must evolve. Don't worry, do it carefully.

Enjoy!

--------
check full code on [github](https://github.com/fabiocozzolino/samples/tree/master/BookshelfService)

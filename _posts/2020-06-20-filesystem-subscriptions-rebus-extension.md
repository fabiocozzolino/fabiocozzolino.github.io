---
published: false
title: A FileSystem subscriptions manager, your first Rebus extension
date: 2020-06-20T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /filesystem-subscriptions-rebus-extension/
tags:
  - .NET
  - Architecture
---
Today I would like to talk about Rebus, a simple and lean message bus implementation for .NET. Originally developed by Mogens Heller Grabe and supported by the community, Rebus is robust and works well with a minimum level of configuration, but its main strength is extensibility. With this in mind, Rebus offers many ways to customize things like:

* transport
* subscriptions
* logging
* serialization
* encryption
* and more... 

If you want to reead the basics of Rebus, please check the [official documentation wiki](https://github.com/rebus-org/Rebus/wiki).
The main thing in Rebus is the concept of **Transport**. Basically, the transport is the mechanism used to transfer your messages. You can choose from a great list of transport already developed, like InMemory, RabbitMQ or Azure Service Bus, or you can develop your own transport. It depends from you architectural model.
Another main point, necessary in some context like Publish and Subscribe implementation, is the **Subscription Storage**. Every time that a subscription is added to a specific topic, Rebus needs to keep track of it and finally use that storage to get the list of subscribers and dispatch them the published messages.
In this post, we'll see how to implement a simple Subscription Storage to store subscriptions on *FileSystem*.

# Extending Rebus: Implements ISubscriptionStorage interface
The first thing we need to do is implement the `ISubscriptionStorage` interface: 
``` csharp
public interface ISubscriptionStorage
{
    /// <summary>
    /// Gets all destination addresses for the given topic
    /// </summary>
    Task<string[]> GetSubscriberAddresses(string topic);

    /// <summary>
    /// Registers the given <paramref name="subscriberAddress"/> as a subscriber of the given topic
    /// </summary>
    Task RegisterSubscriber(string topic, string subscriberAddress);

    /// <summary>
    /// Unregisters the given <paramref name="subscriberAddress"/> as a subscriber of the given topic
    /// </summary>
    Task UnregisterSubscriber(string topic, string subscriberAddress);

    /// <summary>
    /// Gets whether the subscription storage is centralized and thus supports bypassing the usual subscription request
    /// (in a fully distributed architecture, a subscription is established by sending a <see cref="SubscribeRequest"/>
    /// to the owner of a given topic, who then remembers the subscriber somehow - if the subscription storage is
    /// centralized, the message exchange can be bypassed, and the subscription can be established directly by
    /// having the subscriber register itself)
    /// </summary>
    bool IsCentralized { get; }
}
``` 

So, now we proceed by creating the `FileSystemSubscriptionStorage` that implements the `ISubscriptionStorage`:
``` csharp
internal class FileSystemSubscriptionStorage : ISubscriptionStorage
{
    private readonly string folderPath;

    public FileSystemSubscriptionStorage(string folderPath)
    {
        this.folderPath = folderPath;
    }
    ...
}
```

We need to know the root folder where subscribers will be stored, so the constructor accept the full path as parameter. Now, the first method will go to implement is `RegisterSubscriber`:
``` csharp
public Task RegisterSubscriber(string topic, string subscriberAddress)
{
    return Task.Run(() =>
    {
        var topicPath = Path.Combine(folderPath, Hash(topic));
        if (!Directory.Exists(topicPath))
        {
            Directory.CreateDirectory(topicPath);
        }

        var subscriberAddressFile = Path.Combine(topicPath, Hash(subscriberAddress) + ".subscriber");
        if (!File.Exists(subscriberAddressFile))
        {
            File.WriteAllText(subscriberAddressFile, subscriberAddress);
        }
    });
}
```

In this method, first of all we check if the directory correctly exists, otherwise we'll create it. 




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

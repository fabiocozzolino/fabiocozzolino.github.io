---
published: false
title: Using OAuth2 to authenticate your microservice
date: 2020-10-03T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /filesystem-subscriptions-rebus-extension/
tags:
  - .NET
  - Architecture
  - Security
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

The `RegisterSubscriber` method accept two parameters: `topic` and `subscriberAddress`. In our implementation, we are going to create a folder for each topic and then a file for each subscriber. Both will be created by using a simple hash, so we can easily get a correct path name avoiding wrong chars. 
The file will be a simple text file with the clear `subscriberAddress`.

The `GetSubscriberAddresses` method, instead, retrieve the list of subscribers based on input topic. So, we could simply read all files in a folder to get the full list:
``` csharp
public Task<string[]> GetSubscriberAddresses(string topic)
{
    return Task.Run(() =>
    {
        var topicPath = Path.Combine(folderPath, Hash(topic));
        if (!Directory.Exists(topicPath))
        {
            return new string[0];
        }
        return Directory.GetFiles(topicPath, "*.subscriber").Select(f => File.ReadAllText(f)).ToArray();
    });
}
```

last, but not least, the `UnregisterSubscriber` will delete the required `subscriberAddress` from the input `topic`:
``` csharp
public Task UnregisterSubscriber(string topic, string subscriberAddress)
{
    return Task.Run(() =>
    {
        var topicPath = Path.Combine(folderPath, Hash(topic));
        if (!Directory.Exists(topicPath))
        {
            Directory.CreateDirectory(topicPath);
        }
        
        var subscriberAddressFile = Path.Combine(topicPath, Hash(subscriberAddress) + ".subscriber");
        if (File.Exists(subscriberAddressFile))
        {
            File.Delete(subscriberAddressFile);
        }
    });
}
```

# Using the FileSystemSubscriptionStorage
Following the Configuration API patterns, we'll develop an extensions method to configure the `FileSystemSubscriptionStorage`:
``` csharp
public static class FileSystemSubscriptionStorageConfigurationExtensions
{
    public static void UseFileSystem(this StandardConfigurer<ISubscriptionStorage> configurer, string folderPath)
    {
        configurer.Register(context =>
        {
            return new FileSystemSubscriptionStorage(folderPath);
        });
    }
}
```

Then, in the configuration section, we'll use it in this way:
``` csharp
adapter = new BuiltinHandlerActivator();

Configure.With(adapter)
    .Subscriptions(s => s.UseFileSystem(subscriptionsPath))
    .Start();
```

# Conclusion
In this post we have explored one way to extend Rebus. Today, a framework with extensibility built in mind is a great starting point. You can use it as is, or you can join the wonderful community and extend it.

Enjoy!

---
published: false
title: Deploy a .NET Aspire application on AWS
date: 2024-09-30T08:00:00.000Z
author: fabiocozzolino
layout: post
permalink: /Deploy-NET-Aspire-AWS/
tags:
  - Serverless
  - AWS
  - Lambda
  - CDK
  - Aspire
---
# Introduction
Today, many applications are currently requiring the usage of different kinds of services to run properly. This is becoming more true if you are building a distributed application. For example, if you need to use a cache, Redis could be a good choice, or if you need to monitor your environment, you could think of using OpenTelemetry. And what about the database? Postgre or MongoDB?
Furthermore, collecting and deploying all these services could be challenging using a cloud platform like AWS or Azure. To mitigate this challenge, Microsoft released .NET Aspire.
In this article, we will learn about .NET Aspire and how it helps developers develop cloud-native applications using .NET and hosting in the AWS environment. 
We will use Visual Studio Code, but you can also use any other development environment like Visual Studio or JetBrains.

# What is .NET Aspire
.NET Aspire is not a new framework or a technology, it is a set of pillars that enable cloud-ready application development. It is delivered through a collection of NuGet packages that make it easier to develop, deploy, and manage distributed applications, which are made up of many small, interconnected services.

**Key features of .NET Aspire:**

* **Orchestration:** .NET Aspire provides tools for running and connecting multiple projects and their dependencies, making it easier to manage complex applications.
* **Integrations:** .NET Aspire includes NuGet packages for popular services like Redis and Postgres, with standardized interfaces for consistent and seamless connection.
* **Tooling:** .NET Aspire comes with project templates and tooling for Visual Studio and the .NET CLI, simplifying the creation and interaction with .NET Aspire projects.

**Benefits of using .NET Aspire:**

* **Simplified development:** .NET Aspire makes it easier to build and manage complex distributed applications.
* **Improved productivity:** .NET Aspire provides tools and templates that help you get started quickly and easily.
* **Increased reliability:** .NET Aspire helps you build more reliable applications by providing tools for managing dependencies and connections.

If you're interested in learning more about .NET Aspire check this overview [https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview).

# Set up your environment
To be able to work with .NET Aspire and AWS, and follow all the info described in this article, you need to have:

- .NET 8.0 or .NET 9.0
- An OCI-compliant container runtime, such as Docker Desktop or Podman
- Visual Studio Code with C# Dev Kit: Extension
- AWS .NET SDK

# Build your .NET Aspire project
First of all, we'll proceed by creating a .NET Aspire project. Before that, we should make sure that we have the latest versions of .NET workloads. We can now open the terminal and write:

```console
dotnet workload update
```

then we can check if we have the latest Aspire project templates installed:

```console
dotnet new install Aspire.ProjectTemplates
```

Now, we can go to our designed project folder, and write the following command to create our first Aspire solution:

```console
dotnet new Aspire
```

The above command will create a .NET solution with basically two projects:
- a .NET AppHost project: this .NET project serves as the blueprint, defining all the individual parts of your distributed application and their interconnections.
- a .NET service defaults project: acts as a central hub for defining default settings

A .NET Aspire project's core component is the AppHost project. In this project, we are going to define all the components that will run in our application environment. For example, if we need a Redis cache, we will write the following code into the `Program.cs` file:

```csharp
var builder = DistributedApplication.CreateBuilder(args);
builder.AddRedis("cache");
builder.Build().Run();
```

This is the center of your application. You can instruct of your application network should work and the connection between every services inside the AppHost project. It follows the basis of IaC (Infrastructure as Code) principle.
Now, we can proceed by adding to the project the services that we want to run. For example, if we need to add a WebAPI, we should first create a project, and then add to the solution:

```console
dotnet new webapi -o AspireOnAWS.ApiService -n AspireOnAWS.MyApiService
dotnet sln add AspireOnAWS.ApiService/AspireOnAWS.ApiService.csproj
```

Nothing new? That's right. But, if we want to add the project to the AppHost, we should add it as Project Reference:

```console
dotnet add AspireOnAWS.AppHost/AspireOnAWS.AppHost.csproj reference AspireOnAWS.ApiService/AspireOnAWS.ApiService.csproj
```

Now we can use the project in the `Program.cs`:

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

builder.AddProject<Projects.AspireOnAWS_ApiService>("api")
    .WithExternalHttpEndpoints()
    .WithReference(cache)
    .WaitFor(cache);

builder.Build().Run();
```

The above code adds two projects to the AppHost: the Redis cache and the ApiService. Since the ApiService project requires the Redis cache to run properly, we need to declare a reference by using the `WithReference` method, and a run dependency by using `WaitFor`. The latter means that we need to wait that the Redis cache service is ready before start the ApiService.

# Run your .NET Aspire project
By simply executing `dotnet run`, we can now see the results:

<p align="center">
  <img src="/assets/img/AspireOnAWS_Dashboard.png" alt="">
</p>

What happens in the middle? .NET Aspire requests execution of a container based on Redis image. If this is not available locally, it tries to download from the registry (!). When the image is available, a container instance is built and run. Easy.

# Ready for AWS
We had just seen how to create a .NET Aspire solution and connect it with a pre-built service. Now, we are ready to see how we can interact and use AWS to run our solution. 
Following the IaC rule, with .NET 9, AWS introduces the possibility of using the AWS Cloud Development Kit (CDK) in a .NET Aspire project. A big improvement that allows building applications by defining your AWS resources directly in code. CDK is a coding abstraction built on top of CloudFormation. You can define your infrastructure using your preferred language, and CDK will automatically generate a CloudFormation template.
First of all, we should add the `Aspire.Hosting.AWS` package to our AppHost project:

```console
dotnet add package Aspire.Hosting.AWS
```

Now we can start using AWS CDK to configure the services that we would like to use. For example, if we want to use a S3 Bucket, we can add it in our AppHost by using the following code

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var stack = builder.AddAWSCDKStack("MyAWSStack");
var bucket = stack.AddS3Bucket("MyAspireBucket");

builder.AddProject<Projects.AspireOnAWS_ApiService>("api")
    .WithExternalHttpEndpoints()
    .WithReference(bucket)
    .WaitFor(bucket);
```

By using `WithReference` we are declaring that the `ApiService` project should be able to see and use the S3 bucket. Futhermore, the `WaitFor` indicates that `ApiService` can be executed only when the S3 bucket service will be ready.
Resources created with these methods can be directly referenced by project resources and common properties like resource names, ARNs or URLs will be made available as configuration environment variables. The default config section will be `AWS:Resources`, this means that we can access to our bucket by using `configuration["AWS:Resources:MyAspireBucket:BucketName"]`. For example, in our `ApiService`, we can write the following code to retrieve the bucket name and comunicate with S3:

```csharp
app.MapGet("/weatherforecast", async ([FromServices] IAmazonS3 s3client, IConfiguration configuration) =>
{
    // code omitted ...
    PutObjectRequest request = new PutObjectRequest
    {
        BucketName = configuration["AWS:Resources:MyAspireBucket:BucketName"],
        Key = "WhetherForecast.json",
        ContentType = "application/json",
        ContentBody = JsonConvert.SerializeObject(forecast)
    };

    await s3client.PutObjectAsync(request);

    // code omitted ...
})
```

Executing that code will show the following dashboard:


<p align="center">
  <img src="/assets/img/CQRS_AWS_SNS_1.png" alt="">
</p>

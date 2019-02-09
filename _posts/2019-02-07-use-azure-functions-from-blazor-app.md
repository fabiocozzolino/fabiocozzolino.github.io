---
published: true
title: Use Azure Functions from Microsoft Blazor app
date: 2019-02-07T09:45:11.000Z
author: fabiocozzolino
layout: post
permalink: /use-azure-functions-from-microsoft-blazor-app/
tags:
  - ASP.NET
  - .NET
  - Azure
  - Azure Functions
  - Blazor
---
Azure Functions is a great way to build serverless applications in really few minutes. You can create a new API and host in Azure without worrying about server infrastructure. That sounds really good!

# Just few steps
To build your Azure Functions, you can just follow these steps:

1. Go to the [Azure Portal](https://portal.azure.com) and login by using your credentials or create a new account
2. Click on `New Resources` and then write `Function App`
<p align="center">
  <img src="/assets/img/new-function-app.png" alt="Function App">
</p>
3. Select the `Function App` item and then click on `Create` button
<p align="center">
  <img src="/assets/img/new-function-app-link.png" alt="Function App">
</p>
4. Now set your function name
<p align="center">
  <img src="/assets/img/new-function-name.png" alt="Function App">
</p>
5. Finally you'll find the new Azure Function in the relative section
<p align="center">
  <img src="/assets/img/functions-link.png" alt="Function App">
</p>

# Now it's time to write code
In Azure Function App, you can click in `+` button to create a new HTTP function:
<p align="center">
  <img src="/assets/img/add-function.png" alt="Add Function">
</p>

select the `in-portal` mode and then `WebHook + API` to quickly create a function online:
<p align="center">
  <img src="/assets/img/in-portal-function.png" alt="Function App">
  <img src="/assets/img/in-portal-function-webhook.png" alt="Function App">
</p>

Now click on `HttpTrigger1` on left panel:
<p align="center">
  <img src="/assets/img/in-portal-function-httptrigger.png" alt="HttpTrigger1">
</p>

On the right panel, you'll see the startup code on file run.csx

```csharp
#r "Newtonsoft.Json"

using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    string name = req.Query["name"];

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic data = JsonConvert.DeserializeObject(requestBody);
    name = name ?? data?.name;

    return name != null
        ? (ActionResult)new OkObjectResult($"Hello, {name}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}
```

You can adapt and change the above code as you like to meet your needs.

# Run, run your code
Finally, it's time to press on `RUN` button and see the result in the right panel:
<p align="center">
  <img src="/assets/img/in-portal-function-result.png" alt="Function Result">
</p>

And that's all! You can write Azure Function triggered by HTTP requests by using the online portal editor.

# Wait ... and Blazor?
As said, Azure Functions give you the ability to create a serverless application architecture. This means that you can call your function from anywhere. Since it is exposed via REST API, you can call it in a Blazor app, and it is really simple. The `HttpClient` is registered by default in the [Blazor IoC](http://learn-blazor.com/architecture/dependency-injection/), so you can simply write `@inject HttpClient http` after the `@page` directive and then use it in your code:

```csharp
@page "/"
@inject HttpClient http

<!-- My HTML Code -->

@functions
{
    protected override async Task OnParametersSetAsync()
    {
        var url = "https://myawesomefunc.azurewebsites.net/api/HttpTrigger1?code=hIxLyOrcHlliT...W8aGprWLNLQ==";
        var awesomeResponse = await http.GetJsonAsync<string>(url);
    }
}
```

Enjoy!

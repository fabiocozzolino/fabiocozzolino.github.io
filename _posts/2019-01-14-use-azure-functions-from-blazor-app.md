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
Azure Functions is a great way to build serverless functions. You can create a new API and host in Azure without worrying about server infrastructure. 

# Just few steps
To build your own Azure Functions, you can follow just few simple steps:

1. Go to the [Azure Portal](https://portal.azure.com) and login by using your credentials or create a new account
2. Click on `New Resources` and then write `Function App`
<p align="center">
  <img src="/assets/img/new-function-app.png" alt="Function App">
</p>
3. Then select `Function App` item and then click on `Create` button
<p align="center">
  <img src="/assets/img/new-function-app-link.png" alt="Function App">
</p>
4. Now set function name
<p align="center">
  <img src="/assets/img/new-function-name.png" alt="Function App">
</p>
5. Now you'll find the new Azure Function in the relative section
<p align="center">
  <img src="/assets/img/functions-link.png" alt="Function App">
</p>

# Now it's time to write code
In Azure Function App, you can add to plus button to create a new HTTP function:
<p align="center">
  <img src="/assets/img/add-function.png" alt="Add Function">
</p>
then, select the `in-portal` mode and `WebHook + API` to quickly create a function online:
<p align="center">
  <img src="/assets/img/in-portal-function.png" alt="Function App">
</p>
<p align="center">
  <img src="/assets/img/in-portal-function-webhook.png" alt="Function App">
</p>

Now click on `HttpTrigger1` on left panel:

<p align="center">
  <img src="/assets/img/in-portal-function-httptrigger.png" alt="HttpTrigger1">
</p>

On right panel you'll see the startup code on file run.csx

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

Enjoy!





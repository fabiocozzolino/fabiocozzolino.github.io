---
published: false
title: gRPC: speed up your .NET microservice
date: 2019-04-24T11:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /blazor-now-official-preview/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
For those who don't know it yet, gRPC is a rpc (Remote Procedure Call) framework with high performance in mind. Born in Google and used for years, it has been recently released to the open source world and now is supported in about 10 specific languages: from C# to Java, C++ or Go.


# Upgrade to Blazor preview
To upgrade your existing Blazor apps to the new Blazor preview first make sure you’ve installed the prerequisites listed above then follow these steps:

- Update all `Microsoft.AspNetCore.Blazor.*` package references to 3.0.0-preview4-19216-03 by changing the `PackageReference` in `csproj` with this: `<PackageReference Include="Microsoft.AspNetCore.Blazor" Version="3.0.0-preview4-19216-03" />`
- Remove any package reference to `Microsoft.AspNetCore.Components.Server`
- Remove any `DotNetCliToolReference` to `Microsoft.AspNetCore.Blazor.Cli` and replace with a package reference to `Microsoft.AspNetCore.Blazor.DevServer`
- In client Blazor projects remove the `<RunCommand>dotnet</RunCommand>` and `<RunArguments>blazor serve</RunArguments>` properties
- In client Blazor projects add the `<RazorLangVersion>3.0</RazorLangVersion>` property
- Rename all `_ViewImports.cshtml` files to `_Imports.razor`
- Rename all remaining `.cshtml` files to `.razor`
- Rename `components.webassembly.js` to `blazor.webassembly.js`
- Remove any use of the `Microsoft.AspNetCore.Components.Services` namespace and replace with `Microsoft.AspNetCore.Components` as required.
- Update server projects to use endpoint routing:

Replace this:
```cs
app.UseMvc(routes =>
{
    routes.MapRoute(name: "default", template: "{controller}/{action}/{id?}");
});
```
With this:
```cs
app.UseRouting();

app.UseEndpoints(routes =>
{
    routes.MapDefaultControllerRoute();
});
```
Run dotnet clean on the solution to clear out old Razor declarations.


https://devblogs.microsoft.com/aspnet/blazor-now-in-official-preview/

Enjoy!

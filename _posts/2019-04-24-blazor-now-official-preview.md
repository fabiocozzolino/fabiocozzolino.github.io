---
published: true
title: Blazor now in official preview
date: 2019-04-24T11:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /blazor-now-official-preview/
tags:
  - Blazor
  - .NET
  - .NET Core
  - ASP.NET Core
---
Some days ago, the ASP.NET team announce the official preview of Blazor, the Microsoft framework for building Single Page Application. Note that in the post, they declare that Server-Side Blazor will ship as part of .NET Core 3.0, announced for second half 2019, while Client-side Blazor will ship as part of a future .NET Core release.

# Upgrade to Blazor preview
To upgrade your existing Blazor apps to the new Blazor preview first make sure you’ve installed the prerequisites listed above then follow these steps:

- Update all `Microsoft.AspNetCore.Blazor.*` package references to 3.0.0-preview4-19216-03 by changing the `PackageReference` in `csproj`:
```xml
<PackageReference Include="Microsoft.AspNetCore.Blazor" Version="3.0.0-preview4-19216-03" />
```
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

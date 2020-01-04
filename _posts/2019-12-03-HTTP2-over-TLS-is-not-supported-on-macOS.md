---
published: true
title: HTTP/2 over TLS is not supported on macOS due to missing ALPN support
date: 2019-12-03T08:30:00.000Z
author: fabiocozzolino
layout: post
permalink: /HTTP2-over-TLS-is-not-supported-on-macOS/
tags:
  - gRPC
  - .NET
  - .NET Core
  - ASP.NET Core
---
If you are working with .NET Core on MacOS, you'll probably get the following exception:
```
System.NotSupportedException: HTTP/2 over TLS is not supported on macOS due to missing ALPN support.
```

This happens because at the moment Kestrel doesn't support HTTP/2 with TLS on macOS and older Windows versions such as Windows 7. To work around this issue, you have to disable TLS. Open your `Program.cs` file and update the `CreateHostBuilder` with the following lines:
``` csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.ConfigureKestrel(options =>
            {
                options.ListenLocalhost(5000, o => o.Protocols = HttpProtocols.Http2);
            });
            webBuilder.UseStartup<Startup>();
        });
```

That's it! Now you can execute `dotnet run` command to start your gRPC service.

Enjoy!

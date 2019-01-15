---
published: false
title: How to enable Face ID on Xamarin.iOS
date: 2019-01-15T21:58:11.000Z
author: fabiocozzolino
layout: post
permalink: /enable-face-id-on-xamarin-ios/
tags:
  - Xamarin
  - iOS
---
With iPhone X, Apple release a new biometric authentication way: Face ID. Like others things, you need to obtain access to that feature. To achieve this, you must add the `NSFaceIDUsageDescription` key to the info.plist file:

![Enable FaceId](/assets/img/faceid-enabled.png)

The, optional, description will be good if you want to explain why your app request the ability to authenticate with Face ID.

After that, you will be able to use Face ID authentication:

```csharp
string t1 = "Fabio";
t1 += " is the";
t1 += " owner";
t1 += " of this blog";
```

this will cause temporary three strings allocation.




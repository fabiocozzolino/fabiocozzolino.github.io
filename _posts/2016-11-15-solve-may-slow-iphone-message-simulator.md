---
id: 3961
title: 'Solve the &#8220;May Slow Down Your iPhone&#8221; message on simulator'
date: 2016-11-15T17:34:22+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=3961
permalink: /solve-may-slow-iphone-message-simulator/
dsq_thread_id:
  - "5306379681"
categories:
  - Xamarin
tags:
  - Xamarin Studio
---
With Xcode 8.1 and the iOS 10.1 simulator you may encounter the following message:

[<img class="size-full wp-image-3981 aligncenter" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.59.04.png?resize=450%2C283" alt="schermata-2016-11-15-alle-14-59-04" srcset="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.59.04.png?w=450 450w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.59.04.png?resize=300%2C189 300w" sizes="(max-width: 450px) 100vw, 450px" data-recalc-dims="1" />](https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.59.04.png)

Don&#8217;t worry. This happens because you are running a 32-bit app on a 64-bit architecture (the iPhone/iPad simulator). Change the **Supported architecture** to **x86_64** for the **Debug** configuration and the **iPhoneSimulator** platform and the problem goes away.

[<img class=" wp-image-3971 aligncenter" src="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.54.30.png?resize=676%2C321" alt="schermata-2016-11-15-alle-14-54-30" srcset="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.54.30.png?w=722 722w, https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.54.30.png?resize=300%2C143 300w" sizes="(max-width: 676px) 100vw, 676px" data-recalc-dims="1" />](https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.54.30.png)

That&#8217;s all!

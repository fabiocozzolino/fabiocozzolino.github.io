---
ID: 3961
post_title: 'Solve the &#8220;May Slow Down Your iPhone&#8221; message on simulator'
author: fabiocozzolino
post_date: 2016-11-15 17:34:22
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/solve-may-slow-iphone-message-simulator/
published: true
dsq_thread_id:
  - "5306379681"
---
With Xcode 8.1 and the iOS 10.1 simulator you may encounter the following message:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.59.04.png"><img class="size-full wp-image-3981 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.59.04.png" alt="schermata-2016-11-15-alle-14-59-04" width="450" height="283" /></a>

Don't worry. This happens because you are running a 32-bit app on a 64-bit architecture (the iPhone/iPad simulator). Change the <strong>Supported architecture</strong> to <strong>x86_64</strong> for the <strong>Debug</strong> configuration and the <strong>iPhoneSimulator</strong> platform and the problem goes away.

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.54.30.png"><img class=" wp-image-3971 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/11/Schermata-2016-11-15-alle-14.54.30.png" alt="schermata-2016-11-15-alle-14-54-30" width="676" height="321" /></a>

That's all!
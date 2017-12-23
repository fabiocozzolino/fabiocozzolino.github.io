---
id: 2161
title: Animation in Xamarin.Forms
date: 2016-01-31T15:58:11+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=2161
permalink: /animation-in-xamarin-forms/
dsq_thread_id:
  - "5276858577"
categories:
  - Forms
  - Xamarin
---
Xamarin.Forms provides the ability to create easy and wonderful views animations with few lines of code. For example, if you need to rotate a View, you can simple set the Rotation property, like this:

<pre class="brush: csharp; title: ; notranslate" title="">Device.StartTimer (TimeSpan.FromMilliseconds (100), () =&gt; {
    this.Ball.Rotation+=1;
    return true;
});
</pre>

So, you can get this effect:

<a href="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/01/RotatingImage.gif" rel="attachment wp-att-2171"><img class="alignnone wp-image-2171" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/01/RotatingImage.gif?resize=366%2C664" alt="RotatingImage" data-recalc-dims="1" /></a>

Enjoy!
---
title: Animation in Xamarin.Forms
date: '2016-01-31T15:58:11.000Z'
permalink: /animation-in-xamarin-forms/
tags: []
categories:
  - Forms
  - Xamarin
author: fabiocozzolino
published: true
legacyLayout: post
legacyId: 2161
---
Xamarin.Forms provides the ability to create easy and wonderful views animations with few lines of code. For example, if you need to rotate a View, you can simple set the Rotation property, like this:

~~~ csharp
Device.StartTimer (TimeSpan.FromMilliseconds (100), () => {
    this.Ball.Rotation+=1;
    return true;
});
~~~

So, you can get this effect:

<a href="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/01/RotatingImage.gif" rel="attachment wp-att-2171"><img class="alignnone wp-image-2171" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/01/RotatingImage.gif?resize=366%2C664" alt="RotatingImage" data-recalc-dims="1" /></a>

Enjoy!
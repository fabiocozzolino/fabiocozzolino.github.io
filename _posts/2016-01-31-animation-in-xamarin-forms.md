---
ID: 2161
post_title: Animation in Xamarin.Forms
author: fabiocozzolino
post_date: 2016-01-31 15:58:11
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/animation-in-xamarin-forms/
published: true
dsq_thread_id:
  - "5276858577"
---
Xamarin.Forms provides the ability to create easy and wonderful views animations with few lines of code. For example, if you need to rotate a View, you can simple set the Rotation property, like this:

[sourcecode language="csharp"]
Device.StartTimer (TimeSpan.FromMilliseconds (100), () =&gt; {
    this.Ball.Rotation+=1;
    return true;
});
[/sourcecode]

So, you can get this effect:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/01/RotatingImage.gif" rel="attachment wp-att-2171"><img class="alignnone wp-image-2171" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/01/RotatingImage.gif" alt="RotatingImage" width="366" height="664" /></a>

Enjoy!
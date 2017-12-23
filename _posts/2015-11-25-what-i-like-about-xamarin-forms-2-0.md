---
id: 1231
title: 'What I like about Xamarin.Forms 2.0: Precompiled Xaml'
date: 2015-11-25T14:52:57+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=1231
permalink: /what-i-like-about-xamarin-forms-2-0/
dsq_thread_id:
  - "5274927791"
categories:
  - Xamarin
  - Xamarin.Forms
---
This is the first post about the new features included in Xamarin.Forms 2.0, released with Xamarin 4 a week ago.

In the previous versions of Xamarin.Forms when you made some mistakes in XAML, like a wrong property or a wrong value, you can&#8217;t catch the error until start a new debug session. Xamarin.Forms 2.0 adds a new attribute that allows checking XAML at compile-time. You have only add that code in the AssemblyInfo.cs file:

<pre class="brush: csharp; title: ; notranslate" title="">using Xamarin.Forms.Xaml;
[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
</pre>

Now you got a compile-time error in case of wrong XAML:

[<img class="size-full wp-image-1681 aligncenter" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2015/11/Schermata-2015-12-08-alle-08.47.19.png?resize=629%2C276" alt="Schermata 2015-12-08 alle 08.47.19" srcset="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2015/11/Schermata-2015-12-08-alle-08.47.19.png?w=629 629w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2015/11/Schermata-2015-12-08-alle-08.47.19.png?resize=300%2C132 300w" sizes="(max-width: 629px) 100vw, 629px" data-recalc-dims="1" />](https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2015/11/Schermata-2015-12-08-alle-08.47.19.png)

#### XamlCompilation and Xamarin.Forms performance

The compile-time xaml check is not the only benefit of XamlCompilation. Precompiled XAML will produce a smaller app file, since the XAMLs are no more embedded, and thus a much more fast app by removing the XAML load time.

Amazing!
---
ID: 1231
post_title: 'What I like about Xamarin.Forms 2.0: Precompiled Xaml'
author: fabiocozzolino
post_date: 2015-11-25 14:52:57
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/what-i-like-about-xamarin-forms-2-0/
published: true
dsq_thread_id:
  - "5274927791"
---
This is the first post about the new features included in Xamarin.Forms 2.0, released with Xamarin 4 a week ago.

In the previous versions of Xamarin.Forms when you made some mistakes in XAML, like a wrong property or a wrong value, you can't catch the error until start a new debug session. Xamarin.Forms 2.0 adds a new attribute that allows checking XAML at compile-time. You have only add that code in the AssemblyInfo.cs file:

[sourcecode language="csharp"]
using Xamarin.Forms.Xaml;
[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
[/sourcecode]

Now you got a compile-time error in case of wrong XAML:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2015/11/Schermata-2015-12-08-alle-08.47.19.png"><img class="size-full wp-image-1681 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2015/11/Schermata-2015-12-08-alle-08.47.19.png" alt="Schermata 2015-12-08 alle 08.47.19" width="629" height="276" /></a>
<h4>XamlCompilation and Xamarin.Forms performance</h4>
The compile-time xaml check is not the only benefit of XamlCompilation. Precompiled XAML will produce a smaller app file, since the XAMLs are no more embedded, and thus a much more fast app by removing the XAML load time.

Amazing!
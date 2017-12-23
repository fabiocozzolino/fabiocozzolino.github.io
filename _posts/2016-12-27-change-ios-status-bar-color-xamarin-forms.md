---
id: 4471
title: Change the iOS Status Bar color in Xamarin.Forms
date: 2016-12-27T20:19:02+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=4471
permalink: /change-ios-status-bar-color-xamarin-forms/
dsq_thread_id:
  - "5415035683"
categories:
  - Xamarin
  - Xamarin.Forms
tags:
  - iOS
  - Xamarin
  - Xamarin.Forms
---
Xamarin.Forms is a great way to abstract the local implementation. But, you know, sometimes you need to perform some small adjustments based on the underlying OS. Is this the case of the iOS Status Bar style.

Xamarin.Forms implements, in the NavigationRenderer, a way to automatically set the style (dark/default or light) by checking the Luminosity value of the BarTextColor property. Check the following code:

<pre class="brush: csharp; title: ; notranslate" title="">if (statusBarColorMode == StatusBarTextColorMode.DoNotAdjust || barTextColor.Luminosity &lt;= 0.5)
{
	// Use dark text color for status bar
	UIApplication.SharedApplication.StatusBarStyle = UIStatusBarStyle.Default;
}
else
{
	// Use light text color for status bar
	UIApplication.SharedApplication.StatusBarStyle = UIStatusBarStyle.LightContent;
}
</pre>

For full code, check the [NavigationRenderer](https://github.com/xamarin/Xamarin.Forms/blob/master/Xamarin.Forms.Platform.iOS/Renderers/NavigationRenderer.cs) source on [github Xamarin.Forms project](https://github.com/xamarin/Xamarin.Forms).

Now, if in your code you set the BarTextColor to black, then the status bar style will be the Default (dark). Otherwise, the status bar style will be light (white).

So, if we want to set the BarTextColor, in a classic Xamarin.Forms App class constructor, we&#8217;ll have something like this:

<pre class="brush: csharp; title: ; notranslate" title="">public App()
{
	InitializeComponent();

	MainPage = new NavigationPage(new MainPage())
	{
		BarBackgroundColor = Color.FromHex("#043596"),
		BarTextColor = Color.White
	};
}
</pre>

But, this is not enough.

In iOS, we have two ways to set the StatusBarStyle:

  * at application level
  * at view controller level

The default behavior is at view controller level. Since Xamarin.Forms sets the StatusBarStyle at application level, we need to set the related property in the **Info.plist**. So, open the info.plist file, go in the Source tab and add a new entry with this values:

Name = UIViewControllerBasedStatusBarAppearance
  
Type &#8211; boolean
  
Value &#8211; No

[<img class="size-full wp-image-4531 aligncenter" src="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.13.48.png?resize=449%2C50" alt="" srcset="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.13.48.png?w=449 449w, https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.13.48.png?resize=300%2C33 300w" sizes="(max-width: 449px) 100vw, 449px" data-recalc-dims="1" />](https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.13.48.png)

And we have done! Now start the app and check the result:

[<img class="size-full wp-image-4541 aligncenter" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.17.19.png?resize=480%2C96" alt="" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.17.19.png?w=480 480w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.17.19.png?resize=300%2C60 300w" sizes="(max-width: 480px) 100vw, 480px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.17.19.png)

Nice and simple!
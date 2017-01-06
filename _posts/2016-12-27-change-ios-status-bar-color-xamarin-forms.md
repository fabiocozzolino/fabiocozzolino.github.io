---
ID: 4471
post_title: >
  Change the iOS Status Bar color in
  Xamarin.Forms
author: fabiocozzolino
post_date: 2016-12-27 20:19:02
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/change-ios-status-bar-color-xamarin-forms/
published: true
dsq_thread_id:
  - "5415035683"
---
Xamarin.Forms is a great way to abstract the local implementation. But, you know, sometimes you need to perform some small adjustments based on the underlying OS. Is this the case of the iOS Status Bar style.

Xamarin.Forms implements, in the NavigationRenderer, a way to automatically set the style (dark/default or light) by checking the Luminosity value of the BarTextColor property. Check the following code:

[sourcecode lang="csharp"]
if (statusBarColorMode == StatusBarTextColorMode.DoNotAdjust || barTextColor.Luminosity &lt;= 0.5)
{
	// Use dark text color for status bar
	UIApplication.SharedApplication.StatusBarStyle = UIStatusBarStyle.Default;
}
else
{
	// Use light text color for status bar
	UIApplication.SharedApplication.StatusBarStyle = UIStatusBarStyle.LightContent;
}
[/sourcecode]

For full code, check the <a href="https://github.com/xamarin/Xamarin.Forms/blob/master/Xamarin.Forms.Platform.iOS/Renderers/NavigationRenderer.cs">NavigationRenderer</a> source on <a href="https://github.com/xamarin/Xamarin.Forms">github Xamarin.Forms project</a>.

Now, if in your code you set the BarTextColor to black, then the status bar style will be the Default (dark). Otherwise, the status bar style will be light (white).

So, if we want to set the BarTextColor, in a classic Xamarin.Forms App class constructor, we'll have something like this:

[sourcecode lang="csharp"]
public App()
{
	InitializeComponent();

	MainPage = new NavigationPage(new MainPage())
	{
		BarBackgroundColor = Color.FromHex(&quot;#043596&quot;),
		BarTextColor = Color.White
	};
}
[/sourcecode]

But, this is not enough.

In iOS, we have two ways to set the StatusBarStyle:
<ul>
 	<li>at application level</li>
 	<li>at view controller level</li>
</ul>
The default behavior is at view controller level. Since Xamarin.Forms sets the StatusBarStyle at application level, we need to set the related property in the <strong>Info.plist</strong>. So, open the info.plist file, go in the Source tab and add a new entry with this values:

Name = UIViewControllerBasedStatusBarAppearance
Type - boolean
Value - No

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.13.48.png"><img class="size-full wp-image-4531 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.13.48.png" alt="" width="449" height="50" /></a>

And we have done! Now start the app and check the result:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.17.19.png"><img class="size-full wp-image-4541 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-27-alle-20.17.19.png" alt="" width="480" height="96" /></a>

Nice and simple!
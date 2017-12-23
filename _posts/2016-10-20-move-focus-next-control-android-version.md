---
id: 3781
title: 'Move focus on the next control: Android version'
date: 2016-10-20T23:48:08+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=3781
permalink: /move-focus-next-control-android-version/
dsq_thread_id:
  - "5303163667"
categories:
  - Forms
  - Xamarin
  - Xamarin.Forms
tags:
  - Android
---
Some days ago [I have published](http://www.fabiocozzolino.eu/move-focus-next-control-xamarin-forms/) a sample Xamarin.Forms control to simply move focus on others controls of the page. I&#8217;ve presented just the iOS version but now it&#8217;s the time to see also the Android implementation.

## TLEntryRenderer in Android

The control is so simple that in just few lines of codes we&#8217;ll be able to realize the Android version. Here the renderer code:

<pre class="brush: csharp; title: ; notranslate" title="">[assembly: ExportRenderer(typeof(TLEntry), typeof(TLEntryRenderer))]
namespace TitiusLabs.Forms.Droid.Controls
{
	public class TLEntryRenderer : EntryRenderer
	{
		protected override void OnElementChanged(ElementChangedEventArgs&lt;Entry&gt; e)
		{
			base.OnElementChanged(e);

			var element = e.NewElement as TLEntry;
			if (element.ReturnButton == ReturnButtonType.Next)
			{
				Control.ImeOptions = Android.Views.InputMethods.ImeAction.Next;
				Control.EditorAction += (sender, args) =&gt;
				{
					element.OnNext();
				};
			}
		}
	}
}
</pre>

the code is available, as always, on [github](https://github.com/fabiocozzolino/TitiusLabs.Xamarin/blob/master/TitiusLabs.Forms.Droid/Controls/TLEntryRenderer.cs).

This is the final result:

[<img class="alignnone size-full wp-image-3791" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/MoveFocus_XamarinForms_Android.gif?resize=512%2C844" alt="movefocus_xamarinforms_android" data-recalc-dims="1" />](https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/MoveFocus_XamarinForms_Android.gif)

Nice and simple!
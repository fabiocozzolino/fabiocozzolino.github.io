---
id: 3681
title: Move focus on next control in Xamarin.Forms
date: 2016-10-16T12:20:21+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=3681
permalink: /move-focus-next-control-xamarin-forms/
dsq_thread_id:
  - "5284521644"
categories:
  - Xamarin
  - Xamarin.Forms
tags:
  - iOS
---
Spending some time with good friends is always a great way to start ideas. So, while talking with one of them, he asked me the best way to handle focus on entries in a Xamarin.Forms Page. I&#8217;ve handled the problem many times in iOS and Android native projects, so I decided to create a new control in [my library on github](https://github.com/fabiocozzolino/TitiusLabs.Xamarin).

## Welcome TLEntry: the custom Entry control

First of all, we have to create a custom control because the user needs to set the type of return button on the keyboard:

<pre class="brush: csharp; title: ; notranslate" title="">public class TLEntry : Xamarin.Forms.Entry
{
	public static readonly BindableProperty ReturnButtonProperty = 
		BindableProperty.Create("ReturnButton", typeof(ReturnButtonType), typeof(TLEntry), ReturnButtonType.None);

	public ReturnButtonType ReturnButton
	{
		get { return (ReturnButtonType)GetValue(ReturnButtonProperty); }
		set { SetValue(ReturnButtonProperty, value); }
	}
}
</pre>

After doing that, we need to handle the tap on the button and move the focus on the next control. One way to do that is by knowing the next control and set the focus to it after the next button was pressed. So now we need to know the next control by settings a specific property:

<pre class="brush: csharp; title: ; notranslate" title="">[assembly:ExportRenderer(typeof(TLEntry), typeof(TLEntryRenderer))]
...
public class TLEntry
{
	public static readonly BindableProperty NextViewProperty = 
		BindableProperty.Create("NextView", typeof(View), typeof(TLEntry));

	public View NextView
	{
		get { return (View)GetValue(NextViewProperty); }
		set { SetValue(NextViewProperty, value); }
	}

	public void OnNext()
	{
		NextView?.Focus();
	}
}
</pre>

Now is the time to create the platform specific renderers.

## TLEntryRenderer: the iOS platform-specific renderer

A [renderer](https://developer.xamarin.com/guides/xamarin-forms/custom-renderer/) is a special class with the role of transform a Xamarin Forms control in a native control. So now we needs to transform the TLEntry in a UITextField for the iOS platform. Since we already have renderers for standard control, handle the new ReturnButton and NextView properties simply means to extend the base renderer and create a new one like this:

<pre class="brush: csharp; title: ; notranslate" title="">public class TLEntryRenderer : EntryRenderer
{
	protected override void OnElementChanged(ElementChangedEventArgs&amp;amp;amp;amp;amp;amp;amp;amp;lt;Entry&amp;amp;amp;amp;amp;amp;amp;amp;gt; e)
	{
		base.OnElementChanged(e);

		var element = e.NewElement as TLEntry;
		if (element.ReturnButton == ReturnButtonType.Next)
		{
			Control.ReturnKeyType = UIKit.UIReturnKeyType.Next;
			Control.ShouldReturn += (textField) =&amp;amp;amp;amp;amp;amp;amp;amp;gt;
			{
				element.OnNext();
				return false;
			};
		}
	}
}
</pre>

With this code, we set the ReturnKeyType on UITextView and add an handler that capture the pressure on the return button and go to the next item.

Now, in your Page, you can do something similar:

<pre class="brush: csharp; title: ; notranslate" title="">public partial class FormSamplesPage : ContentPage
{
	TLEntry Entry1 = new TLEntry();
	TLEntry Entry2 = new TLEntry();
	TLEntry Entry3 = new TLEntry();

	protected override void OnAppearing()
	{
		base.OnAppearing();

		Entry1.NextView = Entry2;
		Entry1.ReturnButton = ReturnButtonType.Next;

		Entry2.NextView = Entry3;
		Entry2.ReturnButton = ReturnButtonType.Next;

		Entry3.NextView = Entry1;
		Entry3.ReturnButton = ReturnButtonType.Next;

		this.Body.Children.Add(Entry1);
		this.Body.Children.Add(Entry2);
		this.Body.Children.Add(Entry3);
	}
}
</pre>

this is the final result:

[<img class="alignnone size-full wp-image-3721" src="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/ezgif-2133599902.gif?resize=476%2C850" alt="ezgif-2133599902" data-recalc-dims="1" />](https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/ezgif-2133599902.gif)

Nice!

You can find all code on my github space: <https://github.com/fabiocozzolino/TitiusLabs.Xamarin>

The Android version will be available soon!
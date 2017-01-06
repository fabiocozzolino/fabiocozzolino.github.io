---
ID: 3681
post_title: >
  Move focus on next control in
  Xamarin.Forms
author: fabiocozzolino
post_date: 2016-10-16 12:20:21
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/move-focus-next-control-xamarin-forms/
published: true
dsq_thread_id:
  - "5284521644"
---
Spending some time with good friends is always a great way to start ideas. So, while talking with one of them, he asked me the best way to handle focus on entries in a Xamarin.Forms Page. I've handled the problem many times in iOS and Android native projects, so I decided to create a new control in <a href="https://github.com/fabiocozzolino/TitiusLabs.Xamarin">my library on github</a>.
<h2>Welcome TLEntry: the custom Entry control</h2>
First of all, we have to create a custom control because the user needs to set the type of return button on the keyboard:

[code language="csharp"]
public class TLEntry : Xamarin.Forms.Entry
{
	public static readonly BindableProperty ReturnButtonProperty = 
		BindableProperty.Create(&quot;ReturnButton&quot;, typeof(ReturnButtonType), typeof(TLEntry), ReturnButtonType.None);

	public ReturnButtonType ReturnButton
	{
		get { return (ReturnButtonType)GetValue(ReturnButtonProperty); }
		set { SetValue(ReturnButtonProperty, value); }
	}
}
[/code]

After doing that, we need to handle the tap on the button and move the focus on the next control. One way to do that is by knowing the next control and set the focus to it after the next button was pressed. So now we need to know the next control by settings a specific property:

[code language="csharp"]
[assembly:ExportRenderer(typeof(TLEntry), typeof(TLEntryRenderer))]
...
public class TLEntry
{
	public static readonly BindableProperty NextViewProperty = 
		BindableProperty.Create(&quot;NextView&quot;, typeof(View), typeof(TLEntry));

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
[/code]

Now is the time to create the platform specific renderers.
<h2>TLEntryRenderer: the iOS platform-specific renderer</h2>
A <a href="https://developer.xamarin.com/guides/xamarin-forms/custom-renderer/">renderer</a> is a special class with the role of transform a Xamarin Forms control in a native control. So now we needs to transform the TLEntry in a UITextField for the iOS platform. Since we already have renderers for standard control, handle the new ReturnButton and NextView properties simply means to extend the base renderer and create a new one like this:

[code language="csharp"]
public class TLEntryRenderer : EntryRenderer
{
	protected override void OnElementChanged(ElementChangedEventArgs&amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;Entry&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt; e)
	{
		base.OnElementChanged(e);

		var element = e.NewElement as TLEntry;
		if (element.ReturnButton == ReturnButtonType.Next)
		{
			Control.ReturnKeyType = UIKit.UIReturnKeyType.Next;
			Control.ShouldReturn += (textField) =&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;
			{
				element.OnNext();
				return false;
			};
		}
	}
}
[/code]

With this code, we set the ReturnKeyType on UITextView and add an handler that capture the pressure on the return button and go to the next item.

Now, in your Page, you can do something similar:

[code language="csharp"]
public partial class FormSamplesPage : ContentPage
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
[/code]

this is the final result:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/ezgif-2133599902.gif"><img class="alignnone size-full wp-image-3721" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/ezgif-2133599902.gif" alt="ezgif-2133599902" width="476" height="850" /></a>

Nice!

You can find all code on my github space: <a href="https://github.com/fabiocozzolino/TitiusLabs.Xamarin">https://github.com/fabiocozzolino/TitiusLabs.Xamarin</a>

The Android version will be available soon!
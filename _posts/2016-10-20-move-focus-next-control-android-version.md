---
ID: 3781
post_title: 'Move focus on the next control: Android version'
author: fabiocozzolino
post_date: 2016-10-20 23:48:08
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/move-focus-next-control-android-version/
published: true
dsq_thread_id:
  - "5303163667"
---
Some days ago <a href="http://www.fabiocozzolino.eu/move-focus-next-control-xamarin-forms/">I have published</a> a sample Xamarin.Forms control to simply move focus on others controls of the page. I've presented just the iOS version but now it's the time to see also the Android implementation.
<h2>TLEntryRenderer in Android</h2>
The control is so simple that in just few lines of codes we'll be able to realize the Android version. Here the renderer code:

[code language="csharp"]
[assembly: ExportRenderer(typeof(TLEntry), typeof(TLEntryRenderer))]
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
[/code]

the code is available, as always, on <a href="https://github.com/fabiocozzolino/TitiusLabs.Xamarin/blob/master/TitiusLabs.Forms.Droid/Controls/TLEntryRenderer.cs">github</a>.

This is the final result:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/MoveFocus_XamarinForms_Android.gif"><img class="alignnone size-full wp-image-3791" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/MoveFocus_XamarinForms_Android.gif" alt="movefocus_xamarinforms_android" width="512" height="844" /></a>

Nice and simple!
---
id: 4151
title: 'A little and simple Bindable (Horizontal) Scroll View &#8211; Handling item tap gesture'
date: 2016-12-04T21:05:31+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=4151
permalink: /little-simple-bindable-horizontal-scroll-view-handling-item-tap-gesture/
dsq_thread_id:
  - "5355829597"
categories:
  - Xamarin
  - Xamarin.Forms
---
A long time ago, in the first post, I wrote about the [TLScrollView](http://www.fabiocozzolino.eu/a-little-and-simple-bindable-horizontal-scroll-view/), a way to create a simple, horizontal and bindable list of items in Xamarin.Forms. The final result is something like the horizontal views on Apple App Store app.

After receiving some feedback, users ask for a way to handle the tap gesture on the items. We have two possible approaches: the first one is by using the classic ItemSelected event handlers, and the second one by using the Command pattern, typical solution in MVVM.

In this post we&#8217;ll explore the first approach.

### Adding an ItemSelected handler to the TLScrollView

So, first of all, we need to add an ItemSelected event, a delegate of type EventHandler to the TLScrollView:

<pre class="brush: csharp; title: ; notranslate" title="">public event EventHandler&lt;ItemTappedEventArgs&gt; ItemSelected;
</pre>

Now, in the Render method, we can add the following line in the for..each cycle, just after settings the BindingContext of the ViewCell:

<pre class="brush: csharp; title: ; notranslate" title="">viewCell.View.GestureRecognizers.Add(new TapGestureRecognizer
{
	Command = new Command((obj) =&gt;
	{
		var args = new ItemTappedEventArgs(ItemsSource, item);
		ItemTapped?.Invoke(this, args);
	}),
	NumberOfTapsRequired = 1
});
<<<<<<< HEAD
</pre>

Now, in your XAML, you can define the handler in this way:

<pre class="brush: csharp; title: ; notranslate" title="">&lt;controls:XScrollView Orientation="Horizontal" ItemsSource="{Binding Items}" ItemSelected="Handle_ItemSelected" HeightRequest="100"&gt;
</pre>

then you can implement your handle:

<pre class="brush: csharp; title: ; notranslate" title="">void Handle_ItemSelected(object sender, Xamarin.Forms.ItemTappedEventArgs e)
{
	// your code
}
</pre>

That&#8217;s really simple! But if you want build a code in line with the Separation of Concern, typical principles of MVVM, a SelectedCommand property should be the best way.

I&#8217;ll show the step neeeded to add the command pattern to the TLScrollView in the next post of this series.

### Full code is available [here](https://github.com/fabiocozzolino/TitiusLabs.Xamarin/blob/master/TitiusLabs.Forms/Controls/TLScrollView.cs)
=======
[/code]

Now, in your XAML, you can define the handler in this way:

[code language="csharp"]
&lt;controls:XScrollView Orientation=&quot;Horizontal&quot; ItemsSource=&quot;{Binding Items}&quot; ItemSelected=&quot;Handle_ItemSelected&quot; HeightRequest=&quot;100&quot;&gt;
[/code]

then you can implement your handle:

[code language="csharp"]
void Handle_ItemSelected(object sender, Xamarin.Forms.ItemTappedEventArgs e)
{
	// your code
}
[/code]

That's really simple! But if you want build a code in line with the Separation of Concern, typical principles of MVVM, a SelectedCommand property should be the best way.

I'll show the step neeeded to add the command pattern to the TLScrollView in the next post of this series.
<h3>Full code is available <a href="https://github.com/fabiocozzolino/TitiusLabs.Xamarin/blob/master/TitiusLabs.Forms/Controls/TLScrollView.cs">here</a></h3>
>>>>>>> origin/master

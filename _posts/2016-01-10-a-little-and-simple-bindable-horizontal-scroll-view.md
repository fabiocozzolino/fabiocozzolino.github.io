---
ID: 2031
post_title: >
  A little and simple Bindable
  (Horizontal) Scroll View
author: fabiocozzolino
post_date: 2016-01-10 17:01:13
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/a-little-and-simple-bindable-horizontal-scroll-view/
published: true
dsq_thread_id:
  - "5274923814"
---
In one project I was working on, a page needs to show a short horizontal and scrollable list of items (something like the Apple App Store app). Xamarin.Forms offers the ability to use a ScrollView control to show a list of items horizontally but, in my case, the items I must to show comes from a dinamically populated list.  In that case I've extended the ScrollView control and added the ItemsSource and ItemTemplate property.

[sourcecode language="csharp"]
public class TLScrollView : ScrollView
{
	public static readonly BindableProperty ItemsSourceProperty =
		BindableProperty.Create(&quot;ItemsSource&quot;, typeof(IEnumerable), typeof(TLScrollView), default(IEnumerable));

	public IEnumerable ItemsSource
	{
		get { return (IEnumerable)GetValue(ItemsSourceProperty); }
		set { SetValue(ItemsSourceProperty, value); }
	}

	public static readonly BindableProperty ItemTemplateProperty =
		BindableProperty.Create(&quot;ItemTemplate&quot;, typeof(DataTemplate), typeof(TLScrollView), default(DataTemplate));

	public DataTemplate ItemTemplate
	{
		get { return (DataTemplate)GetValue(ItemTemplateProperty); }
		set { SetValue(ItemTemplateProperty, value); }
	}
}
[/sourcecode]

After that, I've added a simple method, Render, to populate the ScrollView:

[sourcecode language="csharp"]
public void Render ()
{
	if (this.ItemTemplate == null || this.ItemsSource == null)
		return;
	
	var layout = new StackLayout ();
	layout.Orientation = this.Orientation == ScrollOrientation.Vertical 
		? StackOrientation.Vertical : StackOrientation.Horizontal;

	foreach (var item in this.ItemsSource) {
		var viewCell = this.ItemTemplate.CreateContent () as ViewCell;
		viewCell.View.BindingContext = item;
		layout.Children.Add (viewCell.View);
	}

	this.Content = layout;
}
[/sourcecode]

That method will be called from the <strong>TLScrollViewRenderer</strong> (iOS and Android are pretty similar). The renderer is a special class that adapts the Xamarin.Forms control into a native control:

[sourcecode language="csharp"]
[assembly: ExportRenderer(typeof(TLScrollView), typeof(TLScrollViewRenderer))]

namespace TitiusLabs.Forms.iOS.Controls
{
	public class TLScrollViewRenderer : ScrollViewRenderer
	{
		protected override void OnElementChanged(VisualElementChangedEventArgs e)
		{
			base.OnElementChanged(e);

			var element = e.NewElement as TLScrollView;
			element?.Render();
		}
	}
}
[/sourcecode]

Now you can use the TLScrollView in your xaml and create your custom template in this way:

[sourcecode language="csharp"]
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;ContentPage xmlns=&quot;http://xamarin.com/schemas/2014/forms&quot; xmlns:x=&quot;http://schemas.microsoft.com/winfx/2009/xaml&quot; xmlns:controls=&quot;clr-namespace:TitiusLabs.Forms.Controls;assembly=TitiusLabs.Forms&quot; xmlns:local=&quot;clr-namespace:FormSamples&quot; x:Class=&quot;FormSamples.Core.Views.FormSamplesPage&quot;&gt;
	&lt;StackLayout Padding=&quot;20&quot;&gt;
		&lt;controls:TLScrollView Orientation=&quot;Horizontal&quot; ItemsSource=&quot;{Binding Items}&quot; HeightRequest=&quot;100&quot;&gt;
			&lt;controls:TLScrollView.ItemTemplate&gt;
				&lt;DataTemplate&gt;
					&lt;ViewCell&gt;
						&lt;StackLayout Padding=&quot;5&quot;&gt;
							&lt;controls:TLImageCircle Source=&quot;{Binding Image}&quot; HeightRequest=&quot;80&quot; WidthRequest=&quot;80&quot; /&gt;
						&lt;/StackLayout&gt;
					&lt;/ViewCell&gt;
				&lt;/DataTemplate&gt;
			&lt;/controls:TLScrollView.ItemTemplate&gt;
		&lt;/controls:TLScrollView&gt;
	&lt;/StackLayout&gt;
&lt;/ContentPage&gt;
[/sourcecode]

This is the final result:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/01/HorizontalView-1.gif" rel="attachment wp-att-2091"><img class="alignnone wp-image-2111 " src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/01/HorizontalView-1.gif" alt="" width="343" height="624" /></a>

Amazing!

<strong>UPDATE 12.04.2016: some small refactoring to the custom horizontal ScrollView control
</strong>
<h3>Full code is available <a href="https://github.com/fabiocozzolino/TitiusLabs.Xamarin/blob/master/TitiusLabs.Forms/Controls/TLScrollView.cs">here</a></h3>
<strong> </strong>
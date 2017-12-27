---
id: 2031
title: A little and simple Bindable (Horizontal) Scroll View
date: 2016-01-10T17:01:13+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=2031
permalink: /a-little-and-simple-bindable-horizontal-scroll-view/
dsq_thread_id:
  - "5274923814"
categories:
  - Xamarin
---
In one project I was working on, a page needs to show a short horizontal and scrollable list of items (something like the Apple App Store app). Xamarin.Forms offers the ability to use a ScrollView control to show a list of items horizontally but, in my case, the items I must to show comes from a dinamically populated list.  In that case I&#8217;ve extended the ScrollView control and added the ItemsSource and ItemTemplate property.

~~~ csharp
public class TLScrollView : ScrollView
{
	public static readonly BindableProperty ItemsSourceProperty =
		BindableProperty.Create("ItemsSource", typeof(IEnumerable), typeof(TLScrollView), default(IEnumerable));

	public IEnumerable ItemsSource
	{
		get { return (IEnumerable)GetValue(ItemsSourceProperty); }
		set { SetValue(ItemsSourceProperty, value); }
	}

	public static readonly BindableProperty ItemTemplateProperty =
		BindableProperty.Create("ItemTemplate", typeof(DataTemplate), typeof(TLScrollView), default(DataTemplate));

	public DataTemplate ItemTemplate
	{
		get { return (DataTemplate)GetValue(ItemTemplateProperty); }
		set { SetValue(ItemTemplateProperty, value); }
	}
}
~~~ 

After that, I&#8217;ve added a simple method, Render, to populate the ScrollView:

~~~ csharp
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
~~~

That method will be called from the **TLScrollViewRenderer** (iOS and Android are pretty similar). The renderer is a special class that adapts the Xamarin.Forms control into a native control:

~~~ csharp
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
~~~

Now you can use the TLScrollView in your xaml and create your custom template in this way:

~~~ xml
<?xml version="1.0" encoding="utf-8"?>
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms" xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" xmlns:controls="clr-namespace:TitiusLabs.Forms.Controls;assembly=TitiusLabs.Forms" xmlns:local="clr-namespace:FormSamples" x:Class="FormSamples.Core.Views.FormSamplesPage">
	<StackLayout Padding="20">
		<controls:TLScrollView Orientation="Horizontal" ItemsSource="{Binding Items}" HeightRequest="100">
			<controls:TLScrollView.ItemTemplate>
				<DataTemplate>
					<ViewCell>
						<StackLayout Padding="5">
							<controls:TLImageCircle Source="{Binding Image}" HeightRequest="80" WidthRequest="80" />
						</StackLayout>
					</ViewCell>
				</DataTemplate>
			</controls:TLScrollView.ItemTemplate>
		</controls:TLScrollView>
	</StackLayout>
</ContentPage>
~~~

This is the final result:

<a href="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/01/HorizontalView-1.gif" rel="attachment wp-att-2091"><img class="alignnone wp-image-2111 " src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/01/HorizontalView-1.gif?resize=343%2C624" alt="" data-recalc-dims="1" /></a>

Amazing!

**UPDATE 12.04.2016: some small refactoring to the custom horizontal ScrollView control
  
** 

### Full code is available [here](https://github.com/fabiocozzolino/TitiusLabs.Xamarin/blob/master/TitiusLabs.Forms/Controls/TLScrollView.cs)

****

---
id: 4261
title: 'A little and simple Bindable (Horizontal) Scroll View &#8211; Add Command pattern'
date: 2016-12-06T10:34:49+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=4261
permalink: /little-simple-bindable-horizontal-scroll-view-add-command-pattern/
dsq_thread_id:
  - "5358893284"
categories:
  - Xamarin
  - Xamarin.Forms
---
This is the third post of the [A little and simple Bindable (Horizontal) Scroll View](http://www.fabiocozzolino.eu/a-little-and-simple-bindable-horizontal-scroll-view/) saga. In the first post we saw how to implement a horizontal view with data binding capability. Then, [in the second post](http://www.fabiocozzolino.eu/little-simple-bindable-horizontal-scroll-view-handling-item-tap-gesture/), we have seen how to add an event to handle the tap gesture on list items.

In this post, we'll see how to add the Command pattern to the TLScrollView and get working one of the most used way to catch the user UI interaction directly into the ViewModel.

### Adding the Command and CommandParameter properties to the TLScrollView

The first step is to add two bindable properties: SelectedCommand and SelectedCommandParameter.

~~~ csharp
public static readonly BindableProperty SelectedCommandProperty =
	BindableProperty.Create("SelectedCommand", typeof(ICommand), typeof(TLScrollView), null);

public ICommand SelectedCommand
{
	get { return (ICommand)GetValue(SelectedCommandProperty); }
	set { SetValue(SelectedCommandProperty, value); }
}

public static readonly BindableProperty SelectedCommandParameterProperty =
	BindableProperty.Create("SelectedCommandParameter", typeof(object), typeof(TLScrollView), null);

public object SelectedCommandParameter
{
	get { return GetValue(SelectedCommandParameterProperty); }
	set { SetValue(SelectedCommandParameterProperty, value); }
}
~~~

The first one will be used to reference the Command object instance, the event handler into the view model, while the second one is the instance parameter that will be passed to the event handler.

After that, we need to modify the TLScrollView Render method to use the new SelectedCommand and SelectedCommandParameter properties, if used:

~~~ csharp
var command = SelectedCommand ?? new Command((obj) =>
{
	var args = new ItemTappedEventArgs(ItemsSource, item);
	ItemSelected?.Invoke(this, args);
});
var commandParameter = SelectedCommandParameter ?? item;

var viewCell = ItemTemplate.CreateContent() as ViewCell;
viewCell.View.BindingContext = item;
viewCell.View.GestureRecognizers.Add(new TapGestureRecognizer
{
	Command = command,
	CommandParameter = commandParameter,
	NumberOfTapsRequired = 1
});
~~~

### Use the Command pattern to get the selected item

To use the Command pattern in our solution, we need to add a property in our viewmodel that will be binded to the UI control:

~~~ csharp
public ICommand ItemSelected { get; set; }
~~~ 

and then initialize it with an event handler in the viewmodel's constructor:

~~~ csharp
public MyViewModel()
{
	ItemSelected = new Command(arg => DoSomething());
}
~~~ 

finally we can bind the SelectedCommand property to the ItemSelected property:

~~~ xml
<controls:TLScrollView Orientation="Horizontal" ItemsSource="{Binding Items}" SelectedCommand="{Binding ItemSelected}" HeightRequest="100">
~~~ 

### Use my ViewModelBase

One step further is to minimize coding by using [my ViewModelBase implementation](http://www.fabiocozzolino.eu/my-viewmodel-base-class-implementation/). After extending your custom ViewModel with my ViewModelBase, you can simply write a method with the name ItemSelected and the _ExecuteCommand suffix:

~~~ csharp
public void ItemSelected_ExecuteCommand(object args)
{
}
~~~ 

After that, you need to add square brackets around the ItemSelected name in your XAML SelectedCommand assignment definition:

~~~ xml
SelectedCommand="{Binding [ItemSelected]}"
~~~ 

Nice and really simple. As usual, you can find full code with sample on [my github repository](https://github.com/fabiocozzolino/TitiusLabs.Xamarin).

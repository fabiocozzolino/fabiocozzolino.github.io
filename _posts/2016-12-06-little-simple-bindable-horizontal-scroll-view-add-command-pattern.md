---
ID: 4261
post_title: 'A little and simple Bindable (Horizontal) Scroll View &#8211; Add Command pattern'
author: fabiocozzolino
post_date: 2016-12-06 10:34:49
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/little-simple-bindable-horizontal-scroll-view-add-command-pattern/
published: true
dsq_thread_id:
  - "5358893284"
---
This is the third post of the <a href="http://www.fabiocozzolino.eu/a-little-and-simple-bindable-horizontal-scroll-view/">A little and simple Bindable (Horizontal) Scroll View</a> saga. In the first post we saw how to implement a horizontal view with data binding capability. Then, <a href="http://www.fabiocozzolino.eu/little-simple-bindable-horizontal-scroll-view-handling-item-tap-gesture/">in the second post</a>, we have seen how to add an event to handle the tap gesture on list items.

In this post, we'll see how to add the Command pattern to the TLScrollView and get working one of the most used way to catch the user UI interaction directly into the ViewModel.
<h3>Adding the Command and CommandParameter properties to the TLScrollView</h3>
The first step is to add two bindable properties: SelectedCommand and SelectedCommandParameter.

[sourcecode lang="csharp"]
public static readonly BindableProperty SelectedCommandProperty =
	BindableProperty.Create(&quot;SelectedCommand&quot;, typeof(ICommand), typeof(TLScrollView), null);

public ICommand SelectedCommand
{
	get { return (ICommand)GetValue(SelectedCommandProperty); }
	set { SetValue(SelectedCommandProperty, value); }
}

public static readonly BindableProperty SelectedCommandParameterProperty =
	BindableProperty.Create(&quot;SelectedCommandParameter&quot;, typeof(object), typeof(TLScrollView), null);

public object SelectedCommandParameter
{
	get { return GetValue(SelectedCommandParameterProperty); }
	set { SetValue(SelectedCommandParameterProperty, value); }
}
[/sourcecode]

The first one will be used to reference the Command object instance, the event handler into the view model, while the second one is the instance parameter that will be passed to the event handler.

After that, we need to modify the TLScrollView Render method to use the new SelectedCommand and SelectedCommandParameter properties, if used:

[sourcecode lang="csharp"]
var command = SelectedCommand ?? new Command((obj) =&gt;
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
[/sourcecode]

<h3>Use the Command pattern to get the selected item</h3>
To use the Command pattern in our solution, we need to add a property in our viewmodel that will be binded to the UI control:

[sourcecode lang="csharp"]
public ICommand ItemSelected { get; set; }
[/sourcecode]
and then initialize it with an event handler in the viewmodel's constructor:
[sourcecode lang="csharp"]
public MyViewModel()
{
	ItemSelected = new Command(arg =&gt; DoSomething());
}
[/sourcecode]

finally we can bind the SelectedCommand property to the ItemSelected property:

[sourcecode lang="xml"]
&lt;controls:TLScrollView Orientation=&quot;Horizontal&quot; ItemsSource=&quot;{Binding Items}&quot; SelectedCommand=&quot;{Binding ItemSelected}&quot; HeightRequest=&quot;100&quot;&gt;
[/sourcecode]

<h3>Use my ViewModelBase</h3>
One step further is to minimize coding by using <a href="http://www.fabiocozzolino.eu/my-viewmodel-base-class-implementation/">my ViewModelBase implementation</a>. After extending your custom ViewModel with my ViewModelBase, you can simply write a method with the name ItemSelected and the _ExecuteCommand suffix:

[sourcecode lang="xml"]
public void ItemSelected_ExecuteCommand(object args)
{
}
[/sourcecode]

After that, you need to add square brackets around the ItemSelected name in your XAML SelectedCommand assignment definition:

[sourcecode lang="xml"]
SelectedCommand=&quot;{Binding [ItemSelected]}&quot;
[/sourcecode]

Nice and really simple. As usual, you can find full code with sample on <a href="https://github.com/fabiocozzolino/TitiusLabs.Xamarin">my github repository</a>.
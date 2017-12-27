---
id: 2221
title: My ViewModel base class implementation for Xamarin.Forms
date: 2016-06-12T12:50:04+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=2221
permalink: /my-viewmodel-base-class-implementation/
dsq_thread_id:
  - "5275466595"
dsq_needs_sync:
  - "1"
categories:
  - Snippets
  - Xamarin.Forms
tags:
  - MVVM
---
The MVVM is one of the most used architectural pattern to easily separate the UI development from the business logic. When you choose that pattern, you know that the ViewModel class implements many things: property change notifications, commands to execute code based on user interaction, data loading, etc&#8230;, and, every time, you need to write the same code to complete those actions.

In this post we will see how to simplify the writing of the ViewModel classes by using some tricks and put them in a ViewModelBase class. If you don&#8217;t know nothing about the MVVM pattern, you can read more at the following page: <https://msdn.microsoft.com/en-us/library/hh848246.aspx>.

## Data Binding

Bind data to your view is one of the principles on which MVVM is based. Data bindings is a mechanism that allows to tie any property of a visual element to a property of a backend class. That kind of tie can be bidirectional: from the view to the class and from the class to the view. While the first way is the simplest one, the second way needs just some code to be completed: you need to implement the INotifyPropertyChanged interface to notify the view that a property value has changed.

Implements the INotifyPropertyChanged interface requires some code that can be factored in the ViewModelBase class:

~~~ csharp
public abstract class ViewModelBase : INotifyPropertyChanged
{
	public event PropertyChangedEventHandler PropertyChanged;

	protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
	{
		var handler = PropertyChanged;
		if (handler != null)
			handler (this, new PropertyChangedEventArgs(propertyName));
	}
}
~~~ 

With this base class, now you can write our bindable properties in the ViewModel implementation without reimplement the INotifyPropertyChanged every time:

~~~ csharp
public class MyViewModel : ViewModelBase
{
	private string _title;
	public string Title
	{
		get 
		{
			return _title;
		}
		set
		{
			if (value != _title)
			{
				_title = value;
				OnPropertyChanged();
			}
		{
	}		
}
~~~ 

As said before, you need to notify to the View that something has changed. A lot of code, right? A step over could helps us to write a smaller code, like this:

~~~ csharp
public class MyViewModel : ViewModelBase
{
	public string Title
	{
		get { return GetValue<string>(); }
		set { SetValue(value); }
	}		
}
~~~ 

Better and simplest. To accomplish this, you can implement the GetValue and SetValue methods in the ViewModelBase class and stores the properties values in a Dictionary:

~~~ csharp
private Dictionary<string, object> properties = new Dictionary<string, object>();

protected void SetValue<T>(T value, [CallerMemberName] string propertyName = null)
{
	if (!properties.ContainsKey (propertyName)) {
		properties.Add (propertyName, default(T));
	}

	var oldValue = GetValue<T>(propertyName);
	if (!EqualityComparer<T>.Default.Equals(oldValue, value)) {
		properties [propertyName] = value;
		OnPropertyChanged (propertyName);
	}
}

protected T GetValue<T>([CallerMemberName] string propertyName = null)
{
	if (!properties.ContainsKey (propertyName)) {
		return default(T);
	} else {
		return (T)properties [propertyName];
	}
}
~~~ 

That piece of code simplifies writing a derived ViewModelBase class. Now the MyViewModel class, with the smaller code, is much more maintenable.

## Automatic Relay Command implementation

A further step forward in your ViewModelBase consists in develop an automatic and simple way to delegate the execution of commands. In MVVM, a command is a piece of code executed in response of a view interaction. To create a command, you must implement the ICommand interface and put your code in it. The power of this approach helps you to create a code that can be used in multiple views, but sometimes you need to use that command only one time.

So, to simplify writing commands implementation, we can create a delegate at ViewModelBase level for each required command. Check this code:

~~~ csharp
private Dictionary<string, ICommand> commands = new Dictionary<string, ICommand>();

private const string EXECUTECOMMAND_SUFFIX = "_ExecuteCommand";
private const string CANEXECUTECOMMAND_SUFFIX = "_CanExecuteCommand";

public ViewModelBase()
{
	this.commands = 
		this.GetType ().GetTypeInfo ().DeclaredMethods
		.Where (dm => dm.Name.EndsWith (EXECUTECOMMAND_SUFFIX))
		.ToDictionary (k => GetCommandName (k), v => GetCommand (v));
}

private string GetCommandName(MethodInfo mi)
{
	return mi.Name.Replace (EXECUTECOMMAND_SUFFIX, "");
}

private ICommand GetCommand (MethodInfo mi)
{
	var canExecute = this.GetType().GetTypeInfo().GetDeclaredMethod (GetCommandName(mi) + CANEXECUTECOMMAND_SUFFIX);
	var executeAction = (Action<object>)mi.CreateDelegate (typeof(Action<object>), this);
	var canExecuteAction = canExecute != null ? (Func<object, bool>)canExecute.CreateDelegate (typeof(Func<object, bool>), this) : state => true;
	return new Command (executeAction, canExecuteAction);
}

public ICommand this[string name] {
	get{
		return commands [name];
	}
}
~~~ 

When the ViewModel instance is created, we collect any method with the suffix &#8220;ExecuteCommand&#8221; (you can decide to use any kind of suffix), so in the derived class we can write methods with the name _Something_ExecuteCommand:

~~~ csharp
public class MyViewModel : ViewModelBase
{
	public void Save_ExecuteCommand(object state)
	{
	}

	public bool Save_CanExecuteCommand(object state)
	{
	}
}
~~~ 

In this example you see also a method called _Save_CanExecuteCommand. This is optional, since the base class creates a delegate at runtime with return value equals to true if no one has been found.

Finally, in the view, you can write something like this:

~~~ xml
<Button Command="{Binding [Save]}" CommandParameter="{Binding MyProperty}" />
~~~ 

Really simple!

## Conclusion

The ViewModelBase is only a way to simplify ViewModel class development and avoid a lot of code duplication. Obviously this is not the answer for everything.

Let me know what do you think about it!
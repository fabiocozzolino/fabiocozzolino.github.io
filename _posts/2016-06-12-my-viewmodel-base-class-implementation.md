---
ID: 2221
post_title: >
  My ViewModel base class implementation
  for Xamarin.Forms
author: fabiocozzolino
post_date: 2016-06-12 12:50:04
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/my-viewmodel-base-class-implementation/
published: true
dsq_thread_id:
  - "5275466595"
---
The MVVM is one of the most used architectural pattern to easily separate the UI development from the business logic. When you choose that pattern, you know that the ViewModel class implements many things: property change notifications, commands to execute code based on user interaction, data loading, etc..., and, every time, you need to write the same code to complete those actions.

In this post we will see how to simplify the writing of the ViewModel classes by using some tricks and put them in a ViewModelBase class. If you don't know nothing about the MVVM pattern, you can read more at the following page: <a href="https://msdn.microsoft.com/en-us/library/hh848246.aspx">https://msdn.microsoft.com/en-us/library/hh848246.aspx</a>.
<h2>Data Binding</h2>
Bind data to your view is one of the principles on which MVVM is based. Data bindings is a mechanism that allows to tie any property of a visual element to a property of a backend class. That kind of tie can be bidirectional: from the view to the class and from the class to the view. While the first way is the simplest one, the second way needs just some code to be completed: you need to implement the INotifyPropertyChanged interface to notify the view that a property value has changed.

Implements the INotifyPropertyChanged interface requires some code that can be factored in the ViewModelBase class:

[code language="csharp"]
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
[/code]

With this base class, now you can write our bindable properties in the ViewModel implementation without reimplement the INotifyPropertyChanged every time:

[sourcecode language="csharp"]
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
[/sourcecode]

As said before, you need to notify to the View that something has changed. A lot of code, right? A step over could helps us to write a smaller code, like this:

[sourcecode language="csharp"]
public class MyViewModel : ViewModelBase
{
	public string Title
	{
		get { return GetValue&lt;string&gt;(); }
		set { SetValue(value); }
	}		
}
[/sourcecode]

Better and simplest. To accomplish this, you can implement the GetValue and SetValue methods in the ViewModelBase class and stores the properties values in a Dictionary:

[sourcecode language="csharp"]
private Dictionary&lt;string, object&gt; properties = new Dictionary&lt;string, object&gt;();

protected void SetValue&lt;T&gt;(T value, [CallerMemberName] string propertyName = null)
{
	if (!properties.ContainsKey (propertyName)) {
		properties.Add (propertyName, default(T));
	}

	var oldValue = GetValue&lt;T&gt;(propertyName);
	if (!EqualityComparer&lt;T&gt;.Default.Equals(oldValue, value)) {
		properties [propertyName] = value;
		OnPropertyChanged (propertyName);
	}
}

protected T GetValue&lt;T&gt;([CallerMemberName] string propertyName = null)
{
	if (!properties.ContainsKey (propertyName)) {
		return default(T);
	} else {
		return (T)properties [propertyName];
	}
}
[/sourcecode]

That piece of code simplifies writing a derived ViewModelBase class. Now the MyViewModel class, with the smaller code, is much more maintenable.
<h2>Automatic Relay Command implementation</h2>
A further step forward in your ViewModelBase consists in develop an automatic and simple way to delegate the execution of commands. In MVVM, a command is a piece of code executed in response of a view interaction. To create a command, you must implement the ICommand interface and put your code in it. The power of this approach helps you to create a code that can be used in multiple views, but sometimes you need to use that command only one time.

So, to simplify writing commands implementation, we can create a delegate at ViewModelBase level for each required command. Check this code:

[code language="csharp"]
private Dictionary&lt;string, ICommand&gt; commands = new Dictionary&lt;string, ICommand&gt;();

private const string EXECUTECOMMAND_SUFFIX = &quot;_ExecuteCommand&quot;;
private const string CANEXECUTECOMMAND_SUFFIX = &quot;_CanExecuteCommand&quot;;

public ViewModelBase()
{
	this.commands = 
		this.GetType ().GetTypeInfo ().DeclaredMethods
		.Where (dm =&gt; dm.Name.EndsWith (EXECUTECOMMAND_SUFFIX))
		.ToDictionary (k =&gt; GetCommandName (k), v =&gt; GetCommand (v));
}

private string GetCommandName(MethodInfo mi)
{
	return mi.Name.Replace (EXECUTECOMMAND_SUFFIX, &quot;&quot;);
}

private ICommand GetCommand (MethodInfo mi)
{
	var canExecute = this.GetType().GetTypeInfo().GetDeclaredMethod (GetCommandName(mi) + CANEXECUTECOMMAND_SUFFIX);
	var executeAction = (Action&lt;object&gt;)mi.CreateDelegate (typeof(Action&lt;object&gt;), this);
	var canExecuteAction = canExecute != null ? (Func&lt;object, bool&gt;)canExecute.CreateDelegate (typeof(Func&lt;object, bool&gt;), this) : state =&gt; true;
	return new Command (executeAction, canExecuteAction);
}

public ICommand this[string name] {
	get{
		return commands [name];
	}
}
[/code]

When the ViewModel instance is created, we collect any method with the suffix "ExecuteCommand" (you can decide to use any kind of suffix), so in the derived class we can write methods with the name <em>Something</em>ExecuteCommand:

[code language="csharp"]
public class MyViewModel : ViewModelBase
{
	public void Save_ExecuteCommand(object state)
	{
	}

	public bool Save_CanExecuteCommand(object state)
	{
	}
}
[/code]

In this example you see also a method called <em>Save</em>CanExecuteCommand. This is optional, since the base class creates a delegate at runtime with return value equals to true if no one has been found.

Finally, in the view, you can write something like this:

[code language="xml"]
&lt;Button Command=&quot;{Binding [Save]}&quot; CommandParameter=&quot;{Binding MyProperty}&quot; /&gt;
[/code]

Really simple!
<h2>Conclusion</h2>
The ViewModelBase is only a way to simplify ViewModel class development and avoid a lot of code duplication. Obviously this is not the answer for everything.

Let me know what do you think about it!
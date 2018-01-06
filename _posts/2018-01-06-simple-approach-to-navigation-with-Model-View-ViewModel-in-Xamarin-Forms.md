---
published: true
title: A simple approach to navigation with Model-View-ViewModel in Xamarin.Forms
date: 2018-01-06T16:58:11.000Z
author: fabiocozzolino
layout: post
categories:
  - Xamarin
  - Xamarin.Forms
---
Model-View-ViewModel its a widely used architectural pattern that helps you to separate the UI from the presentation logic responsibility. In your ViewModel you can provide data to the View through binding and handle the action by using commands, but what about the navigation? Who is responsible for showing another view?
In this post, we'll see how the MVVM start the navigation in a straightforward approach, based on the assumption that navigation from ViewModel is a "request of navigation". The "request of navigation" is sent to the View, the real executor, by using a set of specific delegates.
Let me show you the code.

## The Code
Since in MVVM the ViewModel doesn't know anything about the View, we need to notify the View when a request for navigation is in place. So, to do this, our implementation provides a ViewModelBase class that, by using a delegate, inform a subscriber (the View) that navigation has been requested. 

    public Func<ViewModelBase, Task> OnNavigationRequest;

    public Task NavigateTo<TViewModel>(TViewModel targetViewModel) where TViewModel : ViewModelBase
    {
        await OnNavigationRequest?.Invoke(targetViewModel);
    }

On the other side, the Page will register the delegate when appearing and will cancel when disappearing:

    protected override void OnAppearing()
    {
        base.OnAppearing();

        ViewModel.OnNavigationRequest = HandleNavigationRequest;
    }

    protected override void OnDisappearing()
    {
        base.OnDisappearing();

        ViewModel.OnNavigationRequest = null;
    }

So, you avoid getting navigation request when the Page is not active. Last, but not least, the delegate will look similar to the following code:

    async Task HandleNavigationRequest(ViewModelBase targetViewModel)
    {
        var targetView = ViewResolver.GetViewFor(targetViewModel);
        await Navigation.PushAsync(targetView);
    }

The ViewResolver is responsible for maps the ViewModel to the View in a 1:1 model:

    public static Page GetViewFor<TargetViewModel>(TargetViewModel targetViewModel) where TargetViewModel : ViewModelBase, new()
    {
        var targetViewName = targetViewModel.GetType().Name.Replace("ViewModel", "Page");
        var definedTypes = targetViewModel.GetType().GetTypeInfo().Assembly.DefinedTypes;
        var targetType = definedTypes.FirstOrDefault(t => t.Name == targetViewName);
        return Activator.CreateInstance(targetType.AsType()) as Page;
    }

Obviously, feel free to write it as you prefer.

## Ok, let's use it!
Now, you will be able to start navigation in ViewModel by using the following code:

await NavigateTo(new OtherPageViewModel());

Cool!

## Conclusion
Let me know what do you think about this approach. You like it or you hate it? Anyway, you'll find full code on my github page: https://github.com/fabiocozzolino/TitiusLabs.Xamarin
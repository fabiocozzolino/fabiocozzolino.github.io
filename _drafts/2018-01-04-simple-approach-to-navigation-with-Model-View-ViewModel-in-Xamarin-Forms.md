---
published: false
---
## A simple approach to navigation with Model-View-ViewModel in Xamarin.Forms

Model-View-ViewModel its a widely used architectural pattern that helps you to separate the UI from the presentation logic responsibility. In your ViewModel you are able to provide data to the View through binding and handle the action by using commands, but what about the navigation? Who is responsible to show another view?
In this post, we'll see how the MVVM start the navigation in a very simple approach, based on the assumption that navigation from ViewModel is a "request of navigation". The "request of navigation" is sent to the View, the real executor, by using a set of specific delegates.
Let me show you the code.

### The ViewModelBase code
First of all, you need a base class implementation for both the ViewModel and the View. 

    public Action<ViewModelBase> OnNavigationRequest;

    public void NavigateTo<TViewModel>(TViewModel targetViewModel) where TViewModel : ViewModelBase
    {
        OnNavigationRequest?.Invoke(targetViewModel);
    }

### PageBase code

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

    void HandleNavigationRequest(ViewModelBase targetViewModel)
    {
        var targetView = ViewResolver.GetViewFor(targetViewModel);
        Navigation.PushAsync(targetView).ConfigureAwait(true);
    }
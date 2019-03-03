---
published: true
title: Goodbye TLScrollView. Welcome BindableLayout!
date: 2019-03-02T11:05:00.000Z
author: fabiocozzolino
layout: post
permalink: /goodbye-tlscrollview-welcome-bindablelayout/
tags:
  - Xamarin
  - Xamarin.Forms
  - .NET
  - .NET Standard
  - .NET Core
  - C#
---
About three years ago I wrote a [blog post](/a-little-and-simple-bindable-horizontal-scroll-view/) about my Xamarin.Forms component [TLScrollView](https://github.com/fabiocozzolino/TitiusLabs.Xamarin/blob/master/TitiusLabs.Forms/Controls/TLScrollView.cs), a simple horizontal scrollview with bindable feature. The post was one of the most viewed and commented, and I'm really happy about that, but now, with the latest version of Xamarin.Forms, you can use the new `BindableLayout` feature.

# Move TLScrollView to BindableLayout
Looking back, in my post you can see how to use the `TLScrollView` control:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ContentPage
    xmlns="http://xamarin.com/schemas/2014/forms"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:controls="clr-namespace:TitiusLabs.Forms.Controls;assembly=TitiusLabs.Forms"
    xmlns:local="clr-namespace:FormSamples" x:Class="FormSamples.Core.Views.FormSamplesPage">
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
```

Change the code to support the `BindableLayout` is really simple. You don't need to use my custom control since the `BindableLayout` is applicable to all Layout Xamarin.Forms controls. So, using the `StackLayout`, add the `BindableLayout.ItemsSource` attribute and the `BindableLayout.ItemTemplate` attribute to implement the binding. Here you can see the new code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ContentPage
    xmlns="http://xamarin.com/schemas/2014/forms"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:controls="clr-namespace:TitiusLabs.Forms.Controls;assembly=TitiusLabs.Forms"
    xmlns:local="clr-namespace:FormSamples" x:Class="FormSamples.Core.Views.FormSamplesPage">
    <StackLayout Orientation="Horizontal" BindableLayout.ItemsSource="{Binding Items}" HeightRequest="100">
        <BindableLayout.ItemTemplate>
            <DataTemplate>
                <ViewCell>
                    <StackLayout Padding="5">
                        <controls:TLImageCircle Source="{Binding Image}" HeightRequest="80" WidthRequest="80" />
                    </StackLayout>
                </ViewCell>
            </DataTemplate>
        </BindableLayout.ItemTemplate>
    </StackLayout>
</ContentPage>
```

Check [here](https://blog.xamarin.com/xamarin-forms-3-5-a-little-bindable-love/) how the `BindableLayout` works.

Enjoy!

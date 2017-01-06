---
ID: 1011
post_title: 'Xamarin.Forms: from prototype to app store'
author: fabiocozzolino
post_date: 2015-10-17 17:05:33
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/xamarin-forms-from-prototyping-to-app-store/
published: true
dsq_thread_id:
  - "5286685393"
---
In my talks, speaking about Xamarin.Forms, the most common question is: "Wonderful technology! But ... when Xamarin.Forms is the preferred choice? Why (and when) I should use it instead of native apps?"

My answer: "It depends!"

Xamarin.Forms is really a great and fast way to develop mobile apps by abstracting controls in XAML, a simple description on what we want to do. That controls are then "magically rendered" in native controls. With this in mind, it's impossible to abstract all the things completely, so sometimes it's necessary to extend the framework with custom renderers. This means that you must know the target OS environment. No way.

In his post <a href="http://danielhindrikes.se/xamarin/how-to-success-with-xamarin-forms/" target="_blank">"How to success with Xamarin Forms"</a>, Daniel Hindrikes says that you must don't care if your app "doesn’t look perfect from the beginning. When you have created your app and built all the business logic, then you can start to look at how to make the app perfect.". While I totally agree with him, I would add another step: after building all the business logic and the first UI version, evaluate if Xamarin.Forms is the right the framework for your app.

&nbsp;
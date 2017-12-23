---
id: 1011
title: 'Xamarin.Forms: from prototype to app store'
date: 2015-10-17T17:05:33+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=1011
permalink: /xamarin-forms-from-prototyping-to-app-store/
dsq_thread_id:
  - "5286685393"
categories:
  - Xamarin
  - Xamarin.Forms
---
In my talks, speaking about Xamarin.Forms, the most common question is: &#8220;Wonderful technology! But &#8230; when Xamarin.Forms is the preferred choice? Why (and when) I should use it instead of native apps?&#8221;

My answer: &#8220;It depends!&#8221;

Xamarin.Forms is really a great and fast way to develop mobile apps by abstracting controls in XAML, a simple description on what we want to do. That controls are then &#8220;magically rendered&#8221; in native controls. With this in mind, it&#8217;s impossible to abstract all the things completely, so sometimes it&#8217;s necessary to extend the framework with custom renderers. This means that you must know the target OS environment. No way.

In his post <a href="http://danielhindrikes.se/xamarin/how-to-success-with-xamarin-forms/" target="_blank">&#8220;How to success with Xamarin Forms&#8221;</a>, Daniel Hindrikes says that you must don&#8217;t care if your app &#8220;doesn’t look perfect from the beginning. When you have created your app and built all the business logic, then you can start to look at how to make the app perfect.&#8221;. While I totally agree with him, I would add another step: after building all the business logic and the first UI version, evaluate if Xamarin.Forms is the right the framework for your app.

&nbsp;
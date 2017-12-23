---
id: 4831
title: Keep It Simple!
date: 2017-01-09T21:32:32+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=4831
permalink: /keep-it-simple/
dsq_thread_id:
  - "5450617021"
categories:
  - Architecture
tags:
  - Architecture
  - Methods
---
**Antoine de Saint-Exupéry** wrote in his book **The Little Prince** the following phrase:

> _&#8220;Perfection is Achieved Not When There Is Nothing More to Add, But When There Is Nothing Left to Take Away&#8221;_

<p class="headline hover-highlight entry-title js_entry-title">
  Thinking about this small sentence, I would like to share with you some small considerations applying it in software development.
</p>

### Simplicity is the most complex thing {.headline.hover-highlight.entry-title.js_entry-title}

<p class="headline hover-highlight entry-title js_entry-title">
  Think about software development. Many developers tend to create complex architectures, adding unnecessary patterns or over engineered code. Why they do that? Because they are trying to set the path for future changes that is gonna happen almost&#8230;never!
</p>

<p class="headline hover-highlight entry-title js_entry-title">
  For example: you choose to abstract a component usage &#8211; by using IoC, for example &#8211; because, maybe one day, you must be able to use a different component and you don&#8217;t wont to change every time your code. Nice and good practice! But, it is really necessary in a iOS app? Maybe yes but, really, how many times you&#8217;ll change that component in the app lifetime? Except for really rare case, from zero to one time.
</p>

<p class="headline hover-highlight entry-title js_entry-title">
  So, in that case, abstraction it&#8217;s like to take &#8220;<strong>a sledgehammer to crack a nut</strong>&#8220;.
</p>

### Lets evolve your architecture {.headline.hover-highlight.entry-title.js_entry-title}

When your requirements are really not clear at first, write the most simpler code. If you need to read data from database, try to create a simple interface with direct read. This is not so bad at all. When you need to access to the database from another point or view, change your architecture by refactoring your code to create your data access layer.

The idea is simple: **introduce changes in your architecture as late as possibile and only if it is strictly necessary**. You can&#8217;t predict the future, so don&#8217;t do unnecessary things.

Obviously, if your requirements are clear, keep in mind your architecture while developing!
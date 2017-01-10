---
ID: 4831
post_title: Keep It Simple!
author: fabiocozzolino
post_date: 2017-01-09 21:32:32
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/keep-it-simple/
published: true
dsq_thread_id:
  - "5450617021"
---
<strong>Antoine de Saint-Exupéry</strong> wrote in his book <strong>The Little Prince</strong> the following phrase:
<blockquote><em>"Perfection is Achieved Not When There Is Nothing More to Add, But When There Is Nothing Left to Take Away"</em></blockquote>
<p class="headline hover-highlight entry-title js_entry-title">Thinking about this small sentence, I would like to share with you some small considerations applying it in software development.</p>

<h3 class="headline hover-highlight entry-title js_entry-title">Simplicity is the most complex thing</h3>
<p class="headline hover-highlight entry-title js_entry-title">Think about software development. Many developers tend to create complex architectures, adding unnecessary patterns or over engineered code. Why they do that? Because they are trying to set the path for future changes that is gonna happen almost...never!</p>
<p class="headline hover-highlight entry-title js_entry-title">For example: you choose to abstract a component usage - by using IoC, for example - because, maybe one day, you must be able to use a different component and you don't wont to change every time your code. Nice and good practice! But, it is really necessary in a iOS app? Maybe yes but, really, how many times you'll change that component in the app lifetime? Except for really rare case, from zero to one time.</p>
<p class="headline hover-highlight entry-title js_entry-title">So, in that case, abstraction it's like to take "<strong>a sledgehammer to crack a nut</strong>".</p>

<h3 class="headline hover-highlight entry-title js_entry-title">Lets evolve your architecture</h3>
When your requirements are really not clear at first, write the most simpler code. If you need to read data from database, try to create a simple interface with direct read. This is not so bad at all. When you need to access to the database from another point or view, change your architecture by refactoring your code to create your data access layer.

The idea is simple: <strong>introduce changes in your architecture as late as possibile and only if it is strictly necessary</strong>. You can't predicte the future, so don't do anything that unnecessary.

Obviously, if your requirements are clear, keep in mind your architecture while developing!
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
---
<strong>Antoine de Saint-Exupéry</strong> wrote in his book <strong>The Little Prince</strong> the following phrase:
<blockquote><em>"Perfection is Achieved Not When There Is Nothing More to Add, But When There Is Nothing Left to Take Away"</em></blockquote>
<p class="headline hover-highlight entry-title js_entry-title">Think about software development. Many developers tend to create complex architectures, adding not necessary patterns or over-enginering their code. Why do that? Because they are trying to prepare the code for future change requirements.</p>
<p class="headline hover-highlight entry-title js_entry-title">But.</p>
<p class="headline hover-highlight entry-title js_entry-title">How many times that hypotethical changes occurs? Almost never. For example: you choose to abstract your database access because, maybe one day, you must be able to connect to a different database. It is really necessary in a iOS app when, typically, your database is SQLite? I don't think.</p>
<p class="headline hover-highlight entry-title js_entry-title">So, in that case, abstract your database access it's like to take "<strong>a sledgehammer to crack a nut</strong>".</p>

<h2 class="headline hover-highlight entry-title js_entry-title">Lets evolve your architecture</h2>
When your requirements are really not clear at first, write the most simpler code. If you need to read data from database, try to create first a simple interface with direct read. This is not so bad. When you need to access to the database from another point o view, change your architecture by refactoring your code to create your data access layer.

The idea is simple: <strong>introduce changes in your architecture as late as possibile and only when it is necessary</strong>. You don't know the future, so don't do anything that is not necessary.

Obviously, if your requirements are clear, develop with your architecture in mind!
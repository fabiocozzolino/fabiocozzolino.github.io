---
ID: 3812
post_title: >
  Break when an exception is thrown in
  Xamarin Studio
author: fabiocozzolino
post_date: 2016-10-26 22:13:37
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/break-exceptions-xamarin-studio/
published: true
dsq_thread_id:
  - "5274921785"
---
If you are a typical <strong>Visual Studio</strong> user, you'll find easy use the menu Debug &gt; Windows &gt; Exception Settings and set your favorite option to break debug when a specific exeption was thrown:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-21.58.42.png"><img class="alignnone size-full wp-image-3851" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-21.58.42.png" alt="schermata-2016-10-26-alle-21-58-42" width="428" height="319" /></a>

But, in <strong>Xamarin Studio</strong>, that thing is just a little bit different. You need to set a new breakpoint from the menù Run &gt; New Breakpoint:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.02.54.png"><img class="alignnone size-full wp-image-3861" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.02.54.png" alt="schermata-2016-10-26-alle-22-02-54" width="271" height="471" /></a>

Then you must select the "When an exception is thrown" options:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.04.36.png"><img class="alignnone size-full wp-image-3871" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.04.36.png" alt="schermata-2016-10-26-alle-22-04-36" width="481" height="586" /></a>

Finally, you can choose the exception that will cause the debugger's break, eventually by including their subclasses:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.06.18.png"><img class="alignnone size-full wp-image-3881" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.06.18.png" alt="schermata-2016-10-26-alle-22-06-18" width="467" height="89" /></a>

That's all!
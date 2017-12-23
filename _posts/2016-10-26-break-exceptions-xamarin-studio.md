---
id: 3812
title: Break when an exception is thrown in Xamarin Studio
date: 2016-10-26T22:13:37+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=3812
permalink: /break-exceptions-xamarin-studio/
dsq_thread_id:
  - "5274921785"
categories:
  - Xamarin
tags:
  - Debug
  - Xamarin Studio
---
If you are a typical **Visual Studio** user, you&#8217;ll find easy use the menu Debug > Windows > Exception Settings and set your favorite option to break debug when a specific exeption was thrown:

[<img class="alignnone size-full wp-image-3851" src="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-21.58.42.png?resize=428%2C319" alt="schermata-2016-10-26-alle-21-58-42" srcset="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-21.58.42.png?w=428 428w, https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-21.58.42.png?resize=300%2C224 300w" sizes="(max-width: 428px) 100vw, 428px" data-recalc-dims="1" />](https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-21.58.42.png)

But, in **Xamarin Studio**, that thing is just a little bit different. You need to set a new breakpoint from the menù Run > New Breakpoint:

[<img class="alignnone size-full wp-image-3861" src="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.02.54.png?resize=271%2C471" alt="schermata-2016-10-26-alle-22-02-54" srcset="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.02.54.png?w=271 271w, https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.02.54.png?resize=173%2C300 173w" sizes="(max-width: 271px) 100vw, 271px" data-recalc-dims="1" />](https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.02.54.png)

Then you must select the &#8220;When an exception is thrown&#8221; options:

[<img class="alignnone size-full wp-image-3871" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.04.36.png?resize=481%2C586" alt="schermata-2016-10-26-alle-22-04-36" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.04.36.png?w=481 481w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.04.36.png?resize=246%2C300 246w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.04.36.png?resize=300%2C365 300w" sizes="(max-width: 481px) 100vw, 481px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.04.36.png)

Finally, you can choose the exception that will cause the debugger&#8217;s break, eventually by including their subclasses:

[<img class="alignnone size-full wp-image-3881" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.06.18.png?resize=467%2C89" alt="schermata-2016-10-26-alle-22-06-18" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.06.18.png?w=467 467w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.06.18.png?resize=300%2C57 300w" sizes="(max-width: 467px) 100vw, 467px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/10/Schermata-2016-10-26-alle-22.06.18.png)

That&#8217;s all!
---
published: false
title: How to debug Xamarin and Mono class library with Visual Studio for Mac
date: 2018-01-12T08:58:11.000Z
author: fabiocozzolino
layout: post
permalink: /how-to-debug-xamarin-and-mono-class-library-visual-studio-for-mac/
tags:
  - Xamarin
  - Xamarin.Forms
  - Visual Studio for Mac
---
In Visual Studio for Mac enable the debugging of Xamarin or Mono class library is really very simple and is well described in [that page](https://docs.microsoft.com/it-it/visualstudio/mac/debugging#debugging-monos-class-libraries).
You can uncheck the *Debug project code only; do not step into framework code.* in *Visual Studio for Mac* > *Preferences* > *Debugger* and the game is done:

![Visual Studio for Mac Enable Debug](http://www.fabiocozzolino.eu/assets/img/vs-enable-debug.png)

# But...
Despite the fact that the above page said *Xamarin products ship with the source code for Mono's class libraries*, I was unable to execute the debug after uncheck the above descripted option (the step into options doesn't work).
To start debugging, simply go to the [Mono GitHub page](https://github.com/mono/mono), select the tag related to your local mono version

![Mono tag selection](http://www.fabiocozzolino.eu/assets/img/mono-tag-version.png)

then, click on *Clone or download* > *Download ZIP* on the right side and unzip the file into the following folder:
/Library/Frameworks/Xamarin.iOS.framework/Versions/11.6.1.3/src

Finally, rename the folder in *mono*:

![Mono folder](http://www.fabiocozzolino.eu/assets/img/mono-folder.png)

And voilà:

![Mono debug](http://www.fabiocozzolino.eu/assets/img/mono-debug.png)

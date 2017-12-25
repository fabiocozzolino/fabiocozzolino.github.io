---
id: 4621
title: ASP.NET Core Mobile Service with Visual Studio for Mac
date: 2016-12-31T11:49:00+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=4621
permalink: /asp-net-core-mobile-service-visual-studio-mac/
dsq_thread_id:
  - "5424227917"
categories:
  - Azure
  - Mobile Service
tags:
  - Azure
  - Mobile Service
---
With Visual Studio for Mac, a lot of new project templates are now available to macOS developers. For example, you can now create an ASP.NET Core or a .NET Core console project directly on your Mac. Wow! But, in my opinion, one of the most interesting project template is the **Connected App**. With this template you&#8217;ll be able to create a complete solution with a Mobile app (iOS, Android and Windows or Xamarin.Forms) and a Backend app, an ASP.NET Core mobile project that will be hosted in an Azure Mobile Services app.

In this post we&#8217;ll see how we can create a Connected App and publish our backend to Azure by using GitHub as source control host. Yes, it is a Continuos Delivery system.

## Step 1 | Create a GitHub Repository

First of all, you need to create a new GitHub repository. If you already have a GitHub repository, please go ahead. So, navigate to your GitHub page and on Repository tab click on New. After that, create a README.md file to initialize your repository and, on desktop side, clone the repository by using your git client (like GitHub Desktop).

For a full guide, follow these steps: <https://help.github.com/articles/creating-a-new-repository/>

## Step 2 | Create a Connected App solution

After you have created and cloned the repository, open Visual Studio for Mac and create a new project in the local repository folder by using the Connected App template:

[<img class="alignnone size-full wp-image-4631" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png?resize=762%2C457" alt="" srcset="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png?w=1384 1384w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png?resize=300%2C180 300w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png?resize=768%2C461 768w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png?resize=1024%2C614 1024w" sizes="(max-width: 762px) 100vw, 762px" data-recalc-dims="1" />](https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png)

Now we have a complete solution, from frontend, the mobile apps, to backend, the web api app:

[<img class="size-full wp-image-4651 aligncenter" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.09.19.png?resize=425%2C504" alt="" srcset="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.09.19.png?w=425 425w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.09.19.png?resize=253%2C300 253w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.09.19.png?resize=300%2C356 300w" sizes="(max-width: 425px) 100vw, 425px" data-recalc-dims="1" />](https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.09.19.png)

By using your git client, commit and push the project on GitHub.

## Step 3 | Publish to Azure via GitHub

Finally we are now ready to publish the service to Azure. So, go to the [Microsoft Azure portal](https://portal.azure.com), log-in into your account and create a new Mobile App.

[<img class="alignnone size-full wp-image-4671" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png?resize=762%2C237" alt="" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png?w=1230 1230w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png?resize=300%2C93 300w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png?resize=768%2C239 768w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png?resize=1024%2C318 1024w" sizes="(max-width: 762px) 100vw, 762px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png)

Set up the Mobile Service with your preferred settings:

[<img class="size-full wp-image-4681 aligncenter" src="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.28.42.png?resize=311%2C371" alt="" srcset="https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.28.42.png?w=311 311w, https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.28.42.png?resize=251%2C300 251w, https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.28.42.png?resize=300%2C358 300w" sizes="(max-width: 311px) 100vw, 311px" data-recalc-dims="1" />](https://i0.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.28.42.png)

To connect our Mobile Service to GitHub, go to Deployment Options and choose GitHub as source.

[<img class="alignnone size-full wp-image-4701" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.32.32.png?resize=762%2C412" alt="" srcset="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.32.32.png?w=892 892w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.32.32.png?resize=300%2C162 300w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.32.32.png?resize=768%2C415 768w" sizes="(max-width: 762px) 100vw, 762px" data-recalc-dims="1" />](https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.32.32.png)

Then you&#8217;ll be requested to authorize access to the GitHub account.

[<img class="alignnone size-full wp-image-4691" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.33.04.png?resize=762%2C407" alt="" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.33.04.png?w=894 894w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.33.04.png?resize=300%2C160 300w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.33.04.png?resize=768%2C411 768w" sizes="(max-width: 762px) 100vw, 762px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.33.04.png)

Finally, select the repository and the branch you&#8217;d like to use.

[<img class="alignnone size-full wp-image-4741" src="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-31-alle-11.08.37.png?resize=762%2C422" alt="" srcset="https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-31-alle-11.08.37.png?w=957 957w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-31-alle-11.08.37.png?resize=300%2C166 300w, https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-31-alle-11.08.37.png?resize=768%2C425 768w" sizes="(max-width: 762px) 100vw, 762px" data-recalc-dims="1" />](https://i2.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-31-alle-11.08.37.png)

And you have done! Now Azure automatically start the deployment process and &#8230; **BOOM!** 

Yes! You got the following error:

<pre class="azc-text-stream-wrap-text" data-bind="css: { &quot;azc-text-stream-wrap-text&quot;: data.wrap }"><span class="azc-log-stream-text">
</span></pre>
~~~~~~~~
Command: "D:\home\site\deployments\tools\deploy.cmd"
Handling ASP.NET Core Web Application deployment.
D:\home\site\repository\XConn\Droid\XConn.Droid.csproj(137,3): error MSB4019: The imported project "D:\Program Files (x86)\dotnet\sdk\1.0.0-preview3-004056\Xamarin\Android\Xamarin.Android.CSharp.targets" was not found. Confirm that the path in the &lt;Import&gt; declaration is correct, and that the file exists on disk.
D:\home\site\repository\XConn\iOS\XConn.iOS.csproj(163,3): error MSB4019: The imported project "D:\Program Files (x86)\dotnet\sdk\1.0.0-preview3-004056\Xamarin\iOS\Xamarin.iOS.CSharp.targets" was not found. Confirm that the path in the &lt;Import&gt; declaration is correct, and that the file exists on disk.
Failed exitCode=1, command=dotnet restore "XConn\XConn.sln"
An error has occurred during web site deployment.
\r\nD:\Program Files (x86)\SiteExtensions\Kudu\59.51212.2600\bin\Scripts\starter.cmd "D:\home\site\deployments\tools\deploy.cmd"
~~~~~~~~

## Step 4 | Publish with a Custom Deployment script

What happen? Just some background info. The deployment process is governed by [Kudu](https://github.com/projectkudu/kudu), &#8220;the engine behind git/hg deployments, WebJobs, and various other features in Azure Web Sites&#8221;. In small words, Kudu scan the repository to find a project to publish. When done, it will generate a deployment script which first step is restoring NuGet packages from the solution.

Ah, the solution! The Connected App solution also include the Xamarin.iOS and Xamarin.Android project. Bingo! The deployment process is trying to solve and build the Xamarin packages on Azure Mobile Service, which is not allowed!

So, what we&#8217;ll do is to create a custom deployment script to restore, build and publish only the Mobile Service project. To do that we&#8217;ll use a .deployment file ([check instruction here](https://github.com/projectkudu/kudu/wiki/Customizing-deployments)):

<pre class="azc-text-stream-wrap-text" data-bind="css: { &quot;azc-text-stream-wrap-text&quot;: data.wrap }"><span class="azc-log-stream-text">[config]
command = deploy.cmd
</span></pre>

And this is the custom deployment script that you can customize by only replacing the project name:

<pre class="brush: powershell; title: ; notranslate" title="">@if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

:: ----------------------
:: KUDU Deployment Script
:: Version: 1.0.10
:: ----------------------

:: Prerequisites
:: -------------

:: Verify node.js installed
where node 2&gt;nul &gt;nul
IF %ERRORLEVEL% NEQ 0 (
  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
  goto error
)

:: Setup
:: -----

setlocal enabledelayedexpansion

SET ARTIFACTS=%~dp0%..\artifacts

IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%.
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)

IF NOT DEFINED NEXT_MANIFEST_PATH (
  SET NEXT_MANIFEST_PATH=%ARTIFACTS%\manifest

  IF NOT DEFINED PREVIOUS_MANIFEST_PATH (
    SET PREVIOUS_MANIFEST_PATH=%ARTIFACTS%\manifest
  )
)

IF NOT DEFINED KUDU_SYNC_CMD (
  :: Install kudu sync
  echo Installing Kudu Sync
  call npm install kudusync -g --silent
  IF !ERRORLEVEL! NEQ 0 goto error

  :: Locally just running "kuduSync" would also work
  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
)
IF NOT DEFINED DEPLOYMENT_TEMP (
  SET DEPLOYMENT_TEMP=%temp%\___deployTemp%random%
  SET CLEAN_LOCAL_DEPLOYMENT_TEMP=true
)

IF DEFINED CLEAN_LOCAL_DEPLOYMENT_TEMP (
  IF EXIST "%DEPLOYMENT_TEMP%" rd /s /q "%DEPLOYMENT_TEMP%"
  mkdir "%DEPLOYMENT_TEMP%"
)

IF DEFINED MSBUILD_PATH goto MsbuildPathDefined
SET MSBUILD_PATH=%ProgramFiles(x86)%\MSBuild\14.0\Bin\MSBuild.exe
:MsbuildPathDefined
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: ----------

echo Handling ASP.NET Core Web Application deployment.

:: 1. Restore nuget packages
call :ExecuteCmd dotnet restore "XConn\MobileAppService\XConn.MobileAppService.csproj"
IF !ERRORLEVEL! NEQ 0 goto error

:: 2. Build and publish
call :ExecuteCmd dotnet publish "XConn\MobileAppService\XConn.MobileAppService.csproj" --framework netcoreapp1.0 --configuration Release --output "%DEPLOYMENT_TEMP%"
IF !ERRORLEVEL! NEQ 0 goto error

:: 3. KuduSync
call :ExecuteCmd "%KUDU_SYNC_CMD%" -v 50 -f "%DEPLOYMENT_TEMP%" -t "%DEPLOYMENT_TARGET%" -n "%NEXT_MANIFEST_PATH%" -p "%PREVIOUS_MANIFEST_PATH%" -i ".git;.hg;.deployment;deploy.cmd"
IF !ERRORLEVEL! NEQ 0 goto error

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
goto end

:: Execute command routine that will echo out when error
:ExecuteCmd
setlocal
set _CMD_=%*
call %_CMD_%
if "%ERRORLEVEL%" NEQ "0" echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
exit /b %ERRORLEVEL%

:error
endlocal
echo An error has occurred during web site deployment.
call :exitSetErrorLevel
call :exitFromFunction 2&gt;nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal
echo Finished successfully.
</pre>

Finally, you can publish the .deployment and deploy.cmd files to the root of the repository. Once done, the deployment process restart and now &#8230; **the Mobile Service is up and running!**

Happy coding!
---
ID: 4621
post_title: >
  ASP.NET Core Mobile Service with Visual
  Studio for Mac
author: fabiocozzolino
post_date: 2016-12-31 11:49:00
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/asp-net-core-mobile-service-visual-studio-mac/
published: true
dsq_thread_id:
  - "5424227917"
---
With Visual Studio for Mac, a lot of new project templates are now available to macOS developers. For example, you can now create an ASP.NET Core or a .NET Core console project directly on your Mac. Wow! But, in my opinion, one of the most interesting project template is the <strong>Connected App</strong>. With this template you'll be able to create a complete solution with a Mobile app (iOS, Android and Windows or Xamarin.Forms) and a Backend app, an ASP.NET Core mobile project that will be hosted in an Azure Mobile Services app.

In this post we'll see how we can create a Connected App and publish our backend to Azure by using GitHub as source control host. Yes, it is a Continuos Delivery system.
<h2>Step 1 | Create a GitHub Repository</h2>
First of all, you need to create a new GitHub repository. If you already have a GitHub repository, please go ahead. So, navigate to your GitHub page and on Repository tab click on New. After that, create a README.md file to initialize your repository and, on desktop side, clone the repository by using your git client (like GitHub Desktop).

For a full guide, follow these steps: <a href="https://help.github.com/articles/creating-a-new-repository/">https://help.github.com/articles/creating-a-new-repository/</a>
<h2>Step 2 | Create a Connected App solution</h2>
After you have created and cloned the repository, open Visual Studio for Mac and create a new project in the local repository folder by using the Connected App template:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png"><img class="alignnone size-full wp-image-4631" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-28-alle-20.05.53.png" alt="" width="1384" height="830" /></a>

Now we have a complete solution, from frontend, the mobile apps, to backend, the web api app:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.09.19.png"><img class="size-full wp-image-4651 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.09.19.png" alt="" width="425" height="504" /></a>

By using your git client, commit and push the project on GitHub.
<h2>Step 3 | Publish to Azure via GitHub</h2>
Finally we are now ready to publish the service to Azure. So, go to the <a href="https://portal.azure.com">Microsoft Azure portal</a>, log-in into your account and create a new Mobile App.

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png"><img class="alignnone size-full wp-image-4671" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.27.04.png" alt="" width="1230" height="382" /></a>

Set up the Mobile Service with your preferred settings:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.28.42.png"><img class="size-full wp-image-4681 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.28.42.png" alt="" width="311" height="371" /></a>

To connect our Mobile Service to GitHub, go to Deployment Options and choose GitHub as source.

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.32.32.png"><img class="alignnone size-full wp-image-4701" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.32.32.png" alt="" width="892" height="482" /></a>

Then you'll be requested to authorize access to the GitHub account.

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.33.04.png"><img class="alignnone size-full wp-image-4691" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-29-alle-21.33.04.png" alt="" width="894" height="478" /></a>

Finally, select the repository and the branch you'd like to use.

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-31-alle-11.08.37.png"><img class="alignnone size-full wp-image-4741" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/12/Schermata-2016-12-31-alle-11.08.37.png" alt="" width="957" height="530" /></a>

And you have done! Now Azure automatically start the deployment process and ... <strong>BOOM! </strong>

Yes! You got the following error:
<pre class="azc-text-stream-wrap-text" data-bind="css: { &quot;azc-text-stream-wrap-text&quot;: data.wrap }"><span class="azc-log-stream-text">Command: "D:\home\site\deployments\tools\deploy.cmd"
Handling ASP.NET Core Web Application deployment.
D:\home\site\repository\XConn\Droid\XConn.Droid.csproj(137,3): error MSB4019: The imported project "D:\Program Files (x86)\dotnet\sdk\1.0.0-preview3-004056\Xamarin\Android\Xamarin.Android.CSharp.targets" was not found. Confirm that the path in the &lt;Import&gt; declaration is correct, and that the file exists on disk.
D:\home\site\repository\XConn\iOS\XConn.iOS.csproj(163,3): error MSB4019: The imported project "D:\Program Files (x86)\dotnet\sdk\1.0.0-preview3-004056\Xamarin\iOS\Xamarin.iOS.CSharp.targets" was not found. Confirm that the path in the &lt;Import&gt; declaration is correct, and that the file exists on disk.
Failed exitCode=1, command=dotnet restore "XConn\XConn.sln"
An error has occurred during web site deployment.
\r\nD:\Program Files (x86)\SiteExtensions\Kudu\59.51212.2600\bin\Scripts\starter.cmd "D:\home\site\deployments\tools\deploy.cmd"
</span></pre>
<h2>Step 4 | Publish with a Custom Deployment script</h2>
What happen? Just some background info. The deployment process is governed by <a href="https://github.com/projectkudu/kudu">Kudu</a>, "the engine behind git/hg deployments, WebJobs, and various other features in Azure Web Sites". In small words, Kudu scan the repository to find a project to publish. When done, it will generate a deployment script which first step is restoring NuGet packages from the solution.

Ah, the solution! The Connected App solution also include the Xamarin.iOS and Xamarin.Android project. Bingo! The deployment process is trying to solve and build the Xamarin packages on Azure Mobile Service, which is not allowed!

So, what we'll do is to create a custom deployment script to restore, build and publish only the Mobile Service project. To do that we'll use a .deployment file (<a href="https://github.com/projectkudu/kudu/wiki/Customizing-deployments">check instruction here</a>):
<pre class="azc-text-stream-wrap-text" data-bind="css: { &quot;azc-text-stream-wrap-text&quot;: data.wrap }"><span class="azc-log-stream-text">[config]
command = deploy.cmd
</span></pre>
And this is the custom deployment script that you can customize by only replacing the project name:

[sourcecode lang="powershell"]
@if &quot;%SCM_TRACE_LEVEL%&quot; NEQ &quot;4&quot; @echo off

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

  :: Locally just running &quot;kuduSync&quot; would also work
  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
)
IF NOT DEFINED DEPLOYMENT_TEMP (
  SET DEPLOYMENT_TEMP=%temp%\___deployTemp%random%
  SET CLEAN_LOCAL_DEPLOYMENT_TEMP=true
)

IF DEFINED CLEAN_LOCAL_DEPLOYMENT_TEMP (
  IF EXIST &quot;%DEPLOYMENT_TEMP%&quot; rd /s /q &quot;%DEPLOYMENT_TEMP%&quot;
  mkdir &quot;%DEPLOYMENT_TEMP%&quot;
)

IF DEFINED MSBUILD_PATH goto MsbuildPathDefined
SET MSBUILD_PATH=%ProgramFiles(x86)%\MSBuild\14.0\Bin\MSBuild.exe
:MsbuildPathDefined
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: ----------

echo Handling ASP.NET Core Web Application deployment.

:: 1. Restore nuget packages
call :ExecuteCmd dotnet restore &quot;XConn\MobileAppService\XConn.MobileAppService.csproj&quot;
IF !ERRORLEVEL! NEQ 0 goto error

:: 2. Build and publish
call :ExecuteCmd dotnet publish &quot;XConn\MobileAppService\XConn.MobileAppService.csproj&quot; --framework netcoreapp1.0 --configuration Release --output &quot;%DEPLOYMENT_TEMP%&quot;
IF !ERRORLEVEL! NEQ 0 goto error

:: 3. KuduSync
call :ExecuteCmd &quot;%KUDU_SYNC_CMD%&quot; -v 50 -f &quot;%DEPLOYMENT_TEMP%&quot; -t &quot;%DEPLOYMENT_TARGET%&quot; -n &quot;%NEXT_MANIFEST_PATH%&quot; -p &quot;%PREVIOUS_MANIFEST_PATH%&quot; -i &quot;.git;.hg;.deployment;deploy.cmd&quot;
IF !ERRORLEVEL! NEQ 0 goto error

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
goto end

:: Execute command routine that will echo out when error
:ExecuteCmd
setlocal
set _CMD_=%*
call %_CMD_%
if &quot;%ERRORLEVEL%&quot; NEQ &quot;0&quot; echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
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
[/sourcecode]

Finally, you can publish the .deployment and deploy.cmd files to the root of the repository. Once done, the deployment process restart and now ... <strong>the Mobile Service is up and running!</strong>

Happy coding!
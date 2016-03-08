Multiple Choice
===============

'Multiple Choice' is a simple quiz which will provide the learner with a set of questions. The learning objective will be to answer as many questions correctly as possible.

When the user has completed the quiz they will be presented with their final score.

Brief
=====

The concept behind 'Multiple Choice' is to submit a working app to a mobile device. The motivation behind the project is three fold:

1. To produce an app for my portfolio
2. To learn the technical stack which includes:
    * Ionic Framework
    * Angular.js
    * The Grunt build tools
    * JS testing framework ( Kama using Jasmine )
    * PhoneGap
3. To produce a working seed to share
4. To create an app for the Apple Store
5. To create an app for the Google Play Store


Screenshots
===========

The Current Question View

![Screenshot](https://bitbucket.org/repo/AapMxB/images/1116587765-screenshot_1.png)





Technical Background
====================

( based on the giac-seed (grunt-ionic-angular-cordova seed) )

The alternative starter template for ionic-angular project (http://ionicframework.com/) for Cordova with Grunt automatization.

This was because I wanted to use the Grunt build tool. TODO - add url

The project's had to be updated with the latest versions of angular.js and the related js files.

(These were taken from the standard ionic seed )


Installation
============

TODO - Currently in an open GitBucket repository.

```git clone https://rwenban@bitbucket.org/rwenban/multiple-choice.git```


Usage
=========

(These notes are from the original 'giac' seed )

TODO modify

1. Write your code in ```giac``` folder. There is a basic project template:
<pre><code>giac/
├── css/
├── fonts/
├── img/
├── js/
|   ├── lib/       // <!-- set of ionic and angular js libraries -->
|   └── app.js     // <!-- place for your JS code -->
├── scss/
|   ├── iconic/
|   └── app.scss   // <!-- place for your SASS code -->
└── index.html     // <!-- place for your HTML code -->
</code></pre>  
2. Compile your code by simply typing ```grunt``` in command line.
```cd my-cordova-project```
This operation will replace all content of ```my-cordova-project/www``` except of ```config.xml``` file with minified application files that compiled from ```giac``` source.
3. To deploy app onto device use Cordova as usually.

Deployment
==========

# Pre-requirements

## ionic && cordova

```
#!bash

  $ sudo npm install -g ionic

  $ npm install -g cordova

  $ npm install -g ios-deploy
```


```
#!bash

# to  ( this can also be run from Webstorm )
$ grunt karma

# to deploy
$ grunt

# if required to create the 'ios' package
$ ionic platform ios

# deploy to the ios package
$ ionic run ios

# deploy to device simulator
$ ionic emulate ios




```





Then use Xcode to deploy the xcodeproj to an iOS device.

```
#!bash

1. Attach iOS device to your Mac
2. Open Xcode
3. Open the project with the .xcodeproj suffix from the ...platforms/ios location
4. Select the device from the dropdown
5. Make sure app isn't open on the device and click run.


```


TODO

Clarify the steps to build and deploy.

See the difference between dev and release versions.

Rename the giac folder.


Tips
=========

1. You can work in "real-time" mode using NetBeans or JetBrains connector navigating ```giac/index.html``` page.
2. Only minimal set of angular libraries are included. They are ```angular.js```, ```angular-animate.js```, ```angular-route.js```, ```angular-sanatize.js```, ```angular-touch.js```. If you need more ```angular-*.js``` files, put them into ```giac/js/lib/angular``` folder and include into ```giac/index.html``` between ```<!-- GIACSTART --><!-- GIACEND -->``` tags.

Todo
=========

1. See the above TODO's

Iterative Cycle
===============

1. Create a very basic project which exports to Cordova. ( ie runs on the IOS Simulator )   COMPLETE
2. Add a basic game flow with sections and a minimal quiz. COMPLETE
3. Test with the Simulator. COMPLETE
4. Port to IOS device using PhoneGap. COMPLETE
5. Add rudimentary testing framework. COMPLETE
6. Use test framework ( within the Grunt build process ) - IN PROGRESS
7. Improve game flow and visuals. - IN PROGRESS
8. Build - IN PROGRESS
9. Test with Simulator. - IN PROGRESS
10. Port to IOS device using PhoneGap. - IN PROGRESS
11. Repeat 6 - 10 - IN PROGRESS
12. Port to Android device using PhoneGap.
13. Release as app on Apple Store.
14. Release as app on Google Play Store.
15. Create a seed to share
16. Add functionality



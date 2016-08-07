# ScreenshotFrames
v1.5.3

ScreenshotFrames is a small CSS library that lets you add browser and device frames around images (screenshots, for example) on an html page. All frames are fully responsive down to the narrowest standard smartphone width. And because every graphic element that resizes is either an svg (e.g. devices) or straight CSS (e.g. browser titlebar backgrounds and borders), the frames will always be crisp no matter how big or small you present them.

**[Check out the demo pen!](http://codepen.io/henry/pen/NAYbNd?editors=1100)**  
&nbsp;  

### Use
Add the [screenshot-frames.min.css](https://github.com/olets/ScreenshotFrames/blob/master/screenshot-frames.min.css) stylesheet (or [screenshot-frames-basics.min.css](https://github.com/olets/ScreenshotFrames/blob/master/screenshot-frames-basics.min.css) &mdash; see below), and then in the markup wrap the image with a screenshot frame class like

	<div class="screenshot-framename">
		<img ... />
	</div>

where "framename" is descriptive of the frame (e.g. `.screenshot-ipad`).

(Of course you can also use the unminified stylesheets, but really they're just included for Bower support.)	

#### Restrictions

The `.screenshot-framename` must be 100% wide, can't have padding, and can't have any margins other than `margin-bottom`. Use a wrapping container to control width and margins as necessary.	

&nbsp;

## Available Frames

*screenshot-frames.min.css* supports Chrome&trade;, iPad Air&reg;, iPhone&reg;, Mac&reg; monitor (Thunderbolt display), MacBook&reg;, PC monitor (Dell&trade; Ultrasharp display), and Safari&reg;.

If you don't need all that, consider using the lighter-weight *screenshot-frames-basics.min.css*, which only includes support for Safari, iPad, and iPhone.

You can also build your own custom set of frames (requires node): clone or download the repo, edit *src/screenshot-frames-custom.less* as necessary, and then in the ScreenshotFrames directory run

	$ npm install
	$ gulp build:custom
	
(Depending on your setup, you may need to do `sudo npm install`.) Your custom frame set will be saved as *screenshot-frames-custom.min.css*.	

#### Browsers

- Safari  
use `.screenshot-safari`  
*image aspect ratio doesn't matter; container should be ≥ 310px wide*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/safari.png" width="400">

- Chrome  
use `.screenshot-chrome`  
*image aspect ratio doesn't matter; container should be ≥ 220px wide*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/chrome.png" width="400">

#### Desktop

- MacBook  
use `.screenshot-macbook`  
*takes image with aspect ratio 393:245 (see [#1](https://github.com/olets/ScreenshotFrames/issues/1))*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/macbook.png" width="400">

- Mac monitor (Thunderbolt display)  
use `.screenshot-mac`  
*takes image with aspect ratio 16:9*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/mac.png" width="400">

- PC monitor (Dell Ultrasharp display)  
use `.screenshot-pc`  
*takes image with aspect ratio 16:9*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/pc.png" width="400">

#### Mobile

- iPad Air (silver)  
use `.screenshot-ipad`  
*takes image with aspect ratio 3:4*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/ipad.png" width="300">

- iPhone 6S (silver)  
use `.screenshot-iphone`  
*takes image with aspect ratio 375:667*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/iphone.png" width="200">

&nbsp;

----
### Roadmap

- ~~Chrome~~
- ~~Safari~~
- ~~iPad~~
	- w/ Mobile Safari
- ~~iPhone~~
	-  w/ Mobile Safari
- ~~MacBook~~
- ~~Mac desktop~~
- ~~PC desktop~~
- some Android&trade;
	- w/ Chrome For Mobile
- Firefox&reg;
- OS X&reg; window

&nbsp;

## Contributing
Adding new frames is extremely easy, and PRs are welcome. For each new frame

- add the stylesheet *src/framename/screenshot-frame-framename.less*
	- for base64 encoded background images (cf. [Safari frame](https://github.com/olets/ScreenshotFrames/blob/master/src/safari/screenshot-frame-safari.less)), use  
`background-image: url(filepathrelativetostylesheet)` (supports png and jpg)
	- for svg background images (cf. [iPhone frame](https://github.com/olets/ScreenshotFrames/blob/master/src/iphone/screenshot-frame-iphone.less)), use  
`background-image: url('data:image/svg+xml;utf8,/* svg \*//* endinject */')`
	- for mobile and desktop frames, use svg; for browser frames, use whichever is lighter
		
- add relevant images and/or svgs to *src/framename*
- in *src/screenshot-frames-additional.less* and *src/screenshot-frames-custom.less*
	- add the frame class where appropriate
	- import the stylesheet
- add a demo to *demo/demo.html*
- if appropriate, credit the illustrator in the *README.md*'s "Acknowledgments"

Compile with

	$ gulp config
	$ gulp build

&nbsp;
	
## Acknowledgments

- Chrome forked from [Ed Williams's "Chrome Window for Sketch.app & Dribbble"](https://dribbble.com/shots/2559150-Chrome-Window-for-Sketch-app-Dribbble)
- iPad forked from [DTAIL Studio's "The Ultimate Mobile Devices Pack"](https://dribbble.com/shots/1716707-Free-Download-The-Ultimate-Mobile-Devices-Pack) with colors from [Facebook Design's "Apple iPad Air"](http://facebook.design/devices)
- iPhone forked from [Philip Wong's "Free: Slate style iPhone 6 / 6+ mockup"](https://dribbble.com/shots/2204754-Free-Slate-style-iPhone-6-6-mockup-Sketch) with colors from [Facebook Design's "Apple iPhone 6S"](http://facebook.design/devices)
- Mac desktop forked from [Facebook Design's "Apple Thunderbolt Display"](http://facebook.design/devices)
- MacBook forked from [Peter Hol's "Apple devices Sketch file"](https://dribbble.com/shots/1663223-Apple-devices-Sketch-file)
- PC desktop forked from [Facebook Design's "Dell Ultrasharp Monitor"](http://facebook.design/devices)
- Safari forked from [Ed Piel's "Safari UI Template for Sketch"](https://dribbble.com/shots/1995751-Safari-UI-Template-for-Sketch)

<small>Android and Chrome are trademarks of Google Inc.  
Dell is a trademark of Dell Inc.  
iPad, iPad Air, iPhone, Mac, MacBook, OS X, and Safari are registered trademarks of Apple, Inc.  
Firefox is a registered trademark of the Mozilla Foundation.</small>
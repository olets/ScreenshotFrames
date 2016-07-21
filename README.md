# ScreenshotFrames
v1.2.1

ScreenshotFrames adds attractive browser and device frames around your screenshots!

**Check out the [demo pen!](http://codepen.io/henry/pen/NAYbNd?editors=1100)**
&nbsp;

Using it is extremely simple: add the screenshot-frames stylesheet (.less or .min.css), and then wrap the image with the appropriate class like

	<div class="screenshot-frameclasshere">
		<img ... />
	</div>

You can also include the latest version (*currently v1.2.1*) from the RawGit CDN with

	https://cdn.rawgit.com/olets/ScreenshotFrames/vThe.Latest.Version/screenshot-frames.min.css


#### Restrictions

The `.screenshot-frame` has to be 100% wide, can't have padding, and can't have any margins other than margin-bottom. Use a wrapping container to control width and margins as necessary.

## Currently supported
#### Browsers

- Safari  
use `.screenshot-browser-safari`  
*screenshot ratio doesn't matter; container should be > 310px wide*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/safari.png" width="400">

- Chrome  
use `.screenshot-browser-chrome`  
*screenshot ratio doesn't matter; container should be > 350px wide*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/chrome.png" width="400">

#### Devices

- iPad Air (silver)  
use `.screenshot-device-ipad`  
*takes screenshot with ratio 3x4*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/ipad.png" width="300">

- iPhone 6S (silver)  
use `.screenshot-device-iphone`  
*takes screenshot with ratio 375x667*  
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
- MacBook
- Desktop
- some Android
	- w/ Chrome For Mobile
- Firefox

&nbsp;
	
## Acknowledgments

- Safari window is forked from [Ed Piel's "Safari UI Template for Sketch"](https://dribbble.com/shots/1995751-Safari-UI-Template-for-Sketch)
- Chrome window is forked from [Ed Williams's "Chrome Window for Sketch.app & Dribbble"](https://dribbble.com/shots/2559150-Chrome-Window-for-Sketch-app-Dribbble)
- iPad and iPhone from [Facebook Design](http://facebook.design/devices)
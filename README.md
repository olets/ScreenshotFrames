# ScreenshotFrames
v1.3.3

ScreenshotFrames adds attractive browser and device frames around your screenshots!

**[Check out the demo pen!](http://codepen.io/henry/pen/NAYbNd?editors=1100)**

&nbsp;

Using ScreenshotFrames is extremely simple: add [screenshot-frames.min.css](https://github.com/olets/ScreenshotFrames/blob/master/screenshot-frames.min.css) (or, in the [basic version](https://github.com/olets/ScreenshotFrames/tree/basics), [screenshot-frames-basics.min.css](https://github.com/olets/ScreenshotFrames/blob/basics/screenshot-frames-basics.min.css)), and then wrap the image with the appropriate class like

	<div class="screenshot-frame">
		<img ... />
	</div>

#### Restrictions

The `.screenshot-frame` must be 100% wide, can't have padding, and can't have any margins other than margin-bottom. Use a wrapping container to control width and margins as necessary.	

&nbsp;

## Currently supported

If you don't need support for all of these, use the light weight ["Basics" branch](https://github.com/olets/ScreenshotFrames/tree/basics) which only includes support Safari, iPad, and iPhone.

You can also build your own custom set of frames (requires node): clone or download the repo, comment out parts of *src/screenshot-frames.less* as necessary, `cd` to the main local ScreenshotFrames directory, run `npm install` (may require `sudo npm install` depending on your setup), and then run `gulp` to generate *screenshot-frames.min.css*.

#### Browsers

- Safari  
use `.screenshot-safari`  
*screenshot ratio doesn't matter; container should be ≥ 310px wide*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/safari.png" width="400">

- Chrome  
use `.screenshot-chrome`  
*screenshot ratio doesn't matter; container should be ≥ 220px wide*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/chrome.png" width="400">

#### Desktop

- MacBook  
use `.screenshot-macbook`  
*takes screenshot with ratio 393x245*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/macbook.png" width="400">

- Mac Desktop  
use `.screenshot-mac`  
*takes screenshot with ratio 16x9*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/mac.png" width="400">

- PC Desktop  
use `.screenshot-pc`  
*takes screenshot with ratio 16x9*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/pc.png" width="400">

#### Mobile

- iPad Air (silver)  
use `.screenshot-ipad`  
*takes screenshot with ratio 3x4*  
<img src="https://raw.githubusercontent.com/olets/ScreenshotFrames/master/images/ipad.png" width="300">

- iPhone 6S (silver)  
use `.screenshot-iphone`  
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
- ~~MacBook~~
- ~~Mac desktop~~
- ~~PC desktop~~
- some Android
	- w/ Chrome For Mobile
- Firefox

&nbsp;

## Contributing
PRs are welcome. For each new frame

- add the stylesheet *src/screenshot-frame-framename.less*
- in *src/screenshot-frames.less*:
	- add the frame class where appropriate
	- import the stylesheet
- add a demo to *demo/demo.html*
- if appropriate, credit the illustrator in the *README.md*'s "Acknowledgments"

&nbsp;
	
## Acknowledgments

- Chrome forked from [Ed Williams's "Chrome Window for Sketch.app & Dribbble"](https://dribbble.com/shots/2559150-Chrome-Window-for-Sketch-app-Dribbble)
- iPad forked from [DTAIL Studio's "The Ultimate Mobile Devices Pack"](https://dribbble.com/shots/1716707-Free-Download-The-Ultimate-Mobile-Devices-Pack) with colors from [Facebook Design's "Apple iPad Air"](http://facebook.design/devices)
- iPhone forked from [Philip Wong's "Free: Slate style iPhone 6 / 6+ mockup"](https://dribbble.com/shots/2204754-Free-Slate-style-iPhone-6-6-mockup-Sketch) with colors from [Facebook Design's "Apple iPhone 6S"](http://facebook.design/devices)
- Mac desktop forked from [Facebook Design's "Apple Thunderbolt Display"](http://facebook.design/devices)
- MacBook forked from [Peter Hol's "Apple devices Sketch file"](https://dribbble.com/shots/1663223-Apple-devices-Sketch-file)
- PC desktop forked from [Facebook Design's "Dell Ultrasharp Monitor"](http://facebook.design/devices)
- Safari forked from [Ed Piel's "Safari UI Template for Sketch"](https://dribbble.com/shots/1995751-Safari-UI-Template-for-Sketch)
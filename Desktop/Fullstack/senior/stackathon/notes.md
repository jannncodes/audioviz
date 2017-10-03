Three JS
  -Javascript library used to create and display 3D graphics in a web broswer

Audio
  -Has a built in AudioLoader/Analyser based off of the Web Audio API
  -Audio Analyser creates and AnalyserNode that gives us real time frequency
  data, represented as numbers between 0-255.
    -Each represents the relative volume at each frequency band from low to high

Animation
  -I also use the native requestAnimationFrame method to tell the browser that I
  want to perform an animation and pass in a function
  -In the function I look at the real-time frequency data, and then affect the
  position and color of the cubes

Wishlist
  -File Load from client
  -Beat Detection

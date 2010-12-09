/*
EasyCrossFade
Copyright (c) 2010 waco, released under the MIT license
requre: JQuery (any version)
*/

// settings
var EasyCrossFade = (function(){
  // element to crossfade
  var element = "#flash";
  
  // crossfade images
  var imageDir = "images/";
  var catchImages = [];
  var loopImages = ["loop.jpg"];

  // crossfade speed (msec)
  var speed = 1000;
  
  var imageLength = 0;
  var imageLoopPosition = 0;
  var imageIndex = 0;
  var crossFadeImages = [];
  var timer;
    
  var preload = function(){
    var cacheImageSrc = [];
    var loadedImageCounts = 0;
    $(crossFadeImages).each(function(){
      var image = new Image();
      image.src = imageDir + this;
      cacheImageSrc.push(image);
      $(image).load(function(){
        loadedImageCounts++;
        if(loadedImageCounts == imageLength){
          startCrossFade();
        }
      });
    });
  }
  var crossFade = function(){
      var elementObject = $(element);
      elementObject.fadeOut("fast", function(){
        elementObject.css("background",
          "transparent url(" + imageDir + crossFadeImages[imageIndex] + ") no-repeat center center");
        elementObject.fadeIn("fast");
        imageIndex++;
        if(imageIndex >= imageLength) imageIndex = imageLoopPosition;
      });
  }
  var startCrossFade = function(){
    crossFade();
    timer = setInterval(crossFade, speed);
  }
  
  return {
    init: function(params){
      if(params.element) element = params.element;
      if(params.imageDir) imageDir = params.imageDir;
      if(params.catchImages) catchImages = params.catchImages;
      if(params.loopImages) loopImages = params.loopImages;
      if(params.speed) speed = params.speed;  
  
      crossFadeImages = catchImages.concat(loopImages);
      imageLoopPosition = loopImages.length - 1;
      imageLength = crossFadeImages.length;
      
      $(document).ready(function(){
        preload();
      });
    }
  }
})();


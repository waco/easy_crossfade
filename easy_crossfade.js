/*
EasyCrossFade
Copyright (c) 2010 waco, released under the MIT license
requre: JQuery (any version)
version: 0.0.1
*/

// settings
var EasyCrossFade = (function(){
  // element to crossfade
  var elementObject;
  
  // crossfade images
  var imageDir = "";
  var catchImages = [];
  var loopImages = [];

  // crossfade speed (msec)
  var slideSpeed = 5000;
  var fadeSpeed = 1000;
  
  var imageLength = 0;
  var imageLoopPosition = 0;
  var imageIndex = 0;
  var crossFadeImages = [];
  var timer;
  var imageLoadedFlag = false;
    
  var preload = function(){
    var cacheImageSrc = [];
    var loadedImageCounts = 0;
    $(crossFadeImages).each(function(){
      var image = new Image();
      image.src = this.path;
      cacheImageSrc.push(image);
      $(image).ready(function(){
        loadedImageCounts++;
        if(loadedImageCounts == imageLength){
          imageLoadedFlag = true;
        }
      });
    });
  }
  var startCrossFade = function(){
    if(imageLoadedFlag){
      crossFade();
    }
    else{
      setTimeout(startCrossFade, 500);
    }
  }
  var crossFade = function(){
      var nextFrameBackground = "transparent url(" + crossFadeImages[imageIndex].path + ") no-repeat center center";
      nextFrame = $("<div></div>").css({
        width: "100%", height: "100%",
        background: nextFrameBackground
      }).hide();
      elementObject.empty().append(nextFrame);

      nextFrame.animate({opacity: "show"}, fadeSpeed, "linear", function(){
        elementObject.css("background", nextFrameBackground).empty();
        
        if(crossFadeImages[imageIndex].link){
            elementObject.append('<a href="' + crossFadeImages[imageIndex].link +
              '" style="display: block; width: 100%; height: 100%;"></a>');
        }
        imageIndex++;
        if(imageIndex >= imageLength) imageIndex = imageLoopPosition;
      });
      setTimeout(crossFade, slideSpeed);
  }
  
  return {
    init: function(element, params){
      if(!element) return;
      
      if(params.imageDir) imageDir = params.imageDir;
      if(params.catchImages) catchImages = params.catchImages;
      if(params.loopImages) loopImages = params.loopImages;
      if(params.slideSpeed) slideSpeed = params.slideSpeed;
      if(params.fadeSpeed) fadeSpeed = params.fadeSpeed;
  
      crossFadeImages = $(catchImages.concat(loopImages)).map(function(){
        var path, link;
        if(this instanceof Array){ path = this[0]; link = this[1]; }
        else { path = this; }
        return { path: imageDir + path, link: link }
      });
      
      imageLoopPosition = loopImages.length - 1;
      imageLength = crossFadeImages.length;
      
      preload();
      
      $(document).ready(function(){
        elementObject = $(element);
        if(params.width) elementObject.width(params.width);
        if(params.height) elementObject.height(params.height);
        
        startCrossFade();
      });
    }
  }
})();


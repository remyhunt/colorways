import { quantize } from './quantize.js'

const getPalette = (imgSrc, amtColors) => {
    
  var canvas = document.createElement('canvas');
  var context = canvas.getContext("2d");
  
  var img = new Image();
  img.src = imgSrc;
  
  canvas.width = img.width;
  canvas.height = img.height;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixelData = [];

  console.log(imgData.data) 
  for (var i = 0; i < imgData.data.length; i+= 4) {
      
      // i = (y * canvas.width + x)*4;
      let r = imgData.data[0 + i],
          g = imgData.data[1 + i],
          b = imgData.data[2 + i],
          a = imgData.data[3 + i];
      // console.log(r, g, b)
      pixelData.push([r, g, b]);
  }
  var cmap = quantize(pixelData, amtColors);
  // var newPixels = pixelData.map((p) => { return cmap.map(p); });
  // cmap = quantize(newPixels, amtColors);
  var palette = cmap.palette();

  // return newPalette
  return palette
}


export { getPalette };

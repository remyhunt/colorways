import { quantize } from './quantize.js'

const getPalette = (imgSrc, amtColors, callback) => {
    
  var canvas = document.createElement('canvas');
  var context = canvas.getContext("2d");
  
  var img = new Image();
  img.src = imgSrc;
  
  canvas.width = img.width;
  canvas.height = img.height;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixelData = [];

  for (var i = 0; i < imgData.data.length; i+= 4) {
      
      let r = imgData.data[0 + i],
          g = imgData.data[1 + i],
          b = imgData.data[2 + i],
          a = imgData.data[3 + i];
      pixelData.push([r, g, b]);
  }
  var cmap = quantize(pixelData, amtColors);
  // var newPixels = pixelData.map((p) => { return cmap.map(p); });
  // cmap = quantize(newPixels, amtColors);
  var palette = cmap.palette();
  callback();
  return palette
}

function toHex(color) {
	let r = color[0].toString(16),
	g = color[1].toString(16),
	b = color[2].toString(16);
	var result = '';
	if (r.length == 1) {
		r = '0' + r;
	}
	if (g.length == 1) {
		g = '0' + g;
	}
	if (b.length == 1) {
		b = '0' + b;
	}
	return '#' + r + b + g;
} 

export { getPalette, toHex };

import { getPalette } from './colorways.js'


const palette = getPalette('assets/sb_sm.jpg', 5)

console.log(palette)

const container = document.querySelector('#container')

palette.forEach((color, c) => {
    const newDiv = document.createElement("div");
    container.appendChild(newDiv)
    newDiv.innerHTML = `
    <div style="background-color:rgb(${color[0] + ',' + color[1]+ ',' + color[2] + ')'};">
          *****
    </div>
    `
    
})
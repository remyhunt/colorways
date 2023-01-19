import { getPalette, toHex } from './colorways.js'

// const container = document.querySelector('#container')
const paletteCard = document.getElementById('palette-card');
const imgSrc = document.getElementById('src-image');
const imgCard = document.getElementById('img-card');
const imageInput = document.querySelector('input');
var imgurl = 'img/sb.png'
imgSrc.src = imgurl

const uploadFile = async (event) => {
    const file = imageInput.files[0]
    imgurl = `${URL.createObjectURL(file)}`;
    imgSrc.src = imgurl
}

const dragOverHandler = (e) => {
    e.preventDefault();
    imgCard.classList.remove('rotate')
    imgCard.classList.remove('transition-all')
    imgCard.classList.add('outline')
}

const dragLeaveHandler = (e) => {
    e.preventDefault();
    imgCard.classList.remove('outline')
    imgCard.classList.add('rotate')
    imgCard.classList.add('transition-all')
}

const copyToClipboard = async (text) => {
    // try {
    // await navigator.clipboard.writeText(text);
    // console.log('Page URL copied to clipboard');
    // } catch (err) {
    // console.error('Failed to copy: ', err);
    // }
    // const clipboard = navigator.clipboard;
    // clipboard.writeText(text).then(function () {
    //   alert('module URL shared to clipboard');
    // });
}

const dropHandler = (e) => {
    e.preventDefault();
    imgCard.classList.remove('outline')
    imgCard.classList.add('transition-all')
    const file = e.dataTransfer.files[0];
    imgurl = `${URL.createObjectURL(file)}`;
    imgSrc.src = imgurl
}

const drawPalette = (palette) => {
    paletteCard.innerHTML = "";
    palette.forEach((color, c) => {
        const hex = toHex(color);
        const newDiv = document.createElement("div");
        const footerLeft = document.getElementById("footer-left");
        paletteCard.appendChild(newDiv)

        // document.body.style.backgroundColor = `${'rgb(' + palette[0][0] + ', ' + palette[0][1] + ', ' + palette[0][2] + ')'}`

        newDiv.innerHTML = `
        <div class="palette-item flex flex-row w-[100px] cursor-pointer hover:w-[300px] transition-all relative">
            <div 
            class="color-block w-full px-[2rem] h-[80px]" 
            style="background-color:rgb(${color[0] + ',' + color[1] + ',' + color[2] + ')'};">
            </div>
            <div class="color-text select-none absolute top-[30%] translate-x-[40px] text-[1.4rem] tracking-wide flex items-center justify-center">
                ${hex}
            </div>
        </div>
        `
    })
}

imgSrc.onload = () => {
    const palette = getPalette(imgurl, 4, () => {
        imgCard.classList.remove('loading')
        imgCard.classList.add('rotate')
        imgSrc.classList.remove('opacity-0')
        imgSrc.classList.add('opacity-1')
        paletteCard.classList.remove('opacity-0')
        paletteCard.classList.remove('loading')
        paletteCard.classList.add('opacity-1')
    })

    drawPalette(palette)

    // add event listener to each item in palette
    const paletteItems = document.getElementsByClassName('palette-item');
    Array.from(paletteItems).forEach((block, b) => {

        block.addEventListener("click", () => {
            // TODO: copy to clipboard
        })
    })
}

imgCard.addEventListener("dragover", dragOverHandler);
imgCard.addEventListener("dragleave", dragLeaveHandler);
imgCard.addEventListener("drop", dropHandler);

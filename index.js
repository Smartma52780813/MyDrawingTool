window.onload = function () {
const canvas = document.getElementById('canvas_id');
const DownloadButton = document.getElementById('DownloadButton');
const UndoButton = document.getElementById('Undo');
// const ClearButton= document.getElementById('Clear');
// const ColorButton=document.getElementById('Color');
// const EraserButton=document.getElementById('Eraser');
// const addEventListners = () => {
//     LinesButton.onclick =() => {
//         canvas.style.cursor = 'crosshair';
//         canvas.onmousedown =(e) => {
//             const rect = canvas.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y =e.clientY - rect.top;
//             context1.beginPath();
//             context1.moveTo(x,y);
//             canvas.onmousemove =(e) => {
//                 const rect = canvas.getBoundingClientRect();
//                 const x1 = e.clientX - rect.left;
//                 const y1 =e.clientY - rect.top;
//                 context1.lineTo(x1,y1);
//                 context1.stroke();

//             }

//         }
//     }
// }
// const LinesButton=document.getElementById('Lines')
// const PencilButton=document.getElementById('Pencil')
// const CircleButton=document.getElementById('Circle')
// const MarkerButton=document.getElementById('Marker')
// canvas dimesions
let isDrawing = false
let drawingPath=[]

/**
 * @desc-It listens to user event
 * @param=null
 * @returns=null
 */
const canvasHeight = window.innerHeight * 0.7
// const canvasWidth = window.innerWidth * 0.5
// Adjust canvas width based on screen size
const canvasWidth = (window.innerWidth <= 500) ? window.innerWidth * 0.8 : window.innerWidth * 0.5

canvas.height = canvasHeight
canvas.width = canvasWidth
const context1 = canvas.getContext('2d')
const addEventListner = () => {
    // addEventListners()
canvas.onmousedown = (e) => {
    isDrawing = true
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const array_mouse = [x, y]
    drawingPath.push([array_mouse])
}

canvas.onmousemove = (e) => {
    if (isDrawing == true) {
        const rect = canvas.getBoundingClientRect()
        const x = Math.round(e.clientX - rect.left)
        const y = Math.round(e.clientY - rect.top)
        const array_mouse = [x, y]
        const lastPath = drawingPath[drawingPath.length - 1]
        lastPath.push(array_mouse)
        draw()
    }
}
canvas.onmouseup = () => {
    isDrawing = false
}
canvas.ontouchstart = (e) => {
    const touch = e.touches[0]
    canvas.onmousedown(touch)
}
canvas.ontouchmove = (e) => {
    const touch = e.touches[0]
    canvas.onmousemove(touch)
}
canvas.ontouchend = () => {
    canvas.onmouseup()
}
}
addEventListner()
const drawingPathFunction = (ctx, path, color) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(...path[0])
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...path[i])
    }
    ctx.stroke()
}
// const drawline=()=>{
//   const context=canvas.getContext("2d")
//   context.beginPath()
//   context.moveTo(50,90)
//   context.lineTo(120,440)
//   context.stroke()
// }
// drawline()
    const sketch = (ctx1, drawingPath, color = "black") => {
        for (const path of drawingPath) {
           drawingPathFunction(ctx1, path, color)
        }
    }
const draw = () => {

    
    context1.clearRect(0, 0, canvas.width, canvas.height)
    sketch(context1, drawingPath, "black")
}

UndoButton.onclick = () => {
  if (drawingPath.length === 0){

    UndoButton.disabled = true
}

else{
        UndoButton.disabled = false

}  
    drawingPath.pop()
    draw()
    
}

/* 
* @dex -function to download drawn image
* @params -null
*@returns - null
*/
DownloadButton.onclick = () => {
    // check for empty canvas download
   if (drawingPath.length ===0){
       return alert("No Sketch to download")
   };
   //temporary canvas todownload
   const tempcanvas = document.createElement('canvas')
   
   tempcanvas.width=canvas.width
   tempcanvas.height=canvas.height
   const ctx1=tempcanvas.getContext('2d')
   ctx1.fillStyle="#ffffff"
   ctx1.fillRect(0,0,tempcanvas.width,tempcanvas.height)
   ctx1.drawImage(canvas,0,0)
   // draw what's on the original canvas
   const imageformat="image/png";
   const canvasInfo =tempcanvas.toDataURL(imageformat)
   const link = document.createElement('a')
   link.href =canvasInfo
   link.download="Sketch.png"
   link.click()
   
   }
   
};



// ClearButton.onclick = () => {
//     context1.clearRect(0,0, canvas.width, canvas.height)
//     drawingPath = []
//     UndoButton.disabled = true;
// };
// ColorButton.onclick = () => {
//     context1.fillStyle='white'
//     context1.fillRect(0, 0, canvas.width, canvas.height)
// };



// EraserButton.onclick = () => {
//     context1.strokeStyle = 'black';
//     context1.lineWidth = 10;
//     canvas.style.cursor = 'crosshair';
//     canvas.onmousedown =(e) =>{
//         const rect = canvas.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         context1.beginPath();
//         context1.moveTo(x,y);
//         canvas.onmousemove =(e) => {
//             const rect = canvas.getBoundingClientRect();
//             const x1 = e.clientX - rect.left;
//             const y1 =e.clientY - rect.top;
//             context1.lineTo(x1,y1);
//             context1.stroke();

//         };


//     };
// };

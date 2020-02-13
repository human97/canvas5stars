// большой холст со звездами
const canvasBig = document.getElementById("canvasBig");
const ctx = canvasBig.getContext("2d");

ctx.beginPath();
ctx.rect(0, 0, 600, 600)
ctx.fillStyle = '#ffffff';
ctx.fill();
ctx.closePath();

// малый холст
const canvasSmall = document.getElementById("canvasSmall");
const ctxSmall = canvasSmall.getContext("2d");

ctxSmall.beginPath();
ctxSmall.rect(0, 0, 600, 50);
ctxSmall.fillStyle = '#ffffff';
ctxSmall.fill();
ctxSmall.closePath();

// функция отрисовки звезд
function drawStar(cx, cy, spikes, outerRadius, innerRadius, color, ctx) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y)
    rot += step
  }

  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.fillStyle = color;
  ctx.fill();

}

// создание звезд
drawStar(50, 50, 5, 30, 15, 'red', ctx);
drawStar(475, 100, 5, 30, 15, 'blue', ctx);
drawStar(275, 300, 5, 50, 25, 'green', ctx);
drawStar(105, 220, 5, 70, 35, 'yellow', ctx);
drawStar(375, 400, 5, 30, 15, 'black', ctx);

// функция получения цвета пикселя в месте клика на большом холсте со звездами
function colorCanvas(e) {
  let x = e.pageX - this.offsetLeft;
  let y = e.pageY - this.offsetTop;

  let imgData = ctx.getImageData(x, y, 1, 1).data;
  let R = imgData[0];
  let G = imgData[1];
  let B = imgData[2];
  let A = imgData[3];
  let rgba = `rgba(${R},${G},${B},${A})`
  
  // перекрашиваем малый холст
  ctxSmall.fillStyle = rgba;
  ctxSmall.fill();
}

canvasBig.addEventListener('click', colorCanvas);
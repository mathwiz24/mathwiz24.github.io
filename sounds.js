//const palette = document.getElementById("palette");
const button = document.getElementById("button");
const word = document.getElementById("word");
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");
const block4 = document.getElementById("block4");
const block5 = document.getElementById("block5");

async function getPalette() {
    const clean_hex =(Math.random() * 0xFFFFFF << 0).toString(16).padStart(5, '0');
    const url = "https://www.thecolorapi.com/scheme?hex="+ clean_hex +"&count=6&mode=analogic-complement"
    const response = await fetch(url,{
      method:"GET"
    });
    const data = await response.json()
  
    return data['colors']
  }

async function getWord() {
    const url = "https://random-word-form.herokuapp.com/random/adjective?count=3"
    const response = await fetch(url,{
      method:"GET"
    });
    const data = await response.json()
  
    return data
}
  
async function setPalette() {

  const paletteData = await getPalette();

  const hex1 = paletteData[0]['hex']['value'];
  const hex2 = paletteData[1]['hex']['value'];
  const hex3 = paletteData[2]['hex']['value'];
  const hex4 = paletteData[3]['hex']['value'];
  const hex5 = paletteData[4]['hex']['value'];


  //palette.innerHTML = hex1 + " , " + hex2 + " , " + hex3 + " , " + hex4 + " , " + hex5;
  block1.style.backgroundColor = hex1;
  block2.style.backgroundColor = hex2;
  block3.style.backgroundColor = hex3;
  block4.style.backgroundColor = hex4;
  block5.style.backgroundColor = hex5;
}

async function setWord() {

  const wordData = await getWord();

  word.innerHTML = wordData[0] + " , " +  wordData[1] + " , " +  wordData[2];
}


button.addEventListener("click", function () {
  setPalette()
  setWord()
});

  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");
  
  const colors = [
      "#ffffff", "#ffffff", "#ffffff","#ffffff", "#ffffff", "#ffffff","#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"
  ];
  
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });
  
  window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
    
  });
  
  function animateCircles() {
    
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";
      
      circle.style.scale = (circles.length - index) / circles.length;
      
      circle.x = x;
      circle.y = y;
  
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });
   
    requestAnimationFrame(animateCircles);
  }
  
  animateCircles();
  
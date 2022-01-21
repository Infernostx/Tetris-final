//Declaracion de variables
let tablero;
let mcanvas;
const dimX =10;
const dimY =25;
const maxSpd=200;
let widthRatio;
let heightRatio;
let interval;
let night;
let diffSlider;
let colorPicker;
let i =10;
let intrv = 1;
let instrucciones;
let titulo;
let puntaje;
let puntajei=0;
let dificultadt;
//Funciones
function setup() {
    //Creacion de canvas y asignacion de posicion
    mcanvas = createCanvas(windowWidth/6, windowHeight*0.8);
    widthRatio = width / dimX;
    heightRatio = height / dimY;
    const posxhtml = (windowWidth / 3) + 400;
    const posyhtml = (height + 100)/2;
    mcanvas.position(windowWidth/3,100);
    tablero = new Board(dimX, dimY);
    /* interval = setTimeout(() => {
        if (!tablero.gameOver)
            tablero.animate()
    }, 2000); */
    //Elementos DOM
        //Nightmode checkbox
        night = createCheckbox('Night mode?',false);
        night.changed(nightmode);
        night.position(posxhtml,posyhtml);
        //Difficulty slider
        diffSlider=createSlider(1,5,1);
        diffSlider.position(posxhtml,posyhtml-30);
        diffSlider.style('width','50px');
        difficulty();
        //Tetromino colorPicker
        colorPicker=createColorPicker('firebrick');
        colorPicker.position(posxhtml,posyhtml+30);
        //Instrucciones & titulo
        titulo = createP('Tetris');
        titulo.style('font-size', '24px')
        titulo.style('font-weight', 'bolder')
        titulo.position(posxhtml-250, 0);
        instrucciones=createP('<pre>Flechas: Movimiento\n\nFlecha arriba:Rotar</pre>');
        instrucciones.style('font-size','24px')
        /* instrucciones.style('font-weight', 'bolder') */
        instrucciones.position(posxhtml, posyhtml-250);
        //Puntaje & dificultad
        puntaje = createP("Puntaje");
        puntaje.style('font-size', '24px');
        puntaje.style('font-weight', 'bolder');
        puntaje.position(posxhtml, posyhtml-370);
        puntajei = createP(tablero.score);
        puntajei.style('font-size', '24px');
        puntajei.style('font-weight', 'bolder');
        puntajei.position(posxhtml, posyhtml-320);
        dificultadt = createP('Nivel de dificultad:'+diffSlider.value());
        dificultadt.style('font-size', '24px');
        dificultadt.style('font-weight', 'bolder');
        dificultadt.position(posxhtml, posyhtml-80);
        
        
}


function draw() {
    background(colorPicker.value());
    tablero.draw();
    intrv = map(diffSlider.value(),1,5,5,1);
    /* text('Puntaje:', 10, 10);
    text(tablero.score,80,10); */
    puntajei.html(tablero.score * diffSlider.value(), false);
    dificultadt.html('Nivel de dificultad:' + diffSlider.value(), false);
    //noLoop();
    
}

function reset() {
    alert('Game over \n Puntaje final:' + tablero.score*diffSlider.value());
    delete tablero;
    tablero = new Board(dimX, dimY);

}

function nightmode(){
    switch(night.checked()){
        case true:
            document.body.style.backgroundColor="black";
            document.body.style.color="white";
            break;
        case false:
            document.body.style.backgroundColor = "pink";
            document.body.style.color = "black";
            break;
        default:
            break;        
    }
}

function difficulty() {
    interval = setInterval(function () {
        if (!(i % intrv)) {
            tablero.animate();
        }
        i++;
    }, maxSpd);
} 
function keyPressed() {
    switch (key) {
        case "ArrowRight":
            tablero.activeTet.move("right");
            break;
        case "ArrowLeft":
            tablero.activeTet.move("left");
            break;
        case "ArrowUp":
            tablero.activeTet.rotate();
            break;
        case "ArrowDown":
            
            interval = setInterval(() => {
                tablero.animate()
            }, maxSpd-100);
            clearInterval(interval);
            tablero.animate();
            tablero.score+=50*diffSlider.value()
            break;
        default:
            break;
    }
}
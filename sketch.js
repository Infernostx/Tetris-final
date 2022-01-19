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

//ToDo:Commentar,poner distancias en const,terminar la presentacion Html,color de tetro, reset y gameover msg, mover consts a shapes -> consts.
function setup() {
    mcanvas = createCanvas(windowWidth/6, windowHeight*0.8);
    widthRatio = width / dimX;
    heightRatio = height / dimY;
    mcanvas.position(windowWidth/3,50);
    tablero = new Board(dimX, dimY);
    /* interval = setTimeout(() => {
        if (!tablero.gameOver)
            tablero.animate()
    }, 2000); */
    //Elementos DOM
        //Nightmode checkbox
        night = createCheckbox('Night mode?',false);
        night.changed(nightmode);
        night.position(width+100,(height +100)/2);
        //Difficulty slider
        diffSlider=createSlider(1,5,1);
        diffSlider.position(width+100,(height+60)/2);
        diffSlider.style('width','50px');
        difficulty();
        //Tetromino colorPicker
        colorPicker=createColorPicker(null);
        colorPicker.position(width+100,(height+200)/2);
        //Instrucciones & titulo
        instrucciones=createP('Tetris');
        instrucciones.style('font-size','24px')
        instrucciones.style('font-weight', 'bolder')
        instrucciones.position((windowWidth / 3)+150, 0);
        
}


function draw() {
    background(colorPicker.value());
    tablero.draw();
    intrv = map(diffSlider.value(),1,5,5,1);
    
    //noLoop();
    
}

function reset() {
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
            document.body.style.backgroundColor = "white";
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

            break;
        default:
            break;
    }
}
class Tetromino {
    constructor(id, parentField) {
        if (["i", "j", "l", "o", "s", "t", "z", "."].indexOf(id.toLowerCase()) < 0) {
            console.error("Error! Unknown shape.");
            return;
        }

        this.parentField = parentField;
        this.shapeId = id.toLowerCase();
        this.block = shapes[this.shapeId];
        this.blockIndex = floor(random(this.block.shape.length));
        this.color = shapes[this.shapeId].color;
        this.pos = {
            //x: 4,
            x: (this.parentField.dimX)/2,
            y: 0
        };
    }
//Colisiones
    move(moved = "down") {
        let temp = this.clone();
        temp.makeMove(moved);

        if (this.parentField.moveClear(temp)) {
            this.makeMove(moved);
            return true;
        }
        return false;
    }

    makeMove(moved = "down") {
        this.pos.x += dir[moved].x;
        this.pos.y += dir[moved].y;
    }
//Asignacion de los valores hexadecimales a una matriz
    updateShape() {
        this.shape = (this.block.shape[this.blockIndex]).toString(16).padStart(4, '0').split('').map(row => parseInt(row, 16).toString(2).padStart(4, '0').split('').map(num => parseInt(num)));
    }

   /*  colorChange(){
        if(colorPicker.color() === 'white'){
            this.color = shape[this.shapeId].colors;
        }
        else{this.color = colorPicker.color();}
    } */
//separacion de los tetrominos en piezas individuales
    split() {
        let splitted = [];
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (this.shape[y] && this.shape[y][x]) {
                    let t = new Tetromino(".", this.parentField);
                    t.color = this.color;
                    t.pos.x = this.pos.x + x;
                    t.pos.y = this.pos.y + y;

                    splitted.push(t);
                }
            }
        }

        return splitted;
    }

    draw() {
        this.updateShape();

        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {

                if (this.shape[y] && this.shape[y][x]) {
                    fill(this.color);
                    /* stroke('white');
                    strokeWeight(2); */
                } else {
                    noFill();
                    //nostroke();
                }

                rect((this.pos.x + x) * widthRatio, (this.pos.y + y) * heightRatio, widthRatio, heightRatio);
            }
        }
    }

    rotate() {
        let temp = this.clone();
        temp.blockIndex = (temp.blockIndex + 1) % (temp.block.shape.length)
        temp.updateShape();

        if (this.parentField.moveClear(temp)) {
            this.blockIndex = (this.blockIndex + 1) % (this.block.shape.length)
        }
    }

    clone() {
        let temp = new Tetromino(this.shapeId, this.parentField);

        temp.block = shapes[this.shapeId];
        temp.blockIndex = this.blockIndex;
        temp.color = this.color;
        temp.pos.x = this.pos.x;
        temp.pos.y = this.pos.y;
        temp.updateShape();
        return temp;
    }
}
//direcciones quemadas
const dir = {
    "left": {
        x: -1,
        y: 0
    },
    "right": {
        x: 1,
        y: 0
    },
    "down": {
        x: 0,
        y: 1
    },
}
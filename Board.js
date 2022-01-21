class Board {
    constructor(dimX, dimY) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.activeTet = this.newTetromino();
        this.tetrominos = [];
        this.score = 0;
        this.gameOver = false;
    }

    animate() {
        if (this.gameOver) {
        reset();
        return false;}
        if (!this.activeTet.move()) {
            this.tetrominos.push(...this.activeTet.split());
            this.activeTet = this.newTetromino();
            this.activeTet.updateShape();
            if (!this.moveClear(this.activeTet)) {
                this.activeTet = null;
                this.gameOver = true;
            }
            let i = dimY;
            while (this.checkRow() && i >= 0) i--;
        }
    }
//Checkeo de la linea completada para asignar puntuacion, por medio de sorteo de matrices y concat para filtrar los elmentos individuales de los tetrominos y verificar 0 y en la matriz.
    checkRow() {
        const occRows = this.tetrominos.reduce((acc, curr) => acc.concat(curr.pos.y), []).filter((item, pos, self) => self.indexOf(item) == pos).sort((a, b) => b - a);
        for (let row of occRows) {
            let occCols = [];
            for (let tet of this.tetrominos) {
                if (tet.pos.y == row) occCols.push(tet.pos.x);
            }

            if (occCols.length == dimX && occCols.filter((item, pos, self) => self.indexOf(item) == pos).sort((a, b) => b - a).length == dimX) {
                this.tetrominos = this.tetrominos.filter(tet => tet.pos.y != row);

                for (let i = 0; i < this.tetrominos.length; i++) {
                    if (this.tetrominos[i].pos.y < row) {
                        this.tetrominos[i].pos.y = this.tetrominos[i].pos.y + 1;

                    }
                }
                
                this.score += 100;
                return true;
            }
        }
        return false;
    }
//colisiones
    moveClear(temp) {
        let nextTetro = genArray(dimY, dimX);
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (temp.shape && temp.shape[y] && temp.shape[y][x]) {
                    if (temp.pos.y + y >= dimY) return false;
                    if (temp.pos.x + x < 0) return false;
                    if (temp.pos.x + x >= dimX) return false;

                    nextTetro[temp.pos.y + y][temp.pos.x + x] = 1;
                }
            }
        }

        let occupiedField = genArray(dimY, dimX);
        for (let tet of this.tetrominos) {
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    if (tet.shape && tet.shape[y] && tet.shape[y][x]) {
                        occupiedField[tet.pos.y + y][tet.pos.x + x] = 1;
                    }
                }
            }
        }

        for (let i in nextTetro) {
            for (let j in nextTetro[i]) {
                if (nextTetro[i][j] == 1 && occupiedField[i][j] == 1) {
                    return false;
                }
            }
        }

        return true;
    }


    draw() {
        noFill();
        strokeWeight(0.5);
        stroke(255);

        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                rect(x * widthRatio, y * heightRatio, widthRatio, heightRatio);
            }
        }

        if (this.activeTet) this.activeTet.draw();
        for (let tet of this.tetrominos) {
            tet.draw();
        }
    }

    newTetromino() {
        return new Tetromino(random(["i", "j", "l", "o", "s", "t", "z"]), this);
    }
}

function genArray(y, x) {
    let array = [];
    for (let i = 0; i < y; i++) {
        array[i] = [];
        for (let j = 0; j < x; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}
var scale = 2;
const WIDTH = 5 * scale, HEIGHT = 5 * scale;

var STATE = { IGNORE: -1, EMPTY: 0, FILL: 1 };
var DIRECTION = { LEFT: 1, DOWN: 2, UP: 3, RIGHT: 4 };


class Cell {
    constructor(i, j) {
	this.state = STATE.EMPTY;
	this.x = j;
	this.y = i;
	this.can_fill = SQUAREMAP10[0][i][j];
	this.cursor = false;
    }
}

var cells = Array(HEIGHT);
for (i = 0; i < WIDTH; ++i)
    cells[i] = Array(WIDTH);

var cursor_coordinate = new Array(2);

function Init () {
    /* init cells */
    for (i = 0; i < HEIGHT; ++i) {
	for (j = 0; j < WIDTH; ++j) {
	    cells[i][j] = new Cell(i, j);
	}
    }
    /* init cursor */
    cells[0][0].cursor = true;
};


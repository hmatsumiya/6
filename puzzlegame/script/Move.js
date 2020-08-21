var lock = false;



document.onkeydown = e => {
    if (lock) return;

    let direction = 0;

    switch (e.keyCode) {
	/* LEFT */
    case 65: /* A */
    case 72: /* H */
	direction = DIRECTION.LEFT;
	break;

	/* DOWN */
    case 83: /* S */
    case 74: /* J */
	direction = DIRECTION.DOWN;
	break;

	/* UP */
    case 87: /* W */
    case 75: /* K */
	direction = DIRECTION.UP;
	break;

	/* RIGHT */
    case 68: /* D */
    case 76: /* L */
	direction = DIRECTION.RIGHT;
	break;

	/* FILL */
    case 73: /* I */
	if (cells[cursor_y][cursor_x].state < STATE.FILL) {
	    cells[cursor_y][cursor_x].state = STATE.FILL;
	} else {
	    cells[cursor_y][cursor_x].state = STATE.EMPTY;
	}
	DrawMap();
	CheckCell();
	break;

	/* CANCEL */
    case 88: /* X */
	if (cells[cursor_y][cursor_x].state > STATE.IGNORE) {
	    cells[cursor_y][cursor_x].state = STATE.IGNORE;
	} else {
	    cells[cursor_y][cursor_x].state = STATE.EMPTY;
	}
	DrawMap();
	CheckCell();
	break;

	/* CLEAR */
    case 67: /* C */
	cells[cursor_y][cursor_x].state = STATE.EMPTY;
	DrawMap();
	CheckCell();
	
    default:
	return;
    }
    Move(direction);
};

function Buttonclick(ele){
	var id = ele.id;
	switch(id){

	case "up":
	direction = DIRECTION.UP;
	break;

	case "down":
	direction = DIRECTION.DOWN;
	break;

	case "left":
	direction = DIRECTION.LEFT;
	break;

	case "right":
	direction = DIRECTION.RIGHT;
	break;
	
//	default:
//	alert(id);
	}
	Move(direction);
};

//function touchStartEvent(){

function startup() {
  var el = document.getElementById("canvas");
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchmove", handleMove, false);
}

document.addEventListener("DOMContentLoaded", startup);
var ongoingTouches = [];

function handleStart(evt) {
  evt.preventDefault();
  console.log("touchstart.");
  var el = document.getElementById("canvas");
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
        
  for (var i = 0; i < touches.length; i++) {
    console.log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
    console.log("touchstart:" + i + ".");
  }
}


function Move (direction) {
    switch (direction) {
    case DIRECTION.LEFT:
	if (cursor_x <= 0) return;
	cells[cursor_y][cursor_x-1].cursor = true;
	break;

    case DIRECTION.DOWN:
	if (cursor_y >= HEIGHT - 1) return;
	cells[cursor_y+1][cursor_x].cursor = true;
	break;

    case DIRECTION.UP:
	if (cursor_y <= 0) return;
	cells[cursor_y-1][cursor_x].cursor = true;
	break;

    case DIRECTION.RIGHT:
	if (cursor_x >= WIDTH - 1) return;
	cells[cursor_y][cursor_x+1].cursor = true;
	break;

    default:
	return;
    }
    cells[cursor_y][cursor_x].cursor = false;
    DrawMap();
};


function CheckCell () {
    let incorrect = false;
    let current_state = 0;
    for (i = 0; i < HEIGHT; ++i) {
	for (j = 0; j < WIDTH; ++j) {
	    current_state = cells[i][j].state;
	    if (current_state === -1)
		current_state = 0;
	    if (current_state !== cells[i][j].can_fill)
		incorrect = true;
	}
    }
    if (!incorrect)
	GameClear();
};


function GameClear () {
    lock = true;
    cells[cursor_y][cursor_x].cursor = false;
    Draw();
    alert("Clear");
};

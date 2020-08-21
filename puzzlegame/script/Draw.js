function Draw () {
    let display = document.getElementById("display");
    InitChild(display);
    

    for (i = 0; i < 2; ++i)
	AddElement(display, "div", null, "top_cont", null, null);

    let top_cont = document.getElementsByClassName("top_cont");

    AddElement(top_cont[0], "div", "dummy", "second_cont", null, null);
    AddElement(top_cont[0], "div", "column", "second_cont", null, null);
    AddElement(top_cont[1], "div", "row", "second_cont", null, null);
    AddElement(top_cont[1], "div", "map", "second_cont", null, " ");
    let dummy = document.getElementById("dummy");
    let column = document.getElementById("column");
    let row = document.getElementById("row");
    let map = document.getElementById("map");

    let dummy_width_min = 0, dummy_width_max = WIDTH / 2;
    let dummy_height_min = 0, dummy_height_max = HEIGHT / 2;

    if (WIDTH % 2 === 0)
	dummy_width_max += 0.5;
    if (HEIGHT % 2 === 0)
	dummy_height_max += 0.5;

    /* Dummy */
    for (i = dummy_height_min; i < dummy_height_max; ++i) {
	AddElement(dummy, "div", null, "dummy_cont third_cont", null, null);
    }
    let dummy_cont = document.getElementsByClassName("dummy_cont");
    for (i = dummy_height_min; i < dummy_height_max; ++i) {
	for (j = dummy_width_min; j < dummy_width_max; ++j) {
	    AddElement(dummy_cont[i], "div", null, "cell cell--dummy", null, null);
	}
    }

    /* Column Number */
    for (i = 0; i < dummy_height_max; ++i) {
	AddElement(column, "div", null, "number_column_cont third_cont", null, null);
    }

    let number_column_cont = document.getElementsByClassName("number_column_cont");
    for (i = 0; i < dummy_height_max; ++i) {
	for (j = 0; j < WIDTH; ++j) {
	    AddElement(number_column_cont[i], "div", null, "cell cell--dummy cell--number", null, null);
	}
    }

    /* Row Number */
    for (i = 0; i < HEIGHT; ++i) {
	AddElement(row, "div", null, "number_row_cont third_cont", null, null);
    }

    let number_row_cont = document.getElementsByClassName("number_row_cont");
    for (i = 0; i < HEIGHT; ++i) {
	for (j = 0; j < dummy_width_max; ++j) {
	    AddElement(number_row_cont[i], "div", null, "cell cell--dummy cell--number", null, null);
	}
    }

    let count = 0;
    let numbers;

    /* Add column number */
    numbers = Math.floor(dummy_height_max);

    for (i = 0; i < WIDTH; ++i) {
	for (j = HEIGHT - 1; j >= 0; --j) {
	    if (cells[j][i].can_fill === 0 && count !== 0 && j > 0) {
		AddElement(number_column_cont[numbers].children[i], null, null, null, null, count);
		--numbers;
		count = 0;
	    } else if (cells[j][i].can_fill === 1) {
		++count;
	    }
	}
	if (count !== 0 || numbers === Math.floor(dummy_height_max))
	    AddElement(number_column_cont[numbers].children[i], null, null, null, null, count);
	--numbers;
	count = 0;
	numbers = Math.floor(dummy_height_max);
    }

    /* Add row number */
    numbers = Math.floor(dummy_width_max);

    for (i = 0; i < HEIGHT; ++i) {
	for (j = WIDTH - 1; j >= 0; --j) {
	    if (cells[i][j].can_fill === 0 && count !== 0 && j > 0) {
		AddElement(number_row_cont[i].children[numbers], null, null, null, null, count);
		--numbers;
		count = 0;
	    } else if (cells[i][j].can_fill === 1) {
		++count;
	    }
	}
	if (count !== 0 || numbers === Math.floor(dummy_height_max))
	    AddElement(number_row_cont[i].children[numbers], null, null, null, null, count);
	--numbers;
	count = 0;
	numbers = Math.floor(dummy_height_max);
    }
    DrawMap();
};

function DrawMap () {
    InitChild(map);
    /* Map */
    for (i = 0; i < HEIGHT; ++i) {
	AddElement(map, "div", null, "cell_cont third_cont", null, null);
    }

    let cell_cont = document.getElementsByClassName("cell_cont");
    for (i = 0; i < HEIGHT; ++i) {
	for (j = 0; j < WIDTH; ++j) {
	    switch (cells[i][j].state) {
	    case STATE.IGNORE:
		AddElement(cell_cont[i], "div", null, "cell cell--ignore", null, "X");
		break;
	    case STATE.EMPTY:
		AddElement(cell_cont[i], "div", null, "cell cell--empty", null, null);
		break;
	    case STATE.FILL:
		AddElement(cell_cont[i], "div", null, "cell cell--fill", null, null);
		break;
	    }
	    if (cells[i][j].cursor) {
		cursor_y = i;
		cursor_x = j;
	    }
	}
    }
    if (cells[cursor_y][cursor_x].cursor)
	cell_cont[cursor_y].children[cursor_x].classList.add("cursor");
};

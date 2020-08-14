/*
Student: Rory Wirch
Contact: rory_wirch@student.uml.edu
Class: GUI I
Professor: Wenjin Zhou
Assignment: HW 8
File: hw8.html
*/

/* global score */
var global_score = 0;

/* this data structure is from professor heines, it will be used to keep track
of the tiles */
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

/* used when choosing tiles for the board */
var alpha_list = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
                    'P','Q','R','S','T','U','V','W','X','Y','Z','_'];

var playable_index = [];

/* this data structure keeps track of the board state */
var scrabble_board = [
    {'id':'square0', 'tile':'no'},
    {'id':'square1', 'tile':'no'},
    {'id':'square2', 'tile':'no'},
    {'id':'square3', 'tile':'no'},
    {'id':'square4', 'tile':'no'},
    {'id':'square5', 'tile':'no'},
    {'id':'square6', 'tile':'no'},
    {'id':'square7', 'tile':'no'},
    {'id':'square8', 'tile':'no'},
    {'id':'square9', 'tile':'no'},
    {'id':'square10', 'tile':'no'},
    {'id':'square11', 'tile':'no'},
    {'id':'square12', 'tile':'no'},
    {'id':'square13', 'tile':'no'},
    {'id':'square14', 'tile':'no'},
];

/* keeps track of the tiles in play and their letter "value" */
var tile_state = [
    {'id': 'tile0', 'letter': 'no', 'played': false},
    {'id': 'tile1', 'letter': 'no', 'played' :false},
    {'id': 'tile2', 'letter': 'no', 'played' :false},
    {'id': 'tile3', 'letter': 'no', 'played' :false},
    {'id': 'tile4', 'letter': 'no', 'played' :false},
    {'id': 'tile5', 'letter': 'no', 'played' :false},
    {'id': 'tile6', 'letter': 'no', 'played' :false},
];



$(init);

/* this is the first pass through */
function init() {
    /* clear board and pieces from prev game */
    $("#scrabble-board").html('');
    $("#tile-container").html('');
    $("#word").html('');
    $("#score").html('');

    load_board();

    load_tiles();


}
/* submits the word played, stores the word and calculates score,
also adds new tiles to hand */
function submit(){
    var word = " ";
    /* get word on board */
    word = get_word();

    global_score += get_score();

    word += '; '
    /* add word to html page */
    $('#word').append(document.createTextNode(word));

    //add score to page
    $('#score').html(global_score);

    //load new board
    load_board();

    //load new tiles
    load_tiles();

}

/* return score from current game */
function get_score(){
    var letter_mult = 1;
    var word_mult = 1;
    var running_val = 0;

    for (var i = 0; i < 15; i++){
        var square_id = scrabble_board[i]['id'];

        if(scrabble_board[i]['tile'] != 'no'){
            var letter = get_letter(scrabble_board[i]['tile']);

            var letter_val = ScrabbleTiles[letter]['value'];
            /* check for multipliers */
            /* check fro double word */
            if (square_id == 'square2' || square_id == 'square12'){
                word_mult = word_mult * 2;
            } else if (square_id =='square6' || square_id == 'square8'){
                letter
            }
            //calculate value for this letter
            running_val += letter_val * letter_mult;

        }
    }
    return word_mult * running_val;
}

/*returns word (str) on board*/
function get_word(){
    var local_word = "";

    for (var i = 0; i < 15; i++) {
        if(scrabble_board[i]['tile'] == 'no'){
            continue;
        }
        /* square contains a tile, get letter */
        var letter = get_letter(scrabble_board[i]['tile']);

        local_word += letter;
    }

    return local_word;
}

/* takes tile ID, returns letter held by that tile */
function get_letter(tile_id){
    for (var i = 0; i < 7; i++){
        if (tile_state[i]['id'] == tile_id){
            return tile_state[i]['letter'];
        }
    }
}

/* create tile pieces, place on tile holder & make draggable */
function load_tiles(){
    /* determine which letters are placed in holder */
    for(var i = 0; i < 7; i++) {
        /* check to see if there are tiles left from previous round */
        if (tile_state[i]['played'] == false){
            /* check to see if 'letter' is no, if it is then it hasn't been played
            and should be kept as is */
            if (tile_state[i]['letter'] != 'no'){
                break;
            }
            /* flag is true until a suitable number is found (case where all
            tiles of a certain letter have been played) */
            var flag = true;
            while(flag) {
                /*get index for alpha_list */
                var index = Math.floor((Math.random() * alpha_list.length));
                var temp_letter = alpha_list[index];

                /* used for debugging
                console.log("pass: " + i);
                console.log("index: " + index);
                console.log("letter: " + temp_letter);
                console.log("dict test: " + ScrabbleTiles[temp_letter]['number-remaining']);
                console.log("length: " + alpha_list.length);
                */
                /* the tile can be placed onto the holder */
                if (ScrabbleTiles[temp_letter]['number-remaining'] > 0) {
                    flag = false;
                    ScrabbleTiles[temp_letter]['number-remaining'] -= 1;
                    if (temp_letter === '_') {
                        tile_state[i]['letter'] = 'Blank';
                    } else {
                        tile_state[i]['letter'] = temp_letter;
                    }
                }
            }
        }
    }

    /* tile_state is now filled with tiles */
    /* onto loading them onto the holder */
    var pos = $('#holder').position();
    var top = 10;
    var left = -400;

    var base_url = 'images/scrabble/Scrabble_Tile_'

    /* build img element */
    for (var i = 0; i < 7; i++) {
        var letter = tile_state[i]['letter'];
        var tile_id = '#tile' + i;
        // create img
        var tile_img = "<img class='tiles' id='" + tile_state[i]['id'] + "' src='" +
                        base_url + letter + ".jpg'></img>";

        /* place img in tile-container div */
        $('#tile-container').append(tile_img);
        /* set the position of the image so they don't overlap */
        $(tile_id).css({'left': left,
                        'top': top,
                        'position': 'relative'
        });
        /*
        console.log("pass: " + i);
        console.log("id: " + tile_state[i]['id']);
        console.log('top: ' + top);
        console.log('left: ' + left);
        */
        left += 55;
        top -= 50;


        /* make the tile dragable */
        $(tile_id).draggable({
            revert: 'invalid',

        });

    }

}

/* create the scrabble board from images and make droppable */
function load_board() {
    /* holds each new img tag */
    var boardImage = '';
    /* holds element ID */
    var squareId = '';

    /* dynamically create the scrabble board */
    for (var i = 0; i < 15; i++) {

        squareId = '#square';
        /* check for double word score case */
        if (i === 2 || i === 12) {
            var boardImage = "<img class='boardSquare'" + "id='square" + i +
                "' src='images/scrabble/double-word-square.png'></img>";
        }
        /* check for double letter score case */
        else if (i === 6 || i === 8) {
            var boardImage = "<img class='boardSquare'" + "id='square" + i +
                "' src='images/scrabble/double-letter-square.png'></img>";
        }
        /* normal score case */
        else {
            var boardImage = "<img class='boardSquare'" + "id='square" + i +
                "' src='images/scrabble/normal-square.png'></img>";
        }
        squareId += i;
        /* append to scrabble board */
        $('#scrabble-board').append(boardImage);

        /* make it droppable */
        $(squareId).droppable({
            accept:'.tiles',
            drop: handleTileDrop
        });
    }
}




    /* this is our draggable tile, it will reset pos unless dropped on one of
    the scrabble board pieces

    $("#piece").draggable({
        revert: 'invalid'
    });

    $("#snapTarget").droppable({
        accept: '#tile-container img',
        drop: handleTileDrop
    });
    */



/* handle tile drop */
function handleTileDrop(event, ui) {
    var played_index;

    for (var i = 0; i < 15; i++){
        if (scrabble_board[i]['id'] == $(this).attr('id')){
            played_index = i;
            break;
        }
    }


    /* update 'tile' in scrabble_board structure*/
    scrabble_board[played_index]['tile'] = ui.draggable.attr('id');

    /* update tile_state to show tile played */
    for (var i = 0; i < 7; i ++){
        if (tile_state[i]['id'] == ui.draggable.attr('id')){
            tile_state[i]['played'] == true;
            break;
        }
    }
    /* this code found here: https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/
    */
    ui.draggable.position( {
        of: $(this),
        my: 'center center',
        at: 'center center'
    });

    console.log("ui Id: " + ui.draggable.attr('id'));
    console.log("this id: " + $(this).attr('id'));

    /* don't allow more drops on this square */
    /* found here: https://stackoverflow.com/questions/3948447/jquery-ui-droppable-only-accept-one-draggable */
    $(this).droppable('option', 'accept', ui.draggable);

    /* don't allow tile to be moved */
    $('#' + ui.draggable.attr('id')).draggable('disable');


}

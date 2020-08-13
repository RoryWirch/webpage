$(function() {
    /* this is our draggable tile, it will reset pos unless dropped on one of
    the scrabble board pieces
    */
    $("#tile").draggable({
        revert: 'invalid';
    });

    $(".dropTarget").droppable();

});

/* load scrabble board images into table row */

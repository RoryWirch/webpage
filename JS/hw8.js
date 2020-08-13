$(function() {
    /* this is our draggable tile, it will reset pos unless dropped on one of
    the scrabble board pieces
    */
    $("#piece").draggable({
        revert: 'invalid'
    });

    $("#snapTarget").droppable({
        accept: '#tile-container img',
        drop: handleTileDrop
    });

});

/* handle tile drop */
function handleTileDrop(event, ui) {
    console.log("in handleTileDrop");
    /* this code found here: https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/
    */
    ui.draggable.position( {
        of: $(this),
        my: 'center center',
        at: 'center center'
    });
}

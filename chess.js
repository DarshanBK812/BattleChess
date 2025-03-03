/******************************************
 * Chess Game Code – Turn-Based Movement  *
 ******************************************/

// Create a 1D array of 64 elements to represent the 8x8 chessboard
// 0 = empty, positive numbers = White pieces, negative numbers = Black pieces
// Piece values: Pawn:1, Knight:2, Bishop:3, Rook:4, Queen:5, King:6
let board = Array(64).fill(0);

/* FUNCTION: initializeBoard()
// Sets up the initial board configuration
// White pieces on rows 0 (major pieces) and 1 (pawns)
// Black pieces on rows 6 (pawns) and 7 (major pieces)
// Note: In this setup, white pieces move downward (increasing row)
// and black pieces move upward (decreasing row)
*/
function initializeBoard() {
    board.fill(0);
    // Row 0: White major pieces (from left to right)
    board[0] = 4;   // White Rook (♖)
    board[1] = 2;   // White Knight (♘)
    board[2] = 3;   // White Bishop (♗)
    board[3] = 5;   // White Queen (♕)
    board[4] = 6;   // White King (♔)
    board[5] = 3;   // White Bishop (♗)
    board[6] = 2;   // White Knight (♘)
    board[7] = 4;   // White Rook (♖)
    // Row 1: White Pawns
    for (let i = 8; i < 16; i++) {
        board[i] = 1;
    }
    // Row 6: Black Pawns
    for (let i = 48; i < 56; i++) {
        board[i] = -1;
    }
    // Row 7: Black major pieces (from left to right)
    board[56] = -4; // Black Rook (♜)
    board[57] = -2; // Black Knight (♞)
    board[58] = -3; // Black Bishop (♝)
    board[59] = -5; // Black Queen (♛)
    board[60] = -6; // Black King (♚)
    board[61] = -3; // Black Bishop (♝)
    board[62] = -2; // Black Knight (♞)
    board[63] = -4; // Black Rook (♜)
}

// Set up the initial board configuration
initializeBoard();

/* GLOBAL VARIABLES FOR GAME STATE */
let container = document.querySelector('.container'); // Container for board squares
// container.innerHTML = ''; // Clear container if needed
let selectedPiece = null;  // Holds the currently selected square (DOM element)
let selectedIndex = null;  // Holds the board index of the selected piece
let isWhiteTurn = true;    // White moves first

/* HELPER FUNCTION: getPieceSymbol()
// Returns the chess symbol for a given piece value.
*/
function getPieceSymbol(value) {
    switch (value) {
        case 1: return '♙';   // White Pawn
        case -1: return '♟';  // Black Pawn
        case 2: return '♘';   // White Knight
        case -2: return '♞';  // Black Knight
        case 3: return '♗';   // White Bishop
        case -3: return '♝';  // Black Bishop
        case 4: return '♖';   // White Rook
        case -4: return '♜';  // Black Rook
        case 5: return '♕';   // White Queen
        case -5: return '♛';  // Black Queen
        case 6: return '♔';   // White King
        case -6: return '♚';  // Black King
        default: return '';
    }
}

/* FUNCTION: updateBoard()
// Updates the board view by setting the innerHTML of each square.
*/
function updateBoard() {
    for (let i = 0; i < 64; i++) {
        let square = container.children[i];
        square.innerHTML = getPieceSymbol(board[i]);
    }
}

/* FUNCTION: isPathClear(fromIndex, toIndex)
// Checks whether the path between two indices is clear (for sliding pieces)
// It calculates row and column steps and verifies that all squares between are empty.
*/
function isPathClear(fromIndex, toIndex) {
    let fromRow = Math.floor(fromIndex / 8);
    let fromCol = fromIndex % 8;
    let toRow = Math.floor(toIndex / 8);
    let toCol = toIndex % 8;

    let rowStep = (toRow > fromRow) ? 1 : (toRow < fromRow) ? -1 : 0;
    let colStep = (toCol > fromCol) ? 1 : (toCol < fromCol) ? -1 : 0;

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    while (currentRow !== toRow || currentCol !== toCol) {
        let index = currentRow * 8 + currentCol;
        if (board[index] !== 0) return false;
        currentRow += rowStep;
        currentCol += colStep;
    }
    return true;
}

/* FUNCTION: isValidMove(fromIndex, toIndex)
// Validates a move based on piece type and movement rules.
// Also checks that the target square does not have a friendly piece.
*/
function isValidMove(fromIndex, toIndex) {
    let piece = board[fromIndex];         // The piece to be moved
    let target = board[toIndex];            // The piece (if any) at destination

    // Cannot capture a piece of the same color
    if (target !== 0 && (piece * target > 0)) return false;

    let fromRow = Math.floor(fromIndex / 8);
    let toRow = Math.floor(toIndex / 8);
    let fromCol = fromIndex % 8;
    let toCol = toIndex % 8;
    let deltaRow = toRow - fromRow;
    let deltaCol = toCol - fromCol;

    switch (Math.abs(piece)) {
        case 1: // Pawn
            if (piece > 0) { // White Pawn (moves downward/increasing row)
                // Two-square move on first move
                if (fromRow === 1 && deltaRow === 2 && deltaCol === 0 &&
                    board[fromIndex + 8] === 0 && board[toIndex] === 0)
                    return true;
                // One-square forward move
                if (deltaRow === 1 && deltaCol === 0 && board[toIndex] === 0)
                    return true;
                // Diagonal capture
                if (deltaRow === 1 && Math.abs(deltaCol) === 1 && target < 0)
                    return true;
            } else { // Black Pawn (moves upward/decreasing row)
                if (fromRow === 6 && deltaRow === -2 && deltaCol === 0 &&
                    board[fromIndex - 8] === 0 && board[toIndex] === 0)
                    return true;
                if (deltaRow === -1 && deltaCol === 0 && board[toIndex] === 0)
                    return true;
                if (deltaRow === -1 && Math.abs(deltaCol) === 1 && target > 0)
                    return true;
            }
            return false;
        case 2: // Knight
            if ((Math.abs(deltaRow) === 2 && Math.abs(deltaCol) === 1) ||
                (Math.abs(deltaRow) === 1 && Math.abs(deltaCol) === 2))
                return true;
            return false;
        case 3: // Bishop
            if (Math.abs(deltaRow) === Math.abs(deltaCol))
                return isPathClear(fromIndex, toIndex);
            return false;
        case 4: // Rook
            if (fromRow === toRow || fromCol === toCol)
                return isPathClear(fromIndex, toIndex);
            return false;
        case 5: // Queen
            if (fromRow === toRow || fromCol === toCol || Math.abs(deltaRow) === Math.abs(deltaCol))
                return isPathClear(fromIndex, toIndex);
            return false;
        case 6: // King
            if (Math.abs(deltaRow) <= 1 && Math.abs(deltaCol) <= 1)
                return true;
            return false;
        default:
            return false;
    }
}

/* FUNCTION: movePiece(fromIndex, toIndex)
// Moves the piece on the board array and updates the view.
*/
function movePiece(fromIndex, toIndex) {
    board[toIndex] = board[fromIndex];
    board[fromIndex] = 0;
    updateBoard();
}

/* FUNCTION: resetBoard()
// Resets the board to its initial configuration and updates the board view.
*/
function resetBoard() {
    initializeBoard();
    isWhiteTurn = true;  // Reset turn to White
    selectedPiece = null;
    selectedIndex = null;
    updateBoard();
}

/* SETUP THE BOARD SQUARES */
// Create 64 squares and attach click event listeners for movement.
for (let i = 0; i < 64; i++) {
    let square = document.createElement('div');
    square.classList.add('square');

    // Calculate row and column for board coloring
    let row = Math.floor(i / 8);
    let col = i % 8;
    if ((row + col) % 2 === 0) square.classList.add('white');
    else square.classList.add('black');

    container.appendChild(square);

    // Add click listener for each square
    square.addEventListener('dblclick', function() {
        let clickIndex = Array.from(container.children).indexOf(square);
        let piece = board[clickIndex];
        setTimeout(() => {
            square.classList.remove('highlight');
        }, 1000);
        square.classList.add('highlight');
        // If no piece is selected, select it (if it belongs to the player whose turn it is)
        if (selectedPiece === null && piece !== 0) {
            if ((isWhiteTurn && piece > 0) || (!isWhiteTurn && piece < 0)) {
                selectedPiece = square;
                selectedIndex = clickIndex;
                square.classList.add('highlight'); // Highlight the selected square
            }
        } 
        // If a piece is already selected, attempt to move it
        else if (selectedPiece !== null) {
           
            if (isValidMove(selectedIndex, clickIndex)) {
                movePiece(selectedIndex, clickIndex);
                isWhiteTurn = !isWhiteTurn;  // Switch turns after a successful move
            } else {
                console.log("Invalid move");
            }
            // Deselect the piece regardless of whether the move was successful
            let selectedElem = container.children[selectedIndex];
            selectedElem.classList.remove('highlight');
            selectedPiece = null;
            selectedIndex = null;
        }
    });
}

// Render the initial board view
updateBoard();

// Set up reset button event listener (ensure an element with id "resetButton" exists)
document.getElementById('resetButton').addEventListener('click', resetBoard);

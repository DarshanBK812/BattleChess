# ♟️ Chess Board Game – HTML, CSS & JavaScript

This is a simple chess board game built using **HTML**, **CSS Grid**, and **Vanilla JavaScript**. The board and pieces are generated entirely through **DOM manipulation**, with minimal use of static HTML.

---

## 🚀 Features

- 🧠 Valid piece movement (Pawn, Rook, Knight, Bishop, Queen, King)
- 🔁 Turn-based gameplay (White starts first)
- 📐 Fully dynamic 8x8 board using JavaScript
- 🎨 Chessboard styled using **CSS Grid**
- ♻️ Reset button to restart the game
- ❌ Invalid moves are blocked

---

## 🧩 Technologies Used

- **HTML5** – Base structure (only container and reset button)
- **CSS3 Grid** – Board alignment and coloring
- **JavaScript (ES6)** – Game logic, piece movement, DOM handling

---

## 📂 How to Run the Game

1. Clone or download this repository
2. Open `index.html` in your browser
3. **Double-click** on:
   - A piece to select it
   - A valid square to move it

> 🟢 Use the **Reset** button to restart the game at any time.

---

## 🔍 Project Details

- The board is a **1D array of 64 cells**
- Piece values:
  - Pawn: ±1
  - Knight: ±2
  - Bishop: ±3
  - Rook: ±4
  - Queen: ±5
  - King: ±6
- Positive = White, Negative = Black
- Move validation handled in `isValidMove()` function
- DOM updated dynamically with `updateBoard()`

---

## 📸 Preview

> Screenshot coming soon...

---

## ✨ Future Improvements

- Add check/checkmate detection
- Implement drag-and-drop UI
- Enable castling, pawn promotion, en passant
- Display move history

---

## 🙋‍♂️ Author

**Darshan B K**  
🔗 GitHub: [DarshanBK812](https://github.com/DarshanBK812)

---

## 📄 License

This project is open source under the [MIT License](https://choosealicense.com/licenses/mit/).

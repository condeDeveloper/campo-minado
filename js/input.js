// Mouse (clique / botão direito / chord), toque longo e botões
function bindInput(game) {
  const boardEl = document.getElementById('board');
  let pressTimer = null, longPressed = false, pressedCell = null;

  const cellFromEvent = e => {
    const el = e.target.closest('.cell');
    if (!el) return null;
    return game.board.get(Number(el.dataset.r), Number(el.dataset.c));
  };

  boardEl.addEventListener('contextmenu', e => e.preventDefault());

  boardEl.addEventListener('pointerdown', e => {
    const cell = cellFromEvent(e);
    if (!cell || game.over) return;
    longPressed = false;
    pressedCell = cell;
    if (e.button === 2) return; // tratado no pointerup
    if (!cell.open) { Render.press(cell, game.board, true); Render.setFace('pressed'); }
    if (e.pointerType !== 'mouse') {
      pressTimer = setTimeout(() => {
        longPressed = true;
        Render.press(cell, game.board, false);
        game.flag(cell);
        if (navigator.vibrate) navigator.vibrate(30);
      }, LONG_PRESS_MS);
    }
  });

  const release = e => {
    clearTimeout(pressTimer);
    if (pressedCell) Render.press(pressedCell, game.board, false);
    if (!game.over) Render.setFace('idle');
    const cell = cellFromEvent(e);
    if (!cell || !pressedCell || cell !== pressedCell) { pressedCell = null; return; }
    pressedCell = null;
    if (longPressed) return;
    if (e.button === 2 || e.ctrlKey) return game.flag(cell);
    if (game.flagMode && !cell.open) return game.flag(cell);
    if (cell.open) return game.chord(cell);
    game.reveal(cell);
  };
  boardEl.addEventListener('pointerup', release);
  boardEl.addEventListener('pointercancel', () => { clearTimeout(pressTimer); if (pressedCell) Render.press(pressedCell, game.board, false); pressedCell = null; });

  document.getElementById('face').addEventListener('click', () => game.newGame());
  document.getElementById('flag-mode').addEventListener('click', () => game.toggleFlagMode());
  document.querySelectorAll('#levels button').forEach(b => b.addEventListener('click', () => game.setLevel(b.dataset.level)));

  window.addEventListener('keydown', e => {
    if (e.code === 'KeyR' || e.code === 'F2') game.newGame();
    if (e.code === 'KeyF') game.toggleFlagMode();
  });
}

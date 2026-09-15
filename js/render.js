// Renderização em DOM
const Render = {
  init() {
    this.board = document.getElementById('board');
    this.mines = document.getElementById('mines');
    this.timer = document.getElementById('timer');
    this.face = document.getElementById('face');
    this.best = document.getElementById('best');
    this.flagMode = document.getElementById('flag-mode');
  },

  pad(n) { return String(Math.max(-99, Math.min(999, n))).padStart(3, '0'); },

  build(board, levelKey) {
    this.board.className = 'board ' + levelKey;
    this.board.style.gridTemplateColumns = `repeat(${board.cols}, var(--cell))`;
    this.board.innerHTML = '';
    this.els = [];
    for (const cell of board.cells.flat()) {
      const el = document.createElement('div');
      el.className = 'cell';
      el.dataset.r = cell.r; el.dataset.c = cell.c;
      this.board.appendChild(el);
      this.els.push(el);
    }
  },

  el(cell, board) { return this.els[cell.r * board.cols + cell.c]; },

  cell(cell, board) {
    const el = this.el(cell, board);
    el.className = 'cell';
    el.textContent = '';
    delete el.dataset.n;
    if (cell.open) {
      el.classList.add('open');
      if (cell.mine) { el.classList.add('mine'); el.textContent = '💣'; }
      else if (cell.n) { el.dataset.n = cell.n; el.textContent = cell.n; }
    } else if (cell.flag) {
      el.textContent = '🚩';
    }
  },

  all(board) { for (const c of board.cells.flat()) this.cell(c, board); },

  // No fim de jogo: mostra minas não marcadas e bandeiras erradas
  revealEnd(board, won) {
    for (const c of board.cells.flat()) {
      const el = this.el(c, board);
      if (c.mine && !c.open) { el.textContent = won ? '🚩' : '💣'; if (!won) el.classList.add('open'); }
      if (!c.mine && c.flag) { el.classList.add('wrong'); el.textContent = '✖'; }
    }
  },

  counters(minesLeft, seconds) {
    this.mines.textContent = this.pad(minesLeft);
    this.timer.textContent = this.pad(seconds);
  },
  time(seconds) { this.timer.textContent = this.pad(seconds); },
  setFace(state) { this.face.textContent = FACES[state]; },
  bestText(level, seconds) {
    this.best.textContent = seconds ? `Melhor tempo (${LEVELS[level].label}): ${seconds}s` : `Sem recorde em ${LEVELS[level].label} ainda`;
  },
  flagModeState(on) {
    this.flagMode.classList.toggle('on', on);
    this.flagMode.querySelector('strong').textContent = on ? 'on' : 'off';
  },
  press(cell, board, on) { this.el(cell, board).classList.toggle('pressed', on); },
};

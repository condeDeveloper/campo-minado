// Orquestração: níveis, estado da partida, cronômetro e recordes
class Game {
  constructor() {
    Render.init();
    this.timer = new Timer(s => Render.time(s));
    this.level = 'beginner';
    this.flagMode = false;
    bindInput(this);
    this.newGame();
  }

  setLevel(level) {
    this.level = level;
    document.querySelectorAll('#levels button').forEach(b => b.classList.toggle('active', b.dataset.level === level));
    this.newGame();
  }

  newGame() {
    const cfg = LEVELS[this.level];
    this.board = new Board(cfg.cols, cfg.rows, cfg.mines);
    this.over = false;
    this.timer.reset();
    Render.build(this.board, this.level);
    Render.all(this.board);
    Render.counters(cfg.mines, 0);
    Render.setFace('idle');
    Render.bestText(this.level, Storage.best(this.level));
  }

  toggleFlagMode() {
    this.flagMode = !this.flagMode;
    Render.flagModeState(this.flagMode);
  }

  reveal(cell) {
    if (this.over) return;
    this.timer.start();
    const opened = this.board.reveal(cell);
    opened.forEach(c => Render.cell(c, this.board));
    this.afterMove();
  }

  chord(cell) {
    if (this.over) return;
    const opened = this.board.chord(cell);
    opened.forEach(c => Render.cell(c, this.board));
    if (opened.length) this.afterMove();
  }

  flag(cell) {
    if (this.over) return;
    if (!this.board.toggleFlag(cell)) return;
    this.timer.start();
    Render.cell(cell, this.board);
    Render.counters(this.board.mines - this.board.flagsCount(), this.timer.seconds);
  }

  afterMove() {
    Render.counters(this.board.mines - this.board.flagsCount(), this.timer.seconds);
    if (this.board.exploded) return this.end(false);
    if (this.board.won()) return this.end(true);
  }

  end(won) {
    this.over = true;
    this.timer.stop();
    Render.setFace(won ? 'won' : 'lost');
    Render.revealEnd(this.board, won);
    if (won) {
      Render.counters(0, this.timer.seconds);
      const record = Storage.record(this.level, this.timer.seconds);
      Render.bestText(this.level, Storage.best(this.level));
      if (record) Render.best.textContent += ' 🏆 novo recorde!';
    }
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });

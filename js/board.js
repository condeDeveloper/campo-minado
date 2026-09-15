// Lógica pura do tabuleiro (sem DOM)
class Board {
  constructor(cols, rows, mines) {
    this.cols = cols; this.rows = rows; this.mines = mines;
    this.cells = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({ r, c, mine: false, open: false, flag: false, n: 0 }))
    );
    this.placed = false;
    this.opened = 0;
    this.exploded = null;
  }

  get(r, c) { return (r >= 0 && r < this.rows && c >= 0 && c < this.cols) ? this.cells[r][c] : null; }

  neighbors(cell) {
    const out = [];
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const n = this.get(cell.r + dr, cell.c + dc);
      if (n) out.push(n);
    }
    return out;
  }

  // Minas são colocadas no primeiro clique, garantindo que ele e seus vizinhos fiquem livres
  placeMines(safe) {
    const forbidden = new Set([safe, ...this.neighbors(safe)]);
    const pool = this.cells.flat().filter(c => !forbidden.has(c));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    pool.slice(0, this.mines).forEach(c => { c.mine = true; });
    for (const cell of this.cells.flat()) cell.n = this.neighbors(cell).filter(x => x.mine).length;
    this.placed = true;
  }

  // Revela uma célula (com flood fill nos zeros). Retorna lista de células abertas; define exploded se pisou em mina.
  reveal(cell) {
    if (cell.open || cell.flag) return [];
    if (!this.placed) this.placeMines(cell);
    if (cell.mine) { cell.open = true; this.exploded = cell; return [cell]; }
    const opened = [];
    const stack = [cell];
    while (stack.length) {
      const cur = stack.pop();
      if (cur.open || cur.flag) continue;
      cur.open = true; opened.push(cur); this.opened++;
      if (cur.n === 0) for (const nb of this.neighbors(cur)) if (!nb.open && !nb.mine) stack.push(nb);
    }
    return opened;
  }

  toggleFlag(cell) {
    if (cell.open) return false;
    cell.flag = !cell.flag;
    return true;
  }

  // "Chord": em um número aberto, se as bandeiras ao redor batem, revela os vizinhos restantes
  chord(cell) {
    if (!cell.open || cell.n === 0) return [];
    const nbs = this.neighbors(cell);
    const flags = nbs.filter(n => n.flag).length;
    if (flags !== cell.n) return [];
    let opened = [];
    for (const nb of nbs) {
      if (!nb.open && !nb.flag) {
        opened = opened.concat(this.reveal(nb));
        if (this.exploded) break;
      }
    }
    return opened;
  }

  flagsCount() { return this.cells.flat().filter(c => c.flag).length; }
  won() { return !this.exploded && this.opened === this.cols * this.rows - this.mines; }
}

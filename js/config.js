// Níveis clássicos
const LEVELS = {
  beginner:     { cols: 9,  rows: 9,  mines: 10, label: 'Iniciante' },
  intermediate: { cols: 16, rows: 16, mines: 40, label: 'Intermediário' },
  expert:       { cols: 30, rows: 16, mines: 99, label: 'Especialista' },
};
const LONG_PRESS_MS = 350;
const BEST_KEY = 'minesweeper-best';

const FACES = { idle: '🙂', pressed: '😮', won: '😎', lost: '😵' };

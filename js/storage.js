// Melhores tempos por nível
const Storage = {
  load() {
    try { return JSON.parse(localStorage.getItem(BEST_KEY) || '{}'); } catch (_) { return {}; }
  },
  best(level) { return this.load()[level] || null; },
  // Retorna true se foi um novo recorde
  record(level, seconds) {
    const all = this.load();
    if (all[level] && all[level] <= seconds) return false;
    all[level] = seconds;
    try { localStorage.setItem(BEST_KEY, JSON.stringify(all)); } catch (_) {}
    return true;
  },
};

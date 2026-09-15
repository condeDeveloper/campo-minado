// Cronômetro em segundos, limitado a 999
class Timer {
  constructor(onTick) { this.onTick = onTick; this.reset(); }
  reset() { this.stop(); this.seconds = 0; this.onTick(0); }
  start() {
    if (this.id) return;
    this.startedAt = Date.now() - this.seconds * 1000;
    this.id = setInterval(() => {
      this.seconds = Math.min(999, Math.floor((Date.now() - this.startedAt) / 1000));
      this.onTick(this.seconds);
    }, 250);
  }
  stop() { if (this.id) { clearInterval(this.id); this.id = null; } }
}

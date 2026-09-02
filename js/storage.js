// SISTEMA DE ALMACENAMIENTO LOCAL
const GameStorage = {
  PREFIX: 'CONV_GRADOS_',

  get(key, defaultValue = null) {
    try {
      const stored = localStorage.getItem(this.PREFIX + key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(this.PREFIX + key);
  },

  clear() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  },

  // Métodos específicos del juego
  getLeaderboard(mode = 'campaign') {
    return this.get(`leaderboard_${mode}`, []);
  },

  addScore(mode, score, level, time) {
    const lb = this.getLeaderboard(mode);
    lb.push({ score, level, time, date: new Date().toISOString() });
    lb.sort((a, b) => b.score - a.score);
    lb.splice(100); // Mantener solo top 100
    this.set(`leaderboard_${mode}`, lb);
  },

  getBestScore(mode = 'campaign') {
    const lb = this.getLeaderboard(mode);
    return lb.length > 0 ? lb[0].score : 0;
  },

  getAchievements() {
    return this.get('achievements', {});
  },

  unlockAchievement(id) {
    const achievements = this.getAchievements();
    if (!achievements[id]) {
      achievements[id] = {
        id,
        unlockedAt: new Date().toISOString(),
        progress: 100
      };
      this.set('achievements', achievements);
      return true;
    }
    return false;
  },

  isAchievementUnlocked(id) {
    const achievements = this.getAchievements();
    return achievements.hasOwnProperty(id);
  },

  getStats() {
    return this.get('stats', {
      totalGames: 0,
      totalScore: 0,
      totalCorrect: 0,
      totalErrors: 0,
      currentStreak: 0,
      bestStreak: 0
    });
  },

  updateStats(correct, errors, score) {
    const stats = this.getStats();
    stats.totalGames += 1;
    stats.totalScore += score;
    stats.totalCorrect += correct;
    stats.totalErrors += errors;
    
    if (errors === 0) {
      stats.currentStreak = (stats.currentStreak || 0) + 1;
      stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
    } else {
      stats.currentStreak = 0;
    }
    
    this.set('stats', stats);
    return stats;
  }
};

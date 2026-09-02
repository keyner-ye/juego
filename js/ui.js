// SISTEMA DE INTERFAZ
const UI = {
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
  },

  updateStats() {
    const stats = GameStorage.getStats();
    const bestScore = GameStorage.getBestScore('campaign');
    const achievements = GameStorage.getAchievements();

    document.getElementById('bestScore').textContent = bestScore;
    document.getElementById('achievementCount').textContent = Object.keys(achievements).length;
    document.getElementById('currentStreak').textContent = stats.currentStreak || 0;
  },

  populateLevels() {
    const grid = document.getElementById('levelsGrid');
    grid.innerHTML = '';

    QuestionGenerator.maps.forEach((map, mapIndex) => {
      const card = document.createElement('div');
      card.className = 'level-card';
      card.onclick = () => startCampaign(mapIndex * 2);

      const firstBoss = map.bosses[0];
      const finalBoss = map.bosses[1];
      card.innerHTML = `
        <div class="level-number">MAPA ${mapIndex + 1}</div>
        <div class="level-map">${map.name}</div>
        <div class="level-map-description">${map.desc}</div>
        <div class="map-bosses">
          <div class="map-boss">
            <div class="level-boss">${firstBoss.name.split(' ')[0]}</div>
            <div class="level-boss-name">${firstBoss.name}</div>
          </div>
          <div class="boss-separator">VS</div>
          <div class="map-boss final-boss">
            <div class="level-boss">${finalBoss.name.split(' ')[0]}</div>
            <div class="level-boss-name">${finalBoss.name}</div>
          </div>
        </div>
        <div class="level-difficulty">Dificultad: ⭐ ${'⭐'.repeat(Math.min(5, mapIndex + 1))}</div>
      `;

      grid.appendChild(card);
    });
  },

  populateLeaderboard(mode) {
    const list = document.getElementById('leaderboardList');
    const lb = GameStorage.getLeaderboard(mode);

    if (lb.length === 0) {
      list.innerHTML = '<p style="text-align: center; color: #a0d0ff; padding: 20px;">Sin puntuaciones aún</p>';
      return;
    }

    list.innerHTML = lb.slice(0, 20).map((entry, i) => `
      <div class="lb-item">
        <div class="lb-rank">#${i + 1}</div>
        <div class="lb-name">
          <div>Puntuación: ${entry.score}</div>
          <small>Nivel ${entry.level} • ${entry.time}s</small>
        </div>
        <div class="lb-score">${entry.score}</div>
      </div>
    `).join('');
  },

  populateAchievements() {
    const ACHIEVEMENTS = {
      'first_game': { icon: '🎮', name: 'Primer Intento', desc: 'Jugar tu primer juego' },
      'combo_5': { icon: '🔥', name: 'Combo x5', desc: 'Obtener 5 aciertos seguidos' },
      'combo_10': { icon: '🔥🔥', name: 'Combo x10', desc: 'Obtener 10 aciertos seguidos' },
      'level_5': { icon: '⭐', name: 'Nivel 5', desc: 'Alcanzar nivel 5' },
      'level_10': { icon: '⭐⭐', name: 'Nivel 10', desc: 'Alcanzar nivel 10' },
      'perfect_game': { icon: '💯', name: 'Juego Perfecto', desc: 'Completar un juego sin errores' },
      'map_5': { icon: '🗺️', name: 'Explorador', desc: 'Superar los primeros 5 mapas' },
      'map_10': { icon: '🌟', name: 'Maestro del mapa', desc: 'Superar 10 mapas de campaña' },
      'map_15': { icon: '👑', name: 'Leyenda absoluta', desc: 'Completar los 15 mapas' },
      'conversion_master': { icon: '🧠', name: 'Mente térmica', desc: 'Conseguir 50 respuestas correctas' },
      'defeat_all_bosses': { icon: '🏆', name: 'Campeón', desc: 'Vencer los 30 bosses en campaña' },
      'arcade_1min': { icon: '🏃', name: 'Velocidad', desc: 'Lograr 1000 puntos en arcade' }
    };

    const grid = document.getElementById('achievementsList');
    const unlocked = GameStorage.getAchievements();

    grid.innerHTML = Object.entries(ACHIEVEMENTS).map(([id, ach]) => {
      const isUnlocked = unlocked.hasOwnProperty(id);
      return `
        <div class="achievement-badge ${isUnlocked ? 'unlocked' : ''}">
          <div class="achievement-icon">${ach.icon}</div>
          <div class="achievement-name">${ach.name}</div>
          <div class="achievement-desc">${ach.desc}</div>
          ${isUnlocked ? '<div style="color: #86efac; margin-top: 10px;">✓ Desbloqueado</div>' : '<div style="color: #a0d0ff;">Bloqueado</div>'}
        </div>
      `;
    }).join('');
  },

  showVictoryScreen(score, level, combo, time) {
    const screen = document.getElementById('victoryScreen');
    document.getElementById('victoryScore').textContent = score;
    document.getElementById('victoryLevel').textContent = level;
    document.getElementById('victoryStreak').textContent = combo;
    document.getElementById('victoryTime').textContent = time + 's';

    this.showScreen('victoryScreen');
    AudioManager.playVictory();
  },

  showGameOverScreen(score, level, reason = 'Vida agotada') {
    const screen = document.getElementById('gameOverScreen');
    document.getElementById('gameoverScore').textContent = score;
    document.getElementById('gameoverLevel').textContent = level;
    document.getElementById('gameoverReason').textContent = reason;

    this.showScreen('gameOverScreen');
    AudioManager.playGameOver();
  },

  updateGameHUD(player) {
    document.getElementById('playerLife').textContent = player.life;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerXP').textContent = player.xp;
    document.getElementById('comboCounter').textContent = player.combo;
    document.getElementById('correctCount').textContent = player.correct;
    document.getElementById('errorCount').textContent = player.errors;
    document.getElementById('scoreValue').textContent = player.score;
  },

  updateBossInfo(boss, hp, maxHp) {
    const sprite = boss.name.split(' ')[0];
    document.getElementById('bossSprite').textContent = sprite;
    document.getElementById('bossName').textContent = boss.name;
    const percentage = Math.max(0, Math.min(100, (hp / maxHp) * 100));
    document.getElementById('bossHealthBar').style.width = percentage + '%';
  },

  updateQuestion(question, clearPreviousFeedback = true) {
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').focus();
    document.getElementById('formulaHint').textContent = question.formula;
    if (clearPreviousFeedback) {
      clearFeedback();
    }
  },

  showFeedback(isCorrect, message, tip = '') {
    const msgEl = document.getElementById('feedbackMessage');
    const tipEl = document.getElementById('tipMessage');

    msgEl.textContent = message;
    msgEl.className = 'feedback-msg ' + (isCorrect ? 'success' : 'error');
    tipEl.textContent = tip;
  }
};

function clearFeedback() {
  document.getElementById('feedbackMessage').textContent = '';
  document.getElementById('tipMessage').textContent = '';
}

function changeTheme(themeName) {
  const themes = ['dark-theme', 'light-theme', 'neon-theme', 'classic-theme', 'cyberpunk-theme', 'natural-theme', 'futuristic-theme', 'retro-theme'];
  themes.forEach(t => document.body.classList.remove(t));
  
  if (themeName !== 'dark') {
    document.body.classList.add(themeName + '-theme');
  }
  
  GameStorage.set('theme', themeName);
}

function backToMenu() {
  if (window.currentGame) {
    window.currentGame.stop();
  }
  UI.showScreen('mainMenu');
  UI.updateStats();
}

function openMode(mode) {
  AudioManager.playClick();
  switch(mode) {
    case 'campaign':
      UI.populateLevels();
      UI.showScreen('campaignScreen');
      break;
    case 'arcade':
      UI.showScreen('arcadeScreen');
      break;
    case 'practice':
      UI.showScreen('practiceScreen');
      break;
    case 'leaderboard':
      UI.populateLeaderboard('campaign');
      UI.showScreen('leaderboardScreen');
      break;
    case 'achievements':
      UI.populateAchievements();
      UI.showScreen('achievementsScreen');
      break;
    case 'settings':
      UI.showScreen('settingsScreen');
      document.getElementById('themeSelect').value = GameStorage.get('theme', 'dark');
      document.getElementById('soundToggle').checked = AudioManager.isEnabled();
      break;
  }
}

function resetProgress() {
  if (confirm('¿Estás seguro de que quieres resetear todo el progreso?')) {
    GameStorage.clear();
    alert('Progreso reseteado');
    backToMenu();
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = GameStorage.get('theme', 'dark');
  changeTheme(savedTheme);
  document.getElementById('soundToggle').onchange = (e) => {
    AudioManager.setEnabled(e.target.checked);
  };
  UI.updateStats();
  UI.showScreen('mainMenu');
});

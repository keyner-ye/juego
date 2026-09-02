// MOTOR DEL JUEGO
class Game {
  constructor(mode, difficulty = 'normal', conversionType = 'ALL', levelIndex = 0) {
    this.mode = mode; // campaign, arcade, practice
    this.difficulty = difficulty;
    this.conversionType = conversionType;
    this.levelIndex = levelIndex;
    this.mapIndex = Math.floor(levelIndex / 2); // Un mapa cada 2 bosses
    this.bossIndexInMap = levelIndex % 2;
    
    this.player = {
      life: 5,
      xp: 0,
      level: 1,
      score: 0,
      combo: 0,
      maxCombo: 0,
      correct: 0,
      errors: 0,
      powerUps: { shield: 3, double: 2, time: 2 }
    };

    this.mapInfo = QuestionGenerator.getMapInfo(this.mapIndex);
    this.boss = QuestionGenerator.getBoss(this.mapIndex, this.bossIndexInMap);
    this.bossMaxHP = this.boss.hp;
    this.bossHP = this.bossMaxHP;
    this.currentQuestion = null;

    this.timeLeft = this.getInitialTime();
    this.startTime = Date.now();
    this.running = true;
    this.doubleActive = false;

    this.init();
  }

  init() {
    UI.showScreen('gameScreen');
    // Aplicar tema del mapa
    document.getElementById('arena').className = 'battle-arena world ' + this.mapInfo.className;
    this.updateHUD();
    this.generateQuestion();
    this.startTimer();
    GameStorage.set('current_game_mode', this.mode);
  }

  getInitialTime() {
    if (this.mode === 'arcade') {
      const times = { fácil: 90, normal: 60, difícil: 45, extremo: 30 };
      return times[this.difficulty.toLowerCase()] || 60;
    }
    return 999; // Campaign sin límite de tiempo
  }

  generateQuestion(keepFeedback = false) {
    const diff = Math.ceil(this.player.level / 2.5);
    this.currentQuestion = QuestionGenerator.createQuestion(diff, this.conversionType);
    UI.updateQuestion(this.currentQuestion, !keepFeedback);
  }

  submitAnswer() {
    if (!this.running || !this.currentQuestion) return;

    const input = document.getElementById('answerInput');
    const submitted = Number(input.value);

    if (Number.isNaN(submitted)) {
      UI.showFeedback(false, '⚠️ Ingresa un número válido', '');
      AudioManager.playError();
      return;
    }

    const isCorrect = QuestionGenerator.validateAnswer(
      submitted,
      this.currentQuestion.answer,
      Math.ceil(this.player.level / 2.5)
    );

    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer();
    }

    if (this.running) {
      this.generateQuestion(!isCorrect);
    }
  }

  handleCorrectAnswer() {
    this.player.combo += 1;
    this.player.maxCombo = Math.max(this.maxCombo, this.player.combo);
    this.player.correct += 1;

    const baseDamage = 25 + (this.player.level - 1) * 5;
    const comboDamage = this.player.combo * 3;
    const multiplier = this.doubleActive ? 2 : 1;
    const totalDamage = (baseDamage + comboDamage) * multiplier;

    this.bossHP -= totalDamage;

    const baseXP = 100 + (this.player.combo * 10);
    const xpGain = baseXP * multiplier;
    this.player.xp += xpGain;
    this.player.score += Math.floor(xpGain * 1.5);

    // Nivel up
    if (this.player.xp >= this.player.level * 600) {
      this.player.level += 1;
      this.generateQuestion(); // Nueva pregunta al subir de nivel
    }

    const comboMsg = this.player.combo > 1 ? ` (${this.player.combo}x)` : '';
    UI.showFeedback(true, `💥 ¡Correcto!${comboMsg}`, `Fórmula: ${this.currentQuestion.formula}`);
    AudioManager.playSuccess();

    this.doubleActive = false;

    if (this.bossHP <= 0) {
      this.defeatBoss();
    }
  }

  handleWrongAnswer() {
    this.player.combo = 0;
    this.player.errors += 1;
    this.player.life -= 1;

    const detailedTip = QuestionGenerator.getDetailedTip(this.currentQuestion);
    const correctValue = this.currentQuestion.answer.toFixed(2);
    
    UI.showFeedback(false, `❌ Respuesta incorrecta\n✓ La correcta es: ${correctValue}`, detailedTip);
    AudioManager.playError();

    if (this.player.life <= 0) {
      this.gameOver('Vida agotada');
    }
  }

  defeatBoss() {
    this.running = false;
    clearInterval(this.timerInterval);
    this.player.score += 500 + (this.player.combo * 50);

    if (this.mode === 'campaign') {
      if (this.levelIndex < QuestionGenerator.maps.length * 2 - 1) {
        this.transitionTimeout = setTimeout(() => this.nextBoss(), 1500);
      } else {
        this.transitionTimeout = setTimeout(() => this.victory(), 1500);
      }
    } else {
      this.victory();
    }
  }

  nextBoss() {
    this.levelIndex += 1;
    const newGame = new Game(this.mode, this.difficulty, this.conversionType, this.levelIndex);
    newGame.player = this.player;
    newGame.startTime = this.startTime;
    newGame.updateHUD();
    newGame.generateQuestion();
    window.currentGame = newGame;
  }

  victory() {
    this.stop();
    const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    GameStorage.updateStats(this.player.correct, this.player.errors, this.player.score);
    GameStorage.addScore(this.mode, this.player.score, this.player.level, elapsedTime);

    // Verificar logros
    GameStorage.unlockAchievement('first_game');
    if (this.player.errors === 0) {
      GameStorage.unlockAchievement('perfect_game');
    }
    if (this.player.combo >= 5) {
      GameStorage.unlockAchievement('combo_5');
    }
    if (this.player.combo >= 10) {
      GameStorage.unlockAchievement('combo_10');
    }
    if (this.player.level >= 5) {
      GameStorage.unlockAchievement('level_5');
    }
    if (this.mode === 'campaign' && this.levelIndex >= 9) {
      GameStorage.unlockAchievement('map_5');
    }
    if (this.mode === 'campaign' && this.levelIndex >= 19) {
      GameStorage.unlockAchievement('map_10');
    }
    if (this.mode === 'campaign' && this.levelIndex >= 29) {
      GameStorage.unlockAchievement('map_15');
    }
    if (this.player.correct >= 50) {
      GameStorage.unlockAchievement('conversion_master');
    }
    if (this.mode === 'campaign' && this.levelIndex === QuestionGenerator.maps.length * 2 - 1) {
      GameStorage.unlockAchievement('defeat_all_bosses');
    }

    UI.showVictoryScreen(this.player.score, this.player.level, this.player.maxCombo, Math.floor((Date.now() - this.startTime) / 1000));
  }

  gameOver(reason) {
    this.stop();
    GameStorage.updateStats(this.player.correct, this.player.errors, this.player.score);
    GameStorage.addScore(this.mode, this.player.score, this.player.level, Math.floor((Date.now() - this.startTime) / 1000));
    UI.showGameOverScreen(this.player.score, this.player.level, reason);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.running) {
        this.timeLeft--;
        document.getElementById('gameTimer').textContent = this.timeLeft;

        if (this.timeLeft <= 0) {
          this.gameOver('Tiempo agotado');
        }
      }
    }, 1000);
  }

  updateHUD() {
    UI.updateGameHUD(this.player);
    UI.updateBossInfo(this.boss, this.bossHP, this.bossMaxHP);
    document.getElementById('gameTimer').textContent = this.timeLeft;
  }

  stop() {
    this.running = false;
    clearInterval(this.timerInterval);
    clearTimeout(this.transitionTimeout);
  }
}

// FUNCIONES GLOBALES
function startCampaign(levelIndex = 0) {
  AudioManager.playClick();
  window.currentGame = new Game('campaign', 'normal', 'ALL', levelIndex);
}

function startArcade(timeLimit) {
  AudioManager.playClick();
  const difficulty = {
    90: 'fácil',
    60: 'normal',
    45: 'difícil',
    30: 'extremo'
  }[timeLimit];

  const game = new Game('arcade', difficulty, 'ALL', 0);
  game.timeLeft = timeLimit;
  window.currentGame = game;
}

function startPractice(conversionType) {
  AudioManager.playClick();
  window.currentGame = new Game('practice', 'normal', conversionType, 0);
  document.getElementById('gameTimer').parentElement.style.display = 'none';
}

function submitAnswer() {
  if (window.currentGame) {
    window.currentGame.submitAnswer();
    window.currentGame.updateHUD();
  }
}

function quitGame() {
  if (window.currentGame) {
    window.currentGame.stop();
  }
  backToMenu();
}

function restartGame() {
  AudioManager.playClick();
  if (window.currentGame) {
    const mode = window.currentGame.mode;
    const difficulty = window.currentGame.difficulty;
    const convType = window.currentGame.conversionType;

    if (mode === 'arcade') {
      startArcade({ 'fácil': 90, 'normal': 60, 'difícil': 45, 'extremo': 30 }[difficulty]);
    } else if (mode === 'practice') {
      startPractice(convType);
    } else {
      startCampaign(0);
    }
  }
}

function usePowerUp(type) {
  if (!window.currentGame || window.currentGame.player.powerUps[type] <= 0) {
    AudioManager.playError();
    return;
  }

  if (type === 'shield') {
    window.currentGame.player.life += 1;
  } else if (type === 'double') {
    window.currentGame.doubleActive = true;
  } else if (type === 'time') {
    window.currentGame.timeLeft += 15;
  }

  window.currentGame.player.powerUps[type]--;
  document.getElementById(type + 'Btn').disabled = window.currentGame.player.powerUps[type] <= 0;
  AudioManager.playCombo();
}

// Inicializar evento de tecla Enter
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('answerInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitAnswer();
  });
});

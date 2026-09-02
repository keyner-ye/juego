# 🌡️ CONVERSIÓN DE GRADOS - VERSIÓN PROFESIONAL

## 📋 Descripción
Juego profesional de conversión de temperaturas con múltiples modos, niveles de dificultad, sistema de logros y leaderboard local.

## 🎮 Modos de Juego

### 🎯 Campaña
- **15 mapas y 30 bosses** diferentes con dificultad progresiva
- **Niveles de XP** dinámicos
- **Fin claro**: Vencer todos los enemigos
- **Puntuación**: Bonus por combo y velocidad

### 🏃 Arcade
- **Tiempo Limitado**: 90s (Fácil), 60s (Normal), 45s (Difícil), 30s (Extremo)
- **Enemigos Infinitos**: Genera preguntas sin parar
- **Escalabilidad**: Aumenta dificultad automáticamente
- **Competitivo**: Compite por la mejor puntuación

### 📚 Práctica
- **Tipos Específicos**: 
  - Celsius ↔ Fahrenheit
  - Celsius ↔ Kelvin
  - Fahrenheit ↔ Kelvin
  - Todas las conversiones
- **Sin Presión**: Tiempo ilimitado
- **Enfoque**: Aprende a tu ritmo

## ⭐ Características

### Sistema de Jugador
- ❤️ Sistema de vida (5 vidas)
- ⚡ Sistema de XP y niveles
- 🔥 Sistema de combo (multiplicador de daño y XP)
- 📊 Puntuación en tiempo real

### Enemigos
- 🔥 TERMOFUEGO - Nivel 1
- ❄️ GLACIUS - Nivel 1
- ⚡ CONVERTOR-X - Nivel 2
- ⚖️ EQUILIBRIUM - Nivel 2
- 🌡️ CELSIUS MASTER - Nivel 3
- 🔥‍❄️ FAHRENHEIT LORD - Nivel 3
- 🧊 KELVIN SUPREMO - Nivel 4
- 🤖 TERMINATOR-Z - Nivel 4
- ☀️ SOLAR FLARE - Nivel 5
- ❄️‍⚡ ABSOLUTE ZERO - Nivel 5

### Potenciadores (Power-ups)
- 🛡️ **Escudo**: Protege de 1 daño (3 disponibles)
- 2️⃣ **Doble Daño**: Próximo ataque hace 2x daño (2 disponibles)
- ⏰ **+15s**: Suma 15 segundos al tiempo (2 disponibles)

### Logros Desbloqueables
- 🎮 Primer Intento
- 🔥 Combo x5
- 🔥🔥 Combo x10
- ⭐ Nivel 5
- ⭐⭐ Nivel 10
- 💯 Juego Perfecto
- 🗺️ Explorador (Superar los primeros 5 mapas)
- 🌟 Maestro del mapa (Superar 10 mapas)
- 👑 Leyenda absoluta (Completar los 15 mapas)
- 🧠 Mente térmica (Conseguir 50 respuestas correctas)
- 🏆 Campeón (Vencer todos los bosses)
- 🏃 Velocidad (1000 puntos en arcade)

### Ranking Global
- 📊 Leaderboard por modo (Campaña, Arcade, Práctica)
- 🏆 Top 100 puntuaciones guardadas
- 📈 Estadísticas personales

### Ajustes
- 🎨 **Temas**: Oscuro, Claro, Neón, Clásico, Cyberpunk, Natural, Futurista y Retro
- 🔊 **Sonido**: Activable/Desactivable
- ✨ **Efectos Visuales**: Activable/Desactivable
- 🔄 **Resetear Progreso**: Borrar todo y empezar de nuevo

## 🔄 Conversiones Soportadas

### C ↔ F
- °F = (°C × 9/5) + 32
- °C = (°F - 32) × 5/9

### C ↔ K
- K = °C + 273.15
- °C = K - 273.15

### F ↔ K
- K = (°F - 32) × 5/9 + 273.15
- °F = (K - 273.15) × 9/5 + 32

## 📊 Mecánica de Puntuación

### Aciertos
- **Base**: 100 XP
- **Bonus Combo**: 10 XP × combo
- **Puntuación**: 1.5x el XP ganado
- **Combo x2**: Daño +50%, XP +25%

### Enemigos Derrotados
- **Bonus**: 500 + (combo × 50)
- **Bonus Arcade**: Sin bonus extra (flujo continuo)

### Dificultad Progresiva
- Cada nivel aumenta la dificultad
- Tolerancia de respuesta baja (±0.75)
- Preguntas con números aleatorios (10-100)

## 💾 Persistencia
- **LocalStorage**: Todos los datos se guardan automáticamente
- **Leaderboard**: Top 100 por modo
- **Estadísticas**: Total de juegos, score, aciertos, errores
- **Ajustes**: Tema, sonido, dificultad predeterminada
- **Logros**: Desbloqueos permanentes

## 🚀 Cómo Jugar

1. Abre `pro/index.html` en tu navegador
2. Selecciona un modo (Campaña, Arcade, Práctica)
3. Lee la pregunta y escribe la respuesta
4. Presiona "ATACAR" o Enter
5. ¡Gana puntos y logros!

## 🎨 Interfaz
- Menú principal intuitivo
- Pantallas bien diferenciadas
- HUD en tiempo real
- Feedback visual y auditivo
- Animaciones suaves
- Responsive en móvil

## 🔊 Audio
- Efectos de sonido con Web Audio API
- Tonos para éxito, error, combo, victoria
- Activable/Desactivable en ajustes
- Genera ondas de sonido en tiempo real

## 📱 Responsivo
- Adaptado para escritorio
- Soporte para tablet
- Interfaz móvil amigable

## 🎯 Objetivos
- ✅ Vencer todos los 30 bosses en campaña
- ✅ Obtener los 12 logros disponibles
- ✅ Llegar al nivel máximo
- ✅ Obtener la puntuación más alta en arcade
- ✅ Completar un juego perfecto (sin errores)

## 📝 Notas Técnicas
- HTML5 + CSS3 + JavaScript Vanilla
- Almacenamiento con LocalStorage API
- Audio con Web Audio API
- Sin dependencias externas
- Totalmente autocontenido

---

**Versión**: 1.0 PRO  
**Estado**: Completo y funcional  
**Última actualización**: 2024  

¡Diviértete jugando! 🎮

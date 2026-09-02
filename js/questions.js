// GENERADOR DE PREGUNTAS
const QuestionGenerator = {
  maps: [
    {
      id: 0,
      name: '🌋 Volcán Ardiente',
      desc: 'Tierra de fuego y calor extremo',
      className: 'volcano',
      bosses: [
        { id: 1, name: '🔥 TERMOFUEGO', desc: 'Guardián del fuego ardiente', hp: 100, level: 1 },
        { id: 2, name: '🌋 MAGMA KING', desc: 'Señor de la lava hirviente', hp: 150, level: 2 }
      ]
    },
    {
      id: 1,
      name: '❄️ Polo Helado',
      desc: 'Región congelada y glacial',
      className: 'frozen',
      bosses: [
        { id: 3, name: '❄️ GLACIUS', desc: 'Maestro del frío absoluto', hp: 120, level: 1 },
        { id: 4, name: '🧊 ICE TITAN', desc: 'Titán del hielo eterno', hp: 170, level: 2 }
      ]
    },
    {
      id: 2,
      name: '⚡ Tormenta Eléctrica',
      desc: 'Descargas de energía pura',
      className: 'storm',
      bosses: [
        { id: 5, name: '⚡ CONVERTOR-X', desc: 'Cyborg de conversión', hp: 140, level: 2 },
        { id: 6, name: '🌩️ VOLT MASTER', desc: 'Amo de la energía', hp: 180, level: 3 }
      ]
    },
    {
      id: 3,
      name: '🏜️ Desierto Infinito',
      desc: 'Arena ardiente y dunas eternas',
      className: 'desert',
      bosses: [
        { id: 7, name: '☀️ SOLAR BLAZE', desc: 'Llama solar del desierto', hp: 130, level: 2 },
        { id: 8, name: '🌞 SUN GUARDIAN', desc: 'Guardián del calor eterno', hp: 190, level: 3 }
      ]
    },
    {
      id: 4,
      name: '🧪 Laboratorio Científico',
      desc: 'Centro de precisión térmica',
      className: 'lab',
      bosses: [
        { id: 9, name: '🌡️ CELSIUS MASTER', desc: 'Señor de la escala Celsius', hp: 180, level: 3 },
        { id: 10, name: '🔬 SCIENTIST PRIME', desc: 'Mente científica pura', hp: 210, level: 4 }
      ]
    },
    {
      id: 5,
      name: '🌌 Espacio Profundo',
      desc: 'Vacío helado del universo',
      className: 'space',
      bosses: [
        { id: 11, name: '🚀 COSMO FREEZE', desc: 'Cazador galáctico', hp: 200, level: 3 },
        { id: 12, name: '🛸 ALIEN CONVERTER', desc: 'Extraterrestre convertidor', hp: 240, level: 4 }
      ]
    },
    {
      id: 6,
      name: '🏔️ Montaña Mística',
      desc: 'Picos de temperaturas extremas',
      className: 'mountain',
      bosses: [
        { id: 13, name: '⛰️ PEAK LORD', desc: 'Señor de las alturas', hp: 160, level: 2 },
        { id: 14, name: '🏔️ ALPINE KING', desc: 'Rey de la montaña', hp: 220, level: 4 }
      ]
    },
    {
      id: 7,
      name: '🌊 Océano Profundo',
      desc: 'Abismo marino congelado',
      className: 'ocean',
      bosses: [
        { id: 15, name: '🐙 DEPTH GUARDIAN', desc: 'Guardián de las profundidades', hp: 170, level: 3 },
        { id: 16, name: '🌊 AQUA THERMOS', desc: 'Titán de las aguas', hp: 250, level: 4 }
      ]
    },
    {
      id: 8,
      name: '🔥‍❄️ Portal Bifurcado',
      desc: 'Choque de fuego y hielo',
      className: 'portal',
      bosses: [
        { id: 17, name: '🔥‍❄️ DUALITY BEAST', desc: 'Bestia del equilibrio', hp: 190, level: 3 },
        { id: 18, name: '⚖️ EQUILIBRIUM PRIME', desc: 'Balance perfecto', hp: 260, level: 5 }
      ]
    },
    {
      id: 9,
      name: '🤖 Fábrica Futura',
      desc: 'Máquinas de conversión avanzada',
      className: 'factory',
      bosses: [
        { id: 19, name: '🤖 TERMINATOR-Z', desc: 'Máquina perfecta', hp: 240, level: 4 },
        { id: 20, name: '🦾 SUPER CONVERTER', desc: 'Súper convertidor mecánico', hp: 280, level: 5 }
      ]
    },
    {
      id: 10,
      name: '🌲 Bosque Termal',
      desc: 'Ecosistema de temperaturas cambiantes',
      className: 'forest',
      bosses: [
        { id: 21, name: '🌿 THERMO DRUID', desc: 'Guardián del equilibrio natural', hp: 260, level: 5 },
        { id: 22, name: '🌳 GAIA PRIME', desc: 'Fuerza térmica de la naturaleza', hp: 300, level: 6 }
      ]
    },
    {
      id: 11,
      name: '🏙️ Ciudad Celsius',
      desc: 'Rascacielos llenos de desafíos térmicos',
      className: 'city',
      bosses: [
        { id: 23, name: '🚦 METRO HEAT', desc: 'Controlador del tráfico térmico', hp: 280, level: 5 },
        { id: 24, name: '🏢 URBAN CORE', desc: 'Núcleo de energía de la ciudad', hp: 320, level: 6 }
      ]
    },
    {
      id: 12,
      name: '☢️ Reactor Nuclear',
      desc: 'Sala de energía y precisión absoluta',
      className: 'reactor',
      bosses: [
        { id: 25, name: '☢️ ATOM FLUX', desc: 'Flujo de calor radiante', hp: 300, level: 6 },
        { id: 26, name: '⚛️ CRITICAL MASS', desc: 'La prueba final de exactitud', hp: 340, level: 7 }
      ]
    },
    {
      id: 13,
      name: '🧭 Dimensión Cero',
      desc: 'Un espacio donde las escalas pierden sentido',
      className: 'dimension',
      bosses: [
        { id: 27, name: '🌀 NULL POINT', desc: 'Maestro de los valores imposibles', hp: 320, level: 6 },
        { id: 28, name: '🧿 ZERO ABSOLUTE', desc: 'Señor del límite térmico', hp: 360, level: 7 }
      ]
    },
    {
      id: 14,
      name: '👑 Torre Absoluta',
      desc: 'La cima donde solo vence la exactitud',
      className: 'tower',
      bosses: [
        { id: 29, name: '⚔️ SCALE BREAKER', desc: 'Destructor de conversiones', hp: 340, level: 7 },
        { id: 30, name: '👑 ABSOLUTE KING', desc: 'Jefe supremo de las escalas', hp: 400, level: 8 }
      ]
    }
  ],

  getMapBosses(mapIndex) {
    return this.maps[mapIndex % this.maps.length].bosses;
  },

  getMapInfo(mapIndex) {
    return this.maps[mapIndex % this.maps.length];
  },

  getBoss(mapIndex, bossIndex) {
    const bosses = this.getMapBosses(mapIndex);
    return bosses[bossIndex % bosses.length];
  },

  patterns: {
    'C-F': [
      { type: 'C->F', formula: '°F = (°C × 9/5) + 32' },
      { type: 'F->C', formula: '°C = (°F - 32) × 5/9' }
    ],
    'C-K': [
      { type: 'C->K', formula: 'K = °C + 273.15' },
      { type: 'K->C', formula: '°C = K - 273.15' }
    ],
    'F-K': [
      { type: 'F->K', formula: 'K = (°F - 32) × 5/9 + 273.15' },
      { type: 'K->F', formula: '°F = (K - 273.15) × 9/5 + 32' }
    ],
    'ALL': []
  },

  createQuestion(difficulty = 1, conversionType = 'ALL') {
    const value = Math.floor(Math.random() * (80 + difficulty * 20)) + (10 + difficulty * 5);
    let pattern;

    if (conversionType === 'ALL') {
      const types = ['C-F', 'C-K', 'F-K'];
      const selectedType = types[Math.floor(Math.random() * types.length)];
      const patterns = this.patterns[selectedType];
      pattern = patterns[Math.floor(Math.random() * patterns.length)];
    } else {
      const patterns = this.patterns[conversionType];
      pattern = patterns[Math.floor(Math.random() * patterns.length)];
    }

    let question, answer, type;

    if (pattern.type === 'C->F') {
      question = `Convierte ${value}°C a °F`;
      answer = value * 9 / 5 + 32;
      type = 'C->F';
    } else if (pattern.type === 'F->C') {
      question = `Convierte ${value}°F a °C`;
      answer = (value - 32) * 5 / 9;
      type = 'F->C';
    } else if (pattern.type === 'C->K') {
      question = `Convierte ${value}°C a K`;
      answer = value + 273.15;
      type = 'C->K';
    } else if (pattern.type === 'K->C') {
      question = `Convierte ${value}K a °C`;
      answer = value - 273.15;
      type = 'K->C';
    } else if (pattern.type === 'F->K') {
      question = `Convierte ${value}°F a K`;
      answer = (value - 32) * 5 / 9 + 273.15;
      type = 'F->K';
    } else if (pattern.type === 'K->F') {
      question = `Convierte ${value}K a °F`;
      answer = (value - 273.15) * 9 / 5 + 32;
      type = 'K->F';
    }

    return {
      text: question,
      answer: Math.round(answer * 100) / 100,
      formula: pattern.formula,
      type: type,
      value: value,
      difficulty: difficulty
    };
  },

  getDetailedTip(question) {
    const value = question.value;
    const guides = {
      'C->F': `💡 GUÍA CELSIUS → FAHRENHEIT\nFórmula: °F = (°C × 9/5) + 32\nPaso 1: ${value} × 9 = ${value * 9}\nPaso 2: ${value * 9} ÷ 5 = ${(value * 9 / 5).toFixed(2)}\nPaso 3: ${(value * 9 / 5).toFixed(2)} + 32 = ${question.answer.toFixed(2)} °F\nRecomendación: respeta el orden: multiplica y divide antes de sumar 32. Comprueba que 0°C se transforma en 32°F.`,
      'F->C': `💡 GUÍA FAHRENHEIT → CELSIUS\nFórmula: °C = (°F - 32) × 5/9\nPaso 1: ${value} - 32 = ${value - 32}\nPaso 2: ${value - 32} × 5 = ${(value - 32) * 5}\nPaso 3: ${(value - 32) * 5} ÷ 9 = ${question.answer.toFixed(2)} °C\nRecomendación: resta 32 antes de multiplicar. Como referencia, 32°F equivale a 0°C y 212°F a 100°C.`,
      'C->K': `💡 GUÍA CELSIUS → KELVIN\nFórmula: K = °C + 273.15\nPaso 1: toma el valor Celsius, ${value}°C\nPaso 2: suma el desplazamiento absoluto: ${value} + 273.15\nResultado: ${question.answer.toFixed(2)} K\nRecomendación: Kelvin no lleva símbolo de grado. En esta conversión solo sumas 273.15; no multipliques ni restes.`,
      'K->C': `💡 GUÍA KELVIN → CELSIUS\nFórmula: °C = K - 273.15\nPaso 1: toma ${value} K\nPaso 2: resta el desplazamiento: ${value} - 273.15\nResultado: ${question.answer.toFixed(2)} °C\nRecomendación: esta operación es la inversa de Celsius a Kelvin. Si obtienes 273.15 K, el resultado debe ser exactamente 0°C.`,
      'F->K': `💡 GUÍA FAHRENHEIT → KELVIN\nFórmula: K = (°F - 32) × 5/9 + 273.15\nPaso 1: convierte primero a Celsius: (${value} - 32) × 5/9 = ${((value - 32) * 5 / 9).toFixed(2)}°C\nPaso 2: pasa Celsius a Kelvin: ${((value - 32) * 5 / 9).toFixed(2)} + 273.15 = ${question.answer.toFixed(2)} K\nRecomendación: divide el problema en dos conversiones. Nunca sumes 273.15 antes de quitar los 32°F.`,
      'K->F': `💡 GUÍA KELVIN → FAHRENHEIT\nFórmula: °F = (K - 273.15) × 9/5 + 32\nPaso 1: convierte a Celsius: ${value} - 273.15 = ${(value - 273.15).toFixed(2)}°C\nPaso 2: convierte a Fahrenheit: ${(value - 273.15).toFixed(2)} × 9/5 + 32 = ${question.answer.toFixed(2)} °F\nRecomendación: primero resta 273.15, después aplica 9/5 y al final suma 32. Verifica con 273.15K = 32°F.`
    };

    return guides[question.type] || guides['C->F'];
  },

  validateAnswer(submitted, correct, difficulty = 1) {
    const tolerance = 0.75 + (difficulty * 0.1);
    return Math.abs(submitted - correct) <= tolerance;
  }
};

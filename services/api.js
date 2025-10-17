// API Service para aplicación de gimnasio
// Datos de ejercicios organizados por categorías

const EXERCISE_CATEGORIES = [
  {
    idCategory: '1',
    strCategory: 'Pecho',
    strCategoryThumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    strCategoryDescription: 'Ejercicios para desarrollar el pecho y la parte superior del cuerpo'
  },
  {
    idCategory: '2',
    strCategory: 'Espalda',
    strCategoryThumb: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400',
    strCategoryDescription: 'Fortalece tu espalda y mejora tu postura'
  },
  {
    idCategory: '3',
    strCategory: 'Piernas',
    strCategoryThumb: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400',
    strCategoryDescription: 'Desarrolla fuerza y volumen en tus piernas'
  },
  {
    idCategory: '4',
    strCategory: 'Hombros',
    strCategoryThumb: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=400',
    strCategoryDescription: 'Ejercicios para hombros fuertes y definidos'
  },
  {
    idCategory: '5',
    strCategory: 'Brazos',
    strCategoryThumb: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400',
    strCategoryDescription: 'Tonifica y aumenta la masa muscular de tus brazos'
  },
  {
    idCategory: '6',
    strCategory: 'Abdomen',
    strCategoryThumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    strCategoryDescription: 'Core fuerte y abdominales definidos'
  },
  {
    idCategory: '7',
    strCategory: 'Cardio',
    strCategoryThumb: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400',
    strCategoryDescription: 'Mejora tu resistencia cardiovascular'
  },
  {
    idCategory: '8',
    strCategory: 'Full Body',
    strCategoryThumb: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    strCategoryDescription: 'Entrenamientos de cuerpo completo'
  }
];

const EXERCISES = {
  'Pecho': [
    {
      idMeal: 'ex1',
      strMeal: 'Press de Banca',
      strMealThumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      strCategory: 'Pecho',
      strArea: 'Fuerza',
      strInstructions: '1. Acuéstate en un banco plano con los pies en el suelo\n2. Agarra la barra con las manos un poco más anchas que los hombros\n3. Baja la barra hasta el pecho de forma controlada\n4. Empuja la barra hacia arriba hasta extender los brazos\n5. Repite el movimiento',
      strIngredient1: 'Banco plano',
      strIngredient2: 'Barra olímpica',
      strIngredient3: 'Discos de peso',
      strIngredient4: 'Clips de seguridad',
    },
    {
      idMeal: 'ex2',
      strMeal: 'Flexiones',
      strMealThumb: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400',
      strCategory: 'Pecho',
      strArea: 'Peso Corporal',
      strInstructions: '1. Colócate en posición de plancha\n2. Mantén el cuerpo recto\n3. Baja el pecho hacia el suelo doblando los codos\n4. Empuja hacia arriba hasta la posición inicial\n5. Repite el movimiento',
      strIngredient1: 'Colchoneta (opcional)',
      strIngredient2: '',
      strIngredient3: '',
    },
    {
      idMeal: 'ex3',
      strMeal: 'Aperturas con Mancuernas',
      strMealThumb: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400',
      strCategory: 'Pecho',
      strArea: 'Fuerza',
      strInstructions: '1. Acuéstate en un banco con una mancuerna en cada mano\n2. Extiende los brazos sobre el pecho\n3. Baja las mancuernas en un arco amplio\n4. Siente el estiramiento en el pecho\n5. Regresa a la posición inicial',
      strIngredient1: 'Banco plano o inclinado',
      strIngredient2: 'Mancuernas',
    }
  ],
  'Espalda': [
    {
      idMeal: 'ex4',
      strMeal: 'Dominadas',
      strMealThumb: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400',
      strCategory: 'Espalda',
      strArea: 'Peso Corporal',
      strInstructions: '1. Agarra la barra con las manos más anchas que los hombros\n2. Cuelga con los brazos completamente extendidos\n3. Tira hacia arriba hasta que la barbilla supere la barra\n4. Baja de forma controlada\n5. Repite el movimiento',
      strIngredient1: 'Barra de dominadas',
    },
    {
      idMeal: 'ex5',
      strMeal: 'Remo con Barra',
      strMealThumb: 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=400',
      strCategory: 'Espalda',
      strArea: 'Fuerza',
      strInstructions: '1. Párate con los pies separados al ancho de hombros\n2. Inclínate hacia adelante manteniendo la espalda recta\n3. Agarra la barra con las manos\n4. Tira de la barra hacia el abdomen\n5. Baja de forma controlada',
      strIngredient1: 'Barra olímpica',
      strIngredient2: 'Discos de peso',
    }
  ],
  'Piernas': [
    {
      idMeal: 'ex6',
      strMeal: 'Sentadillas',
      strMealThumb: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400',
      strCategory: 'Piernas',
      strArea: 'Fuerza',
      strInstructions: '1. Coloca la barra sobre tus hombros\n2. Separa los pies al ancho de hombros\n3. Baja flexionando rodillas y caderas\n4. Mantén la espalda recta\n5. Empuja hacia arriba a la posición inicial',
      strIngredient1: 'Rack de sentadillas',
      strIngredient2: 'Barra olímpica',
      strIngredient3: 'Discos de peso',
    },
    {
      idMeal: 'ex7',
      strMeal: 'Peso Muerto',
      strMealThumb: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
      strCategory: 'Piernas',
      strArea: 'Fuerza',
      strInstructions: '1. Párate frente a la barra con los pies separados\n2. Agarra la barra con las manos fuera de las piernas\n3. Mantén la espalda recta y el pecho hacia arriba\n4. Levanta la barra extendiendo caderas y rodillas\n5. Baja de forma controlada',
      strIngredient1: 'Barra olímpica',
      strIngredient2: 'Discos de peso',
    }
  ],
  'Hombros': [
    {
      idMeal: 'ex8',
      strMeal: 'Press Militar',
      strMealThumb: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=400',
      strCategory: 'Hombros',
      strArea: 'Fuerza',
      strInstructions: '1. Párate con los pies al ancho de hombros\n2. Sostén la barra a la altura de los hombros\n3. Empuja la barra hacia arriba sobre la cabeza\n4. Extiende completamente los brazos\n5. Baja de forma controlada',
      strIngredient1: 'Barra olímpica',
      strIngredient2: 'Discos de peso',
      strIngredient3: 'Rack (opcional)',
    },
    {
      idMeal: 'ex9',
      strMeal: 'Elevaciones Laterales',
      strMealThumb: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
      strCategory: 'Hombros',
      strArea: 'Fuerza',
      strInstructions: '1. Párate con una mancuerna en cada mano\n2. Mantén los brazos ligeramente flexionados\n3. Levanta las mancuernas hacia los lados\n4. Sube hasta la altura de los hombros\n5. Baja de forma controlada',
      strIngredient1: 'Mancuernas',
    }
  ],
  'Brazos': [
    {
      idMeal: 'ex10',
      strMeal: 'Curl de Bíceps',
      strMealThumb: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400',
      strCategory: 'Brazos',
      strArea: 'Fuerza',
      strInstructions: '1. Párate con una mancuerna en cada mano\n2. Mantén los codos pegados al cuerpo\n3. Flexiona los brazos llevando las mancuernas hacia los hombros\n4. Contrae el bíceps en la parte superior\n5. Baja de forma controlada',
      strIngredient1: 'Mancuernas',
    },
    {
      idMeal: 'ex11',
      strMeal: 'Extensiones de Tríceps',
      strMealThumb: 'https://images.unsplash.com/photo-1584863231364-2edc166de576?w=400',
      strCategory: 'Brazos',
      strArea: 'Fuerza',
      strInstructions: '1. Acuéstate en un banco con una barra o mancuernas\n2. Extiende los brazos sobre el pecho\n3. Dobla los codos bajando el peso hacia la frente\n4. Extiende los brazos de nuevo\n5. Mantén los codos estables',
      strIngredient1: 'Banco',
      strIngredient2: 'Barra EZ o mancuernas',
    }
  ],
  'Abdomen': [
    {
      idMeal: 'ex12',
      strMeal: 'Plancha',
      strMealThumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
      strCategory: 'Abdomen',
      strArea: 'Peso Corporal',
      strInstructions: '1. Colócate en posición de plancha sobre los antebrazos\n2. Mantén el cuerpo en línea recta\n3. Contrae el abdomen y glúteos\n4. Mantén la posición\n5. Respira normalmente',
      strIngredient1: 'Colchoneta',
    },
    {
      idMeal: 'ex13',
      strMeal: 'Crunches',
      strMealThumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      strCategory: 'Abdomen',
      strArea: 'Peso Corporal',
      strInstructions: '1. Acuéstate boca arriba con las rodillas flexionadas\n2. Coloca las manos detrás de la cabeza\n3. Levanta los hombros del suelo contrayendo el abdomen\n4. Mantén la contracción\n5. Baja de forma controlada',
      strIngredient1: 'Colchoneta',
    }
  ],
  'Cardio': [
    {
      idMeal: 'ex14',
      strMeal: 'Burpees',
      strMealThumb: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400',
      strCategory: 'Cardio',
      strArea: 'Peso Corporal',
      strInstructions: '1. Comienza de pie\n2. Baja a posición de sentadilla\n3. Coloca las manos en el suelo y salta hacia atrás a plancha\n4. Haz una flexión\n5. Salta hacia adelante y salta verticalmente',
      strIngredient1: 'Espacio abierto',
    },
    {
      idMeal: 'ex15',
      strMeal: 'Mountain Climbers',
      strMealThumb: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400',
      strCategory: 'Cardio',
      strArea: 'Peso Corporal',
      strInstructions: '1. Comienza en posición de plancha\n2. Lleva una rodilla hacia el pecho\n3. Alterna rápidamente las piernas\n4. Mantén el core contraído\n5. Mantén un ritmo constante',
      strIngredient1: 'Colchoneta',
    }
  ],
  'Full Body': [
    {
      idMeal: 'ex16',
      strMeal: 'Thruster',
      strMealThumb: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      strCategory: 'Full Body',
      strArea: 'Fuerza',
      strInstructions: '1. Sostén una barra a la altura de los hombros\n2. Baja a sentadilla profunda\n3. Al subir, empuja la barra sobre la cabeza\n4. Combina sentadilla con press de hombros\n5. Mantén el core contraído',
      strIngredient1: 'Barra olímpica',
      strIngredient2: 'Discos de peso',
    },
    {
      idMeal: 'ex17',
      strMeal: 'Kettlebell Swing',
      strMealThumb: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400',
      strCategory: 'Full Body',
      strArea: 'Fuerza',
      strInstructions: '1. Párate con los pies separados\n2. Sostén una kettlebell con ambas manos\n3. Balancea la kettlebell entre las piernas\n4. Impulsa con las caderas para balancear hacia arriba\n5. Controla el descenso',
      strIngredient1: 'Kettlebell',
    }
  ]
};

const SUPPLEMENTS = [
  {
    id: 'sup1',
    name: 'Proteína Whey Isolate',
    brand: 'Premium Nutrition',
    price: 45.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d6d6ec5?w=400',
    description: 'Proteína de suero aislada de alta calidad con 90% de proteína pura',
    category: 'Proteínas',
    stock: true
  },
  {
    id: 'sup2',
    name: 'Creatina Monohidratada',
    brand: 'Power Supplements',
    price: 29.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',
    description: 'Creatina pura micronizada para mayor fuerza y rendimiento',
    category: 'Pre-Entrenamiento',
    stock: true
  },
  {
    id: 'sup3',
    name: 'BCAA 2:1:1',
    brand: 'Elite Fitness',
    price: 34.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1526401281623-4f2d8d6e88d8?w=400',
    description: 'Aminoácidos ramificados para recuperación muscular',
    category: 'Recuperación',
    stock: true
  },
  {
    id: 'sup4',
    name: 'Pre-Workout Extreme',
    brand: 'Beast Mode',
    price: 39.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400',
    description: 'Fórmula potente para energía y concentración extrema',
    category: 'Pre-Entrenamiento',
    stock: true
  },
  {
    id: 'sup5',
    name: 'Multivitamínico Completo',
    brand: 'Health Plus',
    price: 24.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    description: 'Complejo vitamínico y mineral para salud óptima',
    category: 'Vitaminas',
    stock: true
  },
  {
    id: 'sup6',
    name: 'Omega 3 Fish Oil',
    brand: 'Pure Wellness',
    price: 19.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1550572017-4a4a3b250c90?w=400',
    description: 'Aceite de pescado rico en EPA y DHA para salud cardiovascular',
    category: 'Vitaminas',
    stock: true
  },
  {
    id: 'sup7',
    name: 'Glutamina en Polvo',
    brand: 'Recovery Pro',
    price: 27.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400',
    description: 'L-Glutamina para recuperación y salud intestinal',
    category: 'Recuperación',
    stock: true
  },
  {
    id: 'sup8',
    name: 'Proteína Vegana',
    brand: 'Plant Power',
    price: 42.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1594579177000-75ddaa5a21d1?w=400',
    description: 'Mezcla de proteínas vegetales de guisante, arroz y hemp',
    category: 'Proteínas',
    stock: true
  },
  {
    id: 'sup9',
    name: 'Quemador de Grasa',
    brand: 'Fat Burner Pro',
    price: 36.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
    description: 'Termogénico natural con extractos de té verde y cafeína',
    category: 'Pérdida de Peso',
    stock: true
  },
  {
    id: 'sup10',
    name: 'Ganador de Masa',
    brand: 'Mass Gainer',
    price: 54.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534412954-935a8a6f0bd9?w=400',
    description: 'Alto en calorías y proteínas para ganar masa muscular',
    category: 'Proteínas',
    stock: false
  }
];

class GymAPI {
  // Simula un delay de red
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Obtener todas las categorías de ejercicios
  async getCategories() {
    await this.delay();
    return EXERCISE_CATEGORIES;
  }

  // Obtener ejercicios por categoría
  async getMealsByCategory(category) {
    await this.delay();
    return EXERCISES[category] || [];
  }

  // Obtener detalle de un ejercicio
  async getMealById(id) {
    await this.delay();
    
    // Buscar en todas las categorías
    for (const category in EXERCISES) {
      const exercise = EXERCISES[category].find(ex => ex.idMeal === id);
      if (exercise) {
        return exercise;
      }
    }
    
    return null;
  }

  // Buscar ejercicios por nombre
  async searchMeals(query) {
    await this.delay();
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    for (const category in EXERCISES) {
      const filtered = EXERCISES[category].filter(ex => 
        ex.strMeal.toLowerCase().includes(lowerQuery)
      );
      results.push(...filtered);
    }
    
    return results;
  }

  // Obtener todos los suplementos
  async getSupplements() {
    await this.delay();
    return SUPPLEMENTS;
  }

  // Obtener suplementos por categoría
  async getSupplementsByCategory(category) {
    await this.delay();
    return SUPPLEMENTS.filter(sup => sup.category === category);
  }

  // Buscar suplementos
  async searchSupplements(query) {
    await this.delay();
    const lowerQuery = query.toLowerCase();
    return SUPPLEMENTS.filter(sup => 
      sup.name.toLowerCase().includes(lowerQuery) ||
      sup.brand.toLowerCase().includes(lowerQuery) ||
      sup.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Obtener categorías de suplementos
  async getSupplementCategories() {
    await this.delay();
    const categories = [...new Set(SUPPLEMENTS.map(sup => sup.category))];
    return categories.map(cat => ({ name: cat }));
  }
}

export const mealAPI = new GymAPI();
export const gymAPI = new GymAPI();

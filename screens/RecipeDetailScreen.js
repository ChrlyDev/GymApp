import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';
import { mealAPI } from '../services/api';
import favoritesService from '../services/favoritesService';

const { width } = Dimensions.get('window');

const RecipeDetailScreen = ({ route, navigation }) => {
  const { mealId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    fetchRecipeDetails();
    checkFavoriteStatus();
  }, [mealId]);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const data = await mealAPI.getMealById(mealId);
      setRecipe(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los detalles del ejercicio');
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const favoriteStatus = await favoritesService.isFavorite(mealId);
      setIsFavorite(favoriteStatus);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!recipe) return;
    
    try {
      setFavoriteLoading(true);
      const newFavoriteStatus = await favoritesService.toggleFavorite(recipe);
      setIsFavorite(newFavoriteStatus);
      
      Alert.alert(
        'Éxito',
        newFavoriteStatus 
          ? 'Ejercicio agregado a favoritos' 
          : 'Ejercicio eliminado de favoritos'
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar favoritos');
    } finally {
      setFavoriteLoading(false);
    }
  };

  const getEquipment = () => {
    if (!recipe) return [];
    
    const equipment = [];
    for (let i = 1; i <= 20; i++) {
      const item = recipe[`strIngredient${i}`];
      
      if (item && item.trim()) {
        equipment.push(item.trim());
      }
    }
    return equipment;
  };

  const openYouTube = () => {
    if (recipe.strYoutube) {
      Linking.openURL(recipe.strYoutube);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E74C3C" />
        <Text style={styles.loadingText}>Cargando ejercicio...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se pudo cargar el ejercicio</Text>
      </View>
    );
  }

  const equipment = getEquipment();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          disabled={favoriteLoading}
        >
          <Text style={styles.favoriteButtonText}>
            {favoriteLoading ? '...' : (isFavorite ? '❤️' : '🤍')}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Categoría</Text>
            <Text style={styles.infoValue}>{recipe.strCategory}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tipo</Text>
            <Text style={styles.infoValue}>{recipe.strArea}</Text>
          </View>
        </View>

        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>💪 Nivel: Intermedio</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipamiento Necesario</Text>
          {equipment.map((item, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>
                • {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instrucciones</Text>
          <Text style={styles.instructionsText}>{recipe.strInstructions}</Text>
        </View>

        <View style={styles.recommendationsBox}>
          <Text style={styles.recommendationTitle}>💡 Recomendaciones</Text>
          <Text style={styles.recommendationText}>
            • Realiza un calentamiento antes de comenzar{"\n"}
            • Mantén una buena técnica en todo momento{"\n"}
            • Descansa entre series adecuadamente{"\n"}
            • Hidrátate durante el entrenamiento
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  imageContainer: {
    position: 'relative',
  },
  recipeImage: {
    width: width,
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonText: {
    fontSize: 24,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
  },
  difficultyBadge: {
    backgroundColor: '#3498DB',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  difficultyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendationsBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 15,
    color: '#7F8C8D',
    lineHeight: 24,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#E74C3C',
    paddingBottom: 5,
  },
  ingredientItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  instructionsText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sourceButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  sourceButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default RecipeDetailScreen;

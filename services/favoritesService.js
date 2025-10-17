import { database } from '../config/firebase';
import { ref, set, get, remove, push, onValue, off } from 'firebase/database';

class FavoritesService {
  constructor() {
    this.favoritesRef = ref(database, 'favorites');
  }

  // Add an exercise to favorites
  async addToFavorites(exercise) {
    try {
      const favoriteData = {
        idMeal: exercise.idMeal,
        strMeal: exercise.strMeal,
        strMealThumb: exercise.strMealThumb,
        strCategory: exercise.strCategory,
        strArea: exercise.strArea,
        dateAdded: new Date().toISOString(),
      };

      const favoriteRef = ref(database, `favorites/${exercise.idMeal}`);
      await set(favoriteRef, favoriteData);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  // Remove an exercise from favorites
  async removeFromFavorites(exerciseId) {
    try {
      const favoriteRef = ref(database, `favorites/${exerciseId}`);
      await remove(favoriteRef);
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  // Check if an exercise is in favorites
  async isFavorite(exerciseId) {
    try {
      const favoriteRef = ref(database, `favorites/${exerciseId}`);
      const snapshot = await get(favoriteRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Get all favorites
  async getAllFavorites() {
    try {
      const snapshot = await get(this.favoritesRef);
      if (snapshot.exists()) {
        const favoritesData = snapshot.val();
        return Object.values(favoritesData).sort((a, b) => 
          new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      }
      return [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  // Listen to favorites changes in real-time
  onFavoritesChange(callback) {
    const unsubscribe = onValue(this.favoritesRef, (snapshot) => {
      if (snapshot.exists()) {
        const favoritesData = snapshot.val();
        const favorites = Object.values(favoritesData).sort((a, b) => 
          new Date(b.dateAdded) - new Date(a.dateAdded)
        );
        callback(favorites);
      } else {
        callback([]);
      }
    });

    return unsubscribe;
  }

  // Stop listening to favorites changes
  offFavoritesChange() {
    off(this.favoritesRef);
  }

  // Toggle favorite status
  async toggleFavorite(exercise) {
    try {
      const isCurrentlyFavorite = await this.isFavorite(exercise.idMeal);
      
      if (isCurrentlyFavorite) {
        await this.removeFromFavorites(exercise.idMeal);
        return false;
      } else {
        await this.addToFavorites(exercise);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }
}

export default new FavoritesService();

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  Dimensions,
  ScrollView
} from 'react-native';
import { gymAPI } from '../services/api';
import { Footer } from '../components/footer';
import Feather from '@expo/vector-icons/Feather';

const { width } = Dimensions.get('window');

const SupplementsScreen = ({ navigation }) => {
  const [supplements, setSupplements] = useState([]);
  const [filteredSupplements, setFilteredSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    fetchSupplements();
  }, []);

  useEffect(() => {
    filterSupplements();
  }, [searchQuery, selectedCategory, supplements]);

  const fetchSupplements = async () => {
    try {
      setLoading(true);
      const data = await gymAPI.getSupplements();
      setSupplements(data);
      setFilteredSupplements(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los suplementos');
    } finally {
      setLoading(false);
    }
  };

  const filterSupplements = () => {
    let filtered = supplements;

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(sup => sup.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(sup =>
        sup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sup.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSupplements(filtered);
  };

  const categories = ['Todos', 'Proteínas', 'Pre-Entrenamiento', 'Recuperación', 'Vitaminas', 'Pérdida de Peso'];

  const renderSupplement = ({ item }) => (
    <View style={styles.supplementCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.supplementImage}
        resizeMode="cover"
      />
      <View style={styles.supplementInfo}>
        <Text style={styles.supplementBrand}>{item.brand}</Text>
        <Text style={styles.supplementName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.supplementDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.priceRatingContainer}>
          <Text style={styles.supplementPrice}>${item.price}</Text>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color="#F39C12" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.stockContainer}>
          {item.stock ? (
            <View style={styles.inStock}>
              <Feather name="check-circle" size={14} color="#27AE60" />
              <Text style={styles.stockText}>En Stock</Text>
            </View>
          ) : (
            <View style={styles.outOfStock}>
              <Feather name="x-circle" size={14} color="#E74C3C" />
              <Text style={styles.stockTextOut}>Agotado</Text>
            </View>
          )}
        </View>
        <TouchableOpacity 
          style={[styles.addButton, !item.stock && styles.addButtonDisabled]}
          disabled={!item.stock}
        >
          <Feather name="shopping-cart" size={16} color="white" />
          <Text style={styles.addButtonText}>
            {item.stock ? 'Agregar al Carrito' : 'No Disponible'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E74C3C" />
        <Text style={styles.loadingText}>Cargando suplementos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Tienda de Suplementos</Text>
        <Text style={styles.subtitle}>Encuentra los mejores suplementos</Text>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar suplementos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.categoryTabActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === category && styles.categoryTabTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredSupplements.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="package" size={64} color="#BDC3C7" />
          <Text style={styles.emptyText}>
            {searchQuery ? 'No se encontraron suplementos' : 'No hay suplementos disponibles'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredSupplements}
          renderItem={renderSupplement}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#E74C3C',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    opacity: 0.9,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  categoriesScroll: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ECF0F1',
    marginHorizontal: 5,
  },
  categoryTabActive: {
    backgroundColor: '#E74C3C',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  categoryTabTextActive: {
    color: 'white',
  },
  listContainer: {
    padding: 15,
  },
  supplementCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  supplementImage: {
    width: '100%',
    height: 200,
  },
  supplementInfo: {
    padding: 15,
  },
  supplementBrand: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '600',
    marginBottom: 4,
  },
  supplementName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  supplementDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 12,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  supplementPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  stockContainer: {
    marginBottom: 15,
  },
  inStock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  outOfStock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stockText: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '600',
  },
  stockTextOut: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  addButtonText: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default SupplementsScreen;

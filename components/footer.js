import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather'

export const Footer = ({ navigation }) => {
    return (
    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Categories")}>
          <Feather name="activity" size={21} color="black" />
          <Text style={styles.footerButtonText}>Rutinas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Supplements")}>
          <Feather name="shopping-bag" size={21} color="black" />
          <Text style={styles.footerButtonText}>Tienda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Favorites")}>
          <Feather name="heart" size={21} color="black" />
          <Text style={styles.footerButtonText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Profile")}>
          <Feather name="user" size={21} color="black" />
          <Text style={styles.footerButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    footer: {
    padding: 5,
    backgroundColor: "#F8F9FA",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1.5,
  },
  footerButton: {
    backgroundColor: "rgba(224, 224, 224, 0.5)",
    width: 75,
    height: 48,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerButtonText: {
    color: "black",
    fontSize: 10,
    fontWeight: "600",
  }
})
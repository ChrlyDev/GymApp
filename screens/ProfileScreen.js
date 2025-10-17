import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Footer } from "../components/footer";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitleText}>Bienvenido al perfil</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.contentText}>
            Nombre:{" "}
            <Text style={styles.contentSubText}>{user?.displayName}</Text>
          </Text>
          <Text style={styles.contentText}>
            Correo: <Text style={styles.contentSubText}>{user?.email}</Text>
          </Text>
          <Text style={styles.contentText}>
            Fecha de creación:{" "}
            <Text style={styles.contentSubText}>
              {new Date(user?.metadata.creationTime).toLocaleDateString()}
            </Text>
          </Text>
          <Text style={styles.contentText}>
            Última actualización:{" "}
            <Text style={styles.contentSubText}>
              {new Date(user?.metadata.lastSignInTime).toLocaleDateString()} {new Date(user?.metadata.lastSignInTime).toLocaleTimeString()}
            </Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerInfoContainer}>
        <Text style={styles.footerInfoText}>
          ID: <Text style={styles.footerInfoSubText}>{user?.uid}</Text>
        </Text>
        <Text style={styles.footerInfoSubText}>
          Copyright © {today.getFullYear()} RecetApp. Todos los derechos reservados.
        </Text>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#E74C3C",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  contentSubText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "400",
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  contentTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  profileInfoContainer: {
    alignItems: "left",
    marginBottom: 10,
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    alignSelf: "center",
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  footerInfoContainer: {
    alignItems: "left",
    marginBottom: 5,
    paddingHorizontal: 10,
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  footerInfoText: {
    fontSize: 10,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  footerInfoSubText: {
    fontSize: 7,
    color: "#64748b",
    fontWeight: "400",
    textAlign: "center",
  },
});

export default ProfileScreen;

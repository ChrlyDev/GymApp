import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Footer } from "../components/footer";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

// ────────────────────────────────────────────────────────────
// Design tokens
// ────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#0e0e0e",
  bg2: "#1e1e1e",
  surface: "rgba(255,255,255,0.12)",
  surfaceStrong: "rgba(255,255,255,0.25)",
  text: "#f2f2f7",
  textMuted: "#b3b3b3",
  textDim: "#ddd",
  chip: "#404040",
  card: "#e3e3e3",
  cardBorder: "#767676",
  navItemBg: "rgba(179,179,179,0.2)",
  navItemBorder: "#444",
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

const RADII = {
  sm: 8,
  md: 12,
  lg: 15,
  xl: 24,
  full: 999,
};

const FONTS = {
  family: "SF Pro",
};

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
    <View style={styles.safe}>
      <LinearGradient
        style={styles.wallpaper}
        colors={["#3a3a3a", COLORS.bg]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <LinearGradient
            style={styles.wallpaper}
            colors={["#414141", "#2c2c2c"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
          />
          <View style={styles.contentContainer}>
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
                  {new Date(user?.metadata.lastSignInTime).toLocaleDateString()}{" "}
                  {new Date(user?.metadata.lastSignInTime).toLocaleTimeString()}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerInfoContainer}>
            <Text style={styles.footerInfoText}>
              ID: <Text style={styles.footerInfoSubText}>{user?.uid}</Text>
            </Text>
            <Text style={styles.footerInfoSubText}>
              Copyright © {today.getFullYear()} GymApp. Todos los derechos
              reservados.
            </Text>
          </View>
        </View>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg2,
  },
  wallpaper: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxl,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
    textAlign: "center",
    fontStyle: "italic",
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
    borderRadius: 25,
    overflow: "hidden",
  },
  contentContainer: {
    height: "100%",
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#ddd",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerInfoText: {
    fontSize: 10,
    color: "#636363ff",
    fontWeight: "600",
    textAlign: "center",
    width: "50%",
  },
  footerInfoSubText: {
    fontSize: 7,
    color: "#64748b",
    fontWeight: "400",
    textAlign: "center",
    width: "50%",
  },
  navWrapper: {
    paddingTop: SPACING.lg,
  },
});

export default ProfileScreen;

// LoginScreen.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario ya está autenticado, redirigir a Categories
        navigation.replace("Categories");
      }
      setInitializing(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe;
  }, []);

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("El correo electrónico es obligatorio");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Introduce un correo electrónico válido");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      return false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = () => {
    // Validar los campos antes de proceder
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.replace("Categories");
      })
      .catch((error) => {
        // Traducción de errores comunes de Firebase para una mejor UX
        let errorMessage;
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage =
              "No existe ninguna cuenta con este correo electrónico";
            break;
          case "auth/wrong-password":
            errorMessage = "Contraseña incorrecta";
            break;
          case "auth/too-many-requests":
            errorMessage = "Demasiados intentos fallidos. Inténtalo más tarde";
            break;
          default:
            errorMessage = error.message;
        }
        Alert.alert("Error", errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Muestra un spinner mientras se verifica el estado de autenticación
  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E74C3C" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      }}
      style={styles.backgroundImage}
      blurRadius={3}
    >
      <View style={styles.overlay} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Título Principal */}
          <Text style={styles.appTitle}>GYM APP.</Text>

          <View style={styles.containerFormText}>
            {/* Texto Vertical "Iniciar Sesión" */}
            <View style={styles.verticalTextContainer}>
              <Text numberOfLines={1} style={styles.verticalText}>Iniciar Sesión</Text>
            </View>

            {/* Formulario */}
            <View style={styles.formContainer}>
              {/* Usuario o Correo */}
              <Text style={styles.label}>Usuario o Correo:</Text>
              <TextInput
                style={styles.input}
                placeholder="Type..."
                placeholderTextColor="#DDD"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/* Contraseña */}
              <Text style={styles.label}>Contraseña:</Text>
              <TextInput
                style={styles.input}
                placeholder="Type..."
                placeholderTextColor="#DDD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.subLabel} onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.subLabel}>Olvide mi contraseña</Text>
              </TouchableOpacity>

              {/* Divisor "o" */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>o</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Texto de registro */}
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerText}>
                  No tienes cuenta aún?{" "}
                  <Text style={styles.registerLink}>Regístrate</Text>
                </Text>
              </TouchableOpacity>

              {/* Botones de Login Social */}
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={20} color="white" />
                <Text style={styles.socialButtonText}>Log in with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Log in with Apple</Text>
                <AntDesign name="apple" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome5 name="facebook" size={20} color="white" />
                <Text style={styles.socialButtonText}>
                  Log in with Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nextButtonContainer}>
            {/* Botón Siguiente */}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <Feather name="arrow-right" size={20} color="#000" />
                  <Text style={styles.nextButtonText}>Siguiente</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
    letterSpacing: 2,
    textAlign: "center",
    fontStyle: "italic",
  },
  verticalTextContainer: {
    width: 50,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    
  },
  verticalText: {
    fontSize: 36,
    width: 400,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 8,
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
  },
  containerFormText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  label: {
    width: "100%",
    fontSize: 14,
    color: "white",
    marginBottom: 8,
    fontWeight: "500",
  },
  subLabel: {
    width: "100%",
    fontSize: 12,
    color: "white",
    fontWeight: "400",
    textDecorationLine: "underline",
    textDecorationColor: "white",
    textAlign: "right",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "white",
    fontSize: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    color: "white",
    marginHorizontal: 15,
    fontSize: 14,
  },
  registerText: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  registerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    gap: 10,
    width: 200,
  },
  socialButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  nextButtonContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    gap: 10,
  },
  nextButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 10,
    color: "white",
    fontSize: 16,
  },
});

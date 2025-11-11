import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreenAppRutine from "./screens/HomeScreenAppRutine";
import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import SearchScreen from "./screens/SearchScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import SupplementsScreen from "./screens/SupplementsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ProfileScreen from "./screens/ProfileScreen";
const Stack = createStackNavigator();

const HeaderButton = ({ onPress, title, color = "#FF6B6B" }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerButton}>
    <Text style={[styles.headerButtonText, { color }]}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState("light");
  const [statusBarTransition, setStatusBarTransition] = useState("fade");
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#E74C3C"
          style={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
          translucent={false}
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#E74C3C",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              // Usa una de estas transiciones predefinidas:
              // ...TransitionPresets.SlideFromRightIOS,     // iOS style (slide derecha)
              // ...TransitionPresets.ModalSlideFromBottomIOS, // Modal desde abajo
              // ...TransitionPresets.ModalPresentationIOS,    // Modal iOS
              // ...TransitionPresets.FadeFromBottomAndroid,   // Fade Android
              // ...TransitionPresets.RevealFromBottomAndroid, // Reveal Android
              // ...TransitionPresets.ScaleFromCenterAndroid,  // Scale Android
              // ...TransitionPresets.DefaultTransition,       // Transición por defecto
              ...TransitionPresets.ModalFadeTransition,
              // Configuración personalizada de velocidad y animación
              transitionSpec: {
                open: {
                  animation: "fade_in",
                  config: {
                    duration: 200, // Más rápido (default: 300)
                  },
                },
                close: {
                  animation: "fade_out", // Animación con rebote
                  config: {
                    duration: 500,
                  },
                },
              },
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Rutine"
              component={HomeScreenAppRutine}
              options={({ navigation }) => ({
                headerShown: false,
                headerRight: () => (
                  <View style={{ flexDirection: "row" }}>
                    <HeaderButton
                      onPress={() => navigation.navigate("Favorites")}
                      title="❤️"
                      color="#fff"
                    />
                    <HeaderButton
                      onPress={() => navigation.navigate("Search")}
                      title="Buscar"
                      color="#fff"
                    />
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name="RecipeList"
              component={RecipeListScreen}
              options={({ navigation, route }) => ({
                headerShown: false,
                title: route.params?.categoryName || "Recetas",
                headerRight: () => (
                  <View style={{ flexDirection: "row" }}>
                    <HeaderButton
                      onPress={() => navigation.navigate("Favorites")}
                      title="❤️"
                      color="#fff"
                    />
                    <HeaderButton
                      onPress={() => navigation.navigate("Search")}
                      title="Buscar"
                      color="#fff"
                    />
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name="RecipeDetail"
              component={RecipeDetailScreen}
              options={{
                headerShown: false,
                title: "Detalle de Receta",
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerShown: false,
                title: "Buscar Recetas",
              }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{
                headerShown: false,
                title: "Mis Favoritos",
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
                title: "Perfil",
              }}
            />
            <Stack.Screen
              name="Supplements"
              component={SupplementsScreen}
              options={{
                headerShown: false,
                title: "Suplementos",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerButton: {
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

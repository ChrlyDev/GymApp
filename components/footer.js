import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Constantes de estilo
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

export const Footer = ({ navigation }) => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(
    route.name?.toLowerCase() || "rutine"
  );

  const handleTabPress = (tabName, label) => {
    setActiveTab(tabName);
    navigation.navigate(label);
  };

  const TabButton = ({ name, icon, label, isActive }) => (
    <TouchableOpacity
      style={[isActive ? styles.navItemActive : styles.navItem]}
      onPress={() => handleTabPress(name, label)}
    >
      {icon}
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2c2c2c", "#424242"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.nav}
      >
        <TabButton
          name="shop"
          icon={
            <FontAwesome
              name="shopping-basket"
              size={24}
              color={activeTab === "shop" ? "#fff" : "#b3b3b3"}
            />
          }
          label="Shop"
          isActive={activeTab === "shop"}
        />

        <TabButton
          name="rutine"
          icon={
            <Feather
              name="clipboard"
              size={24}
              color={activeTab === "rutine" ? "#fff" : "#b3b3b3"}
            />
          }
          label="Rutine"
          isActive={activeTab === "rutine"}
        />

        <TabButton
          name="ai"
          icon={
            <FontAwesome5
              name="brain"
              size={24}
              color={activeTab === "ai" ? "#fff" : "#b3b3b3"}
            />
          }
          label="AI"
          isActive={activeTab === "ai"}
        />

        <TabButton
          name="food"
          icon={
            <FontAwesome
              name="cutlery"
              size={20}
              color={activeTab === "food" ? "#fff" : "#b3b3b3"}
            />
          }
          label="Food"
          isActive={activeTab === "food"}
        />

        <TabButton
          name="profile"
          icon={
            <Feather
              name="user"
              size={24}
              color={activeTab === "profile" ? "#fff" : "#b3b3b3"}
            />
          }
          label="Profile"
          isActive={activeTab === "profile"}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  nav: {
    borderRadius: RADII.md,
    padding: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navItem: {
    width: 58,
    height: 50,
    borderRadius: RADII.md,
    borderWidth: 2,
    borderColor: COLORS.navItemBorder,
    backgroundColor: COLORS.navItemBg,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.sm,
  },
  navItemAi: {
    width: 70,
    height: 55,
    borderRadius: RADII.full,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.navItemBorder,
    backgroundColor: COLORS.navItemBg,
  },
  navItemActive: {
    width: 58,
    height: 50,
    borderRadius: RADII.md,
    borderWidth: 2,
    backgroundColor: COLORS.navItemBg,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.sm,
    borderColor: "#fff",
  },
  navLabel: {
    fontFamily: FONTS.family,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
  navLabelActive: {
    color: "#fff",
  },
});

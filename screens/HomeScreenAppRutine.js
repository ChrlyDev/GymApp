// HomeScreenAppRoutine.tsx
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrainVectorIcon, AiVectorTextIcon } from "../components/svgs";
import { Footer } from "../components/footer";

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

// ────────────────────────────────────────────────────────────
// Mock data (reemplaza con tu data real)
// ────────────────────────────────────────────────────────────
const EXERCISES = [
  {
    id: "1",
    title: "Press Banca",
    desc: "Empujas una barra desde el pecho: trabaja pectorales (principal), hombros y tríceps.",
    image: {
      uri: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80",
    },
  },
  {
    id: "2",
    title: "Press Inclinado",
    desc: "Barra en plano inclinado, énfasis en la parte superior del pecho, hombros y tríceps.",
    image: {
      uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    },
  },
  {
    id: "3",
    title: "Fondos en Paralelas",
    desc: "Excelente para tríceps y pecho inferior. Mantén control y rango cómodo.",
    image: {
      uri: "https://images.unsplash.com/photo-1599050751795-5cda015e16b1?w=800&q=80",
    },
  },
];

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
// Obtener el día del mes
const day = new Date().getDate();
const dayText = days[new Date().getDay()];

// ────────────────────────────────────────────────────────────
// Subcomponents
// ────────────────────────────────────────────────────────────
const Header = ({ routine = "Pecho y Tríceps", onToggleDay }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInfo}>
        <View style={styles.headerThumb}>
          <Text style={styles.headerThumbText}>{day}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>{dayText}</Text>
          <Text style={styles.headerSubtitle}>{routine}</Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.headerChip,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        ]}
        onPress={onToggleDay}
        android_ripple={{ color: "#000", radius: 24 }}
      >
        <Text style={styles.headerChipText}>Día</Text>
        <Ionicons name="chevron-expand" size={18} color="#fff" />
      </Pressable>
    </View>
  );
};

const ExerciseCard = ({ title, desc, image, onPlay }) => {
  return (
    <View style={styles.exerciseCard}>
      <Image source={image} style={styles.exerciseImage} resizeMode="cover" />
      <View style={styles.exerciseBody}>
        <Text style={styles.exerciseTitle}>{title}</Text>
        <Text style={styles.exerciseDesc}>{desc}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.exampleBtn,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}
          onPress={onPlay}
        >
          <Feather
            name="play"
            size={12}
            color="#000"
            style={{ fontWeight: "extra-bold" }}
          />
          <Text style={styles.exampleBtnText}>See Example</Text>
        </Pressable>
      </View>
    </View>
  );
};

// ────────────────────────────────────────────────────────────
// Screen
// ────────────────────────────────────────────────────────────
const HomeScreenAppRutine = ({ navigation }) => {
  const onToggleDay = () => {
    // TODO: abre modal/selector de día
    // console.log("toggle day");
  };

  const renderItem = ({ item }) => (
    <ExerciseCard
      title={item.title}
      desc={item.desc}
      image={item.image}
      onPlay={() => {}}
    />
  );

  return (
    <View style={styles.safe}>
      <LinearGradient
        style={styles.wallpaper}
        colors={["#3a3a3a", COLORS.bg]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>GYM APP.</Text>
        </View>

        {/* Header */}
        <Header onToggleDay={onToggleDay} />

        {/* List */}
        <FlatList
          data={EXERCISES}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: SPACING.xl }} />}
        />

        {/* Bottom Navigation */}
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

// ────────────────────────────────────────────────────────────
// Styles
// ────────────────────────────────────────────────────────────
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
  // Logo
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

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  headerThumb: {
    width: 80,
    height: 64,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADII.lg,
    backgroundColor: "#3D3D3D",
    borderWidth: 1,
    borderColor: "#97979773",
  },
  headerThumbText: {
    width: "100%",
    fontSize: 40,
    fontWeight: "bold",
    color: "#DDD",
    textAlign: "center",
    textAlignVertical: "center",
  },
  headerText: {
    gap: SPACING.xs,
  },
  headerTitle: {
    fontFamily: FONTS.family,
    fontSize: 30,
    lineHeight: 30,
    color: COLORS.text,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontFamily: FONTS.family,
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.text,
    fontWeight: "500",
  },
  headerChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.chip,
    borderRadius: RADII.full,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  headerChipText: {
    fontFamily: FONTS.family,
    fontWeight: "700",
    fontSize: 13,
    color: COLORS.textDim,
  },

  // List
  listContent: {
    paddingBottom: SPACING.xxl,
  },

  // ExerciseCard
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
    backgroundColor: COLORS.surfaceStrong,
    borderRadius: RADII.xl,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  exerciseImage: {
    width: 120,
    height: 120,
    borderRadius: RADII.lg,
  },
  exerciseBody: {
    flex: 1,
    gap: SPACING.sm,
    minWidth: 160,
  },
  exerciseTitle: {
    fontFamily: FONTS.family,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  exerciseDesc: {
    fontFamily: FONTS.family,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.text,
    opacity: 0.9,
  },
  exampleBtn: {
    marginTop: SPACING.sm,
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADII.sm,
  },
  exampleBtnText: {
    fontFamily: FONTS.family,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
    color: "#1e1e1e",
  },

  // Bottom nav
  navWrapper: {
    paddingTop: SPACING.lg,
  },
  nav: {
    borderRadius: RADII.md,
    padding: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
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
    width: 60,
    height: 50,
    borderRadius: RADII.md,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.sm,
    borderColor: "#fff",
    backgroundColor: COLORS.navItemBg,
  },
  navItemAiActive: {
    width: 70,
    height: 55,
    borderRadius: RADII.full,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.sm,
    borderColor: "#fff",
    backgroundColor: COLORS.navItemBg,
  },
  navLabelMuted: {
    fontFamily: FONTS.family,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
  navLabelActive: {
    fontFamily: FONTS.family,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
    color: "#eee",
  },
  navSpacer: {
    width: 80,
    alignSelf: "stretch",
  },
  navAI: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -40 }],
    bottom: -2,
    width: 80,
    height: 80,
    borderRadius: RADII.full,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },

  // Home indicator
  homeIndicatorArea: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  homeIndicator: {
    width: 144,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#a1a1a6",
  },
});

export default HomeScreenAppRutine;

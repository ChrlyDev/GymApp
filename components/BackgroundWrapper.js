import React from "react";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function BackgroundWrapper({ children, blurRadius = 3 }) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      }}
      style={styles.backgroundImage}
      blurRadius={blurRadius}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
});

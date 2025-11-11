import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function HealthIssuesModal({
  visible,
  initialIssues = [],
  onClose,
  onConfirm,
}) {
  const [selectedIssues, setSelectedIssues] = useState(initialIssues);

  const allIssues = [
    {
      id: "alergias",
      label: "Alergias",
      items: [
        { id: "alergia_penicilina", label: "Penicilina" },
        { id: "alergia_huevo", label: "Huevo" },
        { id: "alergia_latex", label: "Látex" },
        { id: "alergia_otros", label: "Otros" },
      ],
    },
    {
      id: "cronicas",
      label: "Enfermedades crónicas",
      items: [
        { id: "diabetes", label: "Diabetes" },
        { id: "hipertension", label: "Hipertensión" },
        { id: "asma", label: "Asma" },
      ],
    },
    {
      id: "medicacion",
      label: "Medicación actual",
      items: [
        { id: "anticoagulantes", label: "Anticoagulantes" },
        { id: "antihipertensivos", label: "Antihipertensivos" },
        { id: "otros_medicamentos", label: "Otros" },
      ],
    },
    {
      id: "restricciones",
      label: "Restricciones dietarias",
      items: [
        { id: "sin_gluten", label: "Sin gluten" },
        { id: "vegetariano", label: "Vegetariano" },
        { id: "vegano", label: "Vegano" },
      ],
    },
    {
      id: "ninguno",
      label: "Ninguno",
      items: [
        { id: "ninguno", label: "No tengo problemas de salud" },
      ],
    },
  ];

  useEffect(() => {
    if (visible) {
      setSelectedIssues(Array.isArray(initialIssues) ? initialIssues : []);
    }
  }, [visible, initialIssues]);

  const toggleIssue = (itemId) => {
    if (itemId === "ninguno") {
      setSelectedIssues(["ninguno"]);
    } else {
      setSelectedIssues((prev) => {
        const filtered = prev.filter(id => id !== "ninguno");
        if (filtered.includes(itemId)) {
          return filtered.filter((id) => id !== itemId);
        } else {
          return [...filtered, itemId];
        }
      });
    }
  };

  const isSelected = (itemId) => selectedIssues.includes(itemId);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>INDICACIONES DE SALUD</Text>
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {allIssues.map((category) => (
              <View key={category.id} style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>{category.label}</Text>
                {category.items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.optionContainer,
                      isSelected(item.id) && styles.optionSelected,
                    ]}
                    onPress={() => toggleIssue(item.id)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                    {isSelected(item.id) && (
                      <Feather name="check" size={20} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnSecondary} onPress={onClose}>
              <Text style={styles.btnSecondaryText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => onConfirm(selectedIssues)}
            >
              <Text style={styles.btnPrimaryText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#282828ff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  title: {
    color: "white",
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  scrollView: {
    maxHeight: 400,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  optionSelected: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderColor: "rgba(255,255,255,0.4)",
  },
  optionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  actions: { 
    flexDirection: "row", 
    gap: 12, 
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnPrimaryText: { 
    color: "#000", 
    fontWeight: "700",
    fontSize: 14,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  btnSecondaryText: { 
    color: "white", 
    fontWeight: "700",
    fontSize: 14,
  },
});

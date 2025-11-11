// components/PesoModalRect.js
import React, { useMemo, useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function DayTraining({
  visible,
  initialDays = 4, // número en dias (entero)
  minDays = 1,
  maxDays = 7,
  step = 1, // usa 1 para lista corta; 0.5 si quieres medios kg
  onClose,
  onConfirm, // (days:number) => void
}) {
  const [days, setDays] = useState(initialDays);

  useEffect(() => {
    if (visible) setDays(initialDays);
  }, [visible, initialDays]);

  const opciones = useMemo(() => {
    const arr = [];
    for (let v = minDays; v <= maxDays; v += step) {
      arr.push(Number(v.toFixed(1)));
    }
    return arr;
  }, [minDays, maxDays, step]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>SELECCIONA LOS DIAS</Text>

          <View style={styles.pickerBox}>
            <Picker
              selectedValue={days}
              onValueChange={(val) => setDays(val)}
              style={styles.picker}
              itemStyle={{ color: "black", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: "bold" }}
            >
              {opciones.map((v) => (
                <Picker.Item key={v} label={`${v} ${v === 1 ? "dia" : "dias"}`} value={v} />
              ))}
            </Picker>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnSecondary} onPress={onClose}>
              <Text style={styles.btnSecondaryText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => onConfirm(days)}
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
    width: "85%",
    backgroundColor: "#282828ff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  title: {
    color: "white",
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
  },
  pickerBox: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  picker: { width: "100%", height: 215, color: "white" },
  actions: { flexDirection: "row", gap: 12, marginTop: 12 },
  btnPrimary: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnPrimaryText: { color: "#000", fontWeight: "700" },
  btnSecondary: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  btnSecondaryText: { color: "white", fontWeight: "700" },
});

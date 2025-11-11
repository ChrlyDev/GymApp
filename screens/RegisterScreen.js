// RegisterScreen.js
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AlturaModal from "../components/AlturaModal";
import PesoModal from "../components/PesoModal";
import DayTraining from "../components/DayTraining";
import HealthIssuesModal from "../components/HealthIssuesModal";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [genero, setGenero] = useState("");
  const [daysTraining, setDaysTraining] = useState("");
  const [healthIssues, setHealthIssues] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showAlturaModal, setShowAlturaModal] = useState(false);
  const [showPesoModal, setShowPesoModal] = useState(false);
  const [showDaysTrainingModal, setShowDaysTrainingModal] = useState(false);
  const [showHealthIssuesModal, setShowHealthIssuesModal] = useState(false);
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);

  // Estados para errores de validación
  const [nameError, setNameError] = useState("");
  const [edadError, setEdadError] = useState("");
  const [pesoError, setPesoError] = useState("");
  const [alturaError, setAlturaError] = useState("");
  const [generoError, setGeneroError] = useState("");
  const [daysTrainingError, setDaysTrainingError] = useState("");
  const [healthIssuesError, setHealthIssuesError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleRegister = () => {
    // Validaciones del primer paso
    if (!name) {
      setNameError("El nombre es obligatorio");
      return;
    }
    if (!edad) {
      setEdadError("La edad es obligatoria");
      return;
    }
    if (!peso) {
      setPesoError("Selecciona tu peso");
      return;
    }
    if (!altura) {
      setAlturaError("Selecciona tu altura");
      return;
    }
    if (!genero) {
      setGeneroError("Selecciona tu género");
      return;
    }

    // Si estamos en el primer paso, avanzar al segundo
    if (firstStep) {
      setFirstStep(false);
      setSecondStep(true);
      // Limpiar errores del primer paso
      setNameError("");
      setEdadError("");
      setPesoError("");
      setAlturaError("");
      setGeneroError("");
      return;
    }

    if (!daysTraining) {
      setDaysTrainingError("Selecciona cuantos días quieres entrenar");
      return;
    }

    if (!healthIssues || healthIssues.length === 0) {
      setHealthIssuesError("Selecciona tus indicaciones de salud");
      return;
    }

    // Si estamos en el segundo paso, avanzar al tercero (login)
    if (secondStep) {
      setSecondStep(false);
      // Limpiar errores del segundo paso
      setDaysTrainingError("");
      setHealthIssuesError("");
      return;
    }

    // Validaciones del tercer paso (login)
    if (!email) {
      setEmailError("El correo electrónico es obligatorio");
      return;
    }
    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("La confirmación de contraseña es obligatoria");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        // Actualizar el perfil del usuario con el nombre
        return updateProfile(user, {
          displayName: name,
        }).then(() => {
          Alert.alert(
            "Registro Exitoso",
            "¡Tu cuenta ha sido creada correctamente!",
            [{ text: "OK", onPress: () => navigation.replace("Rutine") }]
          );
        });
      })
      .catch((error) => {
        // Traducción de errores comunes de Firebase para una mejor UX
        let errorMessage;
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Este correo electrónico ya está en uso";
            break;
          case "auth/invalid-email":
            errorMessage = "El formato del correo electrónico no es válido";
            break;
          case "auth/weak-password":
            errorMessage = "La contraseña es demasiado débil";
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

  return (
    <BackgroundWrapper>
      <View style={styles.overlay} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.scrollContainer}>
          <View style={styles.container}>
            {/* Título Principal */}
            <Text style={styles.appTitle}>GYM APP.</Text>

            <View style={styles.containerFormText}>
              {/* Texto Vertical "Iniciar Sesión" */}
              <View style={styles.verticalTextContainer}>
                <Text numberOfLines={1} style={styles.verticalText}>
                  Registrarse
                </Text>
              </View>

              {/* Formulario */}
              {firstStep ? (
                <View style={styles.formContainerFirstStep}>
                  {/* Nombre */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Type..."
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                      keyboardType="default"
                    />
                    {nameError && (
                      <Text style={styles.errorText}>{nameError}</Text>
                    )}
                  </View>

                  {/* Edad */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Edad:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Type..."
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      value={edad}
                      onChangeText={setEdad}
                      onBlur={() => {
                        if (edad > 0 && edad < 16) {
                          Alert.alert(
                            "Error",
                            "Debes ser mayor de 16 años para registrarte",
                            [{ text: "OK", onPress: () => navigation.goBack() }]
                          );
                          return;
                        }
                      }}
                      keyboardType="number-pad"
                    />
                  </View>

                  {/* Peso */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Peso:</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setShowPesoModal(true)}
                    >
                      <Text
                        style={
                          peso ? styles.selectedText : styles.placeholderText
                        }
                      >
                        {peso ? `${peso} kg` : "Selecciona peso..."}
                      </Text>
                      <AntDesign
                        name="down"
                        size={14}
                        color="rgba(255, 255, 255, 0.5)"
                      />
                    </TouchableOpacity>
                    {pesoError && (
                      <Text style={styles.errorText}>{pesoError}</Text>
                    )}
                  </View>
                  {/* Modal Peso */}
                  <PesoModal
                    visible={showPesoModal}
                    initialKg={peso ? Number(peso) : 80.0}
                    step={0.5}
                    onClose={() => setShowPesoModal(false)}
                    onConfirm={(kg) => {
                      setPeso(String(kg));
                      setShowPesoModal(false);
                    }}
                  />

                  {/* Altura */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Altura:</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setShowAlturaModal(true)}
                    >
                      <Text
                        style={
                          altura ? styles.selectedText : styles.placeholderText
                        }
                      >
                        {altura
                          ? `${(altura / 100).toFixed(2)} m (${altura} cm)`
                          : "Selecciona altura..."}
                      </Text>
                      <AntDesign
                        name="down"
                        size={14}
                        color="rgba(255, 255, 255, 0.5)"
                      />
                    </TouchableOpacity>
                    {alturaError && (
                      <Text style={styles.errorText}>{alturaError}</Text>
                    )}
                  </View>
                  {/* Modal Altura */}
                  {showAlturaModal && (
                    <AlturaModal
                      visible={showAlturaModal}
                      initialCm={altura ? Number(altura) : 175.0}
                      onClose={() => setShowAlturaModal(false)}
                      onConfirm={(cm) => {
                        setAltura(String(cm));
                        setShowAlturaModal(false);
                      }}
                    />
                  )}

                  {/* Genero */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Género:</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setShowGenderModal(true)}
                    >
                      <Text
                        style={
                          genero ? styles.selectedText : styles.placeholderText
                        }
                      >
                        {genero ? `${genero}` : "Selecciona género..."}
                      </Text>
                      <AntDesign
                        name="down"
                        size={14}
                        color="rgba(255, 255, 255, 0.5)"
                      />
                    </TouchableOpacity>
                    {generoError && (
                      <Text style={styles.errorText}>{generoError}</Text>
                    )}
                  </View>
                  {showGenderModal && (
                    <View style={styles.pickerContainer}>
                      {/* Modal de Género */}
                      <Modal
                        visible={showGenderModal}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setShowGenderModal(false)}
                      >
                        <TouchableOpacity
                          style={styles.modalOverlay}
                          activeOpacity={1}
                          onPress={() => setShowGenderModal(false)}
                        >
                          <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                              Selecciona tu género
                            </Text>

                            <TouchableOpacity
                              style={[
                                styles.genderOption,
                                genero === "Hombre" &&
                                  styles.genderOptionSelected,
                              ]}
                              onPress={() => {
                                setGenero("Hombre");
                                setShowGenderModal(false);
                              }}
                            >
                              <FontAwesome5
                                name="male"
                                style={styles.genderOptionIcon}
                                size={20}
                              />
                              <Text style={styles.genderOptionText}>
                                Hombre
                              </Text>
                              {genero === "Hombre" && (
                                <Feather name="check" size={20} color="white" />
                              )}
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={[
                                styles.genderOption,
                                genero === "Mujer" &&
                                  styles.genderOptionSelected,
                              ]}
                              onPress={() => {
                                setGenero("Mujer");
                                setShowGenderModal(false);
                              }}
                            >
                              <FontAwesome5
                                name="female"
                                style={styles.genderOptionIcon}
                                size={20}
                              />
                              <Text style={styles.genderOptionText}>Mujer</Text>
                              {genero === "Mujer" && (
                                <Feather name="check" size={20} color="white" />
                              )}
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={[
                                styles.genderOption,
                                genero === "Otro" &&
                                  styles.genderOptionSelected,
                              ]}
                              onPress={() => {
                                setGenero("Otro");
                                setShowGenderModal(false);
                              }}
                            >
                              <FontAwesome5
                                name="transgender"
                                style={styles.genderOptionIcon}
                                size={20}
                              />
                              <Text style={styles.genderOptionText}>Otro</Text>
                              {genero === "Otro" && (
                                <Feather name="check" size={20} color="white" />
                              )}
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={[
                                styles.genderOption,
                                genero === "Prefiero no decirlo" &&
                                  styles.genderOptionSelected,
                              ]}
                              onPress={() => {
                                setGenero("Prefiero no decirlo");
                                setShowGenderModal(false);
                              }}
                            >
                              <Feather
                                name="minus-circle"
                                style={styles.genderOptionIcon}
                                size={20}
                              />
                              <Text style={styles.genderOptionText}>
                                Prefiero no decirlo
                              </Text>
                              {genero === "Prefiero no decirlo" && (
                                <Feather name="check" size={20} color="white" />
                              )}
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={() => setShowGenderModal(false)}
                            >
                              <Text style={styles.cancelButtonText}>
                                Cancelar
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </Modal>
                    </View>
                  )}
                </View>
              ) : secondStep ? (
                <View style={styles.formContainerSecondStep}>
                  {/* Días para entrenar */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                      Cuantos Días Quieres Entrenar:
                    </Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setShowDaysTrainingModal(true)}
                    >
                      <Text
                        style={
                          daysTraining
                            ? styles.selectedText
                            : styles.placeholderText
                        }
                      >
                        {daysTraining
                          ? `${daysTraining} ${
                              Number(daysTraining) === 1 ? "dia" : "dias"
                            }`
                          : "Selecciona dias..."}
                      </Text>
                      <AntDesign
                        name="down"
                        size={14}
                        color="rgba(255, 255, 255, 0.5)"
                      />
                    </TouchableOpacity>
                    {daysTrainingError && (
                      <Text style={styles.errorText}>{daysTrainingError}</Text>
                    )}
                  </View>
                  <DayTraining
                    visible={showDaysTrainingModal}
                    initialDays={daysTraining ? Number(daysTraining) : 4}
                    step={1}
                    onClose={() => setShowDaysTrainingModal(false)}
                    onConfirm={(days) => {
                      setDaysTraining(String(days));
                      setShowDaysTrainingModal(false);
                    }}
                  />

                  {/* Indicaciones de salud */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Indicaciones de salud:</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setShowHealthIssuesModal(true)}
                    >
                      <Text
                        style={
                          healthIssues.length > 0
                            ? styles.selectedText
                            : styles.placeholderText
                        }
                      >
                        {healthIssues.length > 0
                          ? `${healthIssues.length} ${
                              healthIssues.length === 1 ? "seleccionada" : "seleccionadas"
                            }`
                          : "Selecciona indicaciones..."}
                      </Text>
                      <AntDesign
                        name="down"
                        size={14}
                        color="rgba(255, 255, 255, 0.5)"
                      />
                    </TouchableOpacity>
                    {healthIssuesError && (
                      <Text style={styles.errorText}>{healthIssuesError}</Text>
                    )}
                  </View>

                  {/* Modal Indicaciones de salud */}
                  <HealthIssuesModal
                    visible={showHealthIssuesModal}
                    initialIssues={healthIssues}
                    onClose={() => setShowHealthIssuesModal(false)}
                    onConfirm={(healthIssues) => {
                      setHealthIssues(healthIssues);
                      setShowHealthIssuesModal(false);
                    }}
                  />
                </View>
              ) : (
                <View style={styles.formContainerLoginStep}>
                  {/* Correo */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo Electronico:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Type..."
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    {emailError && (
                      <Text style={styles.errorText}>{emailError}</Text>
                    )}
                  </View>

                  {/* Contraseña */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Type..."
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      value={password}
                      onChangeText={setPassword}
                      onBlur={() => {
                        if (password.length < 8) {
                          Alert.alert(
                            "Error",
                            "La contraseña debe tener al menos 8 caracteres"
                          );
                          return;
                        }
                      }}
                      keyboardType="default"
                    />
                    {passwordError && (
                      <Text style={styles.errorText}>{passwordError}</Text>
                    )}
                  </View>

                  {/* Confirmar Contraseña */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Confirmar Contraseña:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Type..."
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onBlur={() => {
                        if (confirmPassword !== password) {
                          Alert.alert("Error", "Las contraseñas no coinciden");
                          return;
                        }
                      }}
                      keyboardType="default"
                    />
                    {confirmPasswordError && (
                      <Text style={styles.errorText}>
                        {confirmPasswordError}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              {/* Botón Atrás */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  if (!firstStep && !secondStep) {
                    // Estamos en el tercer paso (login), volver al segundo
                    setSecondStep(true);
                  } else if (secondStep) {
                    // Estamos en el segundo paso, volver al primero
                    setSecondStep(false);
                    setFirstStep(true);
                  } else {
                    // Estamos en el primer paso, salir de la pantalla
                    navigation.goBack();
                  }
                }}
              >
                <Feather
                  name="arrow-left"
                  size={20}
                  color="#000"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Atrás</Text>
              </TouchableOpacity>
              {/* Botón Siguiente */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>
                      {firstStep || secondStep ? "Siguiente" : "Registrarse"}
                    </Text>
                    <Feather
                      name="arrow-right"
                      size={20}
                      color="#000"
                      style={styles.buttonIcon}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
    justifyContent: "space-between",
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
    letterSpacing: 4,
    textAlign: "center",
    fontStyle: "italic",
  },
  verticalTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transformOrigin: "center",
  },
  verticalText: {
    fontSize: 38,
    width: 400,
    fontWeight: "800",
    color: "white",
    letterSpacing: 10,
    transform: [{ rotate: "-90deg" }],
    textAlign: "center",
  },
  containerFormText: {
    flexDirection: "row",
    alignItems: "",
    flex: 1,
  },
  formContainerFirstStep: {
    flex: 3,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "stretch",
  },
  formContainerSecondStep: {
    flex: 3,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    gap: 20,
    alignItems: "stretch",
  },
  formContainerLoginStep: {
    flex: 3,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    gap: 20,
    alignItems: "stretch",
  },
  inputGroup: {
    height: "fit-content",
    width: "100%",
  },
  label: {
    fontSize: 15,
    color: "white",
    marginBottom: 6,
    fontWeight: "600",
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
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 11,
    marginTop: 4,
    textAlign: "left",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    height: 120,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  actionButton: {
    flex: 1,
    maxWidth: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonIcon: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
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
  pickerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalContent: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "white",
  },
  modalButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  modalButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  picker: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 12,
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
  },
  genderButtonText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    width: "90%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    padding: 24,
    borderRadius: 12,
    width: "75%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  genderOption: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  genderOptionSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  genderOptionIcon: {
    width: "10%",
    color: "white",
    textAlign: "center",
  },
  genderOptionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  placeholderText: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  selectedText: { color: "white", fontWeight: "500", fontSize: 13 },
});

import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
interface Errors {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
interface LoginErrors {
  email: string;
  password: string;
}

const Form = () => {
  const [form, setForm] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { setError, login, register, isLoading, error, isLoggedIn, user } =
    useAuthStore();

  const [hasAccount, setHasAccount] = useState(false);
  const [formError, setFormError] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (hasAccount) {
      validate();
    } else {
      validateLogin();
    }
    if (form.email && form.firstname && form.lastname && form.password) {
      setError("");
    }
  }, [form, hasAccount]);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      if (user.email === "matovuisaac98@gmail.com") {
        router.replace("/admin/(tabs)");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [isLoggedIn, isLoading, user]);

  const validateLogin = () => {
    const newErrors = { email: "", password: "" };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = "Enter your email address";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Enter your password";
    } else if (form.password.length < 8) {
      newErrors.password = "Password should be atleast 8 characters long";
    }
    setLoginErrors(newErrors);
  };
  // validate form data function
  const validate = () => {
    const newErrors = { firstname: "", lastname: "", email: "", password: "" };

    if (!form.firstname.trim()) {
      newErrors.firstname = "Please enter your firstname";
    }

    if (!form.lastname) {
      newErrors.lastname = "Please enter your lastname";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = "Enter your email address";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Enter your password";
    } else if (form.password.length < 8) {
      newErrors.password = "Password should be atleast 8 characters long";
    }
    setErrors(newErrors);
  };

  const handleRegister = async () => {
    validate();

    try {
      await register(
        form.email,
        form.password,
        `${form.firstname} ${form.lastname}`
      );
    } catch {
      setFormError("Check your internet connection");
    }
  };

  const handleLogin = async () => {
    validateLogin();

    try {
      await login(form.email, form.password);
    } catch {
      setFormError("Check your internet connection");
    }
  };

  const image = require("./components/images/black.webp");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={image}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              {isLoading ? (
                <ActivityIndicator
                  color={"green"}
                  size={30}
                  style={styles.loader}
                />
              ) : hasAccount ? (
                <View style={styles.formContainer}>
                  <Text style={styles.title}>
                    Join Us to make this wonderful journey
                  </Text>
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.textInput}
                      label="Enter your first name"
                      activeOutlineColor="black"
                      mode="outlined"
                      value={form.firstname}
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, firstname: text }))
                      }
                    />
                    {errors.firstname ? (
                      <Text style={styles.errorText}>{errors.firstname}</Text>
                    ) : null}
                  </View>
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.textInput}
                      label="Enter your Last name"
                      activeOutlineColor="black"
                      mode="outlined"
                      value={form.lastname}
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, lastname: text }))
                      }
                    />
                    {errors.lastname ? (
                      <Text style={styles.errorText}>{errors.lastname}</Text>
                    ) : null}
                  </View>
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.textInput}
                      autoCapitalize="none"
                      label="Email"
                      activeOutlineColor="black"
                      placeholder="@examplegmail.com"
                      keyboardType="email-address"
                      mode="outlined"
                      value={form.email}
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, email: text }))
                      }
                    />
                    {errors.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                  </View>
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.textInput}
                      label="Enter password"
                      activeOutlineColor="black"
                      mode="outlined"
                      autoCapitalize="none"
                      secureTextEntry
                      placeholder="password"
                      value={form.password}
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, password: text }))
                      }
                    />
                    {errors.password ? (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
                  </View>

                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleRegister}
                  >
                    Sign Up
                  </Button>

                  <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>
                      Already have an account?
                    </Text>
                    <Button
                      textColor="red"
                      onPress={() => setHasAccount(false)}
                    >
                      Sign In
                    </Button>
                  </View>

                  {(formError || error) && (
                    <Text style={styles.formErrorText}>
                      {formError || error}
                    </Text>
                  )}
                </View>
              ) : (
                <View style={styles.formContainer}>
                  <Text style={styles.title}>Sign In</Text>
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.textInput}
                      activeOutlineColor="black"
                      autoCapitalize="none"
                      label="Email"
                      placeholder="@examplegmail.com"
                      keyboardType="email-address"
                      mode="outlined"
                      value={form.email}
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, email: text }))
                      }
                    />
                    {loginErrors.email ? (
                      <Text style={styles.errorText}>{loginErrors.email}</Text>
                    ) : null}
                  </View>
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.textInput}
                      activeOutlineColor="black"
                      label="Enter password"
                      autoCapitalize="none"
                      secureTextEntry
                      placeholder="password"
                      mode="outlined"
                      value={form.password}
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, password: text }))
                      }
                    />
                    {loginErrors.password ? (
                      <Text style={styles.errorText}>
                        {loginErrors.password}
                      </Text>
                    ) : null}
                  </View>

                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleLogin}
                  >
                    Sign in
                  </Button>

                  <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>
                      Don't have an account?
                    </Text>
                    <Button textColor="red" onPress={() => setHasAccount(true)}>
                      Sign Up
                    </Button>
                  </View>

                  {(formError || error) && (
                    <Text style={styles.formErrorText}>
                      {formError || error}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    borderRadius: 10,
  },
  loader: {
    alignSelf: "center",
    marginVertical: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "green",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  switchText: {
    color: "white",
  },
  formErrorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Form;

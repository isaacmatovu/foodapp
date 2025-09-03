import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
  const { login, register, isLoading, error, isLoggedIn } = useAuthStore();

  const [hasAccount, setHasAccount] = useState(false);
  const [formError, setFormError] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [LoginError, setLoginError] = useState<LoginErrors>({
    email: "",
    password: "",
  });
  // const load = isLoading;
  // if (
  //   !errors.email &&
  //   !errors.firstname &&
  //   !errors.lastname &&
  //   !errors.password
  // ) {
  //   return load;
  // }

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, isLoading]);

  if (
    isLoading &&
    form.email !== "" &&
    form.firstname !== "" &&
    form.lastname !== "" &&
    form.password !== ""
  ) {
    return <ActivityIndicator color={"green"} size={30} />;
  }

  const validateLogin = () => {
    const Error = { email: "", password: "" };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      Error.email = "Enter your email address";
    } else if (!emailRegex.test(form.email)) {
      Error.email = "Enter a valid email";
    }

    if (!form.password) {
      Error.password = "Enter your password";
    } else if (form.password.length < 8) {
      Error.password = "Password should be atleast 8 characters long";
    }
    setLoginError(Error);
  };

  const validate = () => {
    const Error = { firstname: "", lastname: "", email: "", password: "" };

    if (hasAccount) {
      if (!form.firstname.trim()) {
        Error.firstname = "Please enter your firstname";
      }

      if (!form.lastname) {
        Error.lastname = "Please enter your lastname";
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!form.email) {
        Error.email = "Enter your email address";
      } else if (!emailRegex.test(form.email)) {
        Error.email = "Enter a valid email";
      }

      if (!form.password) {
        Error.password = "Enter your password";
      } else if (form.password.length < 8) {
        Error.password = "Password should be atleast 8 characters long";
      }
      setErrors(Error);
    }
  };

  // const
  // const handleSubmit = async () => {
  //   if (hasAccount) {
  //     try {
  //       validate();
  //       register(
  //         form.email,
  //         form.password,
  //         `${form.firstname} ${form.lastname}`
  //       );
  //     } catch {
  //       if (
  //         form.firstname !== "" &&
  //         form.lastname !== "" &&
  //         form.password !== "" &&
  //         form.email !== ""
  //       ) {
  //         setFormError("Check your internet connection");
  //       }
  //     }
  //   } else {
  //     try {
  //       validate();
  //       login(form.email, form.password);
  //     } catch {
  //       if (form.password !== "" && form.email !== "") {
  //         setFormError("Check your internet connection");
  //       }
  //     }
  //   }
  // };

  const handleRegister = async () => {
    try {
      validate();
      register(form.email, form.password, `${form.firstname} ${form.lastname}`);
    } catch {
      if (
        form.firstname !== "" &&
        form.lastname !== "" &&
        form.password !== "" &&
        form.email !== ""
      ) {
        setFormError("Check your internet connection");
      }
    }
  };

  const handleLogin = async () => {
    try {
      validateLogin();
      login(form.email, form.password);
    } catch {
      if (form.password !== "" && form.email !== "") {
        setFormError("Check your internet connection");
      }
    }
  };

  const image = require("./components/images/black.webp");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={image} className="flex-1" resizeMode="cover">
          <View className=" flex-1  p-6 justify-center">
            {hasAccount ? (
              <View className="mb-6">
                <Text className="text-white text-4xl text-center">
                  Join Us to make this wounderful journey
                </Text>
                <View className="">
                  <View className="flex flex-col">
                    <TextInput
                      style={styles.text}
                      label="Enter your first name"
                      mode="outlined"
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, firstname: text }))
                      }
                    />
                    <Text className="text-red-500 mb-3">
                      {errors.firstname}
                    </Text>
                  </View>
                  <View className="flex flex-col">
                    <TextInput
                      style={styles.text}
                      label="Enter your Last name"
                      mode="outlined"
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, lastname: text }))
                      }
                    />
                    <Text className="text-red-500 mb-3">{errors.lastname}</Text>
                  </View>
                  <View className="flex flex-col">
                    <TextInput
                      style={styles.text}
                      autoCapitalize="none"
                      label="Email"
                      placeholder="@examplegmail.com"
                      keyboardType="email-address"
                      mode="outlined"
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, email: text }))
                      }
                    />
                    <Text className="text-red-500 mb-3">{errors.email}</Text>
                  </View>
                  <View className="flex flex-col">
                    <TextInput
                      style={styles.text}
                      label="Enter password"
                      mode="outlined"
                      autoCapitalize="none"
                      secureTextEntry
                      placeholder="password"
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, password: text }))
                      }
                    />
                    <Text className="text-red-500 mb-3">{errors.password}</Text>
                  </View>
                </View>
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  mode="contained"
                  buttonColor={isLoading ? "gray" : "green"}
                  onPress={handleRegister}
                >
                  {isLoading ? "Sigining in..." : "Sign Up"}
                </Button>
                <View className="flex-col justify-center items-center">
                  <View className="flex-row justify-center items-center">
                    <Text className="text-white">Already have an account?</Text>
                    <Button
                      textColor="red"
                      onPress={() => setHasAccount(false)}
                    >
                      Sign In
                    </Button>
                  </View>
                  <View>
                    {formError && (
                      <Text className="text-red-500 text-center mt-4">
                        {formError}
                      </Text>
                    )}
                    {error && (
                      <Text className="text-red-500 text-center mt-4">
                        {error}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <View className="">
                <View className="mb-6">
                  <Text className="text-white text-4xl text-center">
                    Sign In
                  </Text>
                  <View className="flex flex-col">
                    <TextInput
                      style={styles.text}
                      activeOutlineColor="green"
                      autoCapitalize="none"
                      label="Email"
                      placeholder="@examplegmail.com"
                      keyboardType="email-address"
                      mode="outlined"
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, email: text }))
                      }
                    />
                    <Text className="text-red-500 mb-3">
                      {LoginError.email}
                    </Text>
                  </View>
                  <View className="flex flex-col">
                    <TextInput
                      style={styles.text}
                      activeOutlineColor="green"
                      label="Enter password"
                      autoCapitalize="none"
                      secureTextEntry
                      placeholder="password"
                      mode="outlined"
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, password: text }))
                      }
                    />
                    <Text className="text-red-500 mb-3">
                      {LoginError.password}
                    </Text>
                  </View>
                </View>
                <Button
                  mode="contained"
                  disabled={isLoading}
                  loading={isLoading}
                  onPress={handleLogin}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <View className="flex-column justify-center items-center">
                  <View className="flex-row justify-center items-center">
                    <Text className="text-white">Dont have an account?</Text>
                    <Button textColor="red" onPress={() => setHasAccount(true)}>
                      Sign Up
                    </Button>
                  </View>
                  <View className="mt-5">
                    {error && (
                      <Text className="text-red-500 text-center mt-4">
                        {error}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 7,
  },
});

export default Form;

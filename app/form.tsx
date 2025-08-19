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

const Form = () => {
  const [form, setForm] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { login, register, isLoading, error, isLoggedIn } = useAuthStore();
  const [hasAccount, setHasAccount] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return <ActivityIndicator color={"green"} size={30} />;
  }

  const handleRegister = () => {
    setHasAccount(!hasAccount);
  };
  const handleSubmit = () => {
    if (hasAccount) {
      register(form.email, form.password, `${form.firstname} ${form.lastname}`);
    } else {
      login(form.email, form.password);
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
                <View className="mb-6">
                  <TextInput
                    style={styles.text}
                    label="Enter your first name"
                    mode="outlined"
                    onChangeText={(text) =>
                      setForm((prev) => ({ ...prev, firstname: text }))
                    }
                  />
                  <TextInput
                    style={styles.text}
                    label="Enter your Last name"
                    mode="outlined"
                    onChangeText={(text) =>
                      setForm((prev) => ({ ...prev, lastname: text }))
                    }
                  />
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
                </View>
                <Button mode="contained" onPress={handleSubmit}>
                  Sign Up
                </Button>
                <View className="flex-col justify-center items-center">
                  <View className="flex-row justify-center items-center">
                    <Text className="text-white">Already have an account?</Text>
                    <Button
                      disabled={isLoading}
                      loading={isLoading}
                      textColor="red"
                      onPress={() => setHasAccount(false)}
                    >
                      Sign In
                    </Button>
                  </View>
                  <View>
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
                </View>
                <Button mode="contained" onPress={handleSubmit}>
                  Sign In
                </Button>
                <View className="flex-column justify-center items-center">
                  <View className="flex-row justify-center items-center">
                    <Text className="text-white">Dont have an account?</Text>
                    <Button
                      disabled={isLoading}
                      loading={isLoading}
                      textColor="red"
                      onPress={() => setHasAccount(true)}
                    >
                      Sign Up
                    </Button>
                  </View>
                  <View>
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

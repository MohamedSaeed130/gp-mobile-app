import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { RolePicker } from "./RolePicker";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";
import { useState, useEffect } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import { ValidationPopup } from "../ValidationPopup";

interface RegisterFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) => void;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    repeatPassword: false,
    role: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (touched.firstName && !validateName(formData.firstName)) {
      setErrorMessage("Please enter a valid first name");
    } else if (touched.lastName && !validateName(formData.lastName)) {
      setErrorMessage("Please enter a valid last name");
    } else if (touched.email && !validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address");
    } else if (touched.password && !validatePassword(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long");
    } else if (
      touched.repeatPassword &&
      formData.password !== formData.repeatPassword
    ) {
      setErrorMessage("Passwords do not match");
    } else if (touched.role && !formData.role) {
      setErrorMessage("Please select a role");
    } else {
      setErrorMessage("");
    }
  }, [formData, touched]);

  const handleSubmit = () => {
    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      repeatPassword: true,
      role: true,
    });

    // Validate all fields
    if (!validateName(formData.firstName)) {
      setErrorMessage("Please enter a valid first name");
      return;
    }
    if (!validateName(formData.lastName)) {
      setErrorMessage("Please enter a valid last name");
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!validatePassword(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!formData.role) {
      setErrorMessage("Please select a role");
      return;
    }

    onSubmit({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
  };

  return (
    <View style={styles.form}>
      {errorMessage ? <ValidationPopup message={errorMessage} /> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={[
            styles.input,
            touched.firstName &&
              !validateName(formData.firstName) &&
              styles.inputError,
          ]}
          placeholder="First Name"
          placeholderTextColor={Colors.textLight}
          value={formData.firstName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, firstName: text }))
          }
          onFocus={() => setTouched((prev) => ({ ...prev, firstName: true }))}
          autoCapitalize="words"
        />
        <TextInput
          style={[
            styles.input,
            touched.lastName &&
              !validateName(formData.lastName) &&
              styles.inputError,
          ]}
          placeholder="Last Name"
          placeholderTextColor={Colors.textLight}
          value={formData.lastName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, lastName: text }))
          }
          onFocus={() => setTouched((prev) => ({ ...prev, lastName: true }))}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <RolePicker
          value={formData.role}
          onChange={(role) => {
            setFormData((prev) => ({ ...prev, role }));
            setTouched((prev) => ({ ...prev, role: true }));
          }}
          error={touched.role && !formData.role}
        />
        <TextInput
          style={[
            styles.input,
            touched.email &&
              !validateEmail(formData.email) &&
              styles.inputError,
          ]}
          placeholder="Email"
          placeholderTextColor={Colors.textLight}
          value={formData.email}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
          onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[
            styles.input,
            touched.password &&
              !validatePassword(formData.password) &&
              styles.inputError,
          ]}
          placeholder="Password"
          placeholderTextColor={Colors.textLight}
          value={formData.password}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          onFocus={() => setTouched((prev) => ({ ...prev, password: true }))}
          secureTextEntry
        />
        <TextInput
          style={[
            styles.input,
            touched.repeatPassword &&
              formData.password !== formData.repeatPassword &&
              styles.inputError,
          ]}
          placeholder="Repeat Password"
          placeholderTextColor={Colors.textLight}
          value={formData.repeatPassword}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, repeatPassword: text }))
          }
          onFocus={() =>
            setTouched((prev) => ({ ...prev, repeatPassword: true }))
          }
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
});

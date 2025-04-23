import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { validateEmail, validatePassword } from '../../utils/validation';
import { ValidationPopup } from '../ValidationPopup';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
}

export const LoginForm = ({ onSubmit, loading = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    if (touched.email && !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
    } else if (touched.password && !validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long');
    } else {
      setErrorMessage('');
    }
  }, [email, password, touched]);

  const handleSubmit = () => {
    setTouched({ email: true, password: true });
    
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
    
    onSubmit(email, password);
  };

  return (
    <View style={styles.form}>
      {errorMessage ? <ValidationPopup message={errorMessage} /> : null}
      
      <TextInput
        style={[
          styles.input,
          touched.email && !validateEmail(email) && styles.inputError
        ]}
        placeholder="Email"
        placeholderTextColor={Colors.textLight}
        value={email}
        onChangeText={setEmail}
        onFocus={() => setTouched(prev => ({ ...prev, email: true }))}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          touched.password && !validatePassword(password) && styles.inputError
        ]}
        placeholder="Password"
        placeholderTextColor={Colors.textLight}
        value={password}
        onChangeText={setPassword}
        onFocus={() => setTouched(prev => ({ ...prev, password: true }))}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.buttonText}>Signing In...</Text>
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
    paddingHorizontal: 24,
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
}); 
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { loginStyles } from '../styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Mock login for demo - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0],
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      await login(mockToken, mockUser);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <SafeAreaView style={loginStyles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={loginStyles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={loginStyles.keyboardView}
        >
          <ScrollView contentContainerStyle={loginStyles.scrollContent}>
            {/* Logo Section */}
            <View style={loginStyles.logoSection}>
              <View style={loginStyles.logoContainer}>
                <Ionicons name="shield-checkmark" size={60} color="#fff" />
              </View>
              <Text style={loginStyles.appName}>IdeaSpark</Text>
              <Text style={loginStyles.appSubtitleEnhanced}>AI News Detector</Text>
            </View>

            {/* Login Form */}
            <View style={loginStyles.formContainerEnhanced}>
              <View style={loginStyles.cardEnhanced}>
                <Text style={loginStyles.welcomeText}>Welcome Back!</Text>
                <Text style={loginStyles.signInText}>Sign in to verify news credibility</Text>

                {/* Email Input */}
                <View style={loginStyles.inputContainerEnhanced}>
                  <Ionicons name="mail-outline" size={20} color="#666" style={loginStyles.inputIcon} />
                  <TextInput
                    style={loginStyles.inputEnhanced}
                    placeholder="Email address"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>

                {/* Password Input */}
                <View style={loginStyles.inputContainerEnhanced}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666" style={loginStyles.inputIcon} />
                  <TextInput
                    style={loginStyles.inputEnhanced}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={loginStyles.eyeIcon}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={[loginStyles.loginButtonEnhanced, isLoading && loginStyles.disabledButton]}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={loginStyles.buttonGradient}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <Text style={loginStyles.loginButtonTextEnhanced}>Sign In</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Demo Note */}
                <View style={loginStyles.demoNote}>
                  <Text style={loginStyles.demoText}>
                    📱 Demo Mode: Use any email/password to login
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

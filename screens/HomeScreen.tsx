import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { homeStyles, gradientConfigs } from '../styles';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleAnalyzeNews = () => {
    navigation.navigate('Dashboard' as never);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={homeStyles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={gradientConfigs.primary as [string, string]}
        style={homeStyles.header}
      >
        <View style={homeStyles.headerLeft}>
          <Text style={homeStyles.headerTitle}>IdeaSpark</Text>
        </View>
        <TouchableOpacity style={homeStyles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={homeStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={homeStyles.contentContainer}>
          {/* Welcome Section */}
          <View style={homeStyles.welcomeSection}>
            <Text style={homeStyles.welcomeTitle}>
              Welcome back, {user?.name || 'User'}!
            </Text>
            <Text style={homeStyles.welcomeSubtitle}>
              Spark your creativity with AI-powered tools and ideas
            </Text>
          </View>
          {/* Hero Section */}
          <View style={homeStyles.heroSection}>
            <View style={homeStyles.heroIcon}>
              <Ionicons name="shield-checkmark" size={60} color="#667eea" />
            </View>
            <Text style={homeStyles.heroTitle}>Fight Fake News with AI</Text>
            <Text style={homeStyles.heroSubtitle}>
              Verify news authenticity instantly using advanced AI detection
            </Text>
          </View>
        </View>

        {/* Main Action Button */}
        <TouchableOpacity style={homeStyles.mainActionButton} onPress={handleAnalyzeNews}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={homeStyles.actionGradient}
          >
            <Ionicons name="search" size={28} color="#fff" />
            <Text style={homeStyles.actionButtonText}>Analyze News</Text>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Features Grid */}
        <View style={homeStyles.featuresSection}>
          <Text style={homeStyles.sectionTitle}>Key Features</Text>
          
          <View style={homeStyles.featuresGrid}>
            <View style={homeStyles.featureCard}>
              <View style={homeStyles.featureIcon}>
                <Ionicons name="flash" size={24} color="#667eea" />
              </View>
              <Text style={homeStyles.featureTitle}>Instant Analysis</Text>
              <Text style={homeStyles.featureDesc}>Get results in seconds</Text>
            </View>

            <View style={homeStyles.featureCard}>
              <View style={homeStyles.featureIcon}>
                <Ionicons name="shield-checkmark" size={24} color="#10b981" />
              </View>
              <Text style={homeStyles.featureTitle}>AI Powered</Text>
              <Text style={homeStyles.featureDesc}>Advanced ML algorithms</Text>
            </View>

            <View style={homeStyles.featureCard}>
              <View style={homeStyles.featureIcon}>
                <Ionicons name="bar-chart" size={24} color="#f59e0b" />
              </View>
              <Text style={homeStyles.featureTitle}>Confidence Score</Text>
              <Text style={homeStyles.featureDesc}>Accuracy percentage</Text>
            </View>

            <View style={homeStyles.featureCard}>
              <View style={homeStyles.featureIcon}>
                <Ionicons name="time" size={24} color="#8b5cf6" />
              </View>
              <Text style={homeStyles.featureTitle}>History</Text>
              <Text style={homeStyles.featureDesc}>Track your analyses</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={homeStyles.statsSection}>
          <Text style={homeStyles.sectionTitle}>Your Stats</Text>
          
          <View style={homeStyles.statsGrid}>
            <View style={homeStyles.statCard}>
              <Text style={homeStyles.statNumber}>0</Text>
              <Text style={homeStyles.statLabel}>Analyses</Text>
            </View>
            
            <View style={homeStyles.statCard}>
              <Text style={homeStyles.statNumber}>0%</Text>
              <Text style={homeStyles.statLabel}>Accuracy</Text>
            </View>
            
            <View style={homeStyles.statCard}>
              <Text style={homeStyles.statNumber}>0</Text>
              <Text style={homeStyles.statLabel}>Real News</Text>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={homeStyles.tipsSection}>
          <Text style={homeStyles.sectionTitle}>💡 Pro Tips</Text>
          
          <View style={homeStyles.tipCard}>
            <Ionicons name="information-circle" size={20} color="#667eea" />
            <Text style={homeStyles.tipText}>Include complete headlines for better accuracy</Text>
          </View>
          
          <View style={homeStyles.tipCard}>
            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
            <Text style={homeStyles.tipText}>Always cross-verify with multiple sources</Text>
          </View>
          
          <View style={homeStyles.tipCard}>
            <Ionicons name="warning" size={20} color="#f59e0b" />
            <Text style={homeStyles.tipText}>Be cautious of emotionally charged content</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
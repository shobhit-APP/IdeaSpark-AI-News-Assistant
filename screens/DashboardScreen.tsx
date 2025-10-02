import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { cerebrasAPI } from '../services/cerebrasAPI';
import { dashboardStyles, globalStyles, gradientConfigs, theme } from '../styles';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }: any) {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    prediction: 'REAL' | 'FAKE';
    confidence: number;
    reasoning: string;
    sources: string[];
  } | null>(null);
  const { user, logout } = useAuth();

  const analyzeNews = async () => {
    if (!newsText.trim()) {
      Alert.alert('Error', 'Please enter some news text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysis = await cerebrasAPI.analyzeNews(newsText.trim());
      setResult(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert('Analysis Failed', 'Failed to analyze news. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearInput = () => {
    setNewsText('');
    setResult(null);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const getResultColor = () => {
    if (!result) return '#667eea';
    return result.prediction === 'REAL' ? '#10b981' : '#ef4444';
  };

  const getResultIcon = () => {
    if (!result) return 'search-outline';
    return result.prediction === 'REAL' ? 'shield-checkmark' : 'warning';
  };

  return (
    <SafeAreaView style={dashboardStyles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={gradientConfigs.primary as [string, string]}
        style={dashboardStyles.header}
      >
        <View style={dashboardStyles.headerContent}>
          <View>
            <Text style={dashboardStyles.welcomeText}>Welcome back,</Text>
            <Text style={dashboardStyles.userNameText}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity
            style={dashboardStyles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={globalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Analysis Card */}
        <View style={globalStyles.card}>
          <View style={globalStyles.cardHeader}>
            <Ionicons name="newspaper-outline" size={24} color="#667eea" />
            <Text style={globalStyles.cardTitle}>News Analyzer</Text>
          </View>
          
          <Text style={dashboardStyles.inputLabel}>Enter news text to verify:</Text>
          <TextInput
            style={dashboardStyles.textInput}
            placeholder="Paste or type news content here..."
            placeholderTextColor="#999"
            value={newsText}
            onChangeText={setNewsText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <View style={dashboardStyles.buttonRow}>
            <TouchableOpacity
              style={[dashboardStyles.analyzeButton, isAnalyzing && dashboardStyles.disabledButton]}
              onPress={analyzeNews}
              disabled={isAnalyzing}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={dashboardStyles.buttonGradient}
              >
                {isAnalyzing ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Ionicons name="search" size={20} color="#fff" />
                    <Text style={dashboardStyles.buttonText}>Analyze</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={dashboardStyles.clearButton}
              onPress={clearInput}
            >
              <Text style={dashboardStyles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Result Card */}
        {result && (
          <View style={[dashboardStyles.resultCard, { borderLeftColor: getResultColor() }]}>
            <View style={dashboardStyles.resultHeader}>
              <View style={[dashboardStyles.resultIcon, { backgroundColor: getResultColor() }]}>
                <Ionicons name={getResultIcon()} size={24} color="#fff" />
              </View>
              <View style={dashboardStyles.resultInfo}>
                <Text style={[dashboardStyles.resultTitle, { color: getResultColor() }]}>
                  {result.prediction === 'REAL' ? 'Likely Real News ✓' : 'Likely Fake News ⚠️'}
                </Text>
                <Text style={dashboardStyles.confidenceText}>
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </Text>
              </View>
            </View>

            <View style={dashboardStyles.confidenceBar}>
              <View
                style={[
                  dashboardStyles.confidenceFill,
                  {
                    width: `${result.confidence * 100}%`,
                    backgroundColor: getResultColor(),
                  },
                ]}
              />
            </View>

            <Text style={dashboardStyles.sectionSubtitle}>Analysis:</Text>
            <Text style={dashboardStyles.resultDescription}>{result.reasoning}</Text>

            {result.sources.length > 0 && (
              <>
                <Text style={dashboardStyles.sectionSubtitle}>Suggested Sources:</Text>
                {result.sources.map((source, index) => (
                  <View key={index} style={dashboardStyles.sourceItem}>
                    <Ionicons name="link-outline" size={16} color="#667eea" />
                    <Text style={dashboardStyles.sourceText}>{source}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}

        {/* AI Features Grid */}
        <View style={dashboardStyles.featuresSection}>
          <Text style={dashboardStyles.sectionTitle}>AI Features</Text>
          
          <View style={dashboardStyles.featuresGrid}>
            <TouchableOpacity 
              style={dashboardStyles.featureCard}
              onPress={() => navigation.navigate('AIChat')}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={dashboardStyles.featureGradient}
              >
                <Ionicons name="sparkles" size={32} color="#fff" />
                <Text style={dashboardStyles.featureTitle}>AI Chat</Text>
                <Text style={dashboardStyles.featureDesc}>Chat with AI Assistant</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={dashboardStyles.featureCard}
              onPress={() => navigation.navigate('IdeaGenerator')}
            >
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={dashboardStyles.featureGradient}
              >
                <Ionicons name="bulb" size={32} color="#fff" />
                <Text style={dashboardStyles.featureTitle}>Ideas</Text>
                <Text style={dashboardStyles.featureDesc}>Generate Creative Ideas</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={dashboardStyles.featureCard}
              onPress={() => navigation.navigate('TextTools')}
            >
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={dashboardStyles.featureGradient}
              >
                <Ionicons name="create" size={32} color="#fff" />
                <Text style={dashboardStyles.featureTitle}>Text Tools</Text>
                <Text style={dashboardStyles.featureDesc}>Improve & Summarize</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={dashboardStyles.featureCard}
              onPress={() => Alert.alert('Coming Soon', 'More features coming soon!')}
            >
              <LinearGradient
                colors={['#43e97b', '#38f9d7']}
                style={dashboardStyles.featureGradient}
              >
                <Ionicons name="apps" size={32} color="#fff" />
                <Text style={dashboardStyles.featureTitle}>More</Text>
                <Text style={dashboardStyles.featureDesc}>Coming Soon</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Card */}
        <View style={dashboardStyles.statsCard}>
          <Text style={dashboardStyles.sectionTitle}>Your Stats</Text>
          <View style={dashboardStyles.statsRow}>
            <View style={dashboardStyles.statItem}>
              <Text style={dashboardStyles.statNumber}>24</Text>
              <Text style={dashboardStyles.statLabel}>Analyzed</Text>
            </View>
            <View style={dashboardStyles.statDivider} />
            <View style={dashboardStyles.statItem}>
              <Text style={dashboardStyles.statNumber}>18</Text>
              <Text style={dashboardStyles.statLabel}>Real</Text>
            </View>
            <View style={dashboardStyles.statDivider} />
            <View style={dashboardStyles.statItem}>
              <Text style={dashboardStyles.statNumber}>6</Text>
              <Text style={dashboardStyles.statLabel}>Fake</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  keyboardAvoidingView: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  
  appTitle: {
    fontSize: theme.fontSize.title + 4,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  
  appSubtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Form Section
  formContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  
  formTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  
  inputLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.lg,
    color: theme.colors.textPrimary,
    minHeight: 48,
  },
  
  inputFocused: {
    borderColor: theme.colors.primary,
    ...theme.shadows.small,
  },
  
  inputError: {
    borderColor: theme.colors.error,
  },
  
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
  
  // Button Section
  buttonContainer: {
    marginTop: theme.spacing.xl,
  },
  
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    minHeight: 50,
    marginBottom: theme.spacing.md,
  },
  
  loginButtonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  
  loginButtonText: {
    color: theme.colors.textWhite,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
  },
  
  forgotPasswordButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
  },
  
  // Footer Section
  footerSection: {
    alignItems: 'center',
    marginTop: theme.spacing.xxxl,
  },
  
  signupPrompt: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  
  signupButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  
  signupButtonText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: 'bold',
  },
  
  // Loading Styles
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: theme.zIndex.overlay,
  },
  
  loadingContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.lg,
    color: theme.colors.textPrimary,
  },

  // Additional styles from LoginScreen
  gradient: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  logoSection: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },

  appSubtitleEnhanced: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  formContainerEnhanced: {
    flex: 0.6,
    paddingHorizontal: 20,
  },

  cardEnhanced: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },

  signInText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },

  inputContainerEnhanced: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },

  inputIcon: {
    marginRight: 12,
  },

  inputEnhanced: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },

  eyeIcon: {
    padding: 4,
  },

  loginButtonEnhanced: {
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },

  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.7,
  },

  loginButtonTextEnhanced: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  demoNote: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  demoText: {
    color: '#1976d2',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
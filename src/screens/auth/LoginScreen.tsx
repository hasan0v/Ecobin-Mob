import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/ui/Button';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🌱</Text>
            <Text style={styles.title}>Xoş gəldiniz!</Text>
            <Text style={styles.subtitle}>
              Davam etmək üçün hesabınıza daxil olun
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-poçt</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>📧</Text>
                <TextInput
                  style={styles.input}
                  placeholder="mail@example.com"
                  placeholderTextColor={colors.light.text.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Şifrə</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.light.text.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setSecureText(!secureText)}
                >
                  <Text style={styles.eyeIconText}>{secureText ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={onForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Şifrəni unutmusunuz?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              title="Daxil ol"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>və ya</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>🔵</Text>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>⚫</Text>
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Hesabınız yoxdur? </Text>
            <TouchableOpacity onPress={onNavigateToRegister}>
              <Text style={styles.footerLink}>Qeydiyyatdan keçin</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.variants.h1,
    color: colors.light.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.variants.body,
    color: colors.light.text.secondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing['2xl'],
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.variants.label,
    color: colors.light.text.primary,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.light.border,
    paddingHorizontal: spacing.base,
    height: 56,
    ...shadows.sm,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    ...typography.variants.body,
    color: colors.light.text.primary,
    height: '100%',
  },
  eyeIcon: {
    padding: spacing.sm,
  },
  eyeIconText: {
    fontSize: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotPasswordText: {
    ...typography.variants.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.light.border,
  },
  dividerText: {
    ...typography.variants.bodySmall,
    color: colors.light.text.muted,
    marginHorizontal: spacing.base,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.button,
    borderWidth: 1,
    borderColor: colors.light.border,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    ...shadows.sm,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialButtonText: {
    ...typography.variants.label,
    color: colors.light.text.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing['2xl'],
  },
  footerText: {
    ...typography.variants.body,
    color: colors.light.text.secondary,
  },
  footerLink: {
    ...typography.variants.body,
    color: colors.primary,
    fontWeight: '700',
  },
});

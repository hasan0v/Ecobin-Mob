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

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = async () => {
    if (!agreedToTerms) {
      alert('Zəhmət olmasa şərtləri qəbul edin');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Şifrələr uyğun gəlmir');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess();
    }, 1500);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            <Text style={styles.title}>Hesab Yaradın</Text>
            <Text style={styles.subtitle}>
              EcoBin ailəsinə qoşulun və ağıllı təsərrüfatçılığa başlayın
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adınız</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ad Soyad"
                  placeholderTextColor={colors.light.text.muted}
                  value={formData.name}
                  onChangeText={(value) => updateField('name', value)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-poçt</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>📧</Text>
                <TextInput
                  style={styles.input}
                  placeholder="mail@example.com"
                  placeholderTextColor={colors.light.text.muted}
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefon</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>📱</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+994 XX XXX XX XX"
                  placeholderTextColor={colors.light.text.muted}
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  keyboardType="phone-pad"
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
                  placeholder="Minimum 8 simvol"
                  placeholderTextColor={colors.light.text.muted}
                  value={formData.password}
                  onChangeText={(value) => updateField('password', value)}
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

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Şifrəni təsdiqləyin</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Şifrəni təkrarlayın"
                  placeholderTextColor={colors.light.text.muted}
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateField('confirmPassword', value)}
                  secureTextEntry={secureConfirmText}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setSecureConfirmText(!secureConfirmText)}
                >
                  <Text style={styles.eyeIconText}>
                    {secureConfirmText ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms & Conditions */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                <Text style={styles.termsText}>İstifadə Şərtlərini</Text> və{' '}
                <Text style={styles.termsText}>Məxfilik Siyasətini</Text> qəbul edirəm
              </Text>
            </TouchableOpacity>

            {/* Register Button */}
            <Button
              title="Qeydiyyatdan keç"
              onPress={handleRegister}
              loading={loading}
              fullWidth
              style={styles.registerButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>və ya</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Registration Buttons */}
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
            <Text style={styles.footerText}>Artıq hesabınız var? </Text>
            <TouchableOpacity onPress={onNavigateToLogin}>
              <Text style={styles.footerLink}>Daxil olun</Text>
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
    paddingTop: spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  logo: {
    fontSize: 56,
    marginBottom: spacing.base,
  },
  title: {
    ...typography.variants.h2,
    color: colors.light.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.variants.bodySmall,
    color: colors.light.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.base,
  },
  form: {
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.base,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.light.border,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.light.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  checkboxLabel: {
    ...typography.variants.bodySmall,
    color: colors.light.text.secondary,
    flex: 1,
  },
  termsText: {
    color: colors.primary,
    fontWeight: '600',
  },
  registerButton: {
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
    marginTop: spacing.lg,
    paddingBottom: spacing.xl,
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

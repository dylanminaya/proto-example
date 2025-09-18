import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

interface LoggedInScreenProps {
  userEmail: string;
  userTokens: {
    access_token: string;
    refresh_token: string;
  };
  onLogout: () => void;
}

export default function LoggedInScreen({ userEmail, userTokens, onLogout }: LoggedInScreenProps) {
  return (
    <View style={styles.loggedInContainer}>
      <Text style={styles.welcomeTitle}>Welcome!</Text>
      <Text style={styles.welcomeSubtitle}>Login Successful</Text>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>Email:</Text>
        <Text style={styles.userInfoValue}>{userEmail}</Text>
      </View>

      <View style={styles.tokenContainer}>
        <Text style={styles.tokenLabel}>Access Token:</Text>
        <View style={styles.tokenValueContainer}>
          <Text style={styles.tokenValue}>{userTokens ? userTokens.access_token : ''}</Text>
        </View>
      </View>

      <View style={styles.tokenContainer}>
        <Text style={styles.tokenLabel}>Refresh Token:</Text>
        <View style={styles.tokenValueContainer}>
          <Text style={styles.tokenValue}>{userTokens ? userTokens.refresh_token : ''}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  userInfoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  userInfoValue: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  tokenContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  tokenValueContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  tokenValue: {
    fontSize: 12,
    color: '#1a1a1a',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

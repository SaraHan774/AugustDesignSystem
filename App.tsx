/**
 * AugustDesignSystem - Demo App
 *
 * Showcases all design system components and tokens
 */

import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@theme';
import { ShowcasePage } from './src/showcase';

/**
 * AppContent - 메인 앱 컨텐츠
 * StatusBar와 ShowcasePage를 포함하는 최상위 컴포넌트
 */
function AppContent(): React.ReactElement {
  const { isDark } = useTheme();

  return (
    <View style={{ "flex": 1 }}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent"
        translucent
      />
      <ShowcasePage />
    </View>
  );
}

/**
 * App - 앱의 최상위 컴포넌트
 * SafeAreaProvider와 ThemeProvider로 앱을 감싸고 ShowcasePage를 메인 페이지로 표시
 */
function App(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <ThemeProvider defaultColorMode="system">
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

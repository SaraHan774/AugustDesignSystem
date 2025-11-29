/**
 * SearchBarShowcase - Displays SearchBar component variants and configurations
 */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { SearchBar } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface SearchBarGroupProps {
  title: string;
  children: React.ReactNode;
}

function SearchBarGroup({ title, children }: SearchBarGroupProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    content: {
      gap: theme.spacing.md,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function SearchBarShowcase(): React.ReactElement {
  const [basicValue, setBasicValue] = useState('');
  const [loadingValue, setLoadingValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debounceValue, setDebounceValue] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  const styles = useThemedStyles((theme) => ({
    description: {
      ...theme.typography.footnote,
      color: theme.colors.label.tertiary,
      marginTop: theme.spacing.xs,
    },
    resultText: {
      ...theme.typography.footnote,
      color: theme.colors.label.secondary,
      marginTop: theme.spacing.sm,
      fontStyle: 'italic',
    },
  }));

  const handleLoadingSearch = (text: string) => {
    setLoadingValue(text);
    if (text.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <ShowcaseSection
      title="SearchBar"
      description="iOS-style search bar with cancel button, clear, and loading states"
    >
      {/* Basic */}
      <SearchBarGroup title="Basic">
        <View>
          <SearchBar
            value={basicValue}
            onChangeText={setBasicValue}
            placeholder="Search conversations..."
          />
          <Text style={styles.description}>
            Tap to focus and show cancel button
          </Text>
        </View>
      </SearchBarGroup>

      {/* Loading State */}
      <SearchBarGroup title="Loading State">
        <View>
          <SearchBar
            value={loadingValue}
            onChangeText={handleLoadingSearch}
            placeholder="Type to search..."
            loading={isLoading}
          />
          <Text style={styles.description}>
            Shows spinner while searching
          </Text>
        </View>
      </SearchBarGroup>

      {/* Debounced */}
      <SearchBarGroup title="Debounced (300ms)">
        <View>
          <SearchBar
            value={debounceValue}
            onChangeText={(text) => {
              setDebounceValue(text);
              setDebouncedText(text);
            }}
            placeholder="Type to search..."
            debounceDelay={300}
          />
          {debouncedText ? (
            <Text style={styles.resultText}>
              Debounced value: "{debouncedText}"
            </Text>
          ) : null}
        </View>
      </SearchBarGroup>

      {/* Without Cancel Button */}
      <SearchBarGroup title="Without Cancel Button">
        <View>
          <SearchBar
            placeholder="Search without cancel..."
            showCancelButton={false}
          />
          <Text style={styles.description}>
            No cancel button on focus
          </Text>
        </View>
      </SearchBarGroup>

      {/* Custom Cancel Text */}
      <SearchBarGroup title="Custom Cancel Text">
        <View>
          <SearchBar
            placeholder="Search..."
            cancelButtonText="Done"
          />
          <Text style={styles.description}>
            Custom cancel button text
          </Text>
        </View>
      </SearchBarGroup>

      {/* Disabled */}
      <SearchBarGroup title="Disabled">
        <View>
          <SearchBar
            placeholder="Search disabled..."
            disabled
          />
          <Text style={styles.description}>
            Cannot interact when disabled
          </Text>
        </View>
      </SearchBarGroup>
    </ShowcaseSection>
  );
}

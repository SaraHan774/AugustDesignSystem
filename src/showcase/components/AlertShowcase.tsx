/**
 * AlertShowcase - Displays all alert/banner variants and configurations
 */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Alert } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface AlertGroupProps {
  title: string;
  children: React.ReactNode;
}

function AlertGroup({ title, children }: AlertGroupProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.md,
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

export function AlertShowcase(): React.ReactElement {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <ShowcaseSection
      title="Alert / Banner"
      description="Inline persistent notifications for important messages"
    >
      {/* Variants */}
      <AlertGroup title="Variants">
        <Alert
          variant="info"
          title="Information"
          description="This is an informational message."
        />
        <Alert
          variant="success"
          title="Success"
          description="Your changes have been saved successfully."
        />
        <Alert
          variant="warning"
          title="Warning"
          description="Your storage is almost full. Consider cleaning up."
        />
        <Alert
          variant="error"
          title="Error"
          description="Unable to connect to the server. Please try again."
        />
      </AlertGroup>

      {/* Description Only */}
      <AlertGroup title="Description Only">
        <Alert variant="info" description="This is a simple info message without a title." />
        <Alert variant="success" description="Operation completed successfully." />
      </AlertGroup>

      {/* With Actions */}
      <AlertGroup title="With Actions">
        <Alert
          variant="info"
          title="New Version Available"
          description="A new version of the app is available."
          action={{ label: 'Update', onPress: () => {} }}
        />
        <Alert
          variant="warning"
          title="Verify Your Email"
          description="Please verify your email to enable all features."
          action={{ label: 'Verify', onPress: () => {} }}
          secondaryAction={{ label: 'Later', onPress: () => {} }}
        />
      </AlertGroup>

      {/* Dismissible */}
      <AlertGroup title="Dismissible">
        {showDismissible ? (
          <Alert
            variant="info"
            title="Dismissible Alert"
            description="Tap the X to dismiss this alert."
            dismissible
            onDismiss={() => setShowDismissible(false)}
          />
        ) : (
          <Text style={{ color: '#8E8E93' }}>
            Alert dismissed. Refresh to see it again.
          </Text>
        )}
      </AlertGroup>

      {/* Without Accent Border */}
      <AlertGroup title="Without Accent">
        <Alert
          variant="info"
          description="This alert has no accent border on the left."
          showAccent={false}
        />
      </AlertGroup>

      {/* Without Icon */}
      <AlertGroup title="Without Icon">
        <Alert
          variant="success"
          title="Custom Alert"
          description="This alert has no icon."
          showIcon={false}
        />
      </AlertGroup>
    </ShowcaseSection>
  );
}

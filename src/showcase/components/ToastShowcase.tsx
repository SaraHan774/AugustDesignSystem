/**
 * ToastShowcase - Displays Toast component variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Button, useToast } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface ToastGroupProps {
  title: string;
  children: React.ReactNode;
}

function ToastGroup({ title, children }: ToastGroupProps): React.ReactElement {
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
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttons}>{children}</View>
    </View>
  );
}

export function ToastShowcase(): React.ReactElement {
  const { show } = useToast();

  return (
    <ShowcaseSection
      title="Toast"
      description="Notification toasts with variants, positions, and actions"
    >
      {/* Variants */}
      <ToastGroup title="Variants">
        <Button
          title="Default"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'This is a default toast message',
            })
          }
        />
        <Button
          title="Success"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'Operation completed successfully!',
              variant: 'success',
            })
          }
        />
        <Button
          title="Error"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'Something went wrong. Please try again.',
              variant: 'error',
            })
          }
        />
        <Button
          title="Warning"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'Please review before proceeding.',
              variant: 'warning',
            })
          }
        />
        <Button
          title="Info"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'Here is some helpful information.',
              variant: 'info',
            })
          }
        />
      </ToastGroup>

      {/* With Title */}
      <ToastGroup title="With Title">
        <Button
          title="Success with Title"
          variant="tinted"
          size="sm"
          onPress={() =>
            show({
              title: 'Message Sent',
              message: 'Your message has been delivered successfully.',
              variant: 'success',
            })
          }
        />
        <Button
          title="Error with Title"
          variant="tinted"
          size="sm"
          onPress={() =>
            show({
              title: 'Connection Failed',
              message: 'Unable to connect to the server. Check your internet.',
              variant: 'error',
            })
          }
        />
      </ToastGroup>

      {/* With Action */}
      <ToastGroup title="With Action">
        <Button
          title="With Undo"
          variant="outlined"
          size="sm"
          onPress={() =>
            show({
              message: 'Item deleted',
              variant: 'default',
              action: {
                label: 'Undo',
                onPress: () => {
                  show({
                    message: 'Item restored',
                    variant: 'success',
                  });
                },
              },
            })
          }
        />
        <Button
          title="With View"
          variant="outlined"
          size="sm"
          onPress={() =>
            show({
              title: 'New message',
              message: 'You have a new message from John',
              variant: 'info',
              action: {
                label: 'View',
                onPress: () => {
                  show({
                    message: 'Opening conversation...',
                    variant: 'default',
                  });
                },
              },
            })
          }
        />
      </ToastGroup>

      {/* Positions */}
      <ToastGroup title="Positions">
        <Button
          title="Top"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'This toast appears at the top',
              position: 'top',
            })
          }
        />
        <Button
          title="Bottom"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'This toast appears at the bottom',
              position: 'bottom',
            })
          }
        />
      </ToastGroup>

      {/* Duration */}
      <ToastGroup title="Duration">
        <Button
          title="Short (2s)"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'This disappears quickly',
              duration: 2000,
            })
          }
        />
        <Button
          title="Long (6s)"
          variant="gray"
          size="sm"
          onPress={() =>
            show({
              message: 'This stays longer on screen',
              duration: 6000,
            })
          }
        />
      </ToastGroup>
    </ShowcaseSection>
  );
}

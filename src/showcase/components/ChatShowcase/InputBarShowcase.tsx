/**
 * InputBarShowcase - Displays all InputBar variants and configurations
 */

import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useThemedStyles } from '@hooks';
import { InputBar } from '../../../design-system/components/Chat';
import { ShowcaseSection } from '../ShowcaseSection';

interface ShowcaseGroupProps {
  title: string;
  children: React.ReactNode;
}

function ShowcaseGroup({ title, children }: ShowcaseGroupProps): React.ReactElement {
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
    items: {
      gap: theme.spacing.md,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

export function InputBarShowcase(): React.ReactElement {
  const [basicMessage, setBasicMessage] = useState('');
  const [prefilledMessage, setPrefilledMessage] = useState('Hello there!');
  const [errorVisible, setErrorVisible] = useState(true);

  const handleSend = () => {
    Alert.alert('Send', `Sending: "${basicMessage}"`);
    setBasicMessage('');
  };

  const handleAttachment = () => {
    Alert.alert('Attachment', 'Opening file picker...');
  };

  return (
    <ShowcaseSection
      title="InputBar"
      description="Message input with send button, attachments, and error states"
    >
      {/* Basic Input */}
      <ShowcaseGroup title="Basic Input">
        <InputBar
          value={basicMessage}
          onChangeText={setBasicMessage}
          onSend={handleSend}
          onAttachment={handleAttachment}
        />
      </ShowcaseGroup>

      {/* With Prefilled Text */}
      <ShowcaseGroup title="With Prefilled Text">
        <InputBar
          value={prefilledMessage}
          onChangeText={setPrefilledMessage}
          onSend={() => Alert.alert('Send', prefilledMessage)}
          onAttachment={handleAttachment}
        />
      </ShowcaseGroup>

      {/* Custom Placeholder */}
      <ShowcaseGroup title="Custom Placeholder">
        <InputBar
          value=""
          onChangeText={() => {}}
          placeholder="Write a reply..."
          onSend={() => {}}
          onAttachment={handleAttachment}
        />
      </ShowcaseGroup>

      {/* Without Attachment Button */}
      <ShowcaseGroup title="Without Attachment Button">
        <InputBar
          value=""
          onChangeText={() => {}}
          onSend={() => {}}
          showAttachmentButton={false}
        />
      </ShowcaseGroup>

      {/* Sending State */}
      <ShowcaseGroup title="Sending State">
        <InputBar
          value="Sending this message..."
          onChangeText={() => {}}
          onSend={() => {}}
          sending
        />
      </ShowcaseGroup>

      {/* Disabled State */}
      <ShowcaseGroup title="Disabled State">
        <InputBar
          value=""
          onChangeText={() => {}}
          onSend={() => {}}
          disabled
          disabledMessage="You can't send messages to this user"
        />
      </ShowcaseGroup>

      {/* With Error Banner */}
      <ShowcaseGroup title="With Error Banner (Rate Limit)">
        {errorVisible && (
          <InputBar
            value=""
            onChangeText={() => {}}
            onSend={() => {}}
            errorMessage="You're sending messages too fast. Please wait a moment."
            onDismissError={() => setErrorVisible(false)}
            errorAutoDismiss={0}
          />
        )}
        {!errorVisible && (
          <Text style={{ color: '#666' }}>Error dismissed. Reload to see again.</Text>
        )}
      </ShowcaseGroup>
    </ShowcaseSection>
  );
}

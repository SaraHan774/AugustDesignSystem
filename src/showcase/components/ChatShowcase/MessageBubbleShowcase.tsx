/**
 * MessageBubbleShowcase - Displays all MessageBubble variants and configurations
 */

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useThemedStyles } from '@hooks';
import { MessageBubble } from '../../../design-system/components/Chat';
import { ShowcaseSection } from '../ShowcaseSection';

interface ShowcaseGroupProps {
  title: string;
  children: React.ReactNode;
  vertical?: boolean;
}

function ShowcaseGroup({ title, children, vertical = false }: ShowcaseGroupProps): React.ReactElement {
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
      flexDirection: vertical ? 'column' : 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
      alignItems: vertical ? 'stretch' : 'flex-start',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

export function MessageBubbleShowcase(): React.ReactElement {
  const now = new Date();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000);

  const handleRetry = () => {
    Alert.alert('Retry', 'Retrying to send message...');
  };

  const handleLongPress = () => {
    Alert.alert('Long Press', 'Show message options');
  };

  return (
    <ShowcaseSection
      title="MessageBubble"
      description="Chat message bubbles with text, image, and file support"
    >
      {/* Direction */}
      <ShowcaseGroup title="Direction" vertical>
        <MessageBubble
          direction="incoming"
          text="This is an incoming message from someone else"
          timestamp={tenMinAgo}
        />
        <MessageBubble
          direction="outgoing"
          text="This is an outgoing message that I sent"
          timestamp={fiveMinAgo}
          status="read"
        />
      </ShowcaseGroup>

      {/* Status Indicators */}
      <ShowcaseGroup title="Status Indicators" vertical>
        <MessageBubble
          direction="outgoing"
          text="Sending..."
          timestamp={now}
          status="sending"
        />
        <MessageBubble
          direction="outgoing"
          text="Message sent"
          timestamp={now}
          status="sent"
        />
        <MessageBubble
          direction="outgoing"
          text="Message delivered"
          timestamp={now}
          status="delivered"
        />
        <MessageBubble
          direction="outgoing"
          text="Message read"
          timestamp={now}
          status="read"
        />
      </ShowcaseGroup>

      {/* Failed Message with Retry */}
      <ShowcaseGroup title="Failed Message" vertical>
        <MessageBubble
          direction="outgoing"
          text="This message failed to send"
          status="failed"
          errorMessage="Network connection lost"
          onRetry={handleRetry}
        />
      </ShowcaseGroup>

      {/* Group Chat */}
      <ShowcaseGroup title="Group Chat (with sender names)" vertical>
        <MessageBubble
          direction="incoming"
          text="Hey everyone! How's it going?"
          timestamp={tenMinAgo}
          isGroup
          senderName="Alice"
          showSenderName
        />
        <MessageBubble
          direction="incoming"
          text="I'm doing great, thanks!"
          timestamp={fiveMinAgo}
          isGroup
          senderName="Bob"
          showSenderName
        />
        <MessageBubble
          direction="outgoing"
          text="Same here! Ready for the meeting?"
          timestamp={now}
          status="read"
          isGroup
        />
      </ShowcaseGroup>

      {/* Deleted Message */}
      <ShowcaseGroup title="Deleted Message" vertical>
        <MessageBubble
          direction="incoming"
          isDeleted
          timestamp={fiveMinAgo}
        />
        <MessageBubble
          direction="outgoing"
          isDeleted
          timestamp={now}
        />
      </ShowcaseGroup>

      {/* File Message */}
      <ShowcaseGroup title="File Message" vertical>
        <MessageBubble
          type="file"
          direction="incoming"
          file={{
            name: 'Project_Proposal.pdf',
            size: 2 * 1024 * 1024,
            mimeType: 'application/pdf',
          }}
          timestamp={fiveMinAgo}
          onFilePress={() => Alert.alert('Download', 'Downloading file...')}
        />
        <MessageBubble
          type="file"
          direction="outgoing"
          file={{
            name: 'Report_Q4_2024.xlsx',
            size: 512 * 1024,
            mimeType: 'application/xlsx',
          }}
          timestamp={now}
          status="delivered"
          onFilePress={() => Alert.alert('Download', 'Downloading file...')}
        />
      </ShowcaseGroup>

      {/* Long Press Handler */}
      <ShowcaseGroup title="Interactive (long press to test)" vertical>
        <MessageBubble
          direction="incoming"
          text="Long press me to see options"
          timestamp={now}
          onLongPress={handleLongPress}
        />
        <MessageBubble
          direction="outgoing"
          text="Long press for message actions"
          timestamp={now}
          status="read"
          onLongPress={handleLongPress}
        />
      </ShowcaseGroup>

      {/* Continuous Messages (grouped corners) */}
      <ShowcaseGroup title="Continuous Messages (grouped corners)" vertical>
        <MessageBubble
          direction="incoming"
          text="First message in a group"
          timestamp={tenMinAgo}
          isFirstInGroup
          isLastInGroup={false}
        />
        <MessageBubble
          direction="incoming"
          text="Middle message"
          isFirstInGroup={false}
          isLastInGroup={false}
        />
        <MessageBubble
          direction="incoming"
          text="Last message in the group"
          timestamp={fiveMinAgo}
          isFirstInGroup={false}
          isLastInGroup
        />
      </ShowcaseGroup>
    </ShowcaseSection>
  );
}

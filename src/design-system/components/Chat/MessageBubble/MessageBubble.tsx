/**
 * AugustDesignSystem - MessageBubble Component
 *
 * A chat message bubble component following Apple Human Interface Guidelines.
 * Supports text, image, and file messages with status indicators and group chat features.
 *
 * @example
 * ```tsx
 * // Basic outgoing text message
 * <MessageBubble
 *   direction="outgoing"
 *   text="Hello! How are you?"
 *   timestamp={new Date()}
 *   status="read"
 * />
 *
 * // Incoming message in group chat
 * <MessageBubble
 *   direction="incoming"
 *   text="I'm doing great, thanks!"
 *   timestamp={new Date()}
 *   isGroup
 *   senderName="Jane"
 *   showSenderName
 * />
 *
 * // Image message
 * <MessageBubble
 *   type="image"
 *   direction="outgoing"
 *   image={{
 *     source: { uri: 'https://example.com/photo.jpg' },
 *     width: 1200,
 *     height: 800,
 *   }}
 *   timestamp={new Date()}
 *   onImagePress={() => openFullScreen()}
 * />
 *
 * // File message
 * <MessageBubble
 *   type="file"
 *   direction="incoming"
 *   file={{
 *     name: 'document.pdf',
 *     size: 1024 * 1024 * 2,
 *     mimeType: 'application/pdf',
 *   }}
 *   timestamp={new Date()}
 *   onFilePress={() => downloadFile()}
 * />
 *
 * // Failed message with retry
 * <MessageBubble
 *   direction="outgoing"
 *   text="This message failed to send"
 *   status="failed"
 *   errorMessage="Network error"
 *   onRetry={() => resendMessage()}
 * />
 * ```
 */

import React, { useMemo, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  type ImageSourcePropType,
} from 'react-native';
import { useTheme } from '@theme';
import type { MessageBubbleProps } from './MessageBubble.types';
import {
  createMessageBubbleStyles,
  getDynamicMessageBubbleStyles,
  getChatColors,
  getMaxBubbleWidth,
  getImageDimensions,
  formatTimestamp,
  formatFileSize,
  getStatusColor,
} from './MessageBubble.styles';

/**
 * MessageBubble component for displaying chat messages.
 *
 * Features:
 * - Three message types (text, image, file)
 * - Incoming/outgoing alignment
 * - Status indicators (sending, sent, delivered, read, failed)
 * - Group chat sender name display
 * - Continuous message grouping (rounded corners)
 * - Deleted message state
 * - Error state with retry option
 * - Full accessibility support
 */
export function MessageBubble({
  // Content
  type = 'text',
  text,
  image,
  file,
  children,

  // Message metadata
  direction = 'incoming',
  status,
  timestamp,
  formattedTime,
  isGroup = false,
  senderName,
  showSenderName = true,
  isDeleted = false,
  errorMessage,

  // Layout
  maxWidthRatio = 0.75,
  isFirstInGroup = true,
  isLastInGroup = true,

  // Events
  onPress,
  onLongPress,
  onRetry,
  onImagePress,
  onFilePress,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  bubbleStyle,
  textStyle,
  timestampStyle,
  senderNameStyle,
}: MessageBubbleProps): React.ReactElement {
  const { theme } = useTheme();
  const [imageLoading, setImageLoading] = useState(true);

  // Create base styles
  const baseStyles = useMemo(
    () => createMessageBubbleStyles(theme),
    [theme]
  );

  // Get dynamic styles based on props
  const dynamicStyles = useMemo(
    () => getDynamicMessageBubbleStyles(direction, isFirstInGroup, isLastInGroup, isDeleted, theme),
    [direction, isFirstInGroup, isLastInGroup, isDeleted, theme]
  );

  // Get chat colors
  const chatColors = useMemo(() => getChatColors(theme), [theme]);

  // Calculate max width
  const maxWidth = useMemo(() => getMaxBubbleWidth(maxWidthRatio), [maxWidthRatio]);

  // Format display time
  const displayTime = useMemo(
    () => formattedTime || formatTimestamp(timestamp),
    [formattedTime, timestamp]
  );

  // Determine if we should show sender name
  const shouldShowSenderName = isGroup && direction === 'incoming' && showSenderName && senderName && isFirstInGroup;

  // Compute accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;

    const directionLabel = direction === 'outgoing' ? 'Sent' : 'Received';
    const senderLabel = senderName ? `from ${senderName}` : '';
    const timeLabel = displayTime ? `at ${displayTime}` : '';

    if (isDeleted) {
      return `${directionLabel} message ${senderLabel} ${timeLabel}. Deleted.`;
    }

    let contentLabel = '';
    switch (type) {
      case 'text':
        contentLabel = text || '';
        break;
      case 'image':
        contentLabel = 'Image';
        break;
      case 'file':
        contentLabel = `File: ${file?.name || 'Unknown'}`;
        break;
    }

    return `${directionLabel} ${senderLabel}: ${contentLabel}. ${timeLabel}`;
  }, [accessibilityLabel, direction, senderName, displayTime, isDeleted, type, text, file]);

  // Handle image load complete
  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // Render text content
  const renderTextContent = useCallback(() => {
    if (isDeleted) {
      return (
        <Text
          style={[
            baseStyles.text,
            baseStyles.deletedText,
            dynamicStyles.text,
            textStyle,
          ]}
          testID={testID ? `${testID}-deleted-text` : undefined}
        >
          This message was deleted
        </Text>
      );
    }

    return (
      <Text
        style={[baseStyles.text, dynamicStyles.text, textStyle]}
        testID={testID ? `${testID}-text` : undefined}
      >
        {text}
      </Text>
    );
  }, [isDeleted, baseStyles, dynamicStyles, textStyle, text, testID]);

  // Render image content
  const renderImageContent = useCallback(() => {
    if (!image) return null;

    const dimensions = getImageDimensions(image.width, image.height, maxWidth - 24);
    const resolvedSource: ImageSourcePropType = typeof image.source === 'string'
      ? { uri: image.source }
      : image.source;

    const imageContent = (
      <View style={[baseStyles.imageContainer, dimensions]}>
        <Image
          source={resolvedSource}
          style={[baseStyles.image, dimensions]}
          resizeMode="cover"
          onLoad={handleImageLoad}
          testID={testID ? `${testID}-image` : undefined}
        />
        {imageLoading && (
          <View style={baseStyles.imageLoading}>
            <ActivityIndicator size="small" color={theme.colors.label.tertiary} />
          </View>
        )}
      </View>
    );

    if (onImagePress) {
      return (
        <Pressable onPress={onImagePress} accessibilityRole="button" accessibilityLabel="View image">
          {imageContent}
        </Pressable>
      );
    }

    return imageContent;
  }, [image, maxWidth, baseStyles, handleImageLoad, imageLoading, theme, onImagePress, testID]);

  // Render file content
  const renderFileContent = useCallback(() => {
    if (!file) return null;

    const fileContent = (
      <View style={baseStyles.fileContainer}>
        <View style={baseStyles.fileIcon}>
          <Text style={{ fontSize: 16 }}>📄</Text>
        </View>
        <View style={baseStyles.fileInfo}>
          <Text
            style={[baseStyles.fileName, dynamicStyles.text]}
            numberOfLines={1}
            testID={testID ? `${testID}-file-name` : undefined}
          >
            {file.name}
          </Text>
          {file.size && (
            <Text style={baseStyles.fileSize} testID={testID ? `${testID}-file-size` : undefined}>
              {formatFileSize(file.size)}
            </Text>
          )}
        </View>
      </View>
    );

    if (onFilePress) {
      return (
        <Pressable onPress={onFilePress} accessibilityRole="button" accessibilityLabel={`Download ${file.name}`}>
          {fileContent}
        </Pressable>
      );
    }

    return fileContent;
  }, [file, baseStyles, dynamicStyles, onFilePress, testID]);

  // Render message content based on type
  const renderContent = useCallback(() => {
    if (children) return children;

    switch (type) {
      case 'image':
        return renderImageContent();
      case 'file':
        return renderFileContent();
      case 'text':
      default:
        return renderTextContent();
    }
  }, [type, children, renderImageContent, renderFileContent, renderTextContent]);

  // Render status indicator
  const renderStatus = useCallback(() => {
    if (!status || direction === 'incoming') return null;

    const statusColor = getStatusColor(status, direction, theme);

    let statusSymbol = '';
    switch (status) {
      case 'sending':
        return <ActivityIndicator size={10} color={statusColor} />;
      case 'sent':
        statusSymbol = '✓';
        break;
      case 'delivered':
        statusSymbol = '✓✓';
        break;
      case 'read':
        statusSymbol = '✓✓';
        break;
      case 'failed':
        statusSymbol = '!';
        break;
    }

    return (
      <Text style={[baseStyles.statusText, { color: statusColor }]} testID={testID ? `${testID}-status` : undefined}>
        {statusSymbol}
      </Text>
    );
  }, [status, direction, theme, baseStyles, testID]);

  // Render error state
  const renderError = useCallback(() => {
    if (status !== 'failed') return null;

    return (
      <View style={baseStyles.errorContainer}>
        <Text style={baseStyles.errorText}>
          {errorMessage || 'Failed to send'}
        </Text>
        {onRetry && (
          <Pressable
            style={baseStyles.retryButton}
            onPress={onRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry sending message"
          >
            <Text style={baseStyles.retryText}>Retry</Text>
          </Pressable>
        )}
      </View>
    );
  }, [status, errorMessage, onRetry, baseStyles]);

  // Render footer with timestamp and status
  const renderFooter = useCallback(() => {
    const hasFooterContent = displayTime || (status && direction === 'outgoing');
    if (!hasFooterContent) return null;

    return (
      <View
        style={[
          baseStyles.footer,
          direction === 'incoming' ? baseStyles.footerIncoming : baseStyles.footerOutgoing,
        ]}
      >
        {displayTime && (
          <Text
            style={[baseStyles.timestamp, dynamicStyles.timestamp, timestampStyle]}
            testID={testID ? `${testID}-timestamp` : undefined}
          >
            {displayTime}
          </Text>
        )}
        {direction === 'outgoing' && renderStatus()}
      </View>
    );
  }, [displayTime, status, direction, baseStyles, dynamicStyles, timestampStyle, renderStatus, testID]);

  // Main bubble content
  const bubbleContent = (
    <View
      style={[
        baseStyles.bubble,
        dynamicStyles.bubble,
        { maxWidth },
        bubbleStyle,
      ]}
      testID={testID ? `${testID}-bubble` : undefined}
    >
      {renderContent()}
    </View>
  );

  return (
    <View
      testID={testID}
      style={[
        baseStyles.container,
        direction === 'incoming' ? baseStyles.containerIncoming : baseStyles.containerOutgoing,
        style,
      ]}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityRole="text"
    >
      {/* Sender name for group chats */}
      {shouldShowSenderName && (
        <Text style={[baseStyles.senderName, senderNameStyle]} testID={testID ? `${testID}-sender` : undefined}>
          {senderName}
        </Text>
      )}

      {/* Bubble content - pressable if handlers provided */}
      {onPress || onLongPress ? (
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          style={baseStyles.bubbleWrapper}
          accessibilityRole="button"
        >
          {bubbleContent}
        </Pressable>
      ) : (
        <View style={baseStyles.bubbleWrapper}>
          {bubbleContent}
        </View>
      )}

      {/* Footer with timestamp and status */}
      {renderFooter()}

      {/* Error state with retry */}
      {renderError()}
    </View>
  );
}

// Set display name for debugging
MessageBubble.displayName = 'MessageBubble';

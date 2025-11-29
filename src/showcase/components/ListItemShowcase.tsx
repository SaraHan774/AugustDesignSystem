/**
 * ListItemShowcase - Displays all list item variants and configurations
 */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { ListItem, Icon } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface ListGroupProps {
  title: string;
  children: React.ReactNode;
}

function ListGroup({ title, children }: ListGroupProps): React.ReactElement {
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
    list: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>{children}</View>
    </View>
  );
}

export function ListItemShowcase(): React.ReactElement {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <ShowcaseSection
      title="ListItem"
      description="iOS-style table view cells for settings and lists"
    >
      {/* Basic */}
      <ListGroup title="Basic">
        <ListItem title="General" onPress={() => {}} />
        <ListItem title="Notifications" onPress={() => {}} />
        <ListItem title="Privacy" onPress={() => {}} showSeparator={false} />
      </ListGroup>

      {/* With Icons */}
      <ListGroup title="With Icons">
        <ListItem
          title="Wi-Fi"
          leftIcon="settings"
          leftIconBackground="#007AFF"
          value="Home Network"
          accessory="disclosure"
          onPress={() => {}}
        />
        <ListItem
          title="Bluetooth"
          leftIcon="settings"
          leftIconBackground="#007AFF"
          value="On"
          accessory="disclosure"
          onPress={() => {}}
        />
        <ListItem
          title="Cellular"
          leftIcon="settings"
          leftIconBackground="#34C759"
          accessory="disclosure"
          onPress={() => {}}
          showSeparator={false}
        />
      </ListGroup>

      {/* With Switch */}
      <ListGroup title="With Switch">
        <ListItem
          title="Wi-Fi"
          leftIcon="settings"
          leftIconBackground="#007AFF"
          accessory="switch"
          switchValue={wifiEnabled}
          onSwitchChange={setWifiEnabled}
        />
        <ListItem
          title="Notifications"
          leftIcon="bell-fill"
          leftIconBackground="#FF3B30"
          accessory="switch"
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
          showSeparator={false}
        />
      </ListGroup>

      {/* With Subtitle */}
      <ListGroup title="With Subtitle">
        <ListItem
          title="John Doe"
          subtitle="Last seen 5 minutes ago"
          leftIcon="person"
          accessory="disclosure"
          size="subtitle"
          onPress={() => {}}
        />
        <ListItem
          title="Jane Smith"
          subtitle="Online"
          leftIcon="person"
          accessory="disclosure"
          size="subtitle"
          onPress={() => {}}
          showSeparator={false}
        />
      </ListGroup>

      {/* Accessory Types */}
      <ListGroup title="Accessory Types">
        <ListItem
          title="Disclosure"
          accessory="disclosure"
          onPress={() => {}}
        />
        <ListItem
          title="Checkmark"
          accessory="checkmark"
          onPress={() => {}}
        />
        <ListItem
          title="Detail"
          accessory="detail"
          onPress={() => {}}
        />
        <ListItem
          title="Value"
          value="English"
          accessory="disclosure"
          onPress={() => {}}
          showSeparator={false}
        />
      </ListGroup>

      {/* Selection */}
      <ListGroup title="Selection">
        <ListItem
          title="Option 1"
          selected={selectedOption === 'option1'}
          accessory={selectedOption === 'option1' ? 'checkmark' : 'none'}
          onPress={() => setSelectedOption('option1')}
        />
        <ListItem
          title="Option 2"
          selected={selectedOption === 'option2'}
          accessory={selectedOption === 'option2' ? 'checkmark' : 'none'}
          onPress={() => setSelectedOption('option2')}
        />
        <ListItem
          title="Option 3"
          selected={selectedOption === 'option3'}
          accessory={selectedOption === 'option3' ? 'checkmark' : 'none'}
          onPress={() => setSelectedOption('option3')}
          showSeparator={false}
        />
      </ListGroup>

      {/* Destructive */}
      <ListGroup title="Destructive">
        <ListItem
          title="Delete Account"
          leftIcon="delete"
          destructive
          onPress={() => {}}
        />
        <ListItem
          title="Sign Out"
          destructive
          onPress={() => {}}
          showSeparator={false}
        />
      </ListGroup>

      {/* Disabled */}
      <ListGroup title="Disabled">
        <ListItem
          title="Coming Soon"
          subtitle="This feature is not yet available"
          disabled
          size="subtitle"
          showSeparator={false}
        />
      </ListGroup>
    </ShowcaseSection>
  );
}

/**
 * Mock for react-native-vector-icons in Storybook/Web environment
 *
 * Uses web fonts from Google Fonts for Material Icons.
 */

import React from 'react';

// Material Icons component using web fonts
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

// Common icon component using web font
function createIconComponent() {
  return function IconComponent({ name, size = 24, color = '#000', style }: IconProps) {
    return (
      <span
        className="material-icons"
        style={{
          fontSize: size,
          color: color,
          fontFamily: 'Material Icons',
          fontWeight: 'normal',
          fontStyle: 'normal',
          display: 'inline-block',
          lineHeight: 1,
          textTransform: 'none',
          letterSpacing: 'normal',
          wordWrap: 'normal',
          whiteSpace: 'nowrap',
          direction: 'ltr',
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'optimizeLegibility',
          MozOsxFontSmoothing: 'grayscale',
          fontFeatureSettings: "'liga'",
          ...style,
        }}
      >
        {name}
      </span>
    );
  };
}

// Default export for MaterialIcons
const MaterialIcons = createIconComponent();

export default MaterialIcons;
export { MaterialIcons };

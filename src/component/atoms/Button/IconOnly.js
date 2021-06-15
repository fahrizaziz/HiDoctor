import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconBackDark, IconBacklight } from '../../../assets';

const IconOnly = ({ onPress, icon }) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconBackDark />;
    }
    if (icon === 'back-light') {
      return <IconBacklight />;
    }
    return <IconBackDark />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

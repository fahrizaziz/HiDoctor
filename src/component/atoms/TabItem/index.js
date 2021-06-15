import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  IconDoctor,
  IconDoctorActive,
  IconMessages,
  IconMessagesActive,
  IconHospitals,
  IconHospitalsActive,
} from '../../../assets';
import { colors, fonts } from '../../../utils';

const TabItem = ({
  label, onLongPress, onPress, isFocused,
}) => {
  const Icon = () => {
    if (label === 'Doctor') {
      return isFocused ? <IconDoctorActive /> : <IconDoctor />;
    }
    if (label === 'Messages') {
      return isFocused ? <IconMessagesActive /> : <IconMessages />;
    }
    if (label === 'Hospitals') {
      return isFocused ? <IconHospitalsActive /> : <IconHospitals />;
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={isFocused ? styles.containerfocus : styles.container}
    >
      <Icon style={styles.icon} />
      {isFocused && <Text style={styles.text}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 5 },
  containerfocus: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.borderactive,
    flexDirection: 'row',
    borderRadius: 10,
    width: 101,
    height: 36,
  },
  text: {
    color: 'white',
    marginLeft: 12,
    fontSize: 12,
    fontFamily: fonts.primary[600],
  },
  icon: {
    marginHorizontal: 14,
    marginVertical: 8,
  },
});

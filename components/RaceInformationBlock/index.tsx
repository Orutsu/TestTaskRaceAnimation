import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const RaceInformationBlock = () => {
  return (
    <View style={styles.blockContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.cellContainer}>
          <Text style={styles.labelText}>TIME</Text>
          <Text style={styles.valueText}>00:00</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.labelText}>ALTITUDE</Text>
          <Text style={styles.valueText}>2650m</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.absoluteCenter}>
        <View style={styles.verticalLine} />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.cellContainer}>
          <Text style={styles.labelText}>DISTANCE</Text>
          <Text style={styles.valueText}>0km</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.labelText}>RIDE SCORE</Text>
          <Text style={styles.valueText}>0/1000</Text>
        </View>
      </View>
    </View>
  );
};

export default RaceInformationBlock

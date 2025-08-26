import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import AvatarIcon from '../../assets/icons/AvatarIcon.svg';

const MockTabBar = () => {
  return (
    <View style={styles.tabbarContainer}>
      <View style={styles.centralOval} />
      <View style={styles.tabBarItem}>
        <AvatarIcon />
        <Text style={styles.tabBarItemText}>Profile</Text>
      </View>
      <View style={styles.tabBarItem}>
        <AvatarIcon />
        <Text style={styles.tabBarItemText}>Challenges</Text>
      </View>
      <View style={styles.tabBarItem}>
        <AvatarIcon />
        <Text style={styles.tabBarItemText}>Record</Text>
      </View>
      <View style={styles.tabBarItem}>
        <AvatarIcon />
        <Text style={styles.tabBarItemText}>Leaderboards</Text>
      </View>
      <View style={styles.tabBarItem}>
        <AvatarIcon />
        <Text style={styles.tabBarItemText}>Stats</Text>
      </View>
    </View>
  );
};

export default MockTabBar;

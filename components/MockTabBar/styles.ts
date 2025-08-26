import { Dimensions, StyleSheet } from 'react-native';
export const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  tabbarContainer: {
    width: SCREEN_WIDTH,
    height: 75,
    backgroundColor: '#FCC201',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralOval: {
    backgroundColor: '#FCC201',
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -53 }],
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  tabBarItemText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 9,
    flexWrap: 'nowrap',
    textTransform: 'uppercase',
  },
});

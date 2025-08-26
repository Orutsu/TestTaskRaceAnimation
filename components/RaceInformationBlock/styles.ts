import { Dimensions, StyleSheet } from 'react-native';
export const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  blockContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  cellContainer: {
    width: SCREEN_WIDTH * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  labelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  horizontalLine: {
    height: 0.5,
    width: SCREEN_WIDTH,
    backgroundColor: '#FCC201',
  },
  verticalLine: {
    width: 0.5,
    height: 87,
    backgroundColor: '#FCC201',
  },
  absoluteCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

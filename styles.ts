import { Dimensions, StyleSheet } from 'react-native';

export const COLORS = {
  BACKGROUND_BLACK: '#121212',
  START_BUTTON_GREEN: '#292410',
  STOP_BUTTON_RED: '#FF000075',
  WHITE: '#FFFFFF',
  COUNTDOWN_START_BG: '#2A1010',
  COUNTDOWN_FINISH_BG: '##13410E',
};

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  safeAreaViewContainer: {
    backgroundColor: COLORS.BACKGROUND_BLACK,
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
  },
  topArcContainer: {
    position: 'absolute',
    top: -5,
  },
  startContentButtonContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  sentenceCountdownContainer: {
    width: SCREEN_WIDTH,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontWeight: '700',
    color: COLORS.WHITE,
    fontSize: 45,
  },
  mockTabbarContainer: {
    position: 'absolute',
    bottom: 0,
  },
  stopButtonBg: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.BACKGROUND_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

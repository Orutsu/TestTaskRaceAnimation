/* eslint-disable react-native/no-inline-styles */
import 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles, { COLORS } from './styles.ts';
import AnimatedCountdown, {
  AnimatedCountdownRef,
} from './components/AnimatedCountdown/index.tsx';
import { useEffect, useRef, useState } from 'react';
import AnimatedBgCircle, {
  AnimatedBgCircleRef,
} from './components/AnimatedBGCircle/index.tsx';
import TopArcYellow from './assets/icons/TopArcYellow.svg';
import TopArcRed from './assets/icons/TopArcRed.svg';
import LogoIcon from './assets/icons/LogoIcon.svg';
import RaceInformationBlock from './components/RaceInformationBlock/index.tsx';
import AnimatedSentenceCountdown, {
  AnimatedSentenceCountdownRef,
} from './components/AnimatedSentenceCountdown/index.tsx';
import MockTabBar from './components/MockTabBar/index.tsx';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

enum RaceStatus {
  NOT_STARTED,
  COUNTDOWN,
  IN_PROGRESS,
}

function AppContent() {
  const animatedCountdownRef = useRef<AnimatedCountdownRef>(null);
  const animatedBgCircleRef = useRef<AnimatedBgCircleRef>(null);
  const animatedSentenceCountdownRef =
    useRef<AnimatedSentenceCountdownRef>(null);
  const [raceProgress, setRaceProgress] = useState<RaceStatus>(
    RaceStatus.NOT_STARTED,
  );

  const onMainButtonPressHandle = () => {
    switch (raceProgress) {
      case RaceStatus.NOT_STARTED:
        setRaceProgress(RaceStatus.COUNTDOWN);
        break;
      case RaceStatus.IN_PROGRESS:
        setRaceProgress(RaceStatus.NOT_STARTED);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (raceProgress === RaceStatus.COUNTDOWN) {
      animatedCountdownRef.current?.start();
      animatedBgCircleRef.current?.start();
      animatedSentenceCountdownRef.current?.start();
    }
  }, [raceProgress]);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.mockTabbarContainer}>
        <MockTabBar />
      </View>
      <View style={styles.screenContainer}>
        {raceProgress !== RaceStatus.IN_PROGRESS && (
          <AnimatedSentenceCountdown
            ref={animatedSentenceCountdownRef}
            stepMs={1000}
            containerStyle={styles.sentenceCountdownContainer}
            textStyle={{ color: COLORS.WHITE }}
            items={[
              {
                text: 'THE ARE LOTS\n OF RULES YOU\n MUST FOLLOW...',
                fontSize: 20,
              },
              {
                text: 'BUT THE MOST\n IMPORTANT OF\n THEM ALL IS...',
                fontSize: 20,
              },
              { text: 'THERE', fontSize: 40, tiltDeg: 10 },
              { text: 'ARE', fontSize: 40, tiltDeg: -10 },
              { text: 'NO RULES!', fontSize: 40 },
            ]}
            hideOnFinish={true}
          />
        )}
        {raceProgress === RaceStatus.IN_PROGRESS && (
          <View style={styles.sentenceCountdownContainer}>
            <Text style={[styles.buttonText, { fontSize: 10 }]}>
              Ride score
            </Text>
            <Text style={[styles.buttonText, { fontSize: 40 }]}>630/1000</Text>
          </View>
        )}
        <View
          style={[
            styles.stopButtonBg,
            {
              backgroundColor:
                raceProgress === RaceStatus.IN_PROGRESS
                  ? COLORS.STOP_BUTTON_RED
                  : COLORS.BACKGROUND_BLACK,
            },
          ]}
        >
          <TouchableOpacity onPress={onMainButtonPressHandle}>
            <AnimatedBgCircle
              ref={animatedBgCircleRef}
              from="#2A1010"
              to="#13410E"
              durationMs={5000}
              size={203}
              defaultColor={
                raceProgress === RaceStatus.NOT_STARTED
                  ? COLORS.START_BUTTON_GREEN
                  : COLORS.STOP_BUTTON_RED
              }
              resetOnFinish={true}
              style={{ opacity: 0.7 }}
            >
              <View style={styles.topArcContainer}>
                {raceProgress === RaceStatus.NOT_STARTED ? (
                  <TopArcYellow />
                ) : (
                  <TopArcRed />
                )}
              </View>
              {raceProgress === RaceStatus.COUNTDOWN && (
                <>
                  <AnimatedCountdown
                    ref={animatedCountdownRef}
                    from={5}
                    to={1}
                    onFinish={() => setRaceProgress(RaceStatus.IN_PROGRESS)}
                  />
                </>
              )}
              {raceProgress === RaceStatus.NOT_STARTED && (
                <View style={styles.startContentButtonContainer}>
                  <LogoIcon />
                  <Text style={[styles.buttonText]}>START</Text>
                </View>
              )}
              {raceProgress === RaceStatus.IN_PROGRESS && (
                <View>
                  <Text style={styles.buttonText}>STOP</Text>
                </View>
              )}
            </AnimatedBgCircle>
          </TouchableOpacity>
        </View>
        <RaceInformationBlock />
      </View>
    </SafeAreaView>
  );
}

export default App;

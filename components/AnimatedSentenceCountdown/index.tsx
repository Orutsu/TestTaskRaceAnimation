import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import styles from './styles';

export type AnimatedSentenceCountdownRef = {
  start: () => void;
  stop: () => void;
};

export type SentenceItem = {
  text: string;
  fontSize?: number;
  tiltDeg?: number;
};

type Props = {
  items: SentenceItem[];
  stepMs?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  hideOnFinish?: boolean;
  onFinish?: () => void;
};

const AnimatedSentenceCountdown = forwardRef<AnimatedSentenceCountdownRef, Props>(
  (
    {
      items,
      stepMs = 1000,
      containerStyle,
      textStyle,
      hideOnFinish = true,
      onFinish,
    },
    ref,
  ) => {
    const [index, setIndex] = useState<number | null>(null);
    const timerRef = useRef(null);

    const opacity = useSharedValue(0);

    const animateStep = () => {
      opacity.value = 0;
      opacity.value = withSequence(
        withTiming(1, { duration: stepMs * 0.3 }),
        withTiming(1, { duration: stepMs * 0.4 }),
        withTiming(0, { duration: stepMs * 0.3 }),
      );
    };

    const animatedStyle = useAnimatedStyle(() => {
      return { opacity: opacity.value };
    });

    const clear = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const startAnimation = () => {
      if (!items?.length) return;
      clear();
      setIndex(0);
      animateStep();
      let i = 0;

      timerRef.current = setInterval(() => {
        const next = i + 1;
        if (next < items.length) {
          i = next;
          setIndex(i);
          animateStep();
        } else {
          clear();
          if (hideOnFinish) setIndex(null);
          onFinish?.();
        }
      }, stepMs);
    };

    const stopAnimation = () => {
      clear();
      setIndex(null);
    };

    useImperativeHandle(ref, () => ({ start: startAnimation, stop: stopAnimation }), [
      items,
      stepMs,
      hideOnFinish,
    ]);

    const current = index !== null ? items[index] : null;

    return (
      <View style={[styles.container, containerStyle]}>
        {current && (
          <Animated.Text
            style={[
              styles.text,
              textStyle,
              { fontSize: current.fontSize ?? 48 },
              { transform: [{ rotate: `${current?.tiltDeg ?? 0}deg` }] },
              animatedStyle,
            ]}
          >
            {current.text}
          </Animated.Text>
        )}
      </View>
    );
  },
);

export default AnimatedSentenceCountdown;

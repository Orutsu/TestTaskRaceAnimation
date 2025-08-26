import 'react-native-reanimated';

import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';

export type AnimatedCountdownRef = { start: () => void; stop: () => void };

type Props = {
  from: number;
  to: number;
  stepMs?: number;
  textStyle?: object;
  onFinish?: () => void;
};

const AnimatedCountdown = forwardRef<AnimatedCountdownRef, Props>(
  ({ from, to, stepMs = 1000, textStyle, onFinish }, ref) => {
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const animationValue = useSharedValue(0);
    const timerRef = useRef(null);

    const animateOnce = () => {
      animationValue.value = 0;
      animationValue.value = withTiming(1, {
        duration: 420,
        easing: Easing.out(Easing.cubic),
      });
    };

    const clearTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const startAnimation = () => {
      clearTimer();
      const step = from === to ? 0 : (to - from) / Math.abs(to - from);
      if (step === 0) {
        setCurrentNumber(null);
        onFinish?.();
        return;
      }
      setCurrentNumber(from);
      animateOnce();

      let current = from;
      timerRef.current = setInterval(() => {
        const next = current + step;
        if ((step < 0 && next >= to) || (step > 0 && next <= to)) {
          current = next;
          setCurrentNumber(current);
          animateOnce();
        } else {
          clearTimer();
          setCurrentNumber(null);
          onFinish?.();
        }
      }, stepMs);
    };

    const stopAnimation = () => {
      clearTimer();
      setCurrentNumber(null);
    };

    useImperativeHandle(ref, () => ({
      start: startAnimation,
      stop: stopAnimation,
    }));

    const animatedStyle = useAnimatedStyle(() => {
      return { transform: [{ scale: animationValue.value }], opacity: animationValue.value };
    });

    return (
      <View>
        {currentNumber !== null && (
          <Animated.Text style={[styles.text, animatedStyle, textStyle]}>
            {currentNumber}
          </Animated.Text>
        )}
      </View>
    );
  },
);

export default AnimatedCountdown;

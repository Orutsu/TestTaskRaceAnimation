import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  ReactNode,
  useEffect,
} from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import styles from './styles';
export type AnimatedBgCircleRef = { start: () => void; stop: () => void };
type Props = {
  children?: ReactNode;
  from: string;
  to: string;
  durationMs?: number;
  size?: number;
  style?: ViewStyle;
  defaultColor?: string;
  easing?: (value: number) => number;
  onFinish?: () => void;
  resetOnFinish?: boolean;
};
const AnimatedBgCircle = forwardRef<AnimatedBgCircleRef, Props>(
  function AnimatedBgCircle(
    {
      children,
      from,
      to,
      durationMs = 5000,
      size = 160,
      style,
      defaultColor,
      easing = Easing.in(Easing.cubic),
      onFinish,
      resetOnFinish = false,
    }: Props,
    ref,
  ): React.ReactElement | null {
    const baseColor = defaultColor ?? from;
    const fromColorAnimationValue = useSharedValue<string>(baseColor);
    const toColorAnimationValue = useSharedValue<string>(baseColor);
    const progressAnimationValue = useSharedValue(0);
    const runningRef = useRef(false);
    useEffect(() => {
      const newBase = defaultColor ?? from;
      fromColorAnimationValue.value = newBase;
      toColorAnimationValue.value = newBase;
      progressAnimationValue.value = 1;
    }, [defaultColor, from]);
    const startAnimation = () => {
      cancelAnimation(progressAnimationValue);
      runningRef.current = true;
      fromColorAnimationValue.value = from;
      toColorAnimationValue.value = to;
      progressAnimationValue.value = 0;
      progressAnimationValue.value = withTiming(
        1,
        { duration: durationMs, easing },
        finished => {
          runningRef.current = false;
          if (finished && resetOnFinish) {
            fromColorAnimationValue.value = baseColor;
            toColorAnimationValue.value = baseColor;
            progressAnimationValue.value = 1;
          }
          if (finished && onFinish) {
            runOnJS(onFinish)();
          }
        },
      );
    };
    const stopAnimation = () => {
      runningRef.current = false;
      cancelAnimation(progressAnimationValue);
      fromColorAnimationValue.value = baseColor;
      toColorAnimationValue.value = baseColor;
      progressAnimationValue.value = 1;
    };
    useImperativeHandle(
      ref,
      () => ({ start: startAnimation, stop: stopAnimation }),
      [from, to, durationMs, baseColor, resetOnFinish],
    );
    const animatedStyle = useAnimatedStyle(() => {
      const bg = interpolateColor(
        progressAnimationValue.value,
        [0, 1],
        [fromColorAnimationValue.value, toColorAnimationValue.value],
      );
      return { backgroundColor: bg };
    });
    return (
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: baseColor,
          },
          animatedStyle,
          style,
        ]}
      >
        {children}
      </Animated.View>
    );
  },
);
export default AnimatedBgCircle;

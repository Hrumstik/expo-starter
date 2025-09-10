import { useTheme } from "@/contexts/ThemeContext";
import i18n from "@/utils/i18n";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, logoRotateAnim, progressAnim, onFinish]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: logoRotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <Image
            source={require("@/assets/icons/logo.png")}
            style={{
              width: 120,
              height: 120,
              marginBottom: 24,
            }}
            resizeMode="contain"
          />
        </Animated.View>

        <Text
          style={{
            fontFamily: "Poppins_800ExtraBold",
            fontSize: 32,
            color: colors.text,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Flavorly
        </Text>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          {i18n.t("discover_recipes")}
        </Text>

        <View
          style={{
            width: 80,
            height: 4,
            backgroundColor: colors.border,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.primary,
              borderRadius: 2,
              transform: [
                {
                  translateX: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-80, 0],
                  }),
                },
              ],
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: colors.textTertiary,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {i18n.t("loading_recipes")}
        </Text>
      </Animated.View>
    </View>
  );
}

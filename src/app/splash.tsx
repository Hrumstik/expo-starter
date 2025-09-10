import { SplashScreen } from "@/components/SplashScreen";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";

export default function SplashScreenPage() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const handleFinish = () => {
    setIsLoading(false);
    router.replace("/");
  };

  if (!isLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <SplashScreen onFinish={handleFinish} />
    </View>
  );
}

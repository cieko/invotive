import React, { useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KeyboardAwareScrollView({ children }: PropsWithChildren) {
  const [keyboardOffset, setKeyboardOffset] = useState(10);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOffset(110);
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(10);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardOffset}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          gap: 5,
        }}
      >
        <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

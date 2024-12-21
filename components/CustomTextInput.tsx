import { useController, Control, FieldValues, RegisterOptions } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

type CustomTextInputProps = {
  label: string;
  name: string;
} & TextInputProps;

export default function CustomTextInput({ label, name, ...props }: CustomTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <View>
      <Text className="mb-2 text-lg">{label}</Text>
      <TextInput
        value={value?.toString()}
        onChangeText={onChange}
        className={`rounded border border-gray-300 p-4 ${props.className}`}
        onBlur={onBlur}
        {...props}
      />
      {error?.message && (
        <Text className="text-red-500 mt-2">{error.message}</Text>
      )}
    </View>
  );
}

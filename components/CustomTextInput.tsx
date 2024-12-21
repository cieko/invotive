import { useController, Control, FieldValues, RegisterOptions } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

type CustomTextInputProps = {
  label: string;
  name: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions;
} & TextInputProps;

export default function CustomTextInput({ label, name, control, rules, ...props }: CustomTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <View>
      <Text className="mb-2 text-lg">{label}</Text>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChange}
        className={`rounded border border-gray-300 p-4 ${props.className}`}
        onBlur={onBlur}
      />
      {error?.message && (
        <Text className="text-red-500 mt-2">{error.message}</Text>
      )}
    </View>
  );
}

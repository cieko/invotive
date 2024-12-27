import { useState } from "react";
import { useController } from "react-hook-form";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface CustomDatePickerProps {
  name: string
  label: string
  placeholder: string
}

export default function CustomDatePicker({ name, label, placeholder }: CustomDatePickerProps) {

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name })

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  return (
    <View>
      <View>
        <Text className="text-lg">{label}</Text>
        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
          <TextInput
            value={value ? new Date(value).toDateString() : placeholder}
            editable={false}
            className="rounded border broder-gray-300 p-4"
          />
        </TouchableOpacity>
        <Text className="text-red-500">{error?.message}</Text>
      </View>

      <DateTimePickerModal
        date={value ? new Date(value) : new Date()}
        isVisible={isDatePickerVisible}
        onConfirm={(date) => {
          onChange(date)
          setIsDatePickerVisible(false)
        }}
        onCancel={() => {
          setIsDatePickerVisible(false)
        }}
        onHide={onBlur}
      />
    </View>
  )
}
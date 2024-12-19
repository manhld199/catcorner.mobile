import React, { useState } from "react";
import { View, Text } from "react-native";
import addressData from "./data.json";
import { IAddress } from "@/types/interfaces";
import { Input } from "@/components/Input";
import { SelectDefault } from "@/components";

// Khai báo kiểu cho props
interface AddressSelectProps {
  value: IAddress;
  onChange: React.Dispatch<React.SetStateAction<IAddress>>;
}

export default function AddressSelect({ value, onChange }: AddressSelectProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(value?.province || "");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(value?.district || "");
  const [selectedWard, setSelectedWard] = useState<string | null>(value?.ward || "");
  const [street, setStreet] = useState(value?.street || "");

  const provinces = addressData.map((province) => ({
    label: province.Name,
    value: province.Name,
  }));

  const districts = selectedProvince
    ? addressData
        .find((province) => province.Name === selectedProvince)
        ?.Districts.map((district) => ({
          label: district.Name,
          value: district.Name,
        }))
    : [];

  const wards = selectedDistrict
    ? addressData
        .find((province) => province.Name === selectedProvince)
        ?.Districts.find((district) => district.Name === selectedDistrict)
        ?.Wards.map((ward) => ({
          label: ward.Name,
          value: ward.Name,
        }))
    : [];

  const updateAddress = (
    key: "province" | "district" | "ward" | "street",
    value: string | null
  ) => {
    const newAddress = {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      street,
      [key]: value,
    };

    if (key === "province") {
      newAddress.district = "";
      newAddress.ward = "";
    }

    if (key === "district") {
      newAddress.ward = "";
    }

    onChange(newAddress);
  };

  return (
    <View className="flex flex-row flex-wrap gap-2 justify-between">
      <View className="w-[49%] flex flex-col gap-2">
        <Text className="font-c-semibold text-gray-700 mb-2">Số nhà</Text>
        <Input
          placeholder="Nhập số nhà"
          value={street}
          onChangeText={(text) => {
            setStreet(text);
            updateAddress("street", text);
          }}
        />
      </View>

      <View className="w-[49%] flex flex-col gap-2">
        <Text className="font-c-semibold text-gray-700 mb-2">Tỉnh/Thành phố</Text>
        <SelectDefault
          items={provinces}
          value={selectedProvince}
          onValueChange={(value) => {
            setSelectedProvince(value);
            updateAddress("province", value);
          }}
        />
      </View>

      <View className="w-[49%] flex flex-col gap-2">
        <Text className="font-c-semibold text-gray-700 mb-2">Quận/Huyện</Text>
        <SelectDefault
          items={districts}
          value={selectedDistrict}
          onValueChange={(value) => {
            setSelectedDistrict(value);
            updateAddress("district", value);
          }}
          disabled={!selectedProvince}
        />
      </View>

      <View className="w-[49%] flex flex-col gap-2">
        <Text className="font-c-semibold text-gray-700 mb-2">Phường/Xã</Text>
        <SelectDefault
          items={wards}
          value={selectedWard}
          onValueChange={(value) => {
            setSelectedWard(value);
            updateAddress("ward", value);
          }}
          disabled={!selectedDistrict}
        />
      </View>
    </View>
  );
}

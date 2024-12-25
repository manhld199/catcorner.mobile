import React, { useState } from "react";
import { View, Text } from "react-native";
import addressData from "./data.json";
import { IAddress } from "@/types/interfaces";
import { Input } from "@/components/Input";
import Select from "../default"; // Sử dụng component Select custom

// Khai báo kiểu cho props
interface AddressSelectProps {
  value: IAddress;
  onChange: React.Dispatch<React.SetStateAction<IAddress>>;
}

export default function AddressSelect({ value, onChange }: AddressSelectProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>(value?.province || "");
  const [selectedDistrict, setSelectedDistrict] = useState<string>(value?.district || "");
  const [selectedWard, setSelectedWard] = useState<string>(value?.ward || "");
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
          label: (ward as any).Name,
          value: (ward as any).Name,
        }))
    : [];

  const updateAddress = (key: "province" | "district" | "ward" | "street", value: string) => {
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
    <View className="flex-row flex-wrap justify-between gap-2">
      <View className="w-[49%]">
        <Text className="text-lg text-black dark:text-white font-c-medium mb-1">Số nhà</Text>
        <Input
          placeholder="Nhập số nhà"
          value={street}
          onChangeText={(text) => {
            setStreet(text);
            updateAddress("street", text);
          }}
        />
      </View>

      <View className="w-[49%]">
        <Text className="text-lg text-black dark:text-white font-c-medium mb-1">
          Tỉnh/Thành phố
        </Text>
        <Select
          items={provinces}
          value={selectedProvince}
          onValueChange={(value) => {
            setSelectedProvince(value);
            updateAddress("province", value);
          }}
        />
      </View>

      <View className="w-[49%]">
        <Text className="text-lg text-black dark:text-white font-c-medium mb-1">Quận/Huyện</Text>
        <Select
          items={districts as any}
          value={selectedDistrict}
          onValueChange={(value) => {
            setSelectedDistrict(value);
            updateAddress("district", value);
          }}
          disabled={!selectedProvince}
        />
      </View>

      <View className="w-[49%]">
        <Text className="text-lg text-black dark:text-white font-c-medium mb-1">Phường/Xã</Text>
        <Select
          items={wards as any}
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

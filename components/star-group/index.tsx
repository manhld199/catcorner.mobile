import React from "react";
import { View, StyleSheet } from "react-native";
import { Star, StarHalf } from "lucide-react-native";

const StarRating = ({
  rating,
  maxStars = 5,
  starSize = 24,
  starColor = "#FFD700",
}: {
  rating: number;
  maxStars?: number;
  starSize?: number;
  starColor?: string;
}) => {
  // console.log("raaaaaa", rating);
  // Chuyển rating thành các sao đầy, nửa sao, và sao trống
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
  const hasHalfStar = decimalPart >= 0.5 ? true : decimalPart > 0 && decimalPart < 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  // Tạo danh sách các sao
  const stars = [
    ...Array(fullStars).fill("full"),
    ...(hasHalfStar ? ["half"] : []),
    ...Array(emptyStars).fill("empty"),
  ];

  return (
    <View style={styles.container}>
      {stars.map((type, index) => {
        if (type === "full") {
          return <Star key={index} size={starSize} color={starColor} fill={starColor} />;
        }
        if (type === "half") {
          return (
            <View key={index} style={{ width: starSize, height: starSize }}>
              <Star size={starSize} color={starColor} />
              <StarHalf
                size={starSize}
                color={starColor}
                fill={starColor}
                style={styles.halfOverlay}
              />
            </View>
          );
        }
        return <Star key={index} size={starSize} color="#ccc" />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  halfOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default StarRating;

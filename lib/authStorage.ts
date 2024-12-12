import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.log("Error saving tokens: ", error);
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.log("Error getting access token: ", error);
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.log("Error getting refresh token: ", error);
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.log("Error clearing tokens: ", error);
  }
};

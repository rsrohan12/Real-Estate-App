import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };
  return (
    //SafeAreaView tag is mainly used for ios to not hide the content behind the status bar
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} 
        className="h-4/6 w-full" 
        resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReState
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"} 
            <Text className="text-primary-300">Your Ideal Home</Text> 
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to ReState with Google
          </Text>
          {/* TouchableOpacity is like button in react/nextjs */}
          <TouchableOpacity onPress={handleLogin}
          className="bg-white shadow-md shadow-zinc-300 
          rounded-full w-full py-4 mt-2">
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google}
              className="w-5 h-5"
              resizeMode="contain"/>
              
              <Text className="text-lg font-rubik-medium ml-2 text-black-200">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

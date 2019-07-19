import AsyncStorage from "@react-native-community/async-storage";

export const storeUserStatus = async (type) => {
    try {
        await AsyncStorage.setItem('@user_status', type)
    } catch (e) {
        // saving error
    }
}

export const getUserStatus = async () => {
    try {
        const value = await AsyncStorage.getItem('@user_status')
        if(value !== null) {
            console.log(value)
            return "normal_user"
        }
        else{
            storeUserStatus("normal_user").then(console.log("stored"))
            return "normal_user"
        }

    } catch(e) {
        console.log(e)
    }
}
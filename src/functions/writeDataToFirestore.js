import firestore from "@react-native-firebase/firestore"

const writeDataToFirestore = async (collection, data) => {
    try {
        const ref = firestore().collection(collection).doc()
        const response = await ref.set(data)
        return response
    } catch(error) {
        return error
    }
}

export default writeDataToFirestore
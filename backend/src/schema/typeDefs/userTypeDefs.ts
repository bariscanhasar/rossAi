import { ApolloServer } from "@apollo/server";

const userTypeDefs = `#graphql

type User {
    id: ID
    email: String
    createdAt: String
    updatedAt: String
    keychain: String
    firstName: String
    lastName: String
    isAgreementCheck: Boolean
    isPremium: Boolean
    deviceIdentifiers: [String!]
    fcmId:String
    subId: String
    role: UserRoleEnum
    deviceType: DeviceType

}





enum DeviceType {
    IOS
    ANDROID
    WEB
}
enum UserRoleEnum {
    USER
    ADMIN
    SUPERADMIN
}


type AuthResponse {
    code:String!
    success: Boolean!
    message: String!
    token: String!
    user: User
    is_new_user: Boolean!
}



enum StyleFilterEnum {
    POPULAR,
    NEWEST,
    EXPLORE,
    FEATURED
}
type OngoingProcessesResponse {
    models: [ReplicateModel]
    sets: [Set]
}
type lastSevenDayPredictionCount {
    date:String
    count:Int
}

type StatResponse {
    userCount:Int
    modelCount:Int
    predictionCount:Int
    setCount:Int
    lastSevenDayPredictionCount:[lastSevenDayPredictionCount]


}

`;

export default userTypeDefs;

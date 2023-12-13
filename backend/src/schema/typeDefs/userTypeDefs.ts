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
    user: User!
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
type Query {
    getAllUsers:[User]
    getUser(userId:String):User
    getReplicateModel:[ReplicateModel]
    getUserAllReplicateModels:[ReplicateModel]
    getAllSets(status:ReplicateStatusEnum,modelId:String):[Set]
    getSet(setId:String):Set
    getAllSetsAdmin:[Set]
    getAllReplicateModelsAdmin:[ReplicateModel]
    getStyle(styleId:ID!):Style
    getAllStyles(status:StyleFilterEnum):[Style]
    getAllPrompts:[Style]
    getPrompt(promptId:ID!):Prompt
    getUserAllCredits:[Credit]
    getAllCreditsAdmin:[Credit]
    onGoingProcess:OngoingProcessesResponse
    getAllStylesAdmin:[Style]
    homePageStats:StatResponse

}

type Mutation {
    googleLogin(googleIdToken:String): AuthResponse
    createStyle(name:String,banner:String,description:String,styleDetails:[String],styleImages:[String],isCollection:Boolean,isFeatured:Boolean):Style
    updateStyle(name:String,banner:String,description:String,styleDetails:[String],styleImages:[String],isCollection:Boolean,isFeatured:Boolean):Style
    register(firstName: String!, lastName:String!,email: String,password:String,keychain:String,isPremium:Boolean,deviceType:DeviceType,role:UserRoleEnum, isAgreementCheck: Boolean,subId:String): AuthResponse
    createPrompt(promptText:String, negativePrompt:String, steps:String, cfg:String, seeds:String, scheduler:String, gender:String, styleId:String ):Prompt
    updatePrompt(promptId:String,promptText:String, negativePrompt:String, steps:String, cfg:String, seeds:String, scheduler:String, gender:String, styleId:String ):Prompt
    upload_files(file:[Upload]!): File!
    createReplicateModel(instanceData:String,gender:String,image:String):ReplicateModel
    createReplicatePrediction(styleId:String,modelId:String):Set
    login(email:String,password:String):AuthResponse
    createOneCredit(userId:String,amount:Int,creditType:CreditTypeEnum):Credit
    deleteUser(userId:String):User
    anonRegister(deviceToken:String,deviceType:DeviceType,keychain:String,fcmId:String):AuthResponse
    retryCreateReplicateModel(modelId:String):ReplicateModel
    deletePrompt(promptId:String):Prompt
    deleteStyle(styleId:String):Style

    # ... Other mutation definitions ...
}
# ... Other type definitions if needed ...
`;

export default userTypeDefs;

import { ApolloServer } from "@apollo/server";

const userTypeDefs = `#graphql

type User {
    id: ID
    email: String
    created_at: String
    updated_at: String
    keychain: String
    first_name: String
    last_name: String
    is_agreement_checked: Boolean
    is_premium: Boolean
    deviceIdentifiers: [String!]
    subscription_id: String
    role: UserRoleEnum
    device_type: DeviceType
    sub_id: String
}




input UserInput {
    id: Int
    username: String
    first_name: String
    last_name: String
    email: String
    password: String
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

input UserCreateInput {
    id: ID
    first_name: String
    last_name: String
    email: String
    keychain: String
    device_type: DeviceType
    role:UserRoleEnum
    is_premium: Boolean
    created_at: String
    updated_at: String
    
}
input FileInput {
    filename: String!
    mimetype: String!
    encoding: String!
    content: String!
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
    getUser(user_id:String):User
    getReplicateModel:[ReplicateModel]
    getUserAllReplicateModels:[ReplicateModel]
    getAllSets(status:ReplicateStatusEnum,model_id:String):[Set]
    getSet(set_id:String):Set
    getAllSetsAdmin:[Set]
    getAllReplicateModelsAdmin:[ReplicateModel]
    getStyle(style_id:ID!):Style
    getAllStyles(status:StyleFilterEnum):[Style]
    getAllPrompts:[Style]
    getPrompt(prompt_id:ID!):Prompt
    getUserAllCredits:[Credit]
    getAllCreditsAdmin:[Credit]
    onGoingProcess:OngoingProcessesResponse
    getAllStylesAdmin:[Style]
    homePageStats:StatResponse

}

type Mutation {
    googleLogin(google_id_token:String): AuthResponse
    createStyle(name:String,banner:String,description:String,style_details:[String],style_images:[String],is_collection:Boolean,is_featured:Boolean):Style
    updateStyle(name:String,banner:String,description:String,style_details:[String],style_images:[String],is_collection:Boolean,is_featured:Boolean):Style
    register(first_name: String!, last_name:String!,email: String,password:String,keychain:String,is_premium:Boolean,device_type:DeviceType,role:UserRoleEnum, is_agreement_checked: Boolean,sub_id:String): AuthResponse
    deleteStyle(style_id:String):Style
    createPrompt(prompt:String, negative_prompt:String, steps:String, cfg:String, seeds:String, scheduler:String, gender:String, style_id:String ):Prompt
    upload_files(file:[Upload]!): File!
    createReplicateModel(instance_data:String,gender:String,image:String):ReplicateModel
    createReplicatePrediction(style_id:String,model_id:String):Set
    login(email:String,password:String):AuthResponse
    createOneCredit(user_id:Int,amount:Int,type:CreditTypeEnum):Credit
    deleteUser(user_id:String):User
    anonRegister(device_token:String,device_type:DeviceType,keychain:String,fcm_id:String):AuthResponse
    retryCreateReplicateModel(model_id:String):ReplicateModel
    deletePrompt(promptId:String):Prompt

    # ... Other mutation definitions ...
}
# ... Other type definitions if needed ...
`;

export default userTypeDefs;

import { ApolloServer } from "@apollo/server";

const indexTypeDefs = `#graphql


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

export default indexTypeDefs;

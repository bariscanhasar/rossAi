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
type Query {
    get_all_users:[User]
    
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

type Mutation {
    google_login(google_id_token:String): AuthResponse
    create_style(name:String,banner:String,description:String,style_details:[String],style_images:[String],is_collection:Boolean,is_featured:Boolean):Style
    update_style(name:String,banner:String,description:String,style_details:[String],style_images:[String],is_collection:Boolean,is_featured:Boolean):Style
    register(first_name: String!, last_name:String!,email: String,keychain:String,is_premium:Boolean,device_type:DeviceType,role:UserRoleEnum, is_agreement_checked: Boolean,sub_id:String): AuthResponse
    delete_style(style_id:String):Style
    create_prompt(prompt:String, negative_prompt:String, steps:String, cfg:String, seeds:String, scheduler:String, gender:String, style_id:String ):Prompt
    upload_files(file:[Upload]!): File!
    create_replicate_model(instance_data:String,gender:String):ReplicateModel
    create_prediction(style_id:String):ReplicatePrediction
    
    # ... Other mutation definitions ...
}
# ... Other type definitions if needed ...
`;

export default userTypeDefs;

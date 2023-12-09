import { gql } from '@apollo/client';

export const createStyle = gql`
    mutation createStyle(
    $name: String!,
    $banner: String!,
    $description: String!,
    $is_featured: Boolean!,
    $is_collection: Boolean!,
    $style_images: [String!]!,
    $style_details: [String!]!
    ) {
    createStyle(
    name: $name,
    banner: $banner,
    description: $description,
    is_featured: $is_featured,
    is_collection: $is_collection,
    style_images: $style_images,
    style_details: $style_details
    ) {
            banner
            createdAt
            description
            id
            is_collection
            is_featured
            name
        }
    }
`;

export const createPrompt = gql`
    mutation createPrompt(
        $prompt: String
        $negative_prompt: String
        $steps: String
        $cfg: String
        $seeds: String
        $scheduler: String
        $gender: String
        $style_id: String
    ) {
        createPrompt(
            prompt: $prompt
            negative_prompt: $negative_prompt
            steps: $steps
            cfg: $cfg
            seeds: $seeds
            scheduler: $scheduler
            gender: $gender
            style_id: $style_id
        ) {
            id
            prompt
            negative_prompt
            steps
            cfg
            seeds
            scheduler
            gender
            style_id
            createdAt
            updatedAt
            # Add other fields you want to retrieve after creating a prompt
        }
    }
`;



export const Login = gql`
    mutation login(
        $email: String
        $password:String
   

    ) {
        login(
            email: $email\
            password: $password

        ) {
            token
        }
    }
`;

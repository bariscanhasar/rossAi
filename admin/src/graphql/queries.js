import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql`
    query get_all_users {
        get_all_users {
            id
            first_name
            last_name
            email
            device_type
            is_agreement_checked
            is_premium
            keychain
            role
            sub_id
            created_at
        }
    }
`;

export const GET_ALL_STYLES = gql`
    query get_all_styles {
        get_all_styles {
            id
            name
            banner
        }
    }
`;


export const GET_STYLE = gql`
    query get_style($styleId: ID!) {
        get_style(style_id: $styleId) {
            id
            name
            banner
            description
            is_featured
            is_collection
            style_images {
                path
            }
            style_details {
                name
            }
        }
    }
`;

export const GET_ALL_PROMPTS = gql`
        query get_all_prompts {
            get_all_prompts {
                id
                name
                prompt{
                    id
                    prompt
                    gender
                }
          
            }
        }
    `

export const GET_PROMPT = gql`
        query get_prompt($prompt_id: ID!) {
            get_prompt(prompt_id: $prompt_id) {
                id
                prompt
                negative_prompt
                cfg
                steps
                scheduler
                gender
            }
        }

`
import { gql } from '@apollo/client'

export const getAllUsers = gql`
  query getAllUsers {
    getAllUsers {
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
`

export const getUser = gql`
  query getUser($user_id: String) {
    getUser(user_id: $user_id) {
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
`
export const getSet = gql`
  query getSet($set_id: String) {
    getSet(set_id: $set_id) {
      id
      user {
        first_name
        last_name
        email
      }
      images {
        id
        path
      }
      model {
        version
      }
    }
  }
`
export const getAllSetsAdmin = gql`
  query getAllSetsAdmin {
    getAllSetsAdmin {
      id
      user {
        first_name
        last_name
        email
      }
      images {
        id
      }
      model {
        name
      }
    }
  }
`

export const getAllStylesAdmin = gql`
  query getAllStylesAdmin {
    getAllStylesAdmin {
      id
      name
      banner
    }
  }
`

export const getStyle = gql`
  query getStyle($styleId: ID!) {
    getStyle(style_id: $styleId) {
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
`

export const getAllPrompts = gql`
  query getAllPrompts {
    getAllPrompts {
      id
      name
      prompt {
        id
        prompt
        gender
      }
    }
  }
`

export const getPrompt = gql`
  query getPrompt($prompt_id: ID!) {
    getPrompt(prompt_id: $prompt_id) {
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

export const getAllReplicateModelsAdmin = gql`
  query getAllReplicateModelsAdmin {
    getAllReplicateModelsAdmin {
      id
      name
      created_at
      status
      user {
        first_name
        last_name
        email
      }
    }
  }
`

export const getAllCreditsAdmin = gql`
  query getAllCreditsAdmin {
    getAllCreditsAdmin {
      id
      amount
      type
      created_at
      date
      user {
        first_name
        last_name
        email
      }
    }
  }
`
export const homePageStats = gql`
    query homePageStats {
        homePageStats {
            modelCount
            predictionCount
            setCount
            userCount
            lastSevenDayPredictionCount {
                count
                date
            }
        }
    }
`


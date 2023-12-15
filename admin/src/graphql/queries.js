import { gql } from '@apollo/client'

export const getAllUsers = gql`
  query getAllUsers {
    getAllUsers {
      id
      firstName
      lastName
      email
      deviceType
      isAgreementCheck
      isPremium
      keychain
      role
      subId
      createdAt
    }
  }
`

export const getUser = gql`
  query getUser($userId: String!){
    getUser(userId: $userId) {
      id
      firstName
      lastName
      email
      deviceType
      isAgreementCheck
      isPremium
      keychain
      role
      subId
      createdAt
    }
  }
`
export const getSet = gql`
  query getSet($setId: String) {
    getSet(setId: $setId) {
      id
      user {
        firstName
        lastName
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
        firstName
        lastName
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
    getStyle(styleId: $styleId) {
      id
      name
      banner
      description
      isFeatured
      isCollection
      styleImages {
        id
        path
      }
      styleDetails {
        id
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
        promptText
        gender
      }
    }
  }
`

export const getPrompt = gql`
  query getPrompt($promptId: ID!) {
    getPrompt(promptId: $promptId) {
      id
      promptText
      negativePrompt
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
      createdAt
      status
      user {
        firstName
        lastName
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
      createdAt
      date
      user {
        firstName
        lastName
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


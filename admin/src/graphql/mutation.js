import { gql } from '@apollo/client'

export const createStyle = gql`
  mutation createStyle(
    $name: String!
    $banner: String!
    $description: String!
    $isFeatured: Boolean!
    $isCollection: Boolean!
    $styleImages: [String!]!
    $styleDetails: [String!]!
    $details:[String]!
    $images:[String]!
  ) {
    createStyle(
      name: $name
      banner: $banner
      description: $description
      isFeatured: $isFeatured
      isCollection: $isCollection
      styleImages: $styleImages
      styleDetails: $styleDetails
      images: $images
      details: $details
    ) {
      banner
      createdAt
      description
      id
      isCollection
      isFeatured
      name
    }
  }
`

export const createPrompt = gql`
  mutation createPrompt(
    $promptText: String
    $negativePrompt: String
    $steps: String
    $cfg: String
    $seeds: String
    $scheduler: String
    $gender: String
    $styleId: String

  ) {
    createPrompt(
      promptText: $promptText
      negativePrompt: $negativePrompt
      steps: $steps
      cfg: $cfg
      seeds: $seeds
      scheduler: $scheduler
      gender: $gender
      styleId: $styleId
      
    ) {
      id
      promptText
      negativePrompt
      steps
      cfg
      seeds
      scheduler
      gender
      styleId
      createdAt
      updatedAt
      # Add other fields you want to retrieve after creating a prompt
    }
  }
`

export const updatePrompt = gql`
    mutation updatePrompt (
      $promptId:String
      $promptText: String
      $negativePrompt: String
      $steps: String
      $cfg: String
      $seeds: String
      $scheduler: String
      $gender: String
      $styleId: String
    ) {
      updatePrompt(
        promptId: $promptId
        promptText: $promptText
        negativePrompt: $negativePrompt
        steps: $steps
        cfg: $cfg
        seeds: $seeds
        scheduler: $scheduler
        gender: $gender
        styleId: $styleId
      ) {
        id
        promptText
        negativePrompt
        steps
        cfg
        seeds
        scheduler
        gender
        styleId
        createdAt
        updatedAt
      }
    }
`
export const createOneCredit = gql`
  mutation createOneCredit(
    $userId: String!
    $creditType: CreditTypeEnum!
    $amount: Int!
  ) {
    createOneCredit(
      userId: $userId
      creditType: $creditType
      amount: $amount
    ) {
      id
      type
      amount
    }
  }
`

export const deletePrompt = gql`
  mutation deletePrompt($promptId: String) {
    deletePrompt(promptId: $promptId) {
      id
    }
  }
`

export const deleteStyle = gql`
  mutation deleteStyle($styleId: String) {
    deleteStyle(styleId: $styleId) {
      id
    }
  }
`

export const Login = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password){
      token
    }
  }
`

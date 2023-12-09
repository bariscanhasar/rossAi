import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Login } from '../graphql/mutation'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  console.log(data)

  const [login, { loading, error }] = useMutation(Login)

  const handleLogin = async () => {
    try {
      const graphqlResponse = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      })
      if (graphqlResponse.data.login.token) {
        window.localStorage.setItem(
          'token',
          JSON.stringify(graphqlResponse.data.login.token),
        )
        window.location.reload()
        console.log(graphqlResponse.data.login.token)

      }
        navigate("/styles")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div
        style={{ height: 910, background: 'peachpuff' }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="card p-3">
          <div className="h3 text-center">Admin Login</div>
          <div className="card-body d-flex flex-column">
            <TextField
              className="mb-3"
              id="filled-basic"
              label="Email"
              variant="filled"
              name="email"
              onChange={handleInputChange}
            />
            <TextField
              className="mb-3"
              id="filled-basic"
              label="password"
              variant="filled"
              name="password"
              onChange={handleInputChange}
            />
            <Button onClick={handleLogin} variant="contained">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useMutation, useQuery } from '@apollo/client'
import { getAllUsers } from '../../graphql/queries'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { createOneCredit } from '../../graphql/mutation'

import * as React from 'react'
import { useState } from 'react'
import Alert from '@mui/material/Alert'

export default function CreateCredit() {
  const [show, setShow] = useState('none')
  const { loading, error, data } = useQuery(getAllUsers)
  const [credit, setCredit] = useState({
    userId: '',
    type: '',
    amount: '',
  })
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setCredit((prev) => ({ ...prev, [name]: value }))
  }
  const userData = data && data.getAllUsers ? data.getAllUsers : []

  const [createOneCreditMutation] = useMutation(createOneCredit)

  const handleCreateCredit = async () => {
    const gpqResponse = await createOneCreditMutation({
      variables: {
        userId: credit.userId,
        creditType: credit.type,
        amount: parseInt(credit.amount),
      },
    })
    if (gpqResponse.data) {
      setShow('block')
      // Set "none" after 3 seconds
      setTimeout(() => {
        setShow('none')
      }, 3000)

    }
  }

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div style={{ display: show }}>
          <Alert severity="success" color="info">
            Credit successfully created.
          </Alert>
        </div>
        <div className="d-flex flex-column  p-5">
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="userId"
              onChange={handleOnChange}
            >
              {userData &&
                userData.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.email}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="type"
              onChange={handleOnChange}
            >
              <MenuItem value="PREDICT">PREDICTION</MenuItem>
              <MenuItem value="TRAIN">TRAIN</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={handleOnChange}
            name="amount"
            className="w-25"
            id="filled-basic"
            label="Amount"
            variant="filled"
          />
          <div className="w-25 mt-3">
            <Button onClick={handleCreateCredit} variant="contained">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

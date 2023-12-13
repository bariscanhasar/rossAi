import TextField from '@mui/material/TextField'
import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useParams } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client'
import { getAllStylesAdmin, getPrompt } from '../graphql/queries'
import {deletePrompt, updatePrompt} from '../graphql/mutation'
import Button from '@mui/material/Button'
import { useState } from 'react'
import ProgressBar from '../components/circularProgress/circularProgress'
import Alert from "@mui/material/Alert";
export default function SinglePromptPage() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(getPrompt, {
    variables: { promptId: id },
  })
  const styleDataReq = useQuery(getAllStylesAdmin)
  const styleData = styleDataReq?.data?.getAllStylesAdmin || []
  const [isDirty, setIsDirty] = useState(false);
  const [show, setShow] = useState('none')
  const [deletePromptMutation] = useMutation(deletePrompt)
  const[updatePromptMutation] = useMutation(updatePrompt)
  const [prompt, setPrompt] = useState({
    styleId: '',
    promptText: '',
    negativePrompt: '',
    steps: '',
    cfg: '',
    seeds: '',
    scheduler: '',
    gender: '',
  })

  // If promptData is available, set the prompt state
  React.useEffect(() => {
    if (data && data.getPrompt) {
      setPrompt(data.getPrompt)
    }
  }, [data])

  console.log(prompt)

  if (loading) {
    return <ProgressBar />
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  const promptData = data && data.getPrompt ? data.getPrompt : null

  const handleChange = (e) => {
    const { name, value } = e.target
    setIsDirty(true);
    setPrompt((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
      const gpqResponse = await updatePromptMutation({
        variables:{
          promptId:promptData.id,
          promptText:prompt.promptText,
          negativePrompt:prompt.negativePrompt,
          steps:prompt.steps,
          cfg:prompt.cfg,
          scheduler:prompt.scheduler,
          gender:prompt.gender,
          styleId:prompt.styleId
        }
      })
    if(gpqResponse.data) {
      setShow('block')
      // Set "none" after 3 seconds
      setTimeout(() => {
        setShow('none')
      }, 3000)

    }

  }
  const handleDelete = async () => {
    const gpqResponse = await deletePromptMutation({
      variables: {
        promptId: promptData.id,
      },
    })
  }
  return (
      <div>
        <div style={{display: show}}>
          <Alert severity="success" color="info">
            Prompt successfully updated.
          </Alert>
        </div>
        <div className="d-flex flex-column">
          <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-filled-label">Style</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="styleId"
                onChange={handleChange}
            >
              {styleData &&
                  styleData.map((style) => (
                      <MenuItem value={style.id}>{style.name}</MenuItem>
                  ))}
            </Select>
          </FormControl>

          <div className="mb-3">
            <TextField
                name="promptText"
                id="filled-multiline-static"
                label="Prompt"
                fullWidth
                multiline
                rows={4}
                defaultValue={promptData.promptText}
                variant="filled"
                onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <TextField
                name="negativePrompt"
                id="filled-multiline-static"
                label="Negative Prompt"
                fullWidth
                multiline
                rows={6}
                defaultValue={promptData.negativePrompt}
                variant="filled"
                onChange={handleChange}
            />
          </div>
          <div className="w-25 mb-3">
            <TextField
                name="steps"
                id="filled-basic"
                label="Steps"
                variant="filled"
                defaultValue={promptData.steps}
                onChange={handleChange}
            />
          </div>
          <div className="w-25 mb-3">
            <TextField
                name="cfg"
                id="filled-basic"
                label="Cfg"
                variant="filled"
                defaultValue={promptData.cfg}
                onChange={handleChange}
            />
          </div>

          <div className="w-25 mb-3">
            <TextField
                name="seeds"
                id="filled-basic"
                label="Seeds"
                variant="filled"
                onChange={handleChange}
            />
          </div>

          <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-filled-label">
              Scheduler
            </InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={promptData.scheduler}
                name="scheduler"
                onChange={handleChange}
            >
              <MenuItem value="DDIM">DDIM</MenuItem>
              <MenuItem value="DPMSOLVERMULTISTEP">DPMSOLVERMULTISTEP</MenuItem>
              <MenuItem value="K_EULER">K_EULER</MenuItem>
              <MenuItem value="K_EULER_ANCESTRAL">K_EULER_ANCESTRAL</MenuItem>
              <MenuItem value="KLMS">KLMS</MenuItem>
              <MenuItem value="PNDM">PNDM</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={promptData.gender}
                name="gender"
                onChange={handleChange}
            >
              <MenuItem value="MALE">MALE</MenuItem>
              <MenuItem value="FEMALE">FEMALE</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <div className="d-flex justify-content-between p-3 bg-light">
            <Button disabled={!isDirty} variant="contained" color="primary" onClick={handleUpdate}>
              SAVE
            </Button>
            <div className="">
              <Button onClick={handleDelete} variant="contained" color="warning">
                DELETE
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}

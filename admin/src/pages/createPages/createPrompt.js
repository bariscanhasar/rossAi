import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import { useQuery } from '@apollo/client'
import { getAllStylesAdmin } from '../../graphql/queries'
import {createPrompt} from "../../graphql/mutation";
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Button from "@mui/material/Button";
export default function CreatePrompt() {
  const { loading, error, data } = useQuery(getAllStylesAdmin)
  const [prompt, setPrompt] = useState({
    style_id: '',
    prompt: '',
    negative_prompt: '',
    steps: '',
    cfg: '',
    seeds: '',
    scheduler: '',
    gender: '',
  })

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target

    if (type === 'select-one') {
      // Handle Select components
      setPrompt((prev) => ({ ...prev, [name]: value }))
    } else {
      // Handle other input components (e.g., TextField)
      setPrompt((prev) => ({ ...prev, [name]: value }))
    }
  }
  data && console.log(data.get_all_styles)

  const [createPromptMutation] = useMutation(createPrompt)

  const handleCreatePrompt = async () => {
    try {
      const { data } = await createPromptMutation({
        variables: {
          prompt: prompt.prompt,
          negative_prompt: prompt.negative_prompt,
          steps: prompt.steps,
          cfg: prompt.cfg,
          seeds: prompt.seeds,
          scheduler: prompt.scheduler,
          gender: prompt.gender,
          style_id: prompt.style_id,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  console.log(prompt)
  return (
    <div>
      <div className="d-flex flex-column">
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Style</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="style_id" // Specify the name attribute
            onChange={handleChange}
          >
            {data &&
              data.get_all_styles.map((style) => (
                <MenuItem key={style.id} value={style.id}>
                  {style.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div className="mb-3">
          <TextField
            id="filled-multiline-static"
            name="prompt"
            label="Prompt"
            fullWidth
            multiline
            rows={4}
            variant="filled"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <TextField
            name="negative_prompt"
            id="filled-multiline-static"
            label="Negative Prompt"
            fullWidth
            multiline
            rows={4}
            variant="filled"
            onChange={handleChange}
          />
        </div>
        <div className="w-25 mb-3">
          <TextField
            id="filled-basic"
            label="Steps"
            variant="filled"
            name="steps"
            onChange={handleChange}
          />
        </div>
        <div className="w-25 mb-3">
          <TextField
            id="filled-basic"
            label="Cfg"
            variant="filled"
            name="cfg"
            onChange={handleChange}
          />
        </div>

        <div className="w-25 mb-3">
          <TextField
            id="filled-basic"
            label="Seeds"
            variant="filled"
            name="seeds"
            onChange={handleChange}
          />
        </div>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Scheduler
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="scheduler" // Specify the name attribute
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
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>

          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="gender" // Specify the name attribute
            onChange={handleChange}
          >
            <MenuItem value="FEMALE">FEMALE</MenuItem>
            <MenuItem value="MALE">MALE</MenuItem>
          </Select>
        </FormControl>

        <div className="d-flex justify-content-between p-3 bg-light">
          <Button variant="contained" color="primary" onClick={handleCreatePrompt}>SAVE</Button>
          <div className="">
            <Button variant="contained" color="warning" onClick={handleCreatePrompt}>CLEAR</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

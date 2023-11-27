import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS, GET_STYLE } from '../graphql/queries'
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function SingleStylePage() {
  const fileInputRef = useRef()
  const [selectedImage, setSelectedImage] = useState(null)
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_STYLE, {
    variables: { styleId: id },
  })
    if(loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )

    }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const styleData = data && data.get_style ? data.get_style : null

  console.log(styleData)

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }

  const handleFileSelected = (e) => {
    // Handle the selected file here
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile))
    }
  }

  const handleDropAreaClick = () => {
    fileInputRef.current.click()
  }

  const handleDropAreaDragOver = (e) => {
    e.preventDefault()
  }

  const handleDropAreaDrop = (e) => {
    e.preventDefault()
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      setSelectedImage(URL.createObjectURL(droppedFiles[0]))
    }
  }
    console.log(styleData.style_images)
    const PF = "http://localhost:5001/upload/"
  return (
    <div className="d-flex flex-column">
      <div className="w-25 mb-3">
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          defaultValue={styleData.name}
        />
      </div>
      <span>Banner</span>
      <div className="mb-3 d-flex justify-content-center bg-light pb-2 pt-2">
        <div
          onClick={handleDropAreaClick}
          onDragOver={handleDropAreaDragOver}
          onDrop={handleDropAreaDrop}
          style={{
            cursor: 'pointer',
            width: 'fit-content',
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Drop a file here, or click to select it.
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>
      <div className="mb-3">
        {styleData && styleData.banner ? (
          <img
            src={PF + styleData.banner}
            alt="Selected Image"
            style={{ width: '100px', height: 'auto' }}
          />
        ) : (
          selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Image"
              style={{ width: '100px', height: 'auto' }}
            />
          )
        )}
      </div>
      <div className="mb-3">
        <TextField
          fullWidth
          id="filled-basic"
          label="Image Link"
          variant="filled"
          defaultValue={PF + styleData.banner}
        />
      </div>
      <div className="mb-3">
        <TextField
          fullWidth
          id="filled-basic"
          label="Description"
          variant="filled"
          defaultValue={styleData.description}
        />
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Is featured"
          />
          <FormControlLabel control={<Switch />} label="Is collection" />
        </FormGroup>
      </div>
      <span>Examples</span>
      <div className="mb-3 d-flex justify-content-center bg-light pb-2 pt-2">
        <div
          onClick={handleDropAreaClick}
          onDragOver={handleDropAreaDragOver}
          onDrop={handleDropAreaDrop}
          style={{
            cursor: 'pointer',
            width: 'fit-content',
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Drop a file here, or click to select it.
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>
      <div className="mb-3">
        {styleData &&
          styleData.style_images.map((style) => (
            <div className="mb-3">
              <img
                src={PF + style.path}
                alt="Selected Image"
                style={{ width: '100px', height: 'auto' }}
              />
              <TextField
                fullWidth
                id="filled-basic"
                label="Image Link"
                variant="filled"
                defaultValue={PF + style.path}
              />
            </div>
          ))}
      </div>

      <span>Details</span>
      <List dense={false}>
        {styleData &&
          styleData.style_details.map((detail) => (
            <ListItem>
              <div className="w-25 mb-3">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue={detail.name}
                />
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  )
}

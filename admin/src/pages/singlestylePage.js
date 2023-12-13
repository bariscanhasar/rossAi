import React, { useRef, useState, useEffect } from 'react'
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
import { getStyle, GET_STYLE } from '../graphql/queries'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import ProgressBar from "../components/circularProgress/circularProgress";

export default function SingleStylePage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [style, setStyle] = useState({
    name: '',
    description: '',
    banner: '',
    isFeatured: false,
    isCollection: false,
  })
  const { id } = useParams()
  const { loading, error, data } = useQuery(getStyle, {
    variables: { styleId: id },
  })
  const styleData = data && data.getStyle ? data.getStyle : null
  useEffect(() => {
    if (!loading && data && data.getStyle) {
      const styleData = data.getStyle
      setStyle({
        name: styleData.name,
        description: styleData.description,
        banner: styleData.banner,
        isFeatured: styleData.isFeatured,
        isCollection: styleData.isCollection,
        styleImages: styleData.styleImages,
        styleDetails: styleData.styleDetails,
      })
      setSelectedImage(styleData.banner ? PF + styleData.banner : null)
    }
  }, [loading, data])
    if (loading) {
        return <ProgressBar/>

    }

  if (error) {
    return <p>Error: {error.message}</p>
  }



  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile))
    }
  }

  const PF = `${process.env.REACT_APP_API}upload/`
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
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>
      <div className="mb-3">
        {styleData && styleData.banner ? (
          <img
            key={style.id}
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
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>
      <div className="mb-3">
        {styleData &&
          styleData.styleImages.map((style) => (
            <div className="mb-3">
              <img
                key={style.id}
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
          styleData.styleDetails.map((detail) => (
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
      <div className="d-flex justify-content-between p-3">
        <Button disabled variant="contained">
          Save
        </Button>
        <Button variant="contained">Delete</Button>
      </div>
    </div>
  )
}

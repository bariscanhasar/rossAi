import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { getStyle } from '../graphql/queries'
import { deleteStyle } from '../graphql/mutation'
import RemoveIcon from '@mui/icons-material/Remove'
import ProgressBar from '../components/circularProgress/circularProgress'

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
  const [deleteStyleMutation] = useMutation(deleteStyle)

  const handleDelete = async () => {
    const gpqResponse = await deleteStyleMutation({
      variables: {
        styleId: styleData.id,
      },
    })
    console.log(gpqResponse)
  }
  const styleData = data && data.getStyle ? data.getStyle : null






  if (loading) {
    return <ProgressBar />
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
          <div>
            <img
              key={style.id}
              src={styleData.banner}
              alt=""
              style={{ width: '100px', height: 'auto' }}
            />
            <RemoveIcon />
          </div>
        ) : (
          selectedImage && (
            <div>
              <img
                key={style.id}
                src={styleData.banner}
                alt=""
                style={{ width: '100px', height: 'auto' }}
              />
              <RemoveIcon />
            </div>
          )
        )}
      </div>
      <div className="mb-3">
        <TextField
          fullWidth
          id="filled-basic"
          label="Image Link"
          variant="filled"
          defaultValue={styleData.banner}
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
            control={<Switch checked={styleData.isFeatured} />}
            label="Is featured"
          />
          <FormControlLabel
            control={<Switch checked={styleData.isCollection} />}
            label="Is collection"
          />
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
        {styleData.images &&
          styleData.images.map((style) => (
            <div className="mb-3">
              <div>
                <img
                  src={style}
                  alt=""
                  style={{ width: '100px', height: 'auto' }}
                />

              </div>
              <TextField
                fullWidth
                id="filled-basic"
                label="Image Link"
                variant="filled"
                defaultValue={style}
              />
            </div>
          ))}
      </div>

      <span>Details</span>
      <List dense={false}>
        {styleData &&
          styleData.details &&
          styleData.details.map((detail) => (
            <ListItem>
              <div className="w-25 mb-3">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue={detail}
                />
              </div>
            </ListItem>
          ))}
      </List>
      <div className="d-flex justify-content-between p-3">
        <Button disabled variant="contained">
          Save
        </Button>
        <button onClick={handleDelete} className="btn btn-sm btn-danger">
          Delete
        </button>
      </div>
    </div>
  )
}

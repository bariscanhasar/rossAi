import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useMutation } from '@apollo/client'
import { createStyle } from '../../graphql/mutation'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import ProgressBar from "../../components/circularProgress/circularProgress";


const PF = "https://api.bariscanhasar.com/"
export default function SingleStylePage() {
  const [file, setFile] = useState([])
  const [fileName, setFileName] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [show, setShow] = useState('none')
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [imageInputs, setImageInputs] = useState([])
  const [detailInputs, setDetailInputs] = useState([{ id: 1, value: null }])
  const [style, setStyle] = useState({
    name: '',
    description: '',
    banner: '',
    isFeatured: false,
    isCollection: false,
  })
  const [create_style, { loading  }] = useMutation(createStyle)

  if (loading) return <ProgressBar/>




  const handleAddDetailInput = () => {
    const newId = detailInputs.length + 1
    setDetailInputs([...detailInputs, { id: newId, value: '' }])
  }
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target

    if (type === 'checkbox') {
      setStyle((prev) => ({ ...prev, [name]: checked }))
    } else {
      setStyle((prev) => ({ ...prev, [name]: value }))
    }
  }
  const handleBannerFileSelected = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      setSelectedBanner(URL.createObjectURL(selectedFile))

      const currentTimestamp = new Date().getTime()
      const fileNameWithTimestamp = `${currentTimestamp}_${selectedFile.name}`

      setStyle((prevStyle) => ({
        ...prevStyle,
        banner: fileNameWithTimestamp,
      }))

      setSelectedBanner(URL.createObjectURL(selectedFile))

      setFile([...file, selectedFile])
      setFileName([...fileName, fileNameWithTimestamp])
    }
  }

  const handleDetailInputChange = (e, inputId) => {
    const inputValue = e.target.value

    setDetailInputs((prevInputs) => {
      return prevInputs.map((input) =>
        input.id === inputId ? { ...input, value: inputValue } : input,
      )
    })
  }

  const handleAddInput = () => {
    const newId = imageInputs.length + 1
    setImageInputs([...imageInputs, { id: newId, value: null }])
  }
  const handleResetInputImages = () => {
    setImageInputs([])
  }
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const images = files.map((file) => URL.createObjectURL(file))
    const currentTimestamp = new Date().getTime() // Get the current timestamp
    const updatedFileNames = files.map((file) => {
      const fileNameWithTimestamp = `${currentTimestamp}_${file.name}` // Add timestamp to the file name
      return fileNameWithTimestamp
    })
    setSelectedImages([...selectedImages, ...images])
    setFile([...file, ...e.target.files])
    setFileName([...fileName, ...updatedFileNames])
  }


  const handleDropAreaDragOver = (e) => {
    e.preventDefault()
  }

  const handleDropAreaDrop = (e) => {
    e.preventDefault()
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      setSelectedImage(URL.createObjectURL(droppedFiles[0]))
      console.log(selectedImage)
    }
  }
  const dataDetails = detailInputs.map((input) => input.value)

  const handleCreateStyle = async () => {
    const formData = new FormData()

    file.forEach((file, index) => {
      formData.append('file', file, fileName[index])
    })

    try {
      const graphqlResponse = await create_style({
        variables: {
          name: style.name,
          banner: style.banner,
          description: style.description,
          styleDetails: dataDetails,
          styleImages: fileName,
          isCollection: style.isCollection,
          isFeatured: style.isFeatured,
        },
      })
      if (graphqlResponse.data && graphqlResponse.data.createStyle) {
        setShow('block')

        // Set "none" after 3 seconds
        setTimeout(() => {
          setShow('none')
        }, 3000)
        setFile([])
        setFileName([])
        setSelectedImages([])
        setSelectedImage(null)
        setSelectedBanner(null)
        setImageInputs([])
        setDetailInputs([{ id: 1, value: null }])
        // setStyle({
        //   name: '',
        //   description: '',
        //   banner: '',
        //   isFeatured: false,
        //   isCollection: false,
        // })
      }
      await axios.post(`${PF}upload`, formData)
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <div>
      <div style={{ display: show }}>
        <Alert severity="success" color="info">
          Style successfully created.
        </Alert>
      </div>

      <div className="d-flex flex-column">
        <div className="w-25 mb-3">
          <TextField
            name="name"
            id="filled-basic"
            label="Name"
            variant="filled"
            onChange={handleChange}
          />
        </div>
        <span>Banner</span>
        <div className="mb-3 d-flex  pb-2 pt-2">
          <input
            name="banner"
            type="file"
            onChange={(e) => handleBannerFileSelected(e)}
          />
        </div>
        <div className="mb-3">
          <img
            src={selectedBanner}
            alt="Selected Banner"
            style={{ width: '100px', height: 'auto' }}
          />
        </div>
        <div className="mb-3">
          <TextField
            fullWidth
            id="filled-basic"
            label="Image Link"
            variant="filled"
            defaultValue={selectedBanner}
          />
        </div>
        <div className="mb-3">
          <TextField
            name="description"
            fullWidth
            id="filled-basic"
            label="Description"
            variant="filled"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              name="isFeatured"
              control={<Switch />}
              label="Is featured"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Switch />}
              label="Is collection"
              onChange={handleChange}
              name="isCollection"
            />
          </FormGroup>
        </div>
        <span>Examples</span>
        <div className="d-flex">
          <AddIcon onClick={handleAddInput} />
          <RemoveIcon onClick={handleResetInputImages} />
        </div>

        <div className="mb-3">
          <div
            onDragOver={handleDropAreaDragOver}
            onDrop={(e) => handleDropAreaDrop(e)}
            style={{
              cursor: 'pointer',
              width: 'fit-content',
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            {' '}
            Drop a file here, or click to select it.{' '}
          </div>
          <input type="file" id="file" multiple onChange={handleImageChange} />

          <div className="d-flex flex-column">
            {selectedImages &&
              selectedImages.map((image) => (
                <>
                  <div>
                    <img
                      className="mt-3"
                      src={image}
                      alt={`Selected Image}`}
                      style={{ width: '100px', height: 'auto' }}
                    />
                    <TextField
                      fullWidth
                      id={`filled-basic-`}
                      label="Image Link"
                      variant="filled"
                      defaultValue={image}
                    />
                  </div>
                </>
              ))}
          </div>

          <div className="mb-3"></div>
        </div>

        <span>Details</span>
        <div className="d-flex">
          <AddIcon onClick={handleAddDetailInput} />
          <RemoveIcon />
        </div>

        {detailInputs.map((input) => (
          <div key={input.id} className="w-25 mb-3">
            <TextField
              id={`filled-basic-detail-${input.id}`}
              label="Detail Name"
              variant="filled"
              value={input.value}
              onChange={(e) => handleDetailInputChange(e, input.id)}
            />
          </div>
        ))}
        <div className="d-flex justify-content-start">
          <button
            className="btn btn-dark fs-6"
            onClick={handleCreateStyle}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  )
}

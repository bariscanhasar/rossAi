import React, { useRef, useState } from 'react'

import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useMutation } from '@apollo/client';
import {CREATE_STYLE_MUTATION} from "../../graphql/mutation";
import Button from '@mui/material/Button';
export default function SingleStylePage() {
  const fileInputRef = useRef()
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedBanner,setSelectedBanner]  = useState(null)
  const [imageInputs, setImageInputs] = useState([{ id: 1, value: null }])
  const [detailInputs, setDetailInputs] = useState([{ id: 1, value: null }])
  const [style, setStyle] = useState({
    name: '',
    description: '',
    banner: '',
    is_featured: false,
    is_collection: false,
  })
    const [create_style, { loading, error }] = useMutation(CREATE_STYLE_MUTATION);

  const { id } = useParams()

    const handleAddDetailInput = () => {
        const newId = detailInputs.length + 1;
        setDetailInputs([...detailInputs, { id: newId, value: '' }]);

    };
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        if (type === 'checkbox') {
            setStyle((prev) => ({ ...prev, [name]: checked }));
        } else {
            setStyle((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleBannerFileSelected = (e) => {
        const selectedFile = e.target.files[0];

        // Check if a file is selected
        if (selectedFile) {
            // Update the selected banner image
            setSelectedBanner(URL.createObjectURL(selectedFile));

            // Update the style.banner
            setStyle((prevStyle) => ({
                ...prevStyle,
                banner: URL.createObjectURL(selectedFile),
            }));
        }
    };

    const handleDetailInputChange = (e, inputId) => {
        const inputValue = e.target.value;

        // Update the detailInputs array with the entered value for the specific inputId
        setDetailInputs((prevInputs) => {
            return prevInputs.map((input) =>
                input.id === inputId ? { ...input, value: inputValue } : input
            );
        });
    };


  const handleAddInput = () => {
    const newId = imageInputs.length + 1
    setImageInputs([...imageInputs, { id: newId, value: null }])
  }
  const handleResetInputImages = () => {
    setImageInputs([])
  }
  const handleFileSelected = (e, inputId) => {



    const selectedFile = e.target.files[0]

    // Update the imageInputs array with the selected file for the specific inputId
    setImageInputs((prevInputs) => {
      return prevInputs.map((input) =>
        input.id === inputId
          ? { ...input, value: URL.createObjectURL(selectedFile) }
          : input,
      )
    })
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
    const dataDetails = detailInputs.map((input) => input.value)
    const dataImages = imageInputs.map((input) => input.value)

    const handleCreateStyle = async () => {
        try {
            const { data } = await create_style({
                variables: {
                    name: style.name,
                    banner: style.banner,
                    description: style.description,
                    style_details: dataDetails,
                    style_images: dataImages,
                    is_collection: style.is_collection,
                    is_featured: style.is_featured,
                },
            });

            // Handle the response data

        } catch (e) {
            // Handle errors
            console.error(e.message);
        }
    };
    console.log(dataImages)
  return (
    <div className="d-flex flex-column">
      <div className="w-25 mb-3">
        <TextField name="name" id="filled-basic" label="Name" variant="filled" onChange={handleChange} />
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
              name="is_featured"
            control={<Switch  />}
            label="Is featured"
            onChange={handleChange}
          />
          <FormControlLabel control={<Switch />} label="Is collection" onChange={handleChange} name="is_collection" />
        </FormGroup>
      </div>
      <span>Examples</span>
      <div className="d-flex">
        <AddIcon onClick={handleAddInput} />
        <RemoveIcon onClick={handleResetInputImages} />
      </div>
      {imageInputs.map((input) => (
        <div key={input.id} className="mb-3">
          <div
            onClick={() => handleDropAreaClick(input.id)}
            onDragOver={handleDropAreaDragOver}
            onDrop={(e) => handleDropAreaDrop(e, input.id)}
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
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelected(e, input.id)}
          />
          {input.value && (
            <img
              src={input.value}
              alt={`Selected Image ${input.id}`}
              style={{ width: '100px', height: 'auto' }}
            />
          )}
          <div className="mb-3">
            {input.value && (
              <TextField
                fullWidth
                id={`filled-basic-${input.id}`}
                label="Image Link"
                variant="filled"
                defaultValue={input.value}
              />
            )}
          </div>
        </div>
      ))}

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
        <Button variant="contained" color="primary" onClick={handleCreateStyle}/>
    </div>
  )
}

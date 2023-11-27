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
import {GET_ALL_USERS, GET_SET, GET_STYLE} from '../graphql/queries'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PF = "http://localhost:5001/static/"

export default function SingleSetPage() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_SET, {
        variables: { set_id: id },
    })
    if(loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            )

    }

    const setData = data && data.get_set ? data.get_set : null
    return (
       <div className="card">
           <div className="info p-3 border-bottom">
               <div className="d-flex flex-column mb-2">
                   <span  className="mb-1 text-muted h5 ">Name</span>
                   <span>Set #1</span>

               </div>
               <div className="d-flex flex-column mb-2">
                   <span className="mb-1 text-muted h5 ">User</span>
                   <span className="text-primary">{setData && setData.user.first_name + " "+ setData.user.last_name + " " + "<" + setData.user.email+ " " + ">"} </span>

               </div>
               <div className="d-flex flex-column mb-2">
                   <span className="mb-1 text-muted h5">Model</span>
                   <span className="text-primary">{setData && setData.model.version } </span>
               </div>

           </div>
           <div className="row align-items-center m-0">

               {setData && setData.images ?  setData.images.map(img => (
                   <div className="border-bottom col-6 ali d-flex justify-content-center">
                       <div className="w-50">
                           <img className="img-fluid img-thumbnail w-50" src={PF + img.path}/>
                       </div>
                   </div>
               )) : <span>NO DATA</span>}







           </div>


       </div>
    )
}

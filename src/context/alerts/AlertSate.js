import React from 'react'
import AlertContext from './alertContext'
import { useState } from 'react'


const AlertSate = (props) => {
    const state ={
        name:'nikhil'
    }

  return (
    <AlertContext.Provider value={{state}}>
    {props.children}
    </AlertContext.Provider>
  )
}

export default AlertSate
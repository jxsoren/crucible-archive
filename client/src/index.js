import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context/ContextProvider.js'

const root = document.getElementById('root')

ReactDOM.render( 
    <ContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextProvider>,     
    root
)
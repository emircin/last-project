import React from 'react'
import {Routes, Route} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import NewCard from '../pages/NewCard'
import Register from '../pages/Register'
import UpdateBlog from '../pages/UpdateBlog'
import Detail from '../pages/Detail'
import Profile from '../pages/Profile'
import PrivateRouter from "./PrivateRouter"

const AppRouter = () => {
  return (
    <div>
    <NavBar/>
    <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/detail/:id' element={<Detail/>}/>
        </Route>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/new-card' element={<NewCard/>}/>
        </Route>
        <Route path="/" element={<PrivateRouter />}>
        <Route path='/update-blog' element={<UpdateBlog/>}/>
        </Route>
    </Routes>
    </div>
  )
}

export default AppRouter
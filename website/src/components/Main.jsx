import React, { useState, useEffect } from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom"

import Navigation from './Navigation'
import Home from './Home'
import Settings from './Settings'
import Account from './Account'
import Posts from '../pages/Posts'
import Queues from '../pages/Queues'

export default function Main({
    authenticate,
    gradient,
    user
}) {
    
    const courses = ["CS 1110", "CS 2110", "CS 3110"]
    const [course, setCourse] = useState(0);

    const [userInfo, setUserInfo] = useState('');

    useEffect( () => {
        fetch(`/users/one?email=${user.email}`)
            .then(resp => resp.json())
            .then(resp => {
                setUserInfo(resp)})
            .catch(err => console.log(err))
        
    }, [user])

    return (
        <Router>
            <div>
                <Navigation authenticate={authenticate} gradient={gradient} 
                    courses={courses} setCourse={setCourse} courseIndex={course} userInfo={userInfo}/>
                <Routes>
                <Route path="/settings" element={<Settings />}/>
                <Route path="/account" element={<Account />}/>
                <Route path="/posts" element={<Posts />}/>
                <Route path="/queues" element={<Queues user={user} />}/>
                <Route path="/" element={<Posts />}/>
                </Routes>
            </div>
        </Router>
    )
}
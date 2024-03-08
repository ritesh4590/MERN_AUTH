import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { user } from '../../redux/features/UserSlice'
import './Home.css'

const Home = () => {
  const [usename, setUserName] = useState('')
  const [isUserFetched, setIsUserFetched] = useState(false)

  const dispatch = useDispatch()


  const getLoggedInUser = async () => {
    const loginToken = await localStorage.getItem("token")
    if (loginToken) {
      let bearerToken = `Bearer ${loginToken}`
      const loggedInUser = await dispatch(user({ bearerToken }))
      if (loggedInUser.payload.data.success === true) {
        setIsUserFetched(true)
        setUserName(loggedInUser.payload.data.user.name)
      }
    }
  }

  useEffect(() => {
    getLoggedInUser()
  })

  return (
    <>
      {isUserFetched ?
        <div className='home-container'>
          <h1>{usename}</h1>
        </div >
        : ""
      }
    </>
  )

}
export default Home

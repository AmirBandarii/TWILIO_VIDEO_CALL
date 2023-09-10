import React, { ChangeEvent, useContext, useEffect, useRef } from 'react'
import Video from 'twilio-video'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import crypto from 'crypto'
import { contextValue, VideoContext } from '../ assets/context/VideoContext'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { SignScreen } from '../ assets/styles/startPage'
import RoomPage from './room/RoomPage'

const StartPage = () => {
  const {
    room,
    setRoom,
    loading,
    setLoading,
    identity,
    setIdentity,
    buttonClicked,
    setButtonClicked,
  } = useContext(VideoContext) as contextValue
  const params = useParams()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const disabled = identity === ''

  useEffect(() => {
    if (params.roomId) {
      const decipher = crypto.createDecipher('aes-256-cbc', 'conferencekey')
      let roomId = decipher.update(params.roomId, 'hex', 'utf-8')
      roomId += decipher.final('utf-8')
      setIdentity(roomId)
      handleSubmit({ roomId: roomId })
    }
  }, [])

  const handleSubmit = async ({ roomId }: { roomId?: string }) => {
    try {
      setButtonClicked(true)
      setLoading(true)
      const response = await axios.get(
        `https://video-collaboration-1269-dev.twil.io/get_token?identity=${roomId || identity}`
      )
      const cipher = crypto.createCipher('aes-256-cbc', 'conferencekey')
      let roomName = cipher.update(response.data.roomName, 'utf-8', 'hex')
      roomName += cipher.final('hex')
      const token = response.data.token
      Video.connect(token, {
        video: true,
        audio: true,
      }).then((room) => {
        setRoom(room)
        navigate(`/room/${roomName || roomId}`)
      })
    } catch (error) {
      setLoading(false)
      alert(error)
    }
  }

  const removePlaceholderText = () => {
    if (inputRef.current) {
      inputRef.current.placeholder = ''
    }
  }

  const updateIdentity = (event: ChangeEvent<HTMLInputElement>) => {
    setIdentity(event.target.value)
  }

  return (
    <SignScreen>
      {room === null ? (
        <Box>
          <TextField
            value={identity}
            ref={inputRef}
            placeholder="Name?"
            onChange={updateIdentity}
            onFocus={removePlaceholderText}
            sx={{ width: '300px', marginBottom: '20px' }}
          />
          <Button
            sx={{ height: '55px' }}
            variant="contained"
            color="success"
            disabled={disabled || buttonClicked}
            onClick={() => handleSubmit({ roomId: params.roomId || identity })}
          >
            {loading ? <CircularProgress /> : 'Join'}
          </Button>
        </Box>
      ) : (
        <RoomPage />
      )}
    </SignScreen>
  )
}

export default StartPage

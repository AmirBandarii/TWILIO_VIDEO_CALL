import React, { useContext, useEffect, useState } from 'react'
import { RemoteParticipant } from 'twilio-video'
import Participant from '../participants/Participant'
import LocalParticipant from '../participants/LocalParticipant'
import { useNavigate, useParams } from 'react-router-dom'
import { contextValue, VideoContext } from '../../ assets/context/VideoContext'
import { Box, Button } from '@mui/material'
import { PhoneDisabled, Videocam, VideocamOff, VolumeOff, VolumeUp } from '@mui/icons-material'
import { theme } from '../../ assets/styles/colors/colors'

import {
  DisplayButtons,
  DisplayVideos,
  RoomScreen,
  VideosCameras,
} from '../../ assets/styles/roomPage'

const RoomPage = () => {
  const {
    room,
    setLoading,
    setRoom,
    setButtonClicked,
    localParticipant,
    isMicMuted,
    setIsMicMuted,
    videoScreen,
    setVideoScreen,
    videoTrack,
  } = useContext(VideoContext) as contextValue
  const { roomName } = useParams()
  const navigate = useNavigate()

  if (!room) {
    return null
  }

  const [remoteParticipants, setRemoteParticipants] = useState<Array<RemoteParticipant>>(
    Array.from(room.participants.values())
  )

  useEffect(() => {
    const addParticipant = (participant: RemoteParticipant) => {
      alert(`${participant.identity} has joined the room.`)
      setRemoteParticipants((prevParticipants) => [...prevParticipants, participant])
    }

    const removeParticipant = (participant: RemoteParticipant) => {
      alert(`${participant.identity} has left the room`)
      setRemoteParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p.identity !== participant.identity)
      )
    }

    room.on('participantConnected', addParticipant)
    room.on('participantDisconnected', removeParticipant)

    return () => {
      room.off('participantConnected', addParticipant)
      room.off('participantDisconnected', removeParticipant)
    }
  }, [room, roomName])

  const leaveRoom = () => {
    room.disconnect()
    navigate(`/`)
    setRoom(null)
    setLoading(false)
    setButtonClicked(false)
  }
  const toggleMic = () => {
    if (localParticipant) {
      const audioTrack = Array.from(localParticipant.audioTracks.values())[0]?.track

      if (audioTrack) {
        audioTrack.enable(!isMicMuted)
        setIsMicMuted(!isMicMuted)
      }
    }
  }
  const toggleVideo = () => {
    if (videoTrack) {
      videoTrack.enable(videoScreen)
      setVideoScreen(!videoScreen)
    }
  }

  return (
    <RoomScreen>
      <VideosCameras>
        <DisplayVideos>
          <LocalParticipant />
          {remoteParticipants.map((participant) => (
            <Participant
              key={participant.identity}
              participant={participant}
            />
          ))}
        </DisplayVideos>
      </VideosCameras>
      <DisplayButtons>
        <Box sx={{ display: 'flex', gap: '40px' }}>
          <Button
            onClick={() => toggleVideo()}
            sx={{ color: theme.palette.info.main }}
          >
            {videoScreen ? <VideocamOff /> : <Videocam />}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={leaveRoom}
          >
            <PhoneDisabled />
          </Button>
          <Button
            onClick={() => toggleMic()}
            sx={{ color: theme.palette.info.main }}
          >
            {isMicMuted ? <VolumeUp /> : <VolumeOff />}
          </Button>
        </Box>
      </DisplayButtons>
    </RoomScreen>
  )
}

export default RoomPage

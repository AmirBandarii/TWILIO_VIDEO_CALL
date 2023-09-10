import React, { useContext, useEffect, useRef } from 'react'
import { LocalVideoTrack } from 'twilio-video'
import { contextValue, VideoContext } from '../../ assets/context/VideoContext'
import { LocalParticipantScreen } from '../../ assets/styles/participants'

const LocalParticipantComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { setIsMicMuted, localParticipant, setVideoScreen, setVideoTrack } = useContext(
    VideoContext
  ) as contextValue

  useEffect(() => {
    if (localParticipant) {
      const videoTrack = Array.from(localParticipant.videoTracks.values())[0]
        ?.track as LocalVideoTrack
      setVideoTrack(videoTrack)

      if (videoTrack && videoRef.current) {
        videoTrack.attach(videoRef.current)
        setVideoScreen(!videoTrack.enable())
      }

      const audioTrackTwilio = Array.from(localParticipant.audioTracks.values())[0]?.track

      if (audioTrackTwilio) {
        setIsMicMuted(audioTrackTwilio.isEnabled)
      }

      return () => {
        if (videoTrack) {
          videoTrack.detach()
        }
      }
    }
  }, [localParticipant, setIsMicMuted])

  return (
    <LocalParticipantScreen>
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </LocalParticipantScreen>
  )
}

export default LocalParticipantComponent

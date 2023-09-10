import { useCallback, useEffect, useState } from 'react'
import { LocalParticipant, LocalVideoTrack, RemoteParticipant } from 'twilio-video'
import { ParticipantScreen } from '../../ assets/styles/participants'
import TrackPage from '../track/TrackPage'

export interface IProps {
  participant: RemoteParticipant | LocalParticipant
}

const Participant = ({ participant }: IProps) => {
  const [tracks, setTracks] = useState<LocalVideoTrack[]>([])

  useEffect(() => {
    if (participant) {
      participant.on('trackSubscribed', handleTrackSubscribed)
    }

    return () => {
      if (participant) {
        participant.off('trackSubscribed', handleTrackSubscribed)
      }
    }
  }, [participant])

  const handleTrackSubscribed = useCallback((track: LocalVideoTrack) => {
    setTracks((prevTracks) => [...prevTracks, track])
  }, [])
  return (
    <ParticipantScreen>
      {tracks.map((track) => (
        <TrackPage
          key={track.name}
          track={track}
        />
      ))}
    </ParticipantScreen>
  )
}

export default Participant

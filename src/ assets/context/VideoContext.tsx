import React, { createContext, Dispatch, FC, ReactNode, useState } from 'react'
import { LocalParticipant, LocalVideoTrack, Room } from 'twilio-video'

export interface contextValue {
  room: Room | null
  setRoom: Dispatch<React.SetStateAction<Room | null>>
  loading: boolean
  setLoading: Dispatch<React.SetStateAction<boolean>>
  returnToLobby: () => void
  identity: string
  setIdentity: Dispatch<React.SetStateAction<string>>
  buttonClicked: boolean
  setButtonClicked: Dispatch<React.SetStateAction<boolean>>
  isMicMuted: boolean
  setIsMicMuted: Dispatch<React.SetStateAction<boolean>>
  localParticipant: LocalParticipant | undefined
  videoScreen: boolean
  setVideoScreen: Dispatch<React.SetStateAction<boolean>>
  videoTrack: LocalVideoTrack | null
  setVideoTrack: Dispatch<React.SetStateAction<LocalVideoTrack | null>>
}

type Props = {
  children: ReactNode
}

export const VideoContext = createContext<contextValue | null>(null)
export const VideoContextProvider: FC<Props> = ({ children }) => {
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [identity, setIdentity] = useState<string>('')
  const [buttonClicked, setButtonClicked] = useState(false)
  const [isMicUnMuted, setIsMicUnMuted] = useState(true)
  const [videoScreen, setVideoScreen] = useState<boolean>(false)
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack | null>(null)
  const returnToLobby = () => {
    setRoom(null)
  }
  const localParticipant = room?.localParticipant
  return (
    <VideoContext.Provider
      value={{
        room,
        setRoom,
        loading,
        setLoading,
        returnToLobby,
        identity,
        setIdentity,
        buttonClicked,
        setButtonClicked,
        isMicMuted: isMicUnMuted,
        setIsMicMuted: setIsMicUnMuted,
        localParticipant,
        videoScreen,
        setVideoScreen,
        videoTrack,
        setVideoTrack,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}
export default VideoContextProvider

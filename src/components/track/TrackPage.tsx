import React, { useEffect, useRef } from 'react'
import { LocalVideoTrack } from 'twilio-video'
import { Box } from '@mui/material'

interface TrackProps {
  track: LocalVideoTrack
}

const Track: React.FC<TrackProps> = ({ track }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (track !== null && ref.current !== null) {
      const child = track.attach()
      ref.current.classList.add(track.kind)
      ref.current.appendChild(child)
    }

    return () => {
      if (track !== null && ref.current !== null) {
        track.detach().forEach((element) => element.remove())
      }
    }
  }, [track])

  return <Box ref={ref}></Box>
}

export default Track

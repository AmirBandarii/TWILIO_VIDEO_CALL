import { Box, styled } from '@mui/material'

export const RoomScreen = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
})
export const VideosCameras = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  width: '100%',
})
export const DisplayVideos = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  width: '100%',
  maxHeight: 'auto',
  overflowY: 'hidden',
})
export const DisplayButtons = styled(Box)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: 'black',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

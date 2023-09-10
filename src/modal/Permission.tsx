import * as React from 'react'
import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

interface IPermission {
  open: boolean
  onClose: () => void
  onConfirm: (allowed: boolean) => void
}

const Permission = ({ open }: IPermission) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Permission Request</DialogTitle>
      <DialogContent>
        <p>Another user is requesting to join the room. Do you want to allow them?</p>
      </DialogContent>
      <DialogActions>
        <Button>Allow</Button>
        <Button>Deny</Button>
      </DialogActions>
    </Dialog>
  )
}
export default Permission

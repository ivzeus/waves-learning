import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { Network } from '../stores'

export const NetworkSelect = observer(() => {
  const networkStore = useContext(Network)

  return (
    <React.Fragment>
      <InputLabel htmlFor="form-select-environment">Network</InputLabel>
      <Select
        displayEmpty
        value={networkStore.ID}
        onChange={ev => networkStore.changeNetwork(ev.target.value)}
        inputProps={{
          id: 'form-select-environment'
        }}
      >
        <MenuItem value="" disabled>
          Network
        </MenuItem>
        <MenuItem value="testnet">Testnet</MenuItem>
        <MenuItem value="mainnet">Mainnet</MenuItem>
      </Select>
    </React.Fragment>
  )
})

export default NetworkSelect

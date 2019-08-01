import React from 'react'
import { InputLabel, MenuItem, Select } from '@material-ui/core'

class NetworkSelect extends React.Component {
  state = {
    network: 'testnet'
  }

  handleChange = ev => {
    const { _onNetworkChange } = this.props
    if (_onNetworkChange) _onNetworkChange(ev)
    this.setState({
      network: ev.target.value
    })
  }

  render() {
    const _this = this

    return (
      <React.Fragment>
        <InputLabel htmlFor="form-select-environment">Network</InputLabel>
        <Select
          displayEmpty
          value={this.state.network}
          onChange={ev => _this.handleChange(ev)}
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
  }
}

export default NetworkSelect

import React from 'react'
import { InputLabel, MenuItem, Select } from '@material-ui/core'

class TransactionSelect extends React.Component {
  state = {
    transactionType: null
  }

  handleChange = ev => {
    const { _onTransactionTypeChange } = this.props
    if (_onTransactionTypeChange) _onTransactionTypeChange(ev)
    this.setState({
      transactionType: ev.target.value
    })
  }

  render() {
    const _this = this

    return (
      <React.Fragment>
        <InputLabel htmlFor="form-select-tx-type">Transaction type</InputLabel>
        <Select
          displayEmpty
          value={this.state.transactionType}
          onChange={ev => _this.handleChange(ev)}
          inputProps={{
            id: 'form-select-tx-type'
          }}
        >
          <MenuItem value="" disabled>
            TX obj
          </MenuItem>
          <MenuItem value="setScript">SetScriptTransaction</MenuItem>
          <MenuItem value="setAssetScript">SetAssetScriptTransaction</MenuItem>
          <MenuItem value="issue">IssueTransaction</MenuItem>
          <MenuItem value="reissue">ReIssueTransaction</MenuItem>
          <MenuItem value="data">DataTransaction</MenuItem>
          <MenuItem value="transfer">TransferTransaction</MenuItem>
        </Select>
      </React.Fragment>
    )
  }
}

export default TransactionSelect

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
          <MenuItem value={13}>SetScriptTransaction</MenuItem>
          <MenuItem value={15}>SetAssetScriptTransaction</MenuItem>
          <MenuItem value={3}>IssueTransaction</MenuItem>
          <MenuItem value={5}>ReIssueTransaction</MenuItem>
          <MenuItem value={12}>DataTransaction</MenuItem>
          <MenuItem value={4}>TransferTransaction</MenuItem>
        </Select>
      </React.Fragment>
    )
  }
}

export default TransactionSelect

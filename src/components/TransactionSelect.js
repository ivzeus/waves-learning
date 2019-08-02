import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { Transactions } from '../stores'

export const TransactionSelect = observer(() => {
  const transactionStore = useContext(Transactions)

  return (
    <React.Fragment>
      <InputLabel htmlFor="form-select-tx-type">Transaction type</InputLabel>
      <Select
        displayEmpty
        value={transactionStore.transactionType}
        onChange={ev => transactionStore.setTransaction(ev.target.value)}
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
})

export default TransactionSelect

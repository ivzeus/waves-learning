import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import './App.css'
import {
  Button,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@material-ui/core'
import ReactJson from 'react-json-view'

import { Network, Transactions } from './stores'

import { NetworkSelect, TransactionSelect } from './components'
import Utils from './utils/TXUtils'
import TXUtils from './utils/TXUtils'

export const App = observer(() => {
  const networkStore = useContext(Network)
  const transactionsStore = useContext(Transactions)

  return (
    <Grid container>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item>
          <NetworkSelect
            _onNetworkChange={ev => networkStore.changeNetwork(ev.target.value)}
          />
        </Grid>

        <Grid item>
          <TransactionSelect
            _onTransactionTypeChange={ev =>
              transactionsStore.setTransaction(ev.target.value)
            }
          />
        </Grid>
      </Grid>

      <Grid container direction="row" justify="flex-start" alignItems="stretch">
        <Grid item>
          <Paper>
            <ReactJson
              src={transactionsStore.rawTransaction}
              style={{ textAlign: 'left' }}
              // onEdit={edit => _this._onJSONEditorChange(edit)}
              // onAdd={add => _this._onJSONEditorChange(add)}
              // onDelete={del => _this._onJSONEditorChange(del)}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <ReactJson
              src={transactionsStore.signedTransaction}
              style={{ textAlign: 'left' }}
              // onEdit={edit => _this._onJSONEditorChange(edit)}
              // onAdd={add => _this._onJSONEditorChange(add)}
              // onDelete={del => _this._onJSONEditorChange(del)}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-end"
      >
        <Grid item>
          <InputLabel htmlFor="form-select-proof-order">
            Proof order
          </InputLabel>
          <Select
            displayEmpty
            value={this.state.network}
            onChange={ev => _this._onNetworkChange(ev)}
            inputProps={{
              id: 'form-select-proof-order'
            }}
          >
            <MenuItem value="" disabled>
              Proof order
            </MenuItem>
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => _this._onSignTransaction()}
          >
            Add Proof
          </Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="info">
            Copy
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.transactionType === null}
          >
            Publish
          </Button>
        </Grid>

        <Grid item xs="12" sm="12">
          <Button id="btn-other-configs" variant="contained" color="primary">
            <Icon>add</Icon>ENV CONFIGS
          </Button>
        </Grid>
      </Grid> */}
    </Grid>
  )
})
// class App extends React.Component {
//   state = {
//     network: 'testnet',
//     transactionType: null,
//     transactionObject: Utils.getTransactionByType('', this._getNetworkInfo())
//   }

//   _getNetworkInfo() {
//     const NETWORK_INFO = {
//       testnet: {
//         url: '',
//         chainId: 84
//       },
//       mainnet: {
//         url: '',
//         chainId: 82
//       }
//     }

//     try {
//       return NETWORK_INFO[this.state.network]
//     } catch (err) {
//       return NETWORK_INFO['testnet']
//     }
//   }

//   _onNetworkChange(ev) {
//     this.setState({
//       network: ev.target.value
//     })
//   }

//   _onTransactionTypeChange(ev) {
//     this.setState({
//       transactionObject: Utils.getTransactionByType(
//         ev.target.value,
//         this._getNetworkInfo()
//       )
//     })
//   }

//   _onCopyTransaction() {}

//   _onBroadcastTransaction() {}

//   async _onSignTransaction() {
//     const txData = TXUtils.getTxDataForSigning(this.state.transactionObject)
//     const resp = await TXUtils.signTransaction(txData)
//     console.log('[signTx] resp:', resp)
//   }

//   _onJSONEditorChange(ev) {
//     this.setState({ transactionObject: ev.updated_src })
//   }

//   async componentDidMount() {
//     // await TXUtils.initializeKeeperAPI()
//   }

//   render = observer(() => {
//     const store = useContext(Network)
//     const _this = this

// }

export default App

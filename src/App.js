import React from 'react'
import './App.css'
import { Box, Button, MenuItem, Select } from '@material-ui/core'
import ReactJson from 'react-json-view'
import { transfer, broadcast } from '@waves/waves-transactions'
import Utils from './Utils'

class App extends React.Component {
  NETWORK_INFO = {
    testnet: {
      url: '',
      chainId: 84
    },
    mainnet: {
      url: '',
      chainId: 82
    }
  }

  state = {
    network: 'testnet',
    transactionType: null,
    transactionObject: {
      amount: 0,
      recipient: '',
      fee: 1000000,
      assetId: 'WAVES',
      attachment: '',
      timestamp: Date.now(),
      chainId: 84
    }
  }

  _getNetworkInfo() {
    try {
      return this.NETWORK_INFO[this.state.network]
    } catch (err) {
      return this.NETWORK_INFO['testnet']
    }
  }

  _onNetworkChange(ev) {
    this.setState({
      network: ev.target.value
    })
  }

  _onTransactionTypeChange(ev) {
    this.setState({
      transactionType: ev.target.value,
      transactionObject: Utils.getTransactionByType(
        ev.target.value,
        this._getNetworkInfo()
      )
    })
  }

  _onCopyTransaction() {}

  _onBroadcastTransaction() {}

  _onJSONEditorChange(ev) {
    this.setState({ transactionObject: ev.updated_src })
  }

  onBroadcast({ amount, asset, fee, recipient, seed }) {
    const signedTx = transfer(
      {
        amount: parseInt(amount),
        recipient,
        fee: fee || 1000000,
        assetId: asset,
        attachment: '',
        timestamp: Date.now(),
        chainId: parseInt(84)
      },
      seed
    )

    broadcast(signedTx, 'https://testnodes.wavesnodes.com')
      .then(resp => {
        console.log('Transfer success, receipt:')
        console.log(resp)
      })
      .catch(err => {
        console.log(`Transfer failure, error: ${JSON.stringify(err)}`)
      })
  }

  render() {
    const _this = this
    return (
      <div className="App">
        <Box alignItems="center">
          <Select
            value={this.state.network}
            onChange={ev => _this._onNetworkChange(ev)}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            style={{ margin: '30px 10px 0px 10px' }}
          >
            <MenuItem value="" disabled>
              Network
            </MenuItem>
            <MenuItem value="testnet">Testnet</MenuItem>
            <MenuItem value="mainnet">Mainnet</MenuItem>
          </Select>
        </Box>
        <Box style={{ margin: '10px 100px 0px 100px' }}>
          <ReactJson
            src={this.state.transactionObject}
            style={{ textAlign: 'left', maxWidth: 400 }}
            onEdit={edit => _this._onJSONEditorChange(edit)}
            onAdd={add => _this._onJSONEditorChange(add)}
            onDelete={del => _this._onJSONEditorChange(del)}
          />
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Select
            value={this.state.transactionType}
            onChange={ev => _this._onTransactionTypeChange(ev)}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            style={{ margin: 10 }}
          >
            <MenuItem value="" disabled>
              Create
            </MenuItem>
            <MenuItem value="setScript">SetScriptTransaction</MenuItem>
            <MenuItem value="setAssetScript">
              SetAssetScriptTransaction
            </MenuItem>
            <MenuItem value="issue">IssueTransaction</MenuItem>
            <MenuItem value="reissue">ReIssueTransaction</MenuItem>
            <MenuItem value="data">DataTransaction</MenuItem>
            <MenuItem value="transfer">TransferTransaction</MenuItem>
          </Select>
          <Button variant="contained" color="info" style={{ margin: 10 }}>
            Add Proof
          </Button>
          <Button variant="contained" color="info" style={{ margin: 10 }}>
            Copy
          </Button>
          <Button variant="contained" color="info" style={{ margin: 10 }}>
            Paste
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
            disabled={this.state.transactionType === null}
            onClick={() =>
              _this.onBroadcast({
                amount: 1,
                asset: 'WAVES',
                recipient: '3N9Sgptqbbc9whta6iLeeQENfHd833G9hQE',
                seed:
                  'usual company hill garbage bean book illness mother help brief catch vocal'
              })
            }
          >
            Broadcast
          </Button>
        </Box>
      </div>
    )
  }
}

export default App

import React from 'react'
import './App.css'
import { Box, Button, MenuItem, Select } from '@material-ui/core'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import { transfer, broadcast } from '@waves/waves-transactions'

class App extends React.Component {
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
        <Box>
          <Select
            // value={values.age}
            // onChange={handleChange}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            style={{ margin: '30px 10px 0px 10px' }}
          >
            <MenuItem value="" disabled>
              Network
            </MenuItem>
            <MenuItem value={10}>Testnet</MenuItem>
            <MenuItem value={20}>Mainnet</MenuItem>
          </Select>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          style={{ margin: '10px 100px 0px 100px', minWidth: 400 }}
        >
          <Editor
            value={{ key: 'value' }}
            style={{ margin: '40px 100px 0px 100px' }}
          />
        </Box>
        <Box flexDirection="row">
          <Select
            // value={values.age}
            // onChange={handleChange}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            style={{ margin: 10 }}
          >
            <MenuItem value="" disabled>
              Create
            </MenuItem>
            <MenuItem value={10}>SetScriptTransaction</MenuItem>
            <MenuItem value={20}>SetAssetScriptTransaction</MenuItem>
            <MenuItem value={30}>IssueTransaction</MenuItem>
            <MenuItem value={40}>ReIssueTransaction</MenuItem>
            <MenuItem value={50}>DataTransaction</MenuItem>
          </Select>
          <Button variant="contained" color="info" style={{ margin: 10 }}>
            Add Proof
          </Button>
          <Button variant="contained" color="info" style={{ margin: 10 }}>
            Copy
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
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

import React, { useContext, useEffect } from 'react'
import { observer, useObservable } from 'mobx-react-lite'
import './App.css'
import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Toolbar,
  Typography
} from '@material-ui/core'
// import {
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle
// } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import ReactJson from 'react-json-view'
import { Network, Transactions } from './stores'
import { NetworkSelect, TransactionSelect } from './components'

export const App = observer(() => {
  const networkStore = useContext(Network)
  const transactionsStore = useContext(Transactions)

  const state = useObservable({
    loading: true,
    proofOrder: 0,
    wavesKeeper: { initialized: false },
    showSnackbar: false,
    errorMessage: '',
    setProofOrder(order) {
      state.proofOrder = order
    },
    setLoading(loading) {
      state.loading = loading
    },
    setError(errorMessage = null) {
      if (errorMessage) {
        state.errorMessage = errorMessage
        state.showSnackbar = true
      } else {
        state.errorMessage = ''
        state.showSnackbar = false
      }
    },
    setWavesKeeper(info) {
      state.wavesKeeper = info
    }
  })

  useEffect(() => {
    const { WavesKeeper } = window
    if (WavesKeeper) {
      WavesKeeper.publicState()
        .then(info => {
          state.setWavesKeeper(info)
        })
        .catch(error => {
          state.setWavesKeeper({ initialized: false })
        })
    }
  }, [state, state.wavesKeeper.initialized])

  // if (state.loading) return <CircularProgress />

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6">Waves Transaction helper</Typography>

          <IconButton edge="end" color="inherit" aria-label="add">
            <Icon>add</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid item>
        <Paper>
          {state.wavesKeeper.initialized ? (
            <Typography variant="subtitle1" component="h3" color="primary">
              WavesKeeper v{state.wavesKeeper.version} initialized!
            </Typography>
          ) : (
            <Typography variant="subtitle1" component="h3" color="error">
              WavesKeeper not installed!
            </Typography>
          )}
        </Paper>
      </Grid>

      <Grid container>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <NetworkSelect />
          </Grid>

          <Grid item>
            <TransactionSelect />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Paper>
              <ReactJson
                src={transactionsStore.rawTransaction}
                style={{ textAlign: 'left' }}
                onEdit={edit =>
                  transactionsStore.updateRawTransaction(edit.updated_src)
                }
                onAdd={add =>
                  transactionsStore.updateRawTransaction(add.updated_src)
                }
                onDelete={del =>
                  transactionsStore.updateRawTransaction(del.updated_src)
                }
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <ReactJson
                src={transactionsStore.signedTransaction}
                style={{ textAlign: 'left' }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid
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
              value={state.proofOrder}
              onChange={ev => state.setProofOrder(ev.target.value)}
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
              onClick={() => {
                const txData = transactionsStore.rawTransactionForSigning({
                  networkStore
                })
                window.WavesKeeper.signTransaction(txData)
                  .then(data => {
                    const parsedData = JSON.parse(data)
                    if (state.proofOrder > 0) {
                      const sig = parsedData.proofs[0]
                      parsedData.proofs[0] = ''
                      parsedData.proofs[state.proofOrder] = sig
                    }
                    transactionsStore.updateSignTransaction(parsedData)
                  })
                  .catch(error => {
                    console.log(error)
                    state.setError(error.message)
                  })
              }}
            >
              Add Proof
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained">Copy</Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={!transactionsStore.signedTransaction}
            >
              Publish
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={state.showSnackbar}
          autoHideDuration={4000}
          onClose={() => state.setError()}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{state.errorMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => state.setError()}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Grid>
    </div>
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

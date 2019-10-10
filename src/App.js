import React, { useContext, useState, useEffect } from 'react'
import { observer, useObservable } from 'mobx-react-lite'
import './App.css'
import {
  AppBar,
  Button,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import ReactJson from 'react-json-view'
import { Network, Transactions } from './stores'
import { NetworkSelect, TransactionSelect } from './components'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  status: {
    danger: 'orange'
  }
})

export const App = observer(props => {
  const networkStore = useContext(Network)
  const transactionsStore = useContext(Transactions)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          state.setLoading(false)
        })
        .catch(error => {
          state.setWavesKeeper({ initialized: false })
          state.setLoading(false)
        })
    } else {
      setTimeout(() => state.setLoading(false), 3000)
    }
  }, [state, state.wavesKeeper.initialized])

  if (state.loading) return <LinearProgress />

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Icon>settings</Icon>
          </IconButton>

          <Typography variant="h6">Waves Transaction helper</Typography>
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          className="Margin-10"
        >
          <Paper
            className="Padding-10"
          // open={true}
          // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          // ContentProps={{
          //   'aria-describedby': 'message-id'
          // }}
          // message={
          //   <span id="message-id">
          //     {state.wavesKeeper.initialized
          //       ? `WavesKeeper v${state.wavesKeeper.version} initialized!`
          //       : 'WavesKeeper not installed'}
          //   </span>
          // }
          >
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

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item className="Margin-10">
            <NetworkSelect />
          </Grid>

          <Grid item className="Margin-10">
            <TransactionSelect />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item sm={12} md={4}>
            <Paper className="Margin-10 Padding-20">
              <Typography variant="body2">Raw transaction:</Typography>
              <ReactJson
                src={transactionsStore.rawTransaction}
                style={{ textAlign: 'left' }}
                collapseStringsAfterLength={20}
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
          {/* <Grid item sm={0} md={1} /> */}
          <Grid item sm={12} md={4}>
            <Paper className="Margin-10 Padding-20">
              <Typography variant="body2">Signed transaction:</Typography>
              <ReactJson
                src={transactionsStore.signedTransaction}
                style={{ textAlign: 'left' }}
                collapseStringsAfterLength={20}
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
          className="Padding-10"
        >
          {state.wavesKeeper.initialized && (
            <Grid item className="Margin-10">
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
          )}

          {state.wavesKeeper.initialized && (
            <Grid item className="Margin-10">
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
                      if (state.proofOrder >= 0) {
                        // get new signature
                        const sig = parsedData.proofs[0]

                        // prepare signature arrays
                        const proofs = []
                        for (let i = 0; i <= state.proofOrder; i++) proofs.push('')
                        proofs[state.proofOrder] = sig

                        parsedData.proofs = proofs
                      }
                      transactionsStore.updateSignTransaction(parsedData)
                    })
                    .catch(error => {
                      console.log(error)
                      state.setError(error.message)
                    })
                }}
              >
                Set Proof
              </Button>
            </Grid>
          )}

          {state.wavesKeeper.initialized && transactionsStore.hasPendingTransaction && (
            <Grid item className="Margin-10">
              <Button
                variant="contained"
                onClick={() => {
                  const signedTx = transactionsStore.signedTransaction
                  const { type, proofs, ...others } = signedTx
                  const txData = {
                    type,
                    data: { ...others }
                  }
                  window.WavesKeeper.signTransaction(txData)
                    .then(data => {
                      const parsedData = JSON.parse(data)
                      if (state.proofOrder >= 0) {
                        // get new signature
                        const sig = parsedData.proofs[0]

                        // prepare signature arrays
                        for (let i = proofs.length; i <= state.proofOrder; i++) proofs.push('')
                        proofs[state.proofOrder] = sig

                        parsedData.proofs = proofs
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
          )}

          <Grid item className="Margin-10">
            <Button variant="contained" onClick={handleClickOpen}>Import</Button>
          </Grid>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Import Tx</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Paste your signed transaction data here:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Transaction data"
                fullWidth
                multiline
                rows="8"
                rowsMax="12"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Cancel
          </Button>
              <Button onClick={() => {
                try {
                  const txData = '{"type":5,"version":2,"senderPublicKey":"5gUuv1jjtePpX8rffb1RvQ6FvX2oJ2rNshfF9Dt2NUES","assetId":"WAVES","quantity":1,"reissuable":true,"chainId":84,"fee":100000000,"timestamp":1570669799347,"proofs":["4wBvwq8eE6VeUCaQMo9aSWL1AZPCXsyiestgCAhdNFMtn3M85vcQgrs3fyKwmLjfRtSGdKMnL7dnqehMR9A2wfcg"],"id":"ACSqbvtWo2DpPM76QGEDdD1iXeq3pJHdcdFcRvpzDQR9"}'
                  const txObj = JSON.parse(txData)
                  transactionsStore.updateSignTransaction(txObj)
                } catch (err) {
                  console.log(err)
                }
                handleClose()
              }} color="primary">
                Import
          </Button>
            </DialogActions>
          </Dialog>

          {state.wavesKeeper.initialized && (
            <Grid item className="Margin-10">
              <Button variant="contained" color="primary">
                Publish
              </Button>
            </Grid>
          )}
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
              <Icon>close</Icon>
            </IconButton>
          ]}
        />
      </Grid>
    </MuiThemeProvider>
  )
})

export default App

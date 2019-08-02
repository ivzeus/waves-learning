import React, { useContext, useEffect } from 'react'
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
  Toolbar,
  Typography
} from '@material-ui/core'
// import {
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle
// } from '@material-ui/core'
import ReactJson from 'react-json-view'
import { Network, Transactions } from './stores'
import { NetworkSelect, TransactionSelect } from './components'

export const App = observer(props => {
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
    <div>
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
          )}

          <Grid item className="Margin-10">
            <Button variant="contained">Copy</Button>
          </Grid>

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
    </div>
  )
})

export default App

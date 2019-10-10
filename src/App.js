import React, { useContext, useState, useEffect } from 'react'
import { observer, useObservable } from 'mobx-react-lite'
import './App.css'
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue, red } from '@material-ui/core/colors'
import ReactJson from 'react-json-view'
import { Network, Transactions } from './stores'
import { NetworkSelect, TransactionSelect } from './components'
import { WaveUtils } from './utils'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  status: {
    danger: 'orange'
  }
})

const CONFIRM_DIALOG = 'confirmDialog'
const IMPORT_DIALOG = 'importDialog'

export const App = observer(props => {
  const networkStore = useContext(Network)
  const transactionsStore = useContext(Transactions)
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [values, setValues] = useState({
    importTxData: ''
  })

  const handleClickOpen = (id) => {
    if (id === CONFIRM_DIALOG) {
      setOpenConfirmDialog(true)
    } else if (id === IMPORT_DIALOG) {
      setOpenImportDialog(true)
    }
  };

  const handleClose = (id) => {
    if (id === CONFIRM_DIALOG) {
      setOpenConfirmDialog(false)
    } else if (id === IMPORT_DIALOG) {
      setOpenImportDialog(false)
    }
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const state = useObservable({
    loading: true,
    proofOrder: 0,
    wavesKeeper: { initialized: false },
    showSuccessSnackBar: false,
    showErrorSnackbar: false,
    successMessage: '',
    successLink: '',
    errorMessage: '',
    setProofOrder(order) {
      state.proofOrder = order
    },
    setLoading(loading) {
      state.loading = loading
    },
    setSuccess(message = null, link = null) {
      if (message) {
        state.successMessage = message
        state.successLink = link
        state.showSuccessSnackBar = true
      } else {
        state.successMessage = ''
        state.successLink = ''
        state.showSuccessSnackBar = false
      }
    },
    setError(errorMessage = null) {
      if (errorMessage) {
        state.errorMessage = errorMessage
        state.showErrorSnackbar = true
      } else {
        state.errorMessage = ''
        state.showErrorSnackbar = false
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

          <Typography variant="h6">Waves Transaction creator</Typography>
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
          >
            {state.wavesKeeper.initialized ? (
              <Typography variant="subtitle1" component="h3" color="primary">
                WavesKeeper v{state.wavesKeeper.version} initialized!
              </Typography>
            ) : (
                <Typography variant="subtitle1" component="h3" color="error">
                  WavesKeeper plugin is not installed on your browser. It is required to sign your transactions!
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

          {state.wavesKeeper.initialized &&
            <Grid item sm={12} md={4}>
              <Paper className="Margin-10 Padding-20">
                <Typography variant="body2">Signed transaction:</Typography>
                <ReactJson
                  src={transactionsStore.signedTransaction}
                  style={{ textAlign: 'left' }}
                  collapseStringsAfterLength={20}
                />
              </Paper>
            </Grid>}
        </Grid>

        <Grid
          container
          justify="flex-start"
          alignItems="flex-end"
          className="Padding-10"
        >
          <Grid
            container
            justify="flex-start"
            alignItems="flex-end"
            className="Padding-10"
            sm={12}
            md={4}
            item>

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
          </Grid>

          {state.wavesKeeper.initialized && (<Grid
            container
            justify="flex-start"
            alignItems="flex-end"
            className="Padding-10"
            sm={12}
            md={4}
            item>
            <Grid item className="Margin-10">
              <Button variant="contained" onClick={() => handleClickOpen(IMPORT_DIALOG)}>Import</Button>
            </Grid>
            <Dialog open={openImportDialog} onClose={() => handleClose(IMPORT_DIALOG)} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Import Tx</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Paste your signed transaction data into the textbox below:
              </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  placeholder="Transaction data"
                  fullWidth
                  multiline
                  rows="8"
                  rowsMax="20"
                  onChange={handleChange('importTxData')}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(IMPORT_DIALOG)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  try {
                    const txData = values.importTxData
                    const txObj = JSON.parse(txData)
                    transactionsStore.updateSignTransaction(txObj)
                  } catch (err) {
                    console.log(err)
                  }
                  handleClose(IMPORT_DIALOG)
                }} color="primary">
                  Import
                </Button>
              </DialogActions>
            </Dialog>

            {state.wavesKeeper.initialized && (
              <Grid item className="Margin-10">
                <Button variant="contained" color="primary" onClick={() => handleClickOpen(CONFIRM_DIALOG)}>
                  Publish
              </Button>
              </Grid>
            )}
          </Grid>)}
        </Grid>
        <Dialog
          open={openConfirmDialog}
          onClose={() => handleClose(CONFIRM_DIALOG)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Publish transaction?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once published, the transaction cannot be reversed, your fund maybe at risk! Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(CONFIRM_DIALOG)} color="primary" autoFocus>
              Disagree
            </Button>
            <Button onClick={() => {
              state.setLoading(true)
              WaveUtils.broadcastTx(transactionsStore.signedTransaction, networkStore.url)
                .then(resp => {
                  state.setSuccess('Transaction success', networkStore.getTransactionLink(networkStore.ID, resp.id))
                  console.log('Waves send tx success')
                  console.log(resp)
                  state.setLoading(false)
                })
                .catch(error => {
                  console.log(error)
                  state.setError(error.message)
                  state.setLoading(false)
                })
              handleClose(CONFIRM_DIALOG)
            }
            } color="secondary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={state.showSuccessSnackBar}
          autoHideDuration={6000}
          onClose={() => state.setSuccess()}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{state.successMessage}</span>}
          action={[
            <Button color="secondary" size="small">
              <a styles={{ color: '#ffffff' }} href={state.successLink} rel="noopener noreferrer" target="_blank">View TX</a>
            </Button>
          ]}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={state.showErrorSnackbar}
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

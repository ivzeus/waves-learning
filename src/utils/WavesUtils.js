import { broadcast } from '@waves/waves-transactions'

class WavesUtils {
  async broadcastTx(txObj, networkUrl) {
    console.log('broadcastTx', networkUrl)
    console.log(txObj)
    return new Promise((resolve, reject) => {
      broadcast(txObj, networkUrl)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default new WavesUtils()

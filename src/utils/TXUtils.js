class TransactionUtils {
  async initializeKeeperAPI() {
    console.log(window.WavesKeeper)
  }

  async signTransaction(txData) {
    try {
      const resp = await window.WavesKeeper.signTransaction(txData)
      return {
        status: 200,
        message: 'success',
        data: JSON.parse(resp)
      }
    } catch (error) {
      return {
        status: 500,
        message:
          'WavesKeeper is not installed on your browser, or another problem occurs',
        data: error
      }
    }
  }

  getTxDataForSigning(txObj) {
    return {
      type: 4,
      data: {
        amount: {
          assetId: 'WAVES',
          tokens: '1.567'
        },
        fee: {
          assetId: 'WAVES',
          tokens: '0.001'
        },
        recipient: 'test'
      }
    }
  }

  getTransactionByType(type, networkInfo) {
    console.log(networkInfo)
    // <MenuItem value="setScript">SetScriptTransaction</MenuItem>
    // <MenuItem value="setAssetScript">
    //   SetAssetScriptTransaction
    // </MenuItem>
    // <MenuItem value="issue">IssueTransaction</MenuItem>
    // <MenuItem value="reissue">ReIssueTransaction</MenuItem>
    // <MenuItem value="data">DataTransaction</MenuItem>
    // <MenuItem value="transfer">TransferTransaction</MenuItem>
    switch (type) {
      case 'setScript':
        return this.getSetScriptTransaction(networkInfo.chainId)
      case 'setAssetScript':
        return this.getSetAssetScriptTransaction(networkInfo.chainId)
      default:
        return this.getTransferTransaction(networkInfo.chainId)
    }
  }

  getTransferTransaction(chainId) {
    return {
      amount: 0,
      recipient: 'recipient_address',
      fee: 1000000,
      assetId: 'WAVES',
      attachment: 'any_message',
      timestamp: Date.now(),
      chainId
    }
  }

  getSetAssetScriptTransaction(chainId) {
    return {
      assetId: 'asset_id',
      script: 'base64:compiled_script',
      fee: 100400000,
      chainId
    }
  }

  getSetScriptTransaction(chainId) {
    return {
      script: 'base64:compiled_script',
      fee: 100400000,
      chainId
    }
  }
}

export default new TransactionUtils()

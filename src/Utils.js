class Utils {
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

export default new Utils()

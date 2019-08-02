const TransactionTemplates = [
  {}, // not used
  {}, // genesis
  {}, // not used
  {}, // issue transaction
  {
    amount: 0,
    recipient: 'recipient_address',
    fee: 1000000,
    assetId: 'WAVES',
    attachment: 'any_message',
    timestamp: Date.now(),
    chainId: ''
  }, // transfer
  {}, // reissue
  {}, // burn
  {}, // exchange
  {}, // lease
  {}, // cancel lease
  {}, // alias
  {}, // mass transfer
  {}, // data
  {
    script: 'base64:compiled_script',
    fee: 100400000,
    chainId: ''
  }, // set script
  {}, // sponsor
  {
    assetId: 'asset_id',
    script: 'base64:compiled_script',
    fee: 100400000,
    chainId: ''
  }, // set asset script
  {}, // invoke
  {} //
]

export default TransactionTemplates

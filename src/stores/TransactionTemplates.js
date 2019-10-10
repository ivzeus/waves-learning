const TransactionTemplates = [
  {}, // not used
  {}, // genesis
  {}, // not used
  {}, // issue transaction
  {
    amount: {
      coins: 0,
      assetId: 'WAVES'
    },
    recipient: 'recipient_address',
    fee: {
      coins: 1000000,
      assetId: 'WAVES'
    },
    assetId: 'WAVES',
    attachment: 'any_message'
  }, // transfer
  {
    assetId: 'WAVES',
    quantity: 1,
    reissuable: true,
    fee: 100800000
  }, // reissue
  {}, // burn
  {}, // exchange
  {}, // lease
  {}, // cancel lease
  {}, // alias
  {}, // mass transfer
  {}, // data
  {
    script: 'base64:compiled_script',
    fee: {
      coins: 100400000,
      assetId: 'WAVES'
    }
  }, // set script
  {}, // sponsor
  {
    assetId: 'asset_id',
    script: 'base64:compiled_script',
    fee: {
      coins: 100400000,
      assetId: 'WAVES'
    }
  }, // set asset script
  {}, // invoke
  {} //
]

export default TransactionTemplates

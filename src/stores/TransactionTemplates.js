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
    recipient: '<recipient_address>',
    fee: {
      coins: 1000000,
      assetId: 'WAVES'
    },
    assetId: 'WAVES',
    attachment: '<any_message>'
  }, // transfer
  {
    assetId: 'WAVES',
    quantity: 1,
    reissuable: true,
    fee: {
      coins: 100800000,
      assetId: 'WAVES'
    }
  }, // reissue
  {}, // burn
  {}, // exchange
  {}, // lease
  {}, // cancel lease
  {}, // alias
  {}, // mass transfer
  {
    data: [{
      "type": "string",
      "value": "<input_value_here>",
      "key": "<input_key_here>"
    }],
    fee: {
      coins: 500000,
      assetId: 'WAVES'
    }
  }, // data
  {
    script: 'base64:<compiled_script>',
    fee: {
      coins: 100400000,
      assetId: 'WAVES'
    }
  }, // set script
  {}, // sponsor
  {
    assetId: 'asset_id',
    script: 'base64:<compiled_script>',
    fee: {
      coins: 100400000,
      assetId: 'WAVES'
    }
  }, // set asset script
  {}, // invoke
  {} //
]

export default TransactionTemplates

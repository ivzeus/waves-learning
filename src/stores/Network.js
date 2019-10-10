import { createContext } from 'react'
import { observable, action, computed, decorate } from 'mobx'

export class Network {
  NETWORK_CONFIG = {
    testnet: {
      url: 'https://testnodes.wavesnodes.com/',
      explorer: 'https://wavesexplorer.com/testnet/tx',
      chainID: 84
    },
    mainnet: {
      url: 'https://nodes.wavesplatform.com',
      explorer: 'https://wavesexplorer.com/tx',
      chainID: 82
    }
  }

  _networkConfigs = {} // TOOD: customize configs
  _networkID = 'testnet'
  _chainID = this.NETWORK_CONFIG['testnet'].chainID
  _networkURL = this.NETWORK_CONFIG['testnet'].url

  get ID() {
    return this._networkID
  }

  get chainID() {
    return this._chainID
  }

  get url() {
    return this._networkURL
  }

  changeNetwork(network) {
    if (network !== 'testnet' && network !== 'mainnet') return
    this._networkID = network
    this._chainID = this.NETWORK_CONFIG[network].chainID
    this._networkURL = this.NETWORK_CONFIG[network].url
  }

  addNetworkConfig({ network, chainId, url }) { }

  getTransactionLink(network, txId) {
    if (network !== 'testnet' && network !== 'mainnet') return
    return `${this.NETWORK_CONFIG[network].explorer}/${txId}`
  }
}

decorate(Network, {
  _networkConfigs: observable,
  _networkID: observable,
  _chainId: observable,
  _networkURL: observable,
  ID: computed,
  chainID: computed,
  url: computed,
  changeNetwork: action,
  addNetworkConfig: action
})

export default createContext(new Network())

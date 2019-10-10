import { createContext } from 'react'
import { observable, action, computed, decorate, toJS } from 'mobx'
import TransactionTemplates from './TransactionTemplates'

export class Transactions {
  _txType = 4
  _rawTxObj = TransactionTemplates[4]
  _signedTxObj = {}
  _pendingRawTransaction = false

  _getTransactionTemplate(type) {
    try {
      return {
        timestamp: Date.now(),
        ...TransactionTemplates[type]
      }
    } catch (error) {
      return TransactionTemplates[4] // default to transfer transaction
    }
  }

  get transactionType() {
    return this._txType
  }

  get rawTransaction() {
    return toJS(this._rawTxObj)
  }

  get hasPendingTransaction() {
    return this._pendingRawTransaction
  }

  rawTransactionForSigning({ networkStore }) {
    const _rawTx = {
      type: this._txType,
      data: {
        chainId: networkStore.chainID,
        ...this._rawTxObj
      }
    }
    return toJS(_rawTx)
  }

  get signedTransaction() {
    return toJS(this._signedTxObj)
  }

  addProof(order, signature) { }

  updateRawTransaction(data) {
    this._rawTxObj = data
  }

  updateSignTransaction(data) {
    this._signedTxObj = data
    this._pendingRawTransaction = true
  }

  setTransaction(type) {
    this._txType = type
    this._rawTxObj = this._getTransactionTemplate(type)
    this._signedTxObj = {}
    this._pendingRawTransaction = false
  }
}

decorate(Transactions, {
  _txType: observable,
  _rawTxObj: observable,
  _signedTxObj: observable,
  _pendingRawTransaction: observable,
  transactionType: computed,
  rawTransaction: computed,
  signedTransaction: computed,
  hasPendingTransaction: computed,
  addProof: action,
  updateRawTransaction: action,
  setTransaction: action
})

export default createContext(new Transactions())

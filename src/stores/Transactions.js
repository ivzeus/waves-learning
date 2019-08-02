import { createContext } from 'react'
import { observable, action, computed, decorate, toJS } from 'mobx'
import TransactionTemplates from './TransactionTemplates'

export class Transactions {
  _txType = 4
  _rawTxObj = TransactionTemplates[4]
  _signedTxObj = {}

  _getTransactionTemplate(type) {
    try {
      return TransactionTemplates[type]
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

  get signedTransaction() {
    return toJS(this._signedTxObj)
  }

  addProof(order, signature) {}

  updateRawTransaction(data) {
    this._rawTxObj = data
  }

  setTransaction(type) {
    this._txType = type
    this._rawTxObj = this._getTransactionTemplate(type)
    this._signedTxObj = {}
  }
}

decorate(Transactions, {
  _txType: observable,
  _rawTxObj: observable,
  _signedTxObj: observable,
  transactionType: computed,
  rawTransaction: computed,
  signedTransaction: computed,
  addProof: action,
  updateRawTransaction: action,
  setTransaction: action
})

export default createContext(new Transactions())

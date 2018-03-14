import axios from 'axios';

export default {
  listAccounts() {
    return axios.get('https://asean-iceberg.herokuapp.com/accounts')
  },
  getTransactionForAccount(id) {
    return axios.get('https://asean-iceberg.herokuapp.com/transactions', {params: {id}})
  },
};
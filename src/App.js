import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component {
  
  load(chainData) {
    this.setState({ account: chainData.account, balance: chainData.balance, web3: chainData.web3 })
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      balance: 0,
    }
  }
  
  render() {
    return (
      <div className='App'>
        <button onClick={ () => loadBlockchainData() }>
          Connect to Metamask
        </button>
      </div>
    );
  }
}

async function loadBlockchainData() {
  //check if MetaMask exists
  const ethereum = window.ethereum;
  if (typeof ethereum !== 'undefined') {
    const web3 = new Web3(ethereum)
    console.log(web3)

    //metamask popup
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log('your account ', accounts[0])
    const netId = await ethereum.request({ method: 'net_version' });
    console.log('network id ', netId)
    
    
    //check if account is detected, then load balance&setStates, else push alert
    if (typeof accounts[0] !== 'undefined') {
      const balance = await ethereum.request({ method: "eth_getBalance", params: [accounts[0]] })
      //const chainData = { web3: web3, account: accounts[0], balance: balance }
      //load(chainData);
      console.log('eth balance in wallet ', web3.fromWei(balance))
      
    } else {
      window.alert('Please login with MetaMaks')
    }

    //in try block load contracts
    try {


      
    } catch (e) {
      console.log('Error', e)
      window.alert('Contracts not deployed to the current network')
    }

  //if MetaMask not exists push alert
  } else {
    window.alert('Please install MetaMask')
  }
}

export default App;
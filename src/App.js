import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {
  

  //async componentDidMount() {
    //await this.loadBlockchainData(this.props.dispatch)
  //}

  
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
      //App.state = { web3: web3, account: accounts[0], balance: balance }
      //load(chainData);
      //this.setState({ account: accounts[0], balance: balance, web3: web3 })
      console.log('eth balance in wallet ', web3.fromWei(balance))
      
    } else {
      window.alert('Please login with MetaMaks')
    }

    //in try block load contracts
    try {
      
      //token
      //const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
      //bank
      //const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
      //const dBankAddress = dBank.networks[netId].address
      //this.setState({ token: token, dbank: dbank, dBankAddress: dBankAddress })
      
      //const isDeposited = await dbank.methods.isDeposited(this.state.account).call()
      //console.log('is deposited ', isDeposited)
      //const ethBalance = await dbank.methods.etherBalanceOf(this.state.account).call()
      //console.log('eth balance in bank ', web3.utils.fromWei(ethBalance))
      //const tokenBalance = await token.methods.balanceOf(this.state.account).call()
      //console.log('token balance in wallet ', web3.utils.fromWei(tokenBalance))
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
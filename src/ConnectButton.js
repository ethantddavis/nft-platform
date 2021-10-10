import React from 'react';

export function ConnectButton(props) {
  
  var buttonText = 'Connect to MetaMask'
  if (props.account !== '') {
      buttonText = props.account;
  }

  return (
    <div className="button">
      <button>
        {buttonText}
      </button>
    </div>
  )
}
import React, {
  useEffect,
  useState,
} from 'react';
import qs from 'query-string';
import styled from 'styled-components';
import {
  Flex,
  Box,
} from 'reflexbox';

import Web3 from 'web3';
import Torus from '@toruslabs/torus-embed';
import SquareLink from 'squarelink';

const abi = [{"constant":true,"inputs":[],"name":"backend","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_vendor","type":"string"},{"internalType":"string","name":"_product","type":"string"}],"name":"backendPurchaseProduct","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vendors","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"vendorNames","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_vendorContract","type":"address"}],"name":"addVendor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"location","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_vendor","type":"string"},{"internalType":"string","name":"_product","type":"string"}],"name":"purchaseProduct","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vendorContracts","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_location","type":"string"},{"internalType":"address","name":"_backend","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_vendor","type":"string"},{"indexed":false,"internalType":"string","name":"_product","type":"string"},{"indexed":false,"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"ProductPurchased","type":"event"}];
const contractAddress = '0xe0a439d34F3C1ccf83a609202018AA0900Ba3fA9';

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 2em 4em;
  border-radius: 1rem;
`;

const Content = styled.p`
  font-family: 'Open Sans';
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const Button = styled.button`
  margin-top: 0px;
  width: ${props => props.block && '100%'};
  display: block;
  font-family: 'Open Sans';
  font-size: ${props => props.small ? '14px' : '18px'};
  font-weight: ${props => props.small ? '400' : '700'};
  background-color: #3498db;
  border-radius: 1rem;
  color: #fff;
  border: none;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
`;

const Logo = styled.img`
    height: 64px;
`;

function Pay() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();

  const parsed = qs.parse(window.location.search);

  const { wallet } = parsed;

  async function initTorus() {
    const torus = new Torus();
    await torus.init();
    await torus.login();
    setWeb3(new Web3(torus.provider));
  }

  async function initInjected() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      try {
        await window.ethereum.enable();
        setWeb3(new Web3(window.web3.currentProvider));
      } catch (err) {
        console.log(err);
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setWeb3(new Web3(window.web3.currentProvider));
    }
  }

  async function initSquarelink() {
    const sqlk = new SquareLink('bb49cf726452aa4896b0');
    sqlk.getProvider(provider => {
      setWeb3(new Web3(provider));
    })
  }

  useEffect(() => {
    if (wallet === 'squarelink') {
      initSquarelink();
    } else if (wallet === 'torus') {
      initTorus();
    } else if (wallet === 'injected') {
      initInjected();
    }
  }, []);

  useEffect(() => {
    async function getWallet() {
      if (web3) {
        const addresses = await web3.eth.getAccounts();
        setAddress(addresses[0]);
      }
    }

    getWallet();
  }, [web3]);

  useEffect(() => {
    async function purchaseProduct() {
      if (address) {
        const contract = new web3.eth.Contract(abi, contractAddress);

        await contract.methods.purchaseProduct(
          'coca-cola',
          'classic',
        ).send({
          from: address,
          value: web3.utils.toWei('0.01', 'ether'),
        });
      }
    }

    purchaseProduct();
  }, [address]);

  function displayContent() {
    if (web3) {
      return (
        <Container>
          <Card>
            <Content>
              {`Paying with address: ${address}...`}
            </Content>
          </Card>
        </Container>
      );
    }

  return (
    <>
      <Content>
        No wallet 😢
      </Content>
    </>
  );

  }

  return displayContent();
}

export default Pay;

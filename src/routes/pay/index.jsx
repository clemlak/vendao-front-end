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
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const Button = styled.button`
`;

function Pay() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();

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
    async function getWallet() {
      if (web3) {
        const addresses = await web3.eth.getAccounts();
        setAddress(addresses[0]);
      }
    }

    getWallet();
  }, [web3]);

  /*
  useEffect(() => {
    async function triggerPayment() {
      if (address) {
        await web3.eth.sendTransaction({
          from: address,
          to: '0x86d2fc11be873eca93a083c5cabc38ec59bbc222',
          value: '1',
        });
      }
    }

    triggerPayment();
  }, [address]);
  */

  const parsed = qs.parse(window.location.search);

  function displayContent() {
    if (web3) {
      return (
        <Container>
          <Card>
            <Content>
              {`Welcome ${address}!`}
            </Content>
          </Card>
        </Container>
      );
    }

  return (
    <>
      <Content>
        Connect with:
      </Content>
      <Flex>
        <Box width={1 / 2} padding={3}>
          <Button
            onClick={() => initTorus()}
          >
            Torus
          </Button>
        </Box>
        <Box width={1 / 2} padding={3}>
          <Button
            onClick={() => initSquarelink()}
          >
            Squarelink
          </Button>
        </Box>
        <Box width={1 / 2} padding={3}>
          <Button
            onClick={() => initInjected()}
          >
            Injected
          </Button>
        </Box>
      </Flex>
    </>
  );

  }

  return displayContent();
}

export default Pay;

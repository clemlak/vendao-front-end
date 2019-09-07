import React, {
  useEffect,
  useState,
} from 'react';
import qs from 'query-string';
import Web3 from 'web3';
import styled from 'styled-components';

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
  font-family: 'Source Sans Pro';
  font-family: 'Source Sans Pro';
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

function Pay() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const [txStatus, setTxStatus] = useState();

  useEffect(() => {
    async function loadWeb3() {
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

    loadWeb3();
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

  const parsed = qs.parse(window.location.search);
  console.log(parsed);

  function displayContent() {
    if (web3) {
      return (
        <Container>
          <Card>
            <Content>
              Paying!
            </Content>
          </Card>
        </Container>
      );
    }

  return (
    <Container>
      <Card>
        <Content>
        No wallet found...
        </Content>
      </Card>
    </Container>
  );

  }
  
  return displayContent();
}

export default Pay;

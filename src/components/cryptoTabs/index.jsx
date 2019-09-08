import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

const Button = styled.button`
  margin-top: 12px;
  width: ${props => props.block && '100%'};
  display: inline-block;
  font-family: 'Open Sans';
  font-size: 16px;
  font-weight: 400;
  background-color: ${props => props.active ? '#3498db' : '#bdc3c7'};
  border-radius: 1rem;
  color: #fff;
  border: none;
  padding: 6px 12px;
  margin: 5px;

  &:focus {
    outline: none;
  }
`;

const Content = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-family: 'Open Sans';
`;

function CryptoTabs(props) {
  const {
    addresses,
    pricing,
  } = props;

  console.log(addresses);
  console.log(pricing);

  const [currentTab, setCurrentTab] = useState(0);

  function displayContent() {
    if (currentTab === 0) {
      return (
        <>
          <Text>
            {`Pay ${pricing.bitcoin.amount} ${pricing.bitcoin.currency}`}
          </Text>
          <QRCode
            size={200}
            value={addresses.bitcoin}
          />
        </>
      );
    }

    if (currentTab === 1) {
      return (
        <>
          <Text>
            {`Pay ${pricing.litecoin.amount} ${pricing.litecoin.currency}`}
          </Text>
          <QRCode
            size={200}
            value={addresses.litecoin}
          />
        </>
      );
    }

    if (currentTab === 2) {
      return (
        <>
          <Text>
            {`Pay ${pricing.bitcoincash.amount} ${pricing.bitcoincash.currency}`}
          </Text>
          <QRCode
            size={200}
            value={addresses.bitcoincash}
          />
        </>
      );
    }

    if (currentTab === 3) {
      return (
        <>
          <Text>
            {`Pay ${pricing.usdc.amount} ${pricing.usdc.currency}`}
          </Text>
          <QRCode
            size={200}
            value={addresses.usdc}
          />
        </>
      );
    }


  }

  return (
    <>
      <Button
        onClick={() => setCurrentTab(0)}
        active={currentTab === 0}
      >
        Bitcoin
      </Button>
      <Button
        onClick={() => setCurrentTab(1)}
        active={currentTab === 1}
      >
        Litecoin
      </Button>
      <Button
        onClick={() => setCurrentTab(2)}
        active={currentTab === 2}
      >
        Bitcoin Cash
      </Button>
      <Button
        onClick={() => setCurrentTab(3)}
        active={currentTab === 3}
      >
        USDC
      </Button>
      <Content>
        {displayContent()}
      </Content>
    </>
  );
}

export default CryptoTabs;

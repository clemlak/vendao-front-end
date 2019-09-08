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

function Tabs(props) {
  const {
    price,
    name,
    productId,
  } = props;

  const [currentTab, setCurrentTab] = useState(0);

  function displayContent() {
    if (currentTab === 0) {
      return (
        <QRCode
          size={200}
          value={`${window.location.hostname}/pay?price=${price}&name=${name}`}
        />
      );
    }

    if (currentTab === 1) {
      return (
        <QRCode
          size={200}
          value={`https://link.trustwallet.com/open_url?coin_id=60&url=https://vendao.xyz/pay?price=${price}&name=${name}`}
        />
      );
    }

    if (currentTab === 2) {
      return (
        <QRCode
          size={200}
          value={`https://metamask.app.link/dapp/vendao.xyz/pay?price=${price}&name=${name}`}
        />
      );
    }
  }

  return (
    <>
      <Button
        onClick={() => setCurrentTab(0)}
        active={currentTab === 0}
      >
        Web wallet
      </Button>
      <Button
        onClick={() => setCurrentTab(1)}
        active={currentTab === 1}
      >
        Trust Wallet
      </Button>
      <Button
        onClick={() => setCurrentTab(2)}
        active={currentTab === 2}
      >
        MetaMask Mobile
      </Button>
      <Content>
        {displayContent()}
      </Content>
    </>
  );
}

Tabs.propTypes = {
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
};

export default Tabs;

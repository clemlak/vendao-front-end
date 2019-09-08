import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Dropdown from '../dropdown';
import Tabs from '../tabs';
import CryptoTabs from '../cryptoTabs';

import CoinbaseCommerce from '../../utils/coinbase-commerce';

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  left: 0;
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  text-align: ${props => props.centered ? 'center' : 'left'};
  background-color: #ffffff;
  width: 400px;
  max-width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  border-radius: 1rem;
`;

const Image = styled.div`
  width: 100%;
  height: 180px;
  background-image: url(${props => props.src});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 15px;
`;

const Label = styled.p`
  margin: 0;
  font-family: 'Open Sans';
  font-size: 16px;
  font-weight: 700;
`;

const Price = styled.p`
  margin: 0;
  font-family: 'Open Sans';
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Button = styled.button`
  margin-top: 12px;
  width: ${props => props.block && '100%'};
  display: block;
  font-family: 'Open Sans';
  font-size: ${props => props.small ? '14px' : '18px'};
  font-weight: ${props => props.small ? '400' : '700'};
  background-color: ${props => props.cancel ? '#e74c3c' : '#2ecc71'};
  border-radius: 1rem;
  color: #fff;
  border: none;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #95a5a6;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const Wallet = styled.button`
  margin-top: 12px;
  width: ${props => props.block && '100%'};
  display: block;
  font-family: 'Open Sans';
  font-size: 16px;
  font-weight: 400;
  background-color: #3498db;
  border-radius: 1rem;
  color: #fff;
  border: none;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  font-family: 'Open Sans';
  font-size: 24px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 10px;
`;

function Order(props) {
  const [showQrCode, toggleQrCode] = useState(false);
  const [ticker, setTicker] = useState();
  const [addresses, setAddresses] = useState();
  const [pricing, setPrincing] = useState();

  const {
    isOpen,
    url,
    name,
    price,
    productId,
    toggle,
  } = props;

  const options = [
    {
      text: 'Ethereum',
      value: 'ETH',
    },
    {
      text: 'Bitcoin, Litecoin, USDC, ...',
      value: 'coinbase-commerce',
    },
  ];

  if (!isOpen) {
    return <></>;
  }

  if (showQrCode) {
    if (ticker === 'ETH') {
      return (
        <Modal>
          <Content centered>
            <Text>
              Pay with
            </Text>
            <Wallet
              onClick={() => window.location = '/pay?wallet=squarelink'}
              block
            >
              Squarelink
            </Wallet>
            <Wallet
              onClick={() => window.location = '/pay?wallet=torus'}
              block
            >
              Torus
            </Wallet>
            <Wallet
              onClick={() => window.location = '/pay?wallet=injected'}
              block
            >
              MetaMask Mobile
            </Wallet>
            <Wallet
              onClick={() => window.location = '/pay?wallet=injected'}
              block
            >
              Trust Wallet
            </Wallet>
            <Button block small cancel onClick={() => window.location = '/'}>
              Cancel
            </Button>
          </Content>
        </Modal>
      );
    }

    if (ticker === 'coinbase-commerce') {
        const commerce = new CoinbaseCommerce('5fbf4d82-a957-4dd1-8ad9-c148c34c19c4');

        const charge = {
          "name": name,
          "description": name,
          "pricing_type": "fixed_price",
          "local_price": {
            "amount": '1',
            "currency": "USD",
          },
          "metadata": {
            "vendor": "coca-cola",
            "product": "classic",
            "location": "machine1",
          }
        };

      commerce.createCharge(charge)
        .then((res) => {
          console.log(res);

          window.location = res.hosted_url;
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }

  return (
    <Modal>
      <Content>
        <Image
          src={url}
        />
        <Label>
          {name}
        </Label>
        <Price>
          {price}
        </Price>
        <Dropdown
          options={options}
          text="Select a currency"
          setValue={val => setTicker(val)}
          block
        />
        <Button
          onClick={() => toggleQrCode(!showQrCode)}
          disabled={!ticker ? true : false}
          block
        >
          Pay
        </Button>
        <Button
          onClick={toggle}
          cancel
          block
        >
          Cancel
        </Button>
      </Content>
    </Modal>
  );
}

Order.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Order;

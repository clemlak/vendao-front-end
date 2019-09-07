import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

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
`;

const Label = styled.p`
  margin: 0;
  font-family: 'Source Sans Pro';
  font-size: 16px;
  font-weight: 600;
`;

const Price = styled.p`
  margin: 0;
  font-family: 'Source Sans Pro';
  font-size: 24px;
  font-weight: 800;
`;

const Button = styled.button`
  margin-top: 12px;
  width: ${props => props.block && '100%'};
  display: block;
  font-family: 'Source Sans Pro';
  font-size: 24px;
  font-weight: 800;
  background-color: ${props => props.danger ? '#e74c3c' : '#2ecc71'};
  border-radius: 1rem;
  color: #fff;
  border: none;

  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  font-family: 'Source Sans Pro';
`;

function Order(props) {
  const [showQrCode, toggleQrCode] = useState(false);

  const {
    isOpen,
    url,
    name,
    price,
    toggle,
  } = props;

  if (!isOpen) {
    return <></>;
  }

  if (showQrCode) {
    return (
      <Modal>
        <Content centered>
          <Text>
            {`Pay ${price} to this address:`}
          </Text>
          <QRCode
            size={120}
            value="https://google.fr"
          />
          <Button
            onClick={() => window.location = '/'}
            block
          >
            Done
          </Button>
        </Content>
      </Modal>
    );
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
        <Button
          onClick={() => toggleQrCode(!showQrCode)}
          block
        >
          Pay
        </Button>
        <Button
          onClick={toggle}
          danger
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
  url: PropTypes.string.isRequired,
};

export default Order;

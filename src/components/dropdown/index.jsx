import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  width: ${props => props.block && '100%'};
  box-sizing: border-box;
  display: flex;
  position: relative;
`;

const Button = styled.div`
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
  display: flex;
  position: relative;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  height: 2.5rem;
  width: 100%;
  cursor: pointer;
  line-height: 28px;
  color: rgb(80, 82, 86);
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: rgb(201, 206, 214);
  background: rgb(255, 255, 255);
`;

const Content = styled.div`
  font-family: 'Open Sans', sans-serif;
  min-width: 100px;
  position: absolute;
  z-index: 10;
  transform-origin: 50% 0px;
  top: calc(100% + 2px);
  left: 0px;
  opacity: ${props => (props.isContentOpen ? 1 : 0)};
  transform: ${props => (props.isContentOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transition: all 0.2s ease-in-out 0s;
  box-sizing: border-box;
  position: absolute;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px, rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
  border-radius: 6px;
  background: rgb(255, 255, 255);
`;

const Option = styled.div`
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
`;

function Dropdown(props) {
  const {
    options,
    text,
    isOpen,
    block,
    setValue,
  } = props;

  const [isContentOpen, setIsContentOpen] = useState(isOpen);
  const [buttonText, setButtonText] = useState(text);

  function toggle() {
    if (isContentOpen) {
      setIsContentOpen(false);
    } else {
      setIsContentOpen(true);
    }
  }

  function selectValue(optionValue, optionText) {
    setIsContentOpen(false);
    setValue(optionValue);
    setButtonText(optionText);
  }

  return (
    <Wrapper block={block}>
      <Button onClick={() => toggle()}>
        {buttonText}
      </Button>
      <Content isContentOpen={isContentOpen}>
        {options.map(option => (
          <Option key={option.value} onClick={() => selectValue(option.value, option.text)}>
            {option.text}
          </Option>
        ))}
      </Content>
    </Wrapper>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  block: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  isOpen: false,
  block: false,
};

export default Dropdown;

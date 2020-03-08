import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tag } from '@blueprintjs/core';

const OuterWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #ccc9c9;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  color: black;
  padding: 0.5rem 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: flex-end;
`;

const InnerWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Product = props => {
  const { name, category, subcategory, productID } = props;
  return (
    <OuterWrap>
      <span>{name}</span>
      <InnerWrap>
        <span>
          <b>SKU: </b> {productID}
        </span>
        <TagContainer>
          <Tag round style={{ marginRight: '0.25rem', background: '##6396b3' }}>
            {category}
          </Tag>
          <Tag round style={{ marginTop: '0.15rem', backgroundColor: '#D6A636' }}>
            {subcategory}
          </Tag>
        </TagContainer>
      </InnerWrap>
    </OuterWrap>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subcategory: PropTypes.string.isRequired,
  productID: PropTypes.string.isRequired
};

export default Product;

import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoryContainer from '../containers/categoryContainer';
import SubcategoriesContainer from '../containers/subcategoriesContainer';
import FeaturesContainer from '../containers/featuresContainer';
import { getProductResults } from '../httpApi';
import { useDebounce } from '../utils';
import Product from './Product';

const ItemList = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
`;

const useProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastID, setLastID] = useState('');
  const { category } = CategoryContainer.useContainer();
  const { selectedSubcats } = SubcategoriesContainer.useContainer();
  const { selectedFeatures, query } = FeaturesContainer.useContainer();
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const filteredFeatureIds = selectedFeatures.map(feature => feature._id);
    getProductResults(debouncedQuery, filteredFeatureIds, category, selectedSubcats)
      .then(results => {
        if (results.data) {
          if (results.data.products.length < 15) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setLastID(results.data.products[results.data.products.length - 1]._id);
          setProducts(results.data.products);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [debouncedQuery, selectedFeatures, category, selectedSubcats]);

  const fetchMore = () => {
    const filteredFeatureIds = selectedFeatures.map(feature => feature._id);
    getProductResults(debouncedQuery, filteredFeatureIds, category, selectedSubcats, lastID)
      .then(results => {
        if (results.data) {
          const newList = products.concat(results.data.products);
          if (results.data.products.length < 15) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setLastID(results.data.products[results.data.products.length - 1]._id);
          setProducts(newList);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return [products, fetchMore, hasMore];
};

const ProductList = () => {
  const [products, fetchMore, hasMore] = useProductsQuery();
  return (
    <ItemList
      dataLength={products.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>All results displayed.</b>
        </p>
      }
    >
      {products.map(product => {
        return (
          <Product
            key={product._id}
            name={product.name}
            category={product.category}
            subcategory={product.subcategory}
            productID={product.productId}
          />
        );
      })}
    </ItemList>
  );
};

export default ProductList;

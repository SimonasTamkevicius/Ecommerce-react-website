import React from 'react'
import { useLocation } from 'react-router-dom';

const SingleProductPage = () => {

    const location = useLocation();
    const { prod } = location.state;

  return (
    <div>
        {prod.name}
        {prod.description}
    </div>
  )
}

export default SingleProductPage;
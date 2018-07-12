import React from 'react';

const Graphic = ({ data = 'black' }) => {
  return (
    <div
      style={{
        height: 200,
        backgroundColor: data,
      }}
    />
  );
};

export default Graphic;

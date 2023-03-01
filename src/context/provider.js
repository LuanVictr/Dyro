import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './context';

function Provider({ children }) {
  const [test, setTest] = useState('');
  const [userName, setUserName] = useState('');

  const value = {
    test,
    setTest,
    userName,
    setUserName,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;

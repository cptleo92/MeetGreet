import React from 'react';
import { TailSpin } from  'react-loader-spinner'

function Loading() {
  return (
    <div className="loader">
    <TailSpin
      height="200"
      width="200"
      color='grey'
      ariaLabel='loading'
      />
    </div>
  );
}

export default Loading;
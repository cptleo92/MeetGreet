import React, { useEffect } from 'react';
import { TailSpin } from  'react-loader-spinner'

function Loading() {
  return (
    <div className="loader">
    <TailSpin
      height="300"
      width="300"
      color='grey'
      ariaLabel='loading'
      />
    </div>
  );
}

export default Loading;
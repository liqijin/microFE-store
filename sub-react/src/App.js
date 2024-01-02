import React, { useState, useRef } from 'react'
// import logo from './logo.svg';
import Preview from './Preview'
import Configuration from './Configuration'
function App() {
  const [activeLightSource, setActiveLightSource] = useState(1)
  const previewBox = useRef()
  return (
    <div className="container App">
      <a href='http://localhost:8080/' className='backToHome'>前往首页</a>
      <div className="flex">
        <Preview setActiveLightSource={setActiveLightSource} previewBox={previewBox} />
        <Configuration previewBox={previewBox} activeLightSource={activeLightSource} />
      </div>
    </div>
  );
}

export default App;

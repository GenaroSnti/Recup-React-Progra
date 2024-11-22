import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import Request from './componentes/Request';
import './App.css'

function App() {
  const [req, setreq] = useState('');
  const [cantidad, setcantidad] = useState('');
  const ref = useRef(0);

  const handleCantidad = (e) =>{
  const newValue = e.target.value === ''? 0 : parseInt(e.target.value);
  
    setcantidad(newValue);
    ref.current  =  newValue; 
  };
  console.log(ref.current);

  
  return (
    <>
    <input
    type='number'
    value={cantidad}
    onChange={handleCantidad}></input>
    <Request Ref={ref.current}></Request>
    </>
  )
}

export default App;

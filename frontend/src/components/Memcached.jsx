import '../App.css';
import { useState, useEffect } from 'react';


function Memcached() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/test/memcached').then(res => res.json()).then(output => {
        setData(output.output);
    })
  }, [])

  return (
    <div className="Memcached">
        <p>Output Memcached data: {data}</p>
    </div>
  );
}

export default Memcached;

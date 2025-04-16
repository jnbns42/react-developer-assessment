import Header from './Header';

import { useState, useEffect } from 'react';
//import { useSearchParams, SetURLSearchParams } from 'react-router';


const App: React.FC = () => {
  
  const [data, setData] = useState([]);
  //const [searchParams, SetURLSearchParams] = useSearchParams();

  return (
    <div>
      {/* Complete the exercise here. */}
      <Header/>
    </div>
  );
};

export default App;

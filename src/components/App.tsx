import { l } from 'react-router/dist/development/fog-of-war-oa9CGk10';
import Header from './Header';
import { useState, useEffect } from 'react';
//import { useSearchParams, SetURLSearchParams } from 'react-router';


const App: React.FC = () => {
  
  const [data, setData] = useState([]);
  //const [searchParams, SetURLSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('/api/posts');
        if(!resp.ok) {
          setData([]);
          throw new Error(`Error: ${resp.status}`);
        }
        const bookData = await resp.json();
        setData(bookData);
      } catch {
        setData([]);
        console.error('Data fetch failed');
      }
    };
    fetchData();
  }, [])

  return (
    <div>
      {/* Complete the exercise here. */}
      <Header/>
    </div>
  );
};

export default App;

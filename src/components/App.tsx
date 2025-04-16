
import Header from './Header';
import { useState, useEffect } from 'react';
//import { useSearchParams, SetURLSearchParams } from 'react-router';

import { Post, Author, Category } from '../interface';


const App: React.FC = () => {
  
  const [data, setData] = useState<Post[]>();
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
        setData(bookData.posts);
      } catch {
        setData([]);
        console.error('Data fetch failed');
      }
    };
    fetchData();
  }, [])
  console.log(data)
  return (
    <div>
      {/* Complete the exercise here. */}
      <Header/>
      <ul>
        {data?.map((book, index) => <li>{book.title}</li>)}
      </ul>
    </div>
  );
};

export default App;

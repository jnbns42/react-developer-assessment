
import { useState, useEffect } from 'react';
//import { useSearchParams, SetURLSearchParams } from 'react-router';
import { styled } from 'styled-components';

import Header from './Header';
import Book from './Book';

import { Post, Author, Category } from '../interface';

const List = styled.ul`
  list-style: none;
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1024px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  box-sizing: border-box;
  flex: 1 0 30%;
`

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

  return (
    <div>
      {/* Complete the exercise here. */}
      <Header/>
      <List>
        {data?.map((book, index) => <ListItem key={index}><Book delay={index} title={book.title} /></ListItem>)}
      </List>
    </div>
  );
};

export default App;

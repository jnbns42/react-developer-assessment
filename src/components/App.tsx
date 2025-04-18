
import { useState, useEffect, createRef } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { styled, css } from 'styled-components';

import Header from './Header';
import Book from './Book';

import Paginate from '../util/paginate';

import { Post, PaginatedPosts } from '../interface';

// Simple CSS reset for lists
const listReset = css`
  list-style: none;
  padding: 0;
  margin: 0;
  text-indent: 0;
`

const List = styled.ul`
  ${listReset}
  list-style: none;
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1024px;
  gap: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 480px) {
    grid-template-columns: auto;
  }
`

const ListItem = styled.li`
  box-sizing: border-box;
`

const Pager = styled.ul`
  ${listReset}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PagerItem = styled.button`
  background: none;
  border: none;
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
`

const App: React.FC = () => {
  
  const PAGE_SIZE = 6;

  const [data, setData] = useState<Post[]>(); // Original data from API
  const [dataFetched, setDataFetched] = useState<boolean>(false); // Bool
  const [paginatedData, setPaginatedData] = useState<PaginatedPosts>(); // Paginated data
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const listRef = createRef<any>();

  const pagerClickHandler = (page: number) => {
    listRef.current?.classList.add('hide');
  
    setTimeout(() => {
      listRef.current?.classList.remove('hide');
      setParams({p: page.toString()});
      setCurrentPage(page);
    }, 500)
  }

  const pagerItems = () => {
    const elems: Array<React.ReactNode> = [];
    
    if (paginatedData) {
      for (let i = 0; i < paginatedData?.totalPages - 1; i++) {
        elems.push( <li>
          <PagerItem onClick={(event: any) => pagerClickHandler(i + 1)}>{ i + 1 }</PagerItem>
        </li>)
      }
    }
    return elems;
  }

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
        setDataFetched(true); // set boolean stating data fetched
      } catch {
        setData([]);
        console.error('Data fetch failed');
      }
    };

    // if we have not yet retrieved data, get it...don't want to continuesly hit the end point
    if (!dataFetched) {
      fetchData();

    // if we have retrieved data, paginate it...again, don't want to do this repeatedly.
    } else if (paginatedData == undefined) {
      setPaginatedData(Paginate(data, PAGE_SIZE));
      setCurrentPage(params.has('p') ? parseInt(params.get('p') || '1') : 1);
      setParams({p: currentPage.toString()});
    }
  }, [location, data])

  return (
    <div>
      <Header/>
        <List ref={listRef}>
          {paginatedData?.pages[currentPage]?.map((book, index) => <ListItem key={index}><Book delay={index} title={book.title} author={book.author.name} categories={book.categories}/></ListItem>)}
        </List>
        <Pager>
            {pagerItems()}
        </Pager>
    </div>
  );
};

export default App;

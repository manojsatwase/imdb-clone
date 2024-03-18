import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMoviesAPI } from './API/imdbAPI';

import logo from './assets/logo.png';

import Search from './components/Search/Search';
import Table from './components/Table/Table';
import PaginationComponent from './components/Pagination/PaginationComponent';
import AppModal from './Modal/AppModal';
import Sort from './components/Sort/Sort';
import Genre from './components/Genre/Genre';

import "./App.css";

const App = () => {
 const [obj,setObj] = useState({});
 const [sort,setSort] = useState({sort:"rating",order:"desc"});
 const [filterGenre,setFilterGenre] = useState([]);
 const [page,setPage] = useState();
 const [limit,setLimit] = useState(4)
 const [search,setSearch] = useState("");
 const dispatch = useDispatch();
  
 const imdbMovies= useSelector(state=>state?.imdbMovies.movies);

  useEffect(()=> {
     dispatch(getMoviesAPI(page,limit,sort,filterGenre,search));
     setObj(imdbMovies);
  },[dispatch,page,limit,sort,filterGenre,search]);

  return (
    <>
    <div className='wrapper'>
       <div className='container'>
            <div className='head'>
              <img src={logo} loading="lazy" alt='logo' className='logo'/>
              <Search setSearch={(search)=> setSearch(search)} />
            </div>
            <div className='body'>
              <div className='table_container'>
                <Table movies={obj.movies? obj.movies : []} />
                <PaginationComponent
                 page={page}
                 limit={obj?.limit ? obj?.limit : 0}
                 total={obj?.total ? obj?.total : 0}
                 setPage={(page) => setPage(page)}
                />
              </div>
              <div className='filter_container'>
               <Sort sort={sort} setSort={(sort) => setSort(sort)}/>
               <Genre
                filterGenre={filterGenre}
                genres={obj.genres ? obj.genres : []}
                setFilterGenre={(genre) => setFilterGenre(genre)}
               />
              </div>
            </div>
       </div>
    </div>
     <AppModal />
    </>
  )
}

export default App
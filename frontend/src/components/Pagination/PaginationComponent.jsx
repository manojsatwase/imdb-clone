import React from 'react'

import "./Pagination.css";

const PaginationComponent = ({page=1,limit,total,setPage}) => {
    // lest say we have 30 movies and limit is 10 so we need to show 10 movies in one page
    const totalPages = Math.ceil(total / limit);

	const onClick = (newPage) => {
		setPage(newPage + 1);
	};
  return (
    <div>
      {totalPages > 0 &&
				[...Array(totalPages)].map((val, index) => (
			<button
			onClick={() => onClick(index)}
            className={ page === index + 1 ? `page_btn active` :"page_btn"
        } 
        key={index}
    
        >{index + 1}</button>
      ))}
    </div>
  )
}

export default PaginationComponent
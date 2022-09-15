import React, { useEffect } from 'react'

const SearchAndAdd = ({members}) => {

    useEffect(()=>{
        console.log(members);
    },[members]);
  return (
    <div><input type="search" placeholder='find friends..'/></div>
  )
}

export default SearchAndAdd
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

function Articles() {
  const {data} = useQuery(gql`
    query getArticles {
      articles {
        id
        title
      }
    }
  `);
  return (
    <>
      {data?.articles && <div>{data.articles.map(({id, title}: any) => (
        <Link key={id} to={`/${id}`}>
          <div>{title}</div>
        </Link>
      ))}</div>}
    </>
  );
}

export default Articles;

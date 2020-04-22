import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

function Article() {
  let { id } = useParams();
  const {data} = useQuery(gql`
    query getArticle($id: String!) {
      article(id: $id) {
        id
        title
        author {
          id
          name
        }
      }
    }
  `, {
    variables: {id},
    returnPartialData: true,
  });
  return (
    <>
      {data.article.title && <div>Title: {data.article.title}</div>}
      {data.article.author && <div>Author: {data.article.author.name}</div>}
    </>
  );
}

export default Article;

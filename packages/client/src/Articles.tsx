import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const getArticlesQuery = gql`
  query getArticles {
    articles {
      id
      title
    }
  }
`;

const removeArticleMutation = gql`
  mutation removeArticle($id: ID!) {
    removeArticle(id: $id)
  }
`;

function Articles() {
  const {data} = useQuery(getArticlesQuery);

  const [removeArticle] = useMutation(removeArticleMutation, {
    update(cache, {data: mutationData}) {
      if (mutationData) {
        const data: any = cache.readQuery({query: getArticlesQuery});
        if (data) {
          cache.writeQuery({
            query: getArticlesQuery,
            data: {
              ...data,
              articles: data.articles.filter((article: any) => article.id !== mutationData.removeArticle),
            },
          });
        }
      }
    },
  });

  return (
    <>
      {data?.articles && <div>{data.articles.map(({id, title}: any) => (
        <div key={id}>
          <Link to={`/${id}`}>{title}</Link>
          <button onClick={() => removeArticle({optimisticResponse: {removeArticle: id}, variables: {id}}).catch(e => console.error(e.message))}>
            Remove
          </button>
        </div>
      ))}</div>}
    </>
  );
}

export default Articles;

import { gql } from 'graphql-request';

import graphCmsClient from '../lib/graphCmsClient';

function ProductPage({ product }) {
  return (
    <>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <p>Ispod da se najzad uradi</p>
      <div className="container">
        <div className="gridContent">
          <div className="contentBox bigBox">
            <div className="bigImage">
              <img
                className="bigImage"
                src={product.images[0].url}
                alt={product.title}
              />
            </div>
            <div className="bigImage">
              <img
                className="bigImage"
                src={product.imagesqwe.url}
                alt={product.title}
              />
            </div>
            <div className="bigBoxText">
              <p className="titlecontentBox">lorem ipsum</p>
              <h2 className="headlinecontentBox">{product.name}</h2>
              <p className="descriptionBox">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  let paths = [];

  const { products } = await graphCmsClient.request(gql`
    {
      products {
        id
      }
    }
  `);

  for (const locale of locales) {
    paths = [
      ...paths,
      ...products.map((product) => ({ params: { id: product.id }, locale })),
    ];
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ locale, params }) {
  const { product } = await graphCmsClient.request(
    gql`
      query ProductPageQuery($id: ID!, $locale: Locale!) {
        product(where: { id: $id }, locales: [$locale]) {
          id
          description
          images {
            height
            url
            width
          }
          locale
          imagesqwe {
            height
            width
            url
          }
          name
          price
          slug
        }
      }
    `,
    { id: params.id, locale }
  );

  return {
    props: {
      product,
    },
  };
}

export default ProductPage;

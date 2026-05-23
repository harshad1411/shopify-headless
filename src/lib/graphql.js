export const GQL_QUERY = `
    query GetCollections($first: Int, $after: String, $last: Int, $before: String){
      collections(first: $first, after: $after, last: $last, before: $before) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            title
            handle
            image {
              url
            }
          }
        }
      }
    }
`;

export const GQL_QUERY_COLLECTION = `
    query GetCollection($handle: String!, $first: Int, $last: Int, $before: String, $after: String) {
      collection(handle: $handle) {
        id
        title
        handle
        products(first: $first, last: $last, before: $before, after: $after) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 99) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    sku
                    title
                    quantityAvailable
                    selectedOptions{
                      name
                      value
                    }
                    image{
                      url
                    }
                    price{
                      amount
                      currencyCode
                    }
                    compareAtPrice{
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;


export const CART_CREATE_MUTATION = `
    mutation CartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
        }
      }
    }
`;

export const GET_CART_DATA = `
    query GetCart($id: ID!) {
      cart(id: $id) {
        id
        totalQuantity
        lines(first: 99) {
            edges{
              node{
                merchandise{
                  ... on ProductVariant{
                    id
                    image{
                      url
                    }
                    product{
                      title
                    }
                  }
                }
                cost{
                  amountPerQuantity{
                    amount
                    currencyCode
                  }
                  totalAmount{
                    amount
                    currencyCode
                  }
                }
                id
                quantity
              }           
            }
          }
      }
    }
`;

export const CART_LINE_ADD = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
         cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
          }
      }
    }
`;

export const CART_LINE_UPDATE = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
                id
            }
        }
    }
`;

export const CART_LINE_REMOVE = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
                id
            }
        }
    }
`;

export const GQL_QUERY_PRODUCT = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        availableForSale
        descriptionHtml
        images(first: 99) {
        edges {
          node {
            url
            id
            altText
          }
        }
      }
      options(first: 99) {
            id
            name
            optionValues{
              id 
              name
              swatch{
                color
                image{
                  alt
                  id
                  previewImage{
                    url
                    id
                    altText
                  }
                }
          }
        }
      }
      variants(first: 99) {
        edges {
          node {
            id
            title
            availableForSale
            sku
            title
            compareAtPrice{
              amount
              currencyCode
            }
            price{
              amount
              currencyCode
            }
            selectedOptions{
              name
              value
            }
            image{
              url
              altText
              id
            }

          }
        }
      }
      }
      
      
    }
`;
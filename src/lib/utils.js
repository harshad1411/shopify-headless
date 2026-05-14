

const token = process.env.REACT_APP_STOREFRONT_TOKEN;
const endpoint = process.env.REACT_APP_STOREFRONT_URL + '/api/2024-01/graphql.json';
export const shopifyFetch = async (query, variables) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Use 'X-Shopify-Storefront-Access-Token' for Storefront API
          // Use 'X-Shopify-Access-Token' for Admin API
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ 
          query,
          variables
        }),
      });
      const responseData =response;
      return responseData;
    } catch (error) {
      // console.error('Fetch Error:', error);
      return {
        error: error.message,
      }
    }
  };
  
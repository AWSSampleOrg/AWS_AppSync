const APP_SYNC_ENDPOINT_URL = "";
const API_KEY = "";

/**
 *
 * @param {string} query
 * @param {Record<string, unknown> | undefined} variables
 * @returns
 */
const execute = async (query, variables) => {
  const response = await fetch(APP_SYNC_ENDPOINT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/graphql",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return response.ok
    ? JSON.stringify(await response.json(), null, 2)
    : response.statusText;
};

(async () => {
  console.log(
    await execute(`
      mutation put{
        put_item( id: "1",name: "Test",age: 100 ){
          id,
          name,
          age
        }
      }`)
  );
  console.log(
    await execute(`
    query get_item{
      get_item(id: "1"){
        id,
        name,
        age
      }
    } 
    `)
  );
})().catch(console.error);

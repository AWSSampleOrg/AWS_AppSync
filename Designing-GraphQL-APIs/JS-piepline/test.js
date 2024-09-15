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
  const SIGNUP_MUTATION = `
  mutation signUp($email: String!, $username: String!) {
    signUp(input: {email: $email, username: $username}) {
      id
      email
      username
    }
  }`;
  console.log(
    await execute(SIGNUP_MUTATION, {
      email: "nadia@myvaliddomain.com",
      username: "nadia",
    })
  );
  console.log(
    await execute(SIGNUP_MUTATION, {
      email: "nadia@invalid.com",
      username: "nadia",
    })
  );
})().catch(console.error);

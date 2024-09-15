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
    await execute(
      `
    mutation SendMessage($data: String) {
      sendMessage(data: $data) {
        MD5OfMessageBody
        MessageId
      }
    }`,
      { data: "body" }
    )
  );
  console.log(
    await execute(`
    query ReceiveMessage {
      receiveMessage
    }`)
  );
})().catch(console.error);

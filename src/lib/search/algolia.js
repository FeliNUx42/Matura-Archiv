import { PUBLIC_ALG_APP_ID, PUBLIC_ALG_API_KEY } from '$env/static/public';

import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  PUBLIC_ALG_APP_ID,
  PUBLIC_ALG_API_KEY
);


export default searchClient;


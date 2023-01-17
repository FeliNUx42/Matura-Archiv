import { PUBLIC_ALG_APP_ID, PUBLIC_ALG_API_KEY } from '$env/static/public';

import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";


const searchClient = algoliasearch(
  PUBLIC_ALG_APP_ID,
  PUBLIC_ALG_API_KEY
);

const search = instantsearch({
  indexName: "arbeiten",
  searchClient,
  routing: {
    stateMapping: {
      stateToRoute(uiState) {
        let {page, ...rest} = uiState.arbeiten;

        uiState.arbeiten = rest;

        return uiState;
      },
      routeToState(routeState) {
        return routeState
      },
    }
  }
});

export default search;


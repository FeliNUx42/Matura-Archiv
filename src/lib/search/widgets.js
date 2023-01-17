import { searchBox, refinementList, stats, sortBy, clearRefinements } from "instantsearch.js/es/widgets";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import { hitsList } from "$lib/stores";


const settings = {
  searchable: true,
  searchablePlaceholder: "Suchen...",
  cssClasses: {
    list: "ref-list",
    label: "ref-item",
    checkbox: "ref-checkbox",
    labelText: "ref-text",
    count: "ref-count",
    searchableInput: "filter-inp",
    searchableForm: "filter-form",
  },
  templates: {
    searchableSubmit: "",
    searchableReset: "",
    searchableNoResults:
      "<span class='text-sm text-gray-500'>Keine Filter</span>",
  }
}


const getWidgets = () => {
  let lastRenderArgs;

  const infiniteHits = connectInfiniteHits((renderArgs, isFirstRender) => {
    const { hits, showMore, widgetParams } = renderArgs;
    const { sentinel } = widgetParams;

    lastRenderArgs = renderArgs;
  
    if (isFirstRender) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !lastRenderArgs.isLastPage) {
            showMore();
          }
        });
      });
  
      observer.observe(sentinel);
    }
  
    hitsList.set(hits);
  });

  return [
    searchBox({
      container: "#instantsearch",
      cssClasses: {
        input: "search-inp",
      },
      templates: {
        submit: "",
        reset:
          "<span class='absolute material-symbols-rounded text-gray-500 hover:text-gray-700 cursor-pointer right-0 top-0 bg-transparent'>close</span>",
        loadingIndicator:
          "<span class='absolute material-symbols-rounded text-gray-500 hover:text-gray-700 cursor-pointer right-0 top-0 bg-transparent'>sync</span>",
      },
    }),

    stats({
      container: "#stats",
      templates: {
        text(data, { html }) {
          let count = '';

          if (data.hasManyResults) {
            count += data.nbHits + " Ergebnisse";
          } else if (data.hasOneResult) {
            count += "1 Ergebnis";
          } else {
            count += "Keine Ergebnisse";
          }

          return html`${count}`;
        }
      }
    }),

    sortBy({
      container: "#sort",
      items: [
        { label: "Relevant", value: "arbeiten" },
        { label: "Neuste", value: "arbeiten_created_desc" },
        { label: "Titel (A - Z)", value: "arbeiten_title_asc" },
        { label: "Titel (Z - A)", value: "arbeiten_title_desc" },
      ]
    }),

    clearRefinements({
      container: "#clear",
      templates: {
        resetLabel({ hasRefinements }, { html }) {
          return html`<span class="material-symbols-outlined ${hasRefinements ? '' : 'hidden'} bg-gray-100 text-gray-500 rounded hover:text-blue-700 ml-1 p-[1px] translate-y-[3px] dark:bg-dark-800 dark:hover:bg-dark-700 dark:hover:text-gray-400">close</span>`
        }
      }
    }),

    refinementList({
      container: "#fach",
      attribute: "fach.name",
      limit: 9,
      ...settings
    }),

    refinementList({
      container: "#schule",
      attribute: "schule",
      limit: 8,
      ...settings
    }),

    refinementList({
      container: "#sprache",
      attribute: "sprache",
      limit: 8,
      cssClasses: {
        list: "ref-list",
        label: "ref-item",
        checkbox: "ref-checkbox",
        labelText: "ref-text",
        count: "ref-count",
      },
    }),

    refinementList({
      container: "#jahr",
      attribute: "jahr",
      limit: 8,
      cssClasses: {
        list: "ref-list",
        label: "ref-item",
        checkbox: "ref-checkbox",
        labelText: "ref-text",
        count: "ref-count",
      },
    }),

    infiniteHits({
      sentinel: document.querySelector("#sentinel")
    })
  ]
}


export default getWidgets;
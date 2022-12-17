import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
import connectVoiceSearch from 'instantsearch.js/es/connectors/voice-search/connectVoiceSearch';
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
  useConnector,
} from 'react-instantsearch-hooks-web';

export function useStats(props) {
  return useConnector(connectStats, props);
}

export function useVoiceSearch(props) {
  return useConnector(connectVoiceSearch, props);
}

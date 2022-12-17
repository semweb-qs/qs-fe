// eslint-disable-next-line import/no-extraneous-dependencies
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
// eslint-disable-next-line import/no-extraneous-dependencies
import connectVoiceSearch from 'instantsearch.js/es/connectors/voice-search/connectVoiceSearch';
import { useConnector } from 'react-instantsearch-hooks-web';

export function useStats(props) {
  return useConnector(connectStats, props);
}

export function useVoiceSearch(props) {
  return useConnector(connectVoiceSearch, props);
}

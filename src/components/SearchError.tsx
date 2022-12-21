import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

function SearchErrorToast() {
  const { use } = useInstantSearch();
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const middleware = ({ instantSearchInstance }) => {
      function handleError(searchError) {
        setError(searchError);
      }

      return {
        subscribe() {
          instantSearchInstance.addListener('error', handleError);
        },
        unsubscribe() {
          instantSearchInstance.removeListener('error', handleError);
        },
      };
    };

    return use(middleware);
  }, [use]);

  if (!error) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold">🙏 Search API is down...</div>
    </div>
  );
}

export default SearchErrorToast;

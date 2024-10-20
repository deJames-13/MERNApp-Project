import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

// TODO: use redux to store queries instead of using react state and params
export default function useQueries(initialQueries = {
  q: '',
  page: 1,
  order: 'desc',
  sortBy: 'created_at',
  limit: 10,
}) {
  const location = useLocation();
  const [queries, setQueries] = useState(() => {
    const searchParams = new URLSearchParams(location.search);

    for (const [key, value] of searchParams.entries()) {
      initialQueries[key] = value;
    }
    return initialQueries;
  });



  const queryStr = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queries)) {
      if (value !== '' && value !== undefined) {
        searchParams.set(key, value);
      }
    }
    return searchParams.toString();
  }, [queries]);

  const updateQueries = useCallback((newQueries) => {
    setQueries(prev => ({ ...prev, ...newQueries }));
  }, []);

  const updateUrlQuery = useCallback((newQueries) => {
    const searchParams = new URLSearchParams(location.search);
    for (const [key, value] of Object.entries(newQueries)) {
      if (value !== '' && value !== undefined) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }
    window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
  }, [location.pathname, location.search]);

  const updateQuery = useCallback((key, value) => {
    let newQueries = {};
    setQueries(prev => {
      newQueries = { ...prev, [key]: value };
      updateUrlQuery(newQueries);
      return newQueries;
    });
    return newQueries;

  }, []);


  const toStrQuery = useCallback((query) => {
    let queryStr = '';
    for (const [key, value] of Object.entries(query)) {
      if (value !== '' && value !== undefined) {
        queryStr += `${key}=${value}&`;
      }
    }
    return queryStr;
  }, [queryStr]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQueries = {};
    let hasChanges = false;
    for (const [key, value] of searchParams.entries()) {
      if (queries[key] !== value) {
        newQueries[key] = value;
        hasChanges = true;
      }
    }
    if (hasChanges) {
      setQueries(prev => ({ ...prev, ...newQueries }));
    }
  }, [location.search]);

  return {
    queries,
    updateQuery,
    updateQueries,
    updateUrlQuery,
    toStrQuery,
    queryStr,
  };
}
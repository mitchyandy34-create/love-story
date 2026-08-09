import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useSupabaseData(table, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelledRef = useRef(false);

  const fetchData = async () => {
    setLoading(true);
    const query = supabase.from(table).select('*');

    if (options.orderBy) {
      query.order(options.orderBy, { ascending: options.ascending ?? true });
    }

    const { data: result, error: fetchError } = await query;
    if (cancelledRef.current) return;

    if (fetchError) {
      setError(fetchError);
      setData([]);
    } else {
      setData(result || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    cancelledRef.current = false;
    fetchData();
    return () => {
      cancelledRef.current = true;
    };
  }, [table, options.orderBy, options.ascending, options.refreshKey]);

  return { data, loading, error, refresh: fetchData };
}

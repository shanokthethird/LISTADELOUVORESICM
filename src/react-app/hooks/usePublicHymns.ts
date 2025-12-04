import { useState, useEffect } from 'react';
import { PublicHymn } from '@/shared/types';
import { setAHymnsDatabase } from '@/shared/hymns-data';

export const usePublicHymns = () => {
  const [publicHymns, setPublicHymns] = useState<PublicHymn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicHymns = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/public-hymns');
      
      if (!response.ok) {
        throw new Error('Failed to fetch public hymns');
      }
      
      const hymns: PublicHymn[] = await response.json();
      setPublicHymns(hymns);
      
      // Update the A hymns database for autocomplete
      const hymnData = hymns.map(h => ({ number: h.number, name: h.name }));
      setAHymnsDatabase(hymnData);
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPublicHymn = async (name: string, submittedBy?: string): Promise<PublicHymn> => {
    const response = await fetch('/api/public-hymns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        submitted_by: submittedBy?.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create public hymn');
    }

    const newHymn: PublicHymn = await response.json();
    setPublicHymns(prev => [...prev, newHymn]);
    
    // Update the A hymns database
    const updatedHymnData = [...publicHymns, newHymn].map(h => ({ number: h.number, name: h.name }));
    setAHymnsDatabase(updatedHymnData);
    
    return newHymn;
  };

  useEffect(() => {
    fetchPublicHymns();
  }, []);

  return {
    publicHymns,
    loading,
    error,
    addPublicHymn,
    refetch: fetchPublicHymns,
  };
};

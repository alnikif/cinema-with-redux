import { useEffect, useRef } from 'react';

const useIsMounted = (): boolean => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  return isMountedRef.current;
};

export default useIsMounted;

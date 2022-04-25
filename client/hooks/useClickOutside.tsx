import { useEffect } from 'react'

const useClickOutside = (ref: any, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // NOT VALID ERRORS! (TODO - FIX)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])
}

export default useClickOutside

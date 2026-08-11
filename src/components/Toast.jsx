import { useEffect, useState } from 'react';

export default function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 2800);
      return () => clearTimeout(t);
    }
  }, [visible, onHide]);

  return (
    <div className={'toast' + (visible ? ' visible' : '')}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>{message}</span>
    </div>
  );
}

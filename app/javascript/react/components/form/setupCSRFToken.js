import React from 'react';
import axios from 'axios';

export const setupCSRFToken = () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  } else {
    console.error('CSRF token not found');
  }
};
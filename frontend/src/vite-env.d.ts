/// <reference types="vite/client" />

// MSW mock service worker declaration
declare module 'msw' {
  export * from 'msw/lib/core';
}

declare module 'msw/browser' {
  export * from 'msw/lib/browser';
}

// Node process declaration
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

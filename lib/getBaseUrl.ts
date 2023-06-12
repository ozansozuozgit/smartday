
// export const checkEnvironment = () => {
//     let base_url =
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000"
//         : "https://example.com";
  
//     return base_url;
//   };

  import { cache } from 'react';

export const getBaseUrl = cache(() =>
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT ?? 3000}`
    : `https://time-spent.vercel.app`
);

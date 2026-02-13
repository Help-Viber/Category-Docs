import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const targetPath = isDevelopment ? '/guides/database-configuration' : '/database-configuration';
  const url = useBaseUrl(targetPath);
  return <Redirect to={url} />;
}

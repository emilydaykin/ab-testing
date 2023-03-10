import Head from 'next/head';
import { useState, useEffect } from 'react';
import Background from '@/components/Background';
import ControlA from '@/components/ControlA';
import TestB from '@/components/TestB';
import { v4 as uuidv4 } from 'uuid';
import { trackPageview } from '@/analytics-api';

export default function Home() {
  const [visitorInControlGroup, setVisitorInControlGroup] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('visitorID')) {
      // visitor has been to the site before
      // show them the version they've seen before
      localStorage.getItem('version') === 'A (control)'
        ? setVisitorInControlGroup(true)
        : setVisitorInControlGroup(false);
      // and track page view
      trackPageview({
        event: 'New page visit by RETURNING visitor',
        version: localStorage.version,
        visitorID: localStorage.visitorID,
      });
    } else {
      // assign new visitor an ID
      localStorage.setItem('visitorID', uuidv4());
      // assign new visitor a page version to see randomly (50/50 split)
      if (Math.random() >= 0.5) {
        setVisitorInControlGroup(true);
        localStorage.setItem('version', 'A (control)');
      } else {
        setVisitorInControlGroup(false);
        localStorage.setItem('version', 'B (test)');
      }
      // and track page view
      trackPageview({
        event: 'New page visit by NEW visitor',
        version: localStorage.version,
        visitorID: localStorage.visitorID,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Blinkist App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* if visitorInControlGroup hasn't been set yet, i.e. still null,
      render a container that has just the background, so that it doesn't jump 
      between versions */}
      <main>
        {visitorInControlGroup === null ? (
          <Background />
        ) : visitorInControlGroup ? (
          <ControlA />
        ) : (
          <TestB />
        )}
      </main>
    </>
  );
}

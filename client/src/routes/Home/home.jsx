import React from 'react';
import Notes from '../../components/Notes';

function Home() {
  return (
    <div>
      <h1>Welcome to Note Keeper</h1>
      <p>A Modern Note-Taking Application</p>

      <p>
        Built with Vite, React, Node.js, Express, and MongoDB for a fast,
        dynamic, and scalable experience.
      </p>
      <Notes />
    </div>
  );
}

export default Home;

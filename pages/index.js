import { createClient } from 'contentful';
import Header from '../components/index/header';
import Games from '../components/index/games';
import Projects from '../components/index/projects';
import Spotify from '../components/index/spotify';
import Photos from '../components/index/photos';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_PROJECT,
    accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
  });
  const projects = await client.getEntries({ content_type: 'project' });
  const photos = await client.getEntries({ content_type: 'photo' });
  const fetchGames = await fetch(process.env.DB_STEAM);
  const games = await fetchGames.json();
  const fetchSpotify = await fetch(process.env.DB_SPOTIFY);
  const spotify = await fetchSpotify.json();

  return {
    props: {
      projects: projects.items,
      photos: photos.items,
      games,
      spotify,
    },
    revalidate: 1,
  };
}

export default function Home({ projects, games, spotify, photos }) {
  return (
    <main>
      <Header />
      <Games items={games} />
      <Projects items={projects} />
      <Spotify items={spotify} />
      <Photos items={photos} />
    </main>
  );
}

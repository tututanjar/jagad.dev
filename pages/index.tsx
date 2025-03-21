//default
import { InferGetStaticPropsType } from 'next';
import readingTime from 'reading-time';
import Link from 'next/link';
import React from 'react';
//components
import FeaturedPost from '@/components/posts/featured';
import NewsLetter from '@/components/newsletter';

//lib
import { getContentIndex } from '@/lib/fetcher';

const Home = ({
  featuredPost,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      {/* Hero Section */}
      <div className='prose prose-invert my-10 max-w-none flex-none items-center space-x-0 text-white prose-a:no-underline md:my-24 xl:flex xl:space-x-4'>
        <div className='text-center xl:max-w-md xl:text-left'>
          <h1 className='text-3xl text-white sm:text-5xl'>
            {`Hi there! My name is`}{' '}
            <span className='text-primary'>Jagad Yudha Awali</span>
          </h1>
          <p className='text-md text-gray-400 sm:text-lg '>
            A Software Engineer who specializes in front-end for mobile and web
            applications. In addition, I publish programming-related blogs.
          </p>
          <div className='mt-10 space-x-4'>
            <Link href={'/posts'} passHref>
              <button className='md:text-md rounded-md bg-primary bg-opacity-75 py-3 px-3 text-sm font-bold duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4'>
                Read the post
              </button>
            </Link>
            <Link href={'/about'} passHref>
              <button className='md:text-md rounded-md bg-[#393b3f] py-3 px-3 text-sm font-bold duration-300 ease-in-out hover:opacity-80 md:px-6 md:py-4 '>
                About me
              </button>
            </Link>
          </div>
        </div>

        <div className='my-10 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:my-0'>
          {featuredPost
            .sort((a, b) => {
              return (
                new Date(b.frontmatter.date).valueOf() -
                new Date(a.frontmatter.date).valueOf()
              );
            })
            .slice(0, 4)
            .map((featuredPost) => {
              const { slug, content } = featuredPost;
              const { title, description, date, tags, header } =
                featuredPost.frontmatter;
              return (
                <FeaturedPost
                  key={slug}
                  slug={slug}
                  title={title}
                  description={description}
                  header={header}
                  date={date}
                  tags={tags}
                  readtime={readingTime(content).text}
                />
              );
            })}
        </div>
      </div>

      <div className='my-20 bg-background_100'>
        <NewsLetter />
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const posts = getContentIndex('posts');
  const projects = getContentIndex('projects');

  const featuredPost = posts.filter((item) =>
    [
      'how-to-create-a-whatsapp-bot-with-node-js',
      'custom-image-transition-in-nextjs-with-tailwind-css',
      'steam-now-playing',
      'is-pyscript-going-to-take-the-place-of-javascript',
    ].includes(item.slug)
  );

  const featuredProject = projects.filter((item) =>
    ['citizenapp', 'pemerintah-desa-kebonsari'].includes(item.slug)
  );

  return {
    props: {
      featuredPost,
      featuredProject,
    },
  };
}

export default Home;

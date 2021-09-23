import Link from 'next/link';

export default function Header() {
  return (
    <div className='mb-16'>
      <h1 className='font-sans font-bold text-black dark:text-white sm:text-5xl text-3xl my-1'>
        Jagad Yudha Awali
      </h1>
      <div className='font-sans flex-1 sm:text-lg text-md  dark:text-gray-300 text-gray-600 my-5'>
        I&apos;m a front-end developer & UI/UX designer based on Sidoarjo,
        Indonesia. Interested working on front-end and currently learning about
        react native framework. if you want to work with me or ask something,
        reach me via{' '}
        <Link
          href='mailto:jagadyudhaawali@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <a className='text-myorangelight dark:text-myorange underline hover:opacity-50'>
            email
          </a>
        </Link>
        or check my{' '}
        <Link href='/linktree' target='_blank' rel='noopener noreferrer'>
          <a className='text-myorangelight dark:text-myorange underline hover:opacity-50'>
            Linktree
          </a>
        </Link>{' '}
        for other social media.
      </div>
    </div>
  );
}

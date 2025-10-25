import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  const isLoggedIn = false;
  return (
    <header className='w-full flex items-center justify-between p-4 bg-black shadow-md'>
      <div className=''>
        <Image src='/icons/search.svg' alt='Logo' width={100} height={100} />
      </div>

      <nav className='flex gap-4 items-center'>
        <Link className='text-white' href='/'>
          Home
        </Link>
        <Link className='text-white' href='/calculation'>
          Calculation
        </Link>
        <Link className='text-white' href='/about'>
          About
        </Link>
      </nav>

      <div className='flex gap-4 items-center'>
        <div className='rounded-full p-3 bg-gray w-12 h-12 cursor-pointer'>
          <Image src='/icons/search.svg' alt='Search' width={50} height={50} />
        </div>
        <div className='rounded-full p-3 bg-gray w-12 h-12 cursor-pointer'>
          <Image src='/icons/settings.svg' alt='Settings' width={50} height={50} />
        </div>
        <div className='rounded-full p-3 bg-gray  w-12 h-12 cursor-pointer'>
          <Image src='/icons/notification.svg' alt='Notification' width={50} height={50} />
        </div>
        {isLoggedIn ? (
          <div className='rounded-full p-4 bg-gray w-12 h-12 cursor-pointer'>
            <Image src='/icons/search.svg' alt='User Avatar' width={50} height={50} />
          </div>
        ) : (
          <button className='cursor-pointer'>Login</button>
        )}
      </div>
    </header>
  );
};

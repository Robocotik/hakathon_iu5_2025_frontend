'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useGetStars} from '../../hooks/useGetStars';
import {Icon} from '../../components/Icon';
import {useLogin} from '../../hooks/useLogin';
import {useRouter} from 'next/navigation.js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const starsCoordinates = useGetStars();
  const {login, isLoading} = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({
      login: email,
      password,
    });
  };

  return (
    <main className='min-h-screen bg-black flex items-center justify-center relative overflow-hidden '>
      {/* Background cosmic elements */}

      {/* Floating stars/particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {starsCoordinates.map((star, i) => (
          <div
            key={i}
            className='absolute w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse'
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Login Form */}
      <div className='flex items-center justify-center min-h-[calc(100vh-100px)] relative z-10 px-4'>
        <div className='w-full max-w-md'>
          {/* Form Container */}
          <div className='bg-gray/80 backdrop-blur-sm border border-gray-light/30 rounded-2xl p-8 shadow-2xl'>
            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-white mb-2'>Вход в систему</h1>
              <p className='text-gray-text'>Добро пожаловать в космическую систему мониторинга</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Field */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-light mb-2'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='w-full px-4 py-3 bg-gray-dark border border-gray-light/50 rounded-lg text-white placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-all duration-200'
                    placeholder='your@email.com'
                    required
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <Icon name='email' className='text-gray-text' size={20} />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-light mb-2'>
                  Пароль
                </label>
                <div className='relative'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='w-full px-4 py-3 bg-gray-dark border border-gray-light/50 rounded-lg text-white placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-all duration-200'
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-light transition-colors duration-200'>
                    <Icon
                      name={showPassword ? 'eye-closed' : 'eye-open'}
                      className='text-gray-text hover:text-blue-light transition-colors duration-200 cursor-pointer'
                      size={20}
                    />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-blue-light hover:bg-blue-light/80 text-white/70 font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'>
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
                    Вход...
                  </div>
                ) : (
                  'Войти'
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className='mt-6 text-center space-y-4'>
              <Link
                href='/forgot-password'
                className='text-sm text-blue-light hover:text-white transition-colors duration-200'>
                Забыли пароль?
              </Link>

              <div className='flex items-center justify-center gap-2 text-sm text-gray-text'>
                У вас нет аккаунта?
                <Link
                  href='/register'
                  className='text-blue-light hover:text-white font-medium transition-colors duration-200 hover:underline'>
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className='mt-6 text-center'>
            <p className='text-xs text-gray-text/70'>
              Защищенное соединение с космической системой мониторинга
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

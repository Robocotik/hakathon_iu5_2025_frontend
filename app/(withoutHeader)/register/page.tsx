'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useGetStars} from '../../hooks/useGetStars';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const starsCoordinates = useGetStars();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    // Здесь будет логика регистрации
    console.log('Registration attempt:', formData);

    // Имитация запроса
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className='min-h-screen bg-black relative overflow-hidden'>
      {/* Background cosmic elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black'></div>

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

      {/* Registration Form */}
      <div className='flex items-center justify-center min-h-[calc(100vh-100px)] relative z-10 px-4 py-8'>
        <div className='w-full max-w-md'>
          {/* Form Container */}
          <div className='bg-gray/80 backdrop-blur-sm border border-gray-light/30 rounded-2xl p-8 shadow-2xl'>
            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-white mb-2'>Регистрация</h1>
              <p className='text-gray-text'>Создайте аккаунт для доступа к системе мониторинга</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name Field */}
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-light mb-2'>
                  Полное имя
                </label>
                <div className='relative'>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-dark border border-gray-light/50 rounded-lg text-white placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-all duration-200'
                    placeholder='Иван Иванов'
                    required
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <svg
                      className='w-5 h-5 text-gray-text'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-light mb-2'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-dark border border-gray-light/50 rounded-lg text-white placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-all duration-200'
                    placeholder='your@email.com'
                    required
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <svg
                      className='w-5 h-5 text-gray-text'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                      />
                    </svg>
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
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-dark border border-gray-light/50 rounded-lg text-white placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-all duration-200'
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-light transition-colors duration-200'>
                    {showPassword ? (
                      <svg
                        className='w-5 h-5 text-gray-text'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.81 6.81m0 0L3.74 3.74m0 0L12 12m0 0l8.26 8.26M3.74 3.74L12 12'
                        />
                      </svg>
                    ) : (
                      <svg
                        className='w-5 h-5 text-gray-text'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-light mb-2'>
                  Подтвердите пароль
                </label>
                <div className='relative'>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-dark border border-gray-light/50 rounded-lg text-white placeholder-gray-text focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-all duration-200'
                    placeholder='••••••••'
                    required
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <svg
                      className='w-5 h-5 text-gray-text'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className='flex items-start gap-3'>
                <input
                  id='terms'
                  type='checkbox'
                  className='mt-1 w-4 h-4 text-blue-light bg-gray-dark border-gray-light rounded focus:ring-blue-light focus:ring-2'
                  required
                />
                <label htmlFor='terms' className='text-sm text-gray-text'>
                  Я согласен с{' '}
                  <Link
                    href='/terms'
                    className='text-blue-light hover:text-white transition-colors duration-200 underline'>
                    условиями использования
                  </Link>{' '}
                  и{' '}
                  <Link
                    href='/privacy'
                    className='text-blue-light hover:text-white transition-colors duration-200 underline'>
                    политикой конфиденциальности
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-blue-light hover:bg-blue-light/80 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'>
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
                    Создание аккаунта...
                  </div>
                ) : (
                  'Создать аккаунт'
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className='mt-6 text-center'>
              <div className='flex items-center justify-center gap-2 text-sm text-gray-text'>
                Уже есть аккаунт?
                <Link
                  href='/login'
                  className='text-blue-light hover:text-white font-medium transition-colors duration-200 hover:underline'>
                  Войти
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className='mt-6 text-center'>
            <p className='text-xs text-gray-text/70'>
              Защищенная регистрация в космической системе мониторинга
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

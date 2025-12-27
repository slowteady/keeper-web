import Image from 'next/image';

export default function Home() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00D9A3] to-[#00B88A]'>
      <div className='text-center px-5 py-10 max-w-[500px]'>
        {/* 로고 */}
        <div className='text-[80px] mb-5 animate-bounce'>🐾</div>

        {/* 타이틀 */}
        <h1 className='text-white text-2xl font-bold mb-4'>Keeper</h1>

        {/* 설명 */}
        <p className='text-white text-base leading-relaxed opacity-90 mb-3'>유기동물 입양의 첫걸음</p>
        <p className='text-white text-base leading-relaxed opacity-90 mb-8'>유기동물들의 가족이 되어주세요</p>

        {/* 아이콘 */}
        <div className='mb-8'>
          <Image
            src='/keeper-icon.png'
            alt='Keeper 아이콘'
            width={120}
            height={120}
            className='mx-auto rounded-3xl shadow-2xl'
            priority
          />
        </div>

        {/* 스토어 링크 */}
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-center mt-8'>
          <a
            className='bg-white text-[#00B88A] font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto'
            href={process.env.NEXT_PUBLIC_IOS_STORE_URL || '#'}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='flex items-center justify-center gap-2'>
              <span className='text-2xl'>🍎</span>
              <span>App Store</span>
            </div>
          </a>
          <a
            className='bg-white text-[#00B88A] font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto'
            href={process.env.NEXT_PUBLIC_ANDROID_STORE_URL || '#'}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='flex items-center justify-center gap-2'>
              <span className='text-2xl'>🤖</span>
              <span>Google Play</span>
            </div>
          </a>
        </div>

        {/* 푸터 메시지 */}
        <p className='text-white text-sm opacity-75 mt-12'>함께하는 작은 사랑이 큰 변화를 만듭니다</p>
      </div>
    </div>
  );
}

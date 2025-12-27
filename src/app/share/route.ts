import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  let title = 'Keeper - 유기동물 입양의 첫걸음';
  let desc = '유기동물들의 가족이 되어주세요.';
  let image = process.env.NEXT_PUBLIC_DOMAIN + '/keeper-icon.png';
  let path: string | null = null;
  let id: string | null = null;

  if (token) {
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
      title = decoded.title || title;
      desc = decoded.desc || desc;
      image = decoded.image || image;
      path = decoded.path || null;
      id = decoded.id || null;
    } catch (e) {
      console.error('토큰 파싱 실패:', e);
    }
  }

  // 딥링크 URL 생성
  // path와 id가 있으면 해당 페이지로, 없으면 홈으로
  const appUrl =
    path && id
      ? `keeper://${path}/${id}` // 특정 페이지
      : 'keeper://'; // 홈
  const iosStoreUrl = process.env.NEXT_PUBLIC_IOS_STORE_URL;
  const androidStoreUrl = process.env.NEXT_PUBLIC_ANDROID_STORE_URL;

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
       <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <!-- Open Graph -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:type" content="website" />
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${desc}" />
        <meta name="twitter:image" content="${image}" />
        
        <title>${title}</title>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #00D9A3 0%, #00B88A 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: white;
          }
          .container {
            text-align: center;
            padding: 40px 20px;
            max-width: 500px;
          }
          .logo {
            font-size: 80px;
            margin-bottom: 20px;
            animation: bounce 1s infinite;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 16px;
            font-weight: 700;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            opacity: 0.9;
            margin-bottom: 12px;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 30px auto;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">🐾</div>
          <h1>${title}</h1>
          <p>${desc}</p>
          <div class="spinner"></div>
          <p style="font-size: 14px;">앱으로 이동 중...</p>
        </div>

        <script>
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          const isAndroid = /Android/i.test(navigator.userAgent);
          
          if (isIOS || isAndroid) {
            // 딥링크 시도
            window.location.href = "${appUrl}";
            
            // 2초 후 앱이 안열리면 스토어로
            setTimeout(() => {
              window.location.href = isIOS ? "${iosStoreUrl}" : "${androidStoreUrl}";
            }, 2000);
          } else {
            // 데스크톱에서는 바로 스토어로
            document.querySelector('.container').innerHTML = 
              '<div class="logo">🐾</div>' +
              '<h1>Keeper</h1>' +
              '<p>모바일 기기에서 확인해주세요</p>' +
              '<p style="margin-top: 30px;"><a href="${iosStoreUrl}" style="color: white; text-decoration: underline;">App Store에서 다운로드</a></p>';
          }
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  let title = '기본 제목';
  let desc = '기본 설명';
  let image = 'https://your-default-image.jpg';
  let id = '0';

  if (token) {
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
      title = decoded.title || title;
      desc = decoded.desc || desc;
      image = decoded.image || image;
      id = decoded.id || id;
    } catch (e) {
      console.error('토큰 파싱 실패:', e);
    }
  }

  const appUrl = `keeper://abandonments/${id}`;
  const iosStoreUrl = 'https://apps.apple.com/app/id6739178024';
  const androidStoreUrl = 'https://play.google.com/store/apps/details?id=com.keeper.love';

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        <script>
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          window.location.href = "${appUrl}";
          setTimeout(() => {
            window.location.href = isIOS ? "${iosStoreUrl}" : "${androidStoreUrl}";
          }, 2000);
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
};

import fs from 'fs';
import path from 'path';

import { PolicyContent } from '@/components/PolicyContent';

export default function CommunityPage() {
  const filePath = path.join(process.cwd(), 'src/content/community.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  return <PolicyContent content={content} />;
}

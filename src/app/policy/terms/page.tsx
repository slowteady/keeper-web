import fs from 'fs';
import path from 'path';

import { PolicyContent } from '@/components/PolicyContent';

export default function TermsPage() {
  const filePath = path.join(process.cwd(), 'src/content/terms.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  return <PolicyContent content={content} />;
}

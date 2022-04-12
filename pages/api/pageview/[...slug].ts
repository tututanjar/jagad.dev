import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { slug }: any = req.query;
    const fullSlug = slug.join('/');

    const { count } = await supabase
      .from('pageview')
      .select('*', { count: 'exact' })
      .eq('url', `/${fullSlug}`);
    res.send({
      slug: `/${fullSlug}`,
      views: count,
    });
  }
}

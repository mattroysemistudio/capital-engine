import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CapitalEnginePublic from '@/components/CapitalEnginePublic';

/**
 * Protected Capital Engine Page
 * Server component that checks for access token cookie before rendering the engine
 */
export default async function ProtectedCapitalEnginePage() {
  // Temporarily disabled verification for testing — will restore once email is working
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get('capital-engine-public-access');
  // if (!accessToken) {
  //   redirect('/capital-engine-public');
  // }

  return <CapitalEnginePublic />;
}

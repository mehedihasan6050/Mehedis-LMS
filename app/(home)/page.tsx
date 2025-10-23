"use client";

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-cllient';
import { useRouter } from 'next/navigation';


const Home = () => {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        }
      }
    })
  }
 console.log(session)
  return (
    <div>
      This Home
      <Button onClick={signOut} variant='outline'>
        Logout
      </Button>
    </div>
  );
};

export default Home;
import { useAuth, googleSignInUrl as signInUrl } from 'wasp/client/auth';
import { getLnLoginUrl, useQuery, getLnUserInfo } from 'wasp/client/operations';
import { AiOutlineGoogle } from 'react-icons/ai';
import { LoginForm, SignupForm } from 'wasp/client/auth'
import { Link } from 'react-router-dom'
import { VStack, Button, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import BorderBox from './components/BorderBox';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LnLoginModal from './components/LnLoginModal';

export default function Login() {
  const [encodedUrl, setEncodedUrl] = useState<string | null>(null);
  const [k1Hash, setK1Hash] = useState<string>('');
  const [lnIsLoading, setLnIsLoading] = useState<boolean>(false);
  const [lnLoginStatus, setLnLoginStatus] = useState<string>('');
  const { data: lnUserInfo, refetch: fetchLnUser } = useQuery(getLnUserInfo, k1Hash, { enabled: !!k1Hash });
  const { data: user, isLoading, error, refetch: fetchUser } = useAuth();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  useEffect(() => {
    try {
      const getEncodedUrl = async () => {
        const response = await getLnLoginUrl();
        return response;
      };
      getEncodedUrl().then((resp) => {
        setK1Hash(resp.k1Hash);
        setEncodedUrl(resp.encoded);
      });
    } catch (error) {
      console.error('error fetching LN url: ', error);
      setEncodedUrl('error');
    }
  }, []);

  useEffect(() => {
    if (lnUserInfo?.token) {
      setLnLoginStatus('success');
      // this is how wasp stores the token for use with their auth api
      localStorage.setItem('wasp:sessionId', JSON.stringify(lnUserInfo.token));
      window.location.reload();
    }
  }, [lnUserInfo]);

  const handleWalletClick = () => {
    if (!encodedUrl) return;
    onOpen();
    setLnIsLoading(true);
    let interval: any = null;
    if (interval) clearInterval(interval);
    interval = setInterval(async () => {
      fetchLnUser();
    }, 1000);

    setTimeout(() => {
      if (!lnUserInfo?.token || !user) {
        clearInterval(interval);
        setLnIsLoading(false);
        alert('Login timed out. Please try again.');
      }
    }, 60000);
  };

  return (
    <>
{/*     <BorderBox>
        {error && <Text>Something went wrong :(</Text>}
        {isLoading || !encodedUrl ? (
          <Spinner />
        ) : (
          <VStack>
            <a href={signInUrl}>
              <Button leftIcon={<AiOutlineGoogle />}>Google Sign In</Button>
            </a>
        
            
            <Button isLoading={lnIsLoading} onClick={handleWalletClick} leftIcon={<BsCurrencyBitcoin />}>
              {' '}
              Lightning Sign In
            </Button>          
          </VStack>
        )}
      </BorderBox>
      <LnLoginModal
        handleWalletClick={handleWalletClick}
        status={lnLoginStatus}
        encodedUrl={encodedUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
      */}      
    <Layout>
      <LoginForm />
      <br />
      <span className="text-sm font-medium text-gray-900">
        Don't have an account yet? <Link to="/signup">go to signup</Link>.
      </span>
    </Layout>      
    </>
    
  );
}

export function Signup() {
  return (
    <Layout>
      <SignupForm />
      <br />
      <span className="text-sm font-medium text-gray-900">
        I already have an account (<Link to="/login">go to login</Link>).
      </span>
    </Layout>
  );
}

// A layout component to center the content
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-white">
      <div className="min-w-full min-h-[75vh] flex items-center justify-center">
        <div className="w-full h-full max-w-sm p-5 bg-white">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
import Header from '../components/header';
import Footer from '../components/footer';
import { getCsrfToken, getProviders } from 'next-auth/react';
import Login from '../components/login/Login';

let country = {
    name: "India",
    currency: "INR"
}
const Signin = async (context) => {
    const { searchParams: { callbackUrl } } = context;
    const providers = await fetchProviders(context);
    const csrfToken = await getCsrfToken();

    return (
        <div>
            <Header country={country} />
            <Login providers={providers} callbackUrl={callbackUrl} csrfToken={csrfToken} />
            <Footer country={country} />
        </div>
    )
}

// fetching Providers using SSR
const fetchProviders = async (context) => {
    const data = Object.values(await getProviders());
    return data;
}

export default Signin;
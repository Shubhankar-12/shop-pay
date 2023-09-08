import Header from '../components/header';
import Footer from '../components/footer';
import { getProviders } from 'next-auth/react';
import Login from '../components/login/Login';


let country = {
    name: "India",
    currency: "INR"
}
const Signin = async () => {
    const providers = await fetchProviders();

    return (
        <div>
            <Header country={country} />
            <Login providers={providers} />
            <Footer country={country} />
        </div>
    )
}

const fetchProviders = async () => {
    const data = Object.values(await getProviders());
    return data;
}

export default Signin;
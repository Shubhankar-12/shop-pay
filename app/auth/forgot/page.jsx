import ForgotComponent from "@/app/components/Forgot";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

let country = {
    name: "India",
    currency: "INR"
}
const Forgot = () => {
    return (
        <>
            <Header country={country} />
            <ForgotComponent />
            <Footer country={country} />
        </>
    )
}

export default Forgot
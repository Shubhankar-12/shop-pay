import ResetComponent from "@/app/components/Reset";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import jwt from "jsonwebtoken";

let country = {
    name: "India",
    currency: "INR"
}
const Reset = (context) => {
    const { params: { id } } = context;
    const userId = jwt.verify(id, process.env.RESET_TOKEN);

    return (
        <>
            <Header country={country} />
            <ResetComponent id={userId.id} />
            <Footer country={country} />
        </>
    )
}

export default Reset
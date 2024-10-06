import Facturas  from "../components/Cfdis";
import Header from "../components/Header";
import Footer from "../components/Footer"

const Monitor = () => {
    return (
        <section className="scroll-m-20 w-full mx-auto container m-4">
            <Header/>
            <Facturas/>
            <Footer/>
        </section>
    );
};

export default Monitor;

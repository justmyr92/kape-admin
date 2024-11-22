import { Link } from "react-router-dom";
import logo from "../assets/logo/logo 2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="bg-amber-800 text-white py-5">
            <div className="container mx-auto flex h-full justify-between px-1.5">
                <div className="logo__container w-[15%]">
                    <img src={logo} alt={logo} className="rounded-full" />
                </div>
                <div className="footer__main__content flex flex-col items-center w-[85%] px-3.5 justify-center gap-5">
                    <div className="links flex justify-center w-full gap-10 text-lg">
                        <Link to="/home">
                            <h2 className="title">Home</h2>
                        </Link>
                        <Link to="/menu">
                            <h2 className="title">Menu</h2>
                        </Link>
                        <Link to="/promotions">
                            <h2 className="title">Promos</h2>
                        </Link>
                        <Link to="/store-locations">
                            <h2 className="title">Stores</h2>
                        </Link>
                    </div>

                    <div className="links flex justify-center w-full gap-10 text-lg">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="text-white w-8 h-8"
                        />

                        <FontAwesomeIcon
                            icon={faInstagram}
                            className="text-white w-8 h-8"
                        />

                        <FontAwesomeIcon
                            icon={faTiktok}
                            className="text-white w-8 h-8"
                        />
                    </div>

                    <hr className="w-[90%]" />
                    <div className="flex justify-center">
                        <p className="title text-center">
                            Coffee Beer Cafe &copy; 2023 All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

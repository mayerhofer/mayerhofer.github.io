import React from "react";
import { usePage } from "../hooks/usePage";

const PAGES = {
    finance: "Finance",
    liability: "Liability",
    financeReport: "Finance Report",
    blog: "Blog",
    wishlist: "Wish List",
    errors: "Error Log",
    tesseract: "Import Receipt",
    login: "Log In",
};

export default function Menu() {
    const { setActivePage } = usePage();

    return (
        <div className="header">
            <div className="m-menu">
                <div className="m-menu__burger" role="button" tabIndex="0" aria-label="Toggle menu">
                    <span></span>
                </div>

                <input className="m-menu__toggle" type="checkbox" />

                <div className="m-menu__backdrop"></div>

                <div className="m-menu__content">
                    {/* Navigation */}
                    <nav>
                        <h2 className="nav-menu__header">Menu</h2>
                        <ul className="ul-menu__listing">
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.finance)}
                                >
                                    Finance
                                </a>
                            </li>
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.liability)}
                                >
                                    Liability
                                </a>
                            </li>
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.financeReport)}
                                >
                                    Finance Report
                                </a>
                            </li>
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.blog)}
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.wishlist)}
                                >
                                    Wish List
                                </a>
                            </li>
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.errors)}
                                >
                                    Error Log
                                </a>
                            </li>
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.tesseract)}
                                >
                                    Import Receipt
                                </a>
                            </li>
                            <li>
                                <a className="loggedIn" href="#">
                                    Money
                                </a>
                            </li>
                            <li>
                                <a
                                    className="loggedIn"
                                    href="#"
                                    onClick={() => setActivePage(PAGES.login)}
                                >
                                    Log In
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

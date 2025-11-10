import React, { useState } from "react";

const LogInForm = (props) => {
    const [countryUrl, setCountryUrl] = useState("");
    const [entityUrl, setEntityUrl] = useState("");

    const handleCountryUrlUpdate = (e) => {
        try {
            if (localStorage) {
            localStorage.setItem("countryUrl", e.value);
            this.setState({countryUrl: e.value});
            } else {
            alert(" no local storage ");
            window.myStorage = Object.assign({}, {countryUrl: e.value}, window.myStorage);
            }
            alert("country updated: " + e.value);
        } catch (ex) {
            alert(ex.message);
        }
    }

    const handleEntityUrlUpdate = (e) => {
        try {
            if (localStorage) {
                localStorage.setItem("entityUrl", e.value);
                this.setState({entityUrl: e.value});
                
            } else {
                alert(" no local storage ");
                window.myStorage = Object.assign({}, {entityUrl: e.value}, window.myStorage);
            }
            alert("entity update: " + e.value);
        } catch (ex) {
            alert(ex.message);
        }
    }

    const handleLogIn = (e) => {
        e.preventDefault();

        localStorage.setItem("countryUrl", this.state.countryUrl);
        localStorage.setItem("entityUrl", this.state.entityUrl);
    }

    return (
        <form className="div--scrollable" action={handleLogIn}>
            <br />
            <div className="field">
                <label>Entity</label>
                <input type="text" onChange={handleEntityUrlUpdate} />
            </div>
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default LogInForm;

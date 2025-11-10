import React, { useState } from "react";

const LogInForm = (props) => {
    const [entityUrl, setEntityUrl] = useState("");

    const handleEntityUrlUpdate = (e) => {
        try {
            if (localStorage) {
                localStorage.setItem("entityUrl", e.value);
                setEntityUrl(e.value);
                
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

        localStorage.setItem("entityUrl", entityUrl);

        alert("entity update: " + entityUrl);
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

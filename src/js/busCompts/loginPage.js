import React, { useState } from "react";

const LogInForm = (props) => {
    const [entityUrl, setEntityUrl] = useState("");

    const handleEntityUrlUpdate = (e) => {
        try {
            const value = e.target.value; // Fix: access value from event target
            setEntityUrl(value);
            if (localStorage) {
                localStorage.setItem("entityUrl", value);
            } else {
                window.myStorage = Object.assign({}, {entityUrl: value}, window.myStorage);
            }
        } catch (ex) {
            console.error("Failed to update entity URL:", ex);
        }
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        try {
            if (localStorage) {
                localStorage.setItem("entityUrl", entityUrl);
            } else {
                window.myStorage = Object.assign({}, {entityUrl: entityUrl}, window.myStorage);
            }
        } catch (ex) {
            console.error("Failed to save entity URL:", ex);
        }
    }

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '20px',
            maxWidth: '400px'
        },
        field: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        label: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#2c3e50'
        },
        input: {
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '100%'
        },
        submit: {
            padding: '10px 16px',
            fontSize: '14px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            alignSelf: 'flex-start'
        }
    };

    return (
        <form style={styles.form} onSubmit={handleLogIn}>
            <div style={styles.field}>
                <label style={styles.label}>Entity URL</label>
                <input
                    type="text"
                    value={entityUrl}
                    onChange={handleEntityUrlUpdate}
                    style={styles.input}
                    placeholder="Enter entity URL"
                />
            </div>
            <input type="submit" value="Login" style={styles.submit} />
        </form>
    );
}

export default LogInForm;

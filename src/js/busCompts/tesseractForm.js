import React from "react";
import ComboBox from "../components/comboBox";

const TesseractFileReaderForm = () => {
    const [file, setFile] = React.useState(null);
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [isFileProcessed, setIsFileProcessed] = React.useState(false);
    const [language, setLanguage] = React.useState('cat');

    const handleInputFileChange = (e) => {
        console.log(e)
        let uploadedFile = e.target.files[0];

        setFile(uploadedFile);
    }

    const handleTesseractSubmitFile = (e) => {
        e.preventDefault();
        console.log('submit tesseract form');

        if (!file) {
            alert('No file uploaded');
            return;
        }

        Tesseract.recognize(
            file,
            'cat',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            const re = new RegExp(/(0?[1-9]|[12][0-9]|3[01])[.\/\-](0?[1-9]|1[012])[.\/\-](\d{4}|\d{2})/);
            const datesFound = text.match(re);
            if (datesFound) {
                console.log('Date: ' + datesFound[0]);
            }
            console.log(text);
            setResult(text);
            setIsFileProcessed(true);
        });
    }

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '720px',
            padding: '12px',
            fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
            color: '#333',
            background: 'transparent'
        },
        row: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
        },
        label: {
            minWidth: '140px',
            fontSize: '14px',
            color: '#2c3e50',
            fontWeight: 600
        },
        fileInput: {
            padding: '6px 8px',
            fontSize: '14px',
            color: '#222'
        },
        submit: {
            padding: '8px 14px',
            fontSize: '14px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
        },
        reset: {
            padding: '8px 14px',
            fontSize: '14px',
            background: '#e0e0e0',
            color: '#111',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
        },
        status: {
            fontSize: '13px',
            color: '#555'
        },
        resultBox: {
            marginTop: '6px',
            padding: '10px',
            background: '#fafafa',
            border: '1px solid #e6e6e6',
            borderRadius: 4,
            color: '#111'
        }
    };

    return (
        <form name="tesseractForm" onSubmit={handleTesseractSubmitFile} style={styles.form}>
            <div style={styles.row}>
                <label style={styles.label}>Choose language:</label>
                <div style={{minWidth: 160}}>
                    <ComboBox data={['cat', 'eng', 'deu', 'spa']} selected={language} defaultValue="cat" handleChange={val => setLanguage(val)} />
                </div>
            </div>

            <div style={styles.row}>
                <label style={styles.label}>Upload image file:</label>
                <input style={styles.fileInput} type="file" name="filename" accept="image/*" onChange={handleInputFileChange} />
            </div>

            <div style={styles.row}>
                <input type="submit" value="Process" style={styles.submit} />
                <button type="button" onClick={() => {
                    setFile(null);
                    setResult(null);
                    setIsFileProcessed(false);
                }} style={styles.reset}>Reset</button>
            </div>

            {loading && <div style={styles.status}>Processing file, please wait...</div>}

            {isFileProcessed && result && 
                <div style={styles.resultBox}>
                    <h3 style={{margin: '0 0 8px 0', fontSize: '16px', color: '#1f2937'}}>OCR Result:</h3>
                    <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0}}>{result}</pre>
                </div>
            }
        </form>
    );
}

export default TesseractFileReaderForm;

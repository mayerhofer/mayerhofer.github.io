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

    return (
        <form name="tesseractForm" onSubmit={handleTesseractSubmitFile}>
            <label>Choose language:</label>
            <ComboBox data={['cat', 'eng', 'deu', 'spa']} selected={language} defaultValue="cat" handleChange={val => setLanguage(val)} />
            <br />
            <br />
            <label>Upload image file:</label>
            <input type="file" name="filename" accept="image/*" onChange={handleInputFileChange} />
            <input type="submit" />
            <br />
            <br />
            <button type="button" onClick={() => {
                setFile(null);
                setResult(null);
                setIsFileProcessed(false);
            }}>Reset</button>
            {loading && <div>Processing file, please wait...</div>}
            {isFileProcessed && result && 
                <div>
                    <h3>OCR Result:</h3>
                    <pre>{result}</pre>
                </div>
            }
        </form>
    );
}

export default TesseractFileReaderForm;

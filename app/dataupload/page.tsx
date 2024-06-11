

//page.js
"use client";
import { Button } from '@mui/material';
import { parse } from 'csv-parse';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const Page = () => {
    const router = useRouter()
    const [csvRytterData, setRytterCsvData] = useState([]);
    const [csvSponsorData, setSponsorCsvData] = useState([]);
    const [csvRoundData, setRoundCsvData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        localStorage.setItem("RoundData", JSON.stringify(csvRoundData))
        localStorage.setItem("RytterData", JSON.stringify(csvRytterData))
        localStorage.setItem("SponsorData", JSON.stringify(csvSponsorData))
    }, [csvRoundData, csvRytterData, csvSponsorData]);
    const handleFileRytterUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setErrorMessage('Please select a file.');
            return;
        }
        if (!file.name.endsWith('.csv')) {
            setErrorMessage('Please upload a CSV file.');
            return;
        }
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result as string;
            parse(text, {
                delimiter: ';'
            }, (error, result: []) => {
                if (error) {
                    console.error(error);
                }
                console.log("Result", result);
                setRytterCsvData(result);
            });
            setErrorMessage('');
            setIsLoading(false);
        };
        reader.readAsText(file);
    };
    const handleFileSponsorUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setErrorMessage('Please select a file.');
            return;
        }
        if (!file.name.endsWith('.csv')) {
            setErrorMessage('Please upload a CSV file.');
            return;
        }
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result as string;
            parse(text, {
                delimiter: ';'
            }, (error, result: []) => {
                if (error) {
                    console.error(error);
                }
                console.log("Result", result);
                setSponsorCsvData(result);
            });
            setErrorMessage('');
            setIsLoading(false);
        };
        reader.readAsText(file);
    };
    const handleFileRoundsUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setErrorMessage('Please select a file.');
            return;
        }
        if (!file.name.endsWith('.csv')) {
            setErrorMessage('Please upload a CSV file.');
            return;
        }
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result as string;
            parse(text, {
                delimiter: ';'
            }, (error, result: []) => {
                if (error) {
                    console.error(error);
                }
                console.log("Result", result);
                setRoundCsvData(result);
            });
            setErrorMessage('');
            setIsLoading(false);
        };
        reader.readAsText(file);
    };
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>
                Loading Data from File
            </h1>
            <h3 style={{ marginBottom: '20px' }}>
                Load Ryttere
            </h3>
            <input type="file" onChange={handleFileRytterUpload}
                accept=".csv" style={{ marginBottom: '10px' }}
            />
            <h3 style={{ marginBottom: '20px' }}>
                Load Sponsorere
            </h3>
            <input type="file" onChange={handleFileSponsorUpload}
                accept=".csv" style={{ marginBottom: '10px' }}
            />
            <h3 style={{ marginBottom: '20px' }}>
                Load Omgange
            </h3>
            <input type="file" onChange={handleFileRoundsUpload}
                accept=".csv" style={{ marginBottom: '10px' }}
            />
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>
                {errorMessage}</div>
            }
            {isLoading ?
                (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        Loading...
                    </div>
                ) :
<></>
            }
            {( csvRoundData?.length > 0 && csvRytterData?.length > 0 && csvSponsorData?.length > 0 ) ? 
            <Button onClick={() => router.push("/showAwards")}> 
                Next
            </Button>: <></>}
        </div>
    );
};
export default Page;


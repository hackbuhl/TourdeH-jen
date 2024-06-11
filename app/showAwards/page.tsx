"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation'


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

interface FullData {
    id: string,
    name: string,
    rytterEmail: string,
    phone: string,
    gender: string,
    birthDate: string,
    electricBike: string,
    rounds: number,
    sponsorName: string,
    businessName: string,
    sponsorAddress: string,
    sponsorZip: string,
    sponsorCity: string,
    sponsorEmail: string,
    sponsorPhone: string,
    perRoundAmount: number,
    singleAmount: number,
    sumLine: number,
    sumRider: number,
    sponsorCount: number
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Navn', width: 100 },
    { field: 'rytterEmail', headerName: 'Rytter Email', width: 100 },
    { field: 'phone', headerName: 'Telefon', width: 100 },
    { field: 'gender', headerName: 'Køn', width: 100 },
    { field: 'birthDate', headerName: 'Fødselsdag', width: 100 },
    { field: 'electricBike', headerName: 'El Cykel', width: 100 },
    { field: 'rounds', headerName: 'Runder', width: 100 },
    { field: 'sponsorName', headerName: 'Sponsor', width: 100 },
    { field: 'businessName', headerName: 'Firma', width: 100 },
    { field: 'sponsorAddress', headerName: 'sponsor adresse', width: 100 },
    { field: 'sponsorCity', headerName: 'By', width: 100 },
    { field: 'sponsorZip', headerName: 'Postnr', width: 100 },
    { field: 'sponsorEmail', headerName: 'Sponsor Email', width: 100 },
    { field: 'sponsorPhone', headerName: 'Sponsor Phone', width: 100 },
    { field: 'perRoundAmount', headerName: 'perRoundAmount', width: 100 },
    { field: 'singleAmount', headerName: 'singleAmount', width: 100 },
    { field: 'sumRider', headerName: 'sumRider', width: 100 },
]


const Ridercolumns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Navn', width: 200 },
    { field: 'rounds', headerName: 'Runder', width: 100 },
    { field: 'sumRider', headerName: 'sumRider', width: 100 },
    { field: 'gender', headerName: 'Køn', width: 200 },
    { field: 'birthDate', headerName: 'Fødselsdag', width: 200 },
    { field: 'electricBike', headerName: 'El Cykel', width: 100 },
    { field: 'sponsorName', headerName: 'Sponsor', width: 200 },
    { field: 'businessName', headerName: 'Firma', width: 200 },
    { field: 'rytterEmail', headerName: 'Rytter Email', width: 200 },
    { field: 'phone', headerName: 'Telefon', width: 200 },
    // { field: 'sponsorAddress', headerName: 'sponsor adresse', width: 100 },
    // { field: 'sponsorCity', headerName: 'By', width: 100 },
    // { field: 'sponsorZip', headerName: 'Postnr', width: 100 },
    // { field: 'sponsorEmail', headerName: 'Sponsor Email', width: 100 },
    // { field: 'sponsorPhone', headerName: 'Sponsor Phone', width: 100 },
    // { field: 'perRoundAmount', headerName: 'perRoundAmount', width: 100 },
    // { field: 'singleAmount', headerName: 'singleAmount', width: 100 },
]

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function isOver18(birthdate: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
}

function isOver60(birthdate: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        return age - 1 >= 60;
    }
    return age >= 60;
    0
}


function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function parseDate(dateString: string): Date | null {
    const parts = dateString.split("-");
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return new Date(year, month - 1, day);
        }
    }
    console.log(dateString)
    return null;
}



export default function Page() {
    const [value, setValue] = React.useState(0);
    const [csvRytterData, setRytterCsvData] = useState([]);
    const [csvSponsorData, setSponsorCsvData] = useState([]);
    const [csvRoundData, setRoundCsvData] = useState([]);
    const [csvFullData, setFullCsvData] = useState<FullData[]>([]);
    const [csvAdultData, setAdultCsvData] = useState<FullData[]>([]);
    const [csvYoungData, setYoungCsvData] = useState<FullData[]>([]);
    const [csvSeniorData, setSeniorCsvData] = useState<FullData[]>([]);
    const [sponsorObj, setSponsorObj] = useState<any>();
    const [fullSum, setFullSum] = useState(0);
    const [errors, setErrors] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        setRoundCsvData(JSON.parse(localStorage.getItem("RoundData")))
        setRytterCsvData(JSON.parse(localStorage.getItem("RytterData")))
        setSponsorCsvData(JSON.parse(localStorage.getItem("SponsorData")))
    }, []);

    useEffect(() => {
        let localErrs = ""
        const localList = []
        for (let index = 0; index < csvRytterData.length; index++) {
            const element = csvRytterData[index];
            const name = element[1]
            const sponsors = []
            let riderRound = null
            csvRoundData.forEach(round => {
                if (round[1].toLowerCase() === name.toLowerCase()) {
                    riderRound = round
                }
            })
            if (!riderRound) {
                localErrs += "\t no rounds for :" + name
                console.log(name)
            }

            csvSponsorData.forEach(sponsor => {
                if (sponsor[8].toLowerCase() === name.toLowerCase()) {
                    sponsors.push(sponsor)
                }
                const sum = riderRound ? ((Number.parseInt(sponsor[9]) * Number.parseInt(riderRound[2] ?? 0)) + Number.parseInt(sponsor[10])) : Number.parseInt(sponsor[10])
                sponsor[11] = sum
            })
            const sum = sponsors.reduce((sum, obj) => sum + obj[11], 0)
            for (let is = 0; is < sponsors.length; is++) {
                const sponsor = sponsors[is];
                const id = index.toString() + is.toString()

                const fullData: FullData = {
                    id: id,
                    name: element[1],
                    rytterEmail: element[2],
                    phone: element[3],
                    gender: element[4],
                    birthDate: element[5],
                    electricBike: element[6],
                    rounds: riderRound ? riderRound[2] : 0,
                    sponsorName: sponsor[0] + " " + sponsor[1],
                    businessName: sponsor[2],
                    sponsorAddress: sponsor[3],
                    sponsorZip: sponsor[4],
                    sponsorCity: sponsor[5],
                    sponsorEmail: sponsor[6],
                    sponsorPhone: sponsor[7],
                    perRoundAmount: sponsor[9],
                    singleAmount: sponsor[10],
                    sumLine: riderRound ? ((Number.parseInt(sponsor[9]) * Number.parseInt(riderRound[2] ?? 0)) + Number.parseInt(sponsor[10])) : Number.parseInt(sponsor[10]),
                    sumRider: sum,
                    sponsorCount: sponsors.length
                }
                localList.push(fullData)


            }

            setFullCsvData(localList)

            setAdultCsvData(localList.filter((rider) => isOver18(parseDate(rider.birthDate))))
            setYoungCsvData(localList.filter((rider) => !isOver18(parseDate(rider.birthDate))))
            setSeniorCsvData(localList.filter((rider) => isOver60(parseDate(rider.birthDate))))
            setSponsorObj(localList.reduce((group, rider) => {
                const {
                    sponsorName,
                    businessName,
                    sponsorAddress,
                    sponsorZip,
                    sponsorCity,
                    sponsorEmail,
                    sponsorPhone } = rider;

                const sponsorString = `${sponsorName}, ${businessName}, ${sponsorAddress}, ${sponsorZip}, ${sponsorCity}, ${sponsorEmail}, ${sponsorPhone}`
                group[sponsorString] = group[sponsorString] ?? []
                group[sponsorString].push(rider);
                return group
            }, {}))
            
            setErrors(localErrs)
        }
    }, [csvRytterData, csvSponsorData, csvRoundData]);
    
    useEffect(() => {
        localStorage.setItem("SponsorInvoices", JSON.stringify(sponsorObj))
    }, [sponsorObj])

    useEffect(() => { 
        setFullSum(csvFullData.reduce((sum, obj) => sum + Number(obj.singleAmount) + (Number(obj.perRoundAmount)*obj.rounds), 0))
    }, [csvFullData])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <span>{errors}</span>
            <Box> 
            <h4> Totalt indkørt sum: {fullSum} </h4>
            <h4> Totalt indkørt fast sum: {csvFullData.reduce((sum, obj) => sum + Number(obj.singleAmount), 0)} </h4>
            <h4> Totalt indkørt pr round sum: {csvFullData.reduce((sum, obj) => sum+ (Number(obj.perRoundAmount)*obj.rounds), 0)} </h4>

            </Box>

            <Box sx={{ padding: 6 }}>

                <h2>Vindere</h2>

                <Grid container spacing={2}>
                    <Grid xs={6} md={4} >
                        <h3>Flest omgange voksen kvinder. </h3>
                        <h4>Navn: Runder </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvAdultData.filter((rider) => rider.gender !== "Mand").sort((a, b) => (b.rounds === a.rounds && b.sumRider - a.sumRider ) || b.rounds - a.rounds).map(item => `${item.name}: ${item.rounds} - ${item.sumRider}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest omgange voksen mænd</h3>
                        <h4>Navn: Runder </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvAdultData.filter((rider) => rider.gender === "Mand").sort((a, b) => (b.rounds === a.rounds && b.sumRider - a.sumRider ) || b.rounds - a.rounds).map(item => `${item.name}: ${item.rounds} - ${item.sumRider}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest indkørte penge voksen</h3>
                        <h4>Navn: Sum </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvAdultData.sort((a, b) => b.sumRider - a.sumRider).map(item => `${item.name}: ${item.sumRider}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest Sponsorere voksen</h3>
                        <h4>Navn: SponsorAntal </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvAdultData.sort((a, b) => b.sponsorCount - a.sponsorCount).map(item => `${item.name}: ${item.sponsorCount}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest omgange ung kvinder</h3>
                        <h4>Navn: Runder </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvYoungData.filter((rider) => rider.gender !== "Mand").sort((a, b) => (b.rounds === a.rounds && b.sumRider - a.sumRider ) || b.rounds - a.rounds).map(item => `${item.name}: ${item.rounds} - ${item.sumRider}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest omgange ung mænd</h3>
                        <h4>Navn: Runder </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvYoungData.filter((rider) => rider.gender === "Mand").sort((a, b) => (b.rounds === a.rounds && b.sumRider - a.sumRider ) || b.rounds - a.rounds).map(item => `${item.name}: ${item.rounds} - ${item.sumRider}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest indkørte penge ung</h3>
                        <h4>Navn: Sum </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvYoungData.sort((a, b) => b.sumRider - a.sumRider).map(item => `${item.name}: ${item.sumRider}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest Sponsorere ung</h3>
                        <h4>Navn: SponsorAntal </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvYoungData.sort((a, b) => b.sponsorCount - a.sponsorCount).map(item => `${item.name}: ${item.sponsorCount}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} >
                        <h3>Flest omgange 60+</h3>
                        <h4>Navn: Runder </h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {csvSeniorData.sort((a, b) => (b.rounds === a.rounds && b.sumRider - a.sumRider ) || b.rounds - a.rounds).map(item => `${item.name}: ${item.rounds} - ${item.sumRider}`).filter((value, index, self) => self.indexOf(value) === index).slice(0, 5).map((value) => (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>
            <Box padding={6} sx={{ width: '100%' }}>
                <h3>Fakturerings data</h3>
                <h5>Navigation Fakturarer </h5>
                <h5>Højre pil: Frem</h5>
                <h5>Venstre pil: Tilbage</h5>
                <h5>Mellemrun: Print(til pdf)</h5>
                <Button onClick={() => router.push("/invoices?index=0")}>
                    invioces
                </Button>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {sponsorObj ? Object.keys(sponsorObj)
                        .map((value, index) => (
                            <ListItem
                                key={value}
                            >
                                <Grid container spacing={2}>
                                    <Grid xs={12} md={12} >
                                        <ListItemText primary={<h4>{index} {value} Total Kr. {sponsorObj[value].reduce((sum, obj) => sum + obj.sumLine, 0)}</h4>} />
                                    </Grid>
                                    {/* <Grid xs={12} md={12}>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            {sponsorObj[value].map((item, index) => `${index}  ${item.name}: ${item.rounds}, ${item.perRoundAmount}, ${item.singleAmount}; Betaling for rytter: ${item.sumLine}`).map((val) => (
                                                <ListItem
                                                    key={val}>
                                                    <ListItemText primary={`- ${val}`} />
                                                </ListItem>))}
                                        </List>
                                    </Grid> */}
                                    {/* <Grid xs={12} md={12} >
                                        <ListItemText primary={<h5>Total Kr. {sponsorObj[value].reduce((sum, obj) => sum + obj.sumLine, 0)}</h5>} />
                                    </Grid> */}
                                </Grid>
                            </ListItem>
                        ))
                        : <></>}
                </List>

            </Box>
            <Box>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Alle" {...a11yProps(0)} />
                        <Tab label="Voksen" {...a11yProps(1)} />
                        <Tab label="Ung" {...a11yProps(2)} />
                        <Tab label="Senior" {...a11yProps(3)} />
                        <Tab label="Fakturaer" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <DataGrid
                        sx={{ width: '100%' }}
                        rows={csvFullData} columns={columns}
                        getRowId={(row) => row.id}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataGrid
                        sx={{ width: '100%' }}
                        rows={csvAdultData} columns={Ridercolumns}
                        getRowId={(row) => row.id}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DataGrid
                        sx={{ width: '100%' }}
                        rows={csvYoungData} columns={Ridercolumns}
                        getRowId={(row) => row.id}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DataGrid
                        sx={{ width: '100%' }}
                        rows={csvSeniorData} columns={Ridercolumns}
                        getRowId={(row) => row.id}
                    />
                </TabPanel>
            </Box>
        </Box>
    );
}



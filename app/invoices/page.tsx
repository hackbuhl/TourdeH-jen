"use client"
import { AppBar, Box, Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import icon from './icon.png'
import mobilepay from './mobilepay.png'

const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        }

        const upHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, [targetKey]);

    return keyPressed;
};

export default function Page() {
    return (
        <Suspense>
            <Invoice/>
        </Suspense>
    )
}

const Invoice = function () {
    const [sponsorObj, setSponsorList] = useState<any>();
    const [vals, setVals] = useState<string[]>();
    const [name, setName] = useState<string>();
    const [index, setIndex] = useState(0);
    const searchParams = useSearchParams()
    const rightPress = useKeyPress("ArrowRight");
    const leftPress = useKeyPress("ArrowLeft");
    const spacePress = useKeyPress(" ");
    const router = useRouter()

    useEffect(() => {
        setSponsorList(JSON.parse(localStorage.getItem("SponsorInvoices")))
        setVals(Object.keys(JSON.parse(localStorage.getItem("SponsorInvoices"))))
    }, [])
    useEffect(() => {
        setIndex(Number.parseInt(searchParams.get('index')))
    }, [searchParams])
    useEffect(() => {
        setName(vals ? vals[index] : null)
    }, [vals, index])
    useEffect(() => {
        if (leftPress && index > 0) {
            router.push(`/invoices?index=${index - 1}`)
        }
    }, [leftPress])
    useEffect(() => {
        if (rightPress) {
            router.push(`/invoices?index=${index + 1}`)
        }
    }, [rightPress])
    useEffect(() => {
        if (spacePress) {
            var tempTitle = document.title;
            document.title = `${new Date().getFullYear().toString() + '0' + index.toString()}.pdf`;
            window.print();
            document.title = tempTitle;
        }
    }, [spacePress])

    return (
        <Box sx={{ padding: 6 }}>
            {sponsorObj && name ?
                <>
                    <Grid container spacing={2}>
                        <Grid xs={8} md={8} >
                            <h4>Sponsor-cykelløb Tour de Højen</h4>
                        </Grid>
                        <Grid xs={4} md={4} >
                            <Image unoptimized src={icon} height={108} width={200} alt="Logo"></Image>
                        </Grid>
                        <Grid xs={8} md={8} >
                            <h3>{sponsorObj[name][0].businessName != "Tom" && sponsorObj[name][0].businessName != "" ? sponsorObj[name][0].businessName : sponsorObj[name][0].sponsorName}</h3>
                            <h3>{sponsorObj[name][0].sponsorAddress}</h3>
                            <h3>{sponsorObj[name][0].sponsorZip} {sponsorObj[name][0].sponsorCity}</h3>
                        </Grid>
                        <Grid xs={4} md={4} >
                            <h4>FakturaNummer: {new Date().getFullYear().toString() + '0' + index.toString()}</h4>
                            <h5>Højen {new Date().getDate()}</h5>
                        </Grid>
                        <Grid xs={8} md={8} >
                            <h4>{sponsorObj[name][0].businessName == "Tom" || sponsorObj[name][0].businessName == "" || !sponsorObj[name][0].businessName ? "" : sponsorObj[name][0].sponsorName} </h4>
                        </Grid>
                        <Grid xs={4} md={4} >
                            <h4>{sponsorObj[name][0].sponsorEmail}</h4>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={12}>
                    <Divider/>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {sponsorObj && name ? sponsorObj[name].map(item => [item.name, item.rounds, item.sumLine]).map((val) => (
                                    <ListItem key={val[0]} dense>
                                        <Grid container spacing={0} rowSpacing={0}>
                                            <Grid xs={6} md={6} rowSpacing={0} >
                                                <span>{val[0]}</span>
                                            </Grid>
                                            <Grid xs={4} md={4} rowSpacing={0}>
                                                <span>{val[1]}</span>
                                            </Grid>
                                            <Grid xs={2} md={2} rowSpacing={0}>
                                                <span>{val[2]}</span>
                                            </Grid>
                                        </Grid>
                                    </ListItem>)) : <></>}
                            </List>
                        </Grid>
                    </Grid>
                    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: "white", color: "black" }}>
                        <Box sx={{ padding: 6 }}>
                            <Grid container spacing={1} rowSpacing={0}>
                                <Grid xs={10} md={10} >
                                    <ListItemText primary={<h3>Total</h3>} />
                                </Grid>
                                <Grid xs={2} md={2} >
                                    <ListItemText sx={{ textDecorationLine: "underline", textDecorationStyle: "double" }} primary={<h3> Kr. {sponsorObj && name ? sponsorObj[name].reduce((sum, obj) => sum + obj.sumLine, 0) : <></>}</h3>} />
                                </Grid>
                                <Grid xs={10} md={10}>
                                    <div>Beløbet bedes indbetales til</div>
                                    <div>
                                        AL Bank reg: 5398 Kontonr. 0000346406.          Mobilpay : 256359
                                    </div>
                                    <div>
                                        Betalingsfrist : 14 dage.
                                    </div>
                                    <div>
                                        VED BETALING OPLYS FAKTURANR.
                                    </div>
                                    <div>
                                        Eller kontakt Catarina Ilmark, Højen Kirkevej 17, 7100 Vejle tlf.23486863
                                    </div>
                                    <div>
                                        Jacob Petersen, Højen Tang 16, 7100 Vejle tlf.23346163
                                    </div>
                                </Grid>
                                <Grid xs={2} md={2}>
                                    <Image unoptimized src={mobilepay} height={100} width={100} alt="mobilepay"></Image>
                                </Grid>
                            </Grid>
                        </Box>
                    </AppBar >
                </>
                : <h4>Ikke flere sponsorere</h4>}
        </Box >
    )
}
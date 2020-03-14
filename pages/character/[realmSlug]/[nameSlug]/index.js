import React from "react";
import fetch from 'node-fetch'
import {Container, Grid, Divider, Typography, List, ListItem, ListItemText} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

function CharacterPage(json) {
    const {
        _id,
        ilvl,
        checksum,
        media,
        guild_history,
        id,
        name,
        gender,
        faction,
        race,
        spec,
        realm,
        realm_slug,
        level,
        lastOnline,
        lastModified,
        statusCode,
        guild,
        guild_rank,
        createdBy,
        updatedBy,
        createdAt,
        updatedAt
    } = json;
    const classes = useStyles();
    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="lg">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                           {_id}
                        </Typography>
                        { (statusCode === 200) ? (
                        <span className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Find all
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Guild History
                                    </Button>
                                </Grid>
                            </Grid>
                        </span>
                        ) : ('')
                        }
                    </Container>
                </div>
                {/* End hero unit */}
                <Container className={classes.cardGrid} maxWidth="lg">
                { (statusCode === 200) ? (
                    <Grid container spacing={4}>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Summary
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        ID: {id}
                                    </Typography>
                                    <Typography>
                                        LVL: {level}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {faction}
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        {gender} / {race}
                                    </Typography>
                                    <Typography>
                                        {json.class} / {spec}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        { (guild) ? (
                            <Grid item key={1} xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {guild}
                                        </Typography>
                                        <Divider light />
                                        <Typography>
                                            Rank: {guild_rank}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            ) : ('')
                        }
                        { (ilvl) ? (
                            <Grid item key={2} xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            ilvl
                                        </Typography>
                                        <Divider light />
                                        <Typography>
                                            A: {ilvl.eq}
                                        </Typography>
                                        <Typography>
                                            E: {ilvl.avg}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ) : ('')
                        }
                        { (checksum) ? (
                            <Grid item key={2} xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Checksum
                                        </Typography>
                                        <Divider light />
                                        <Typography>
                                            {checksum.pets}
                                        </Typography>
                                        <Typography>
                                            {checksum.mounts}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ) : ('')
                        }
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {updatedBy}
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        C: {new Date(createdAt).toLocaleString('en-GB')}
                                    </Typography>
                                    <Typography>
                                        U: {new Date(updatedAt).toLocaleString('en-GB')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Timestamps
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        {new Date(lastModified).toLocaleString('en-GB')}
                                    </Typography>
                                    <Typography>
                                        {new Date(lastOnline).toLocaleString('en-GB')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        { (media) ? (
                            <Grid item key={2} xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={media.bust_url}
                                        title={_id}
                                    />
                                </Card>
                            </Grid>
                        ) : ('')
                        }
                    </Grid>
                ) : (
                    <Grid item key={2} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {updatedBy}
                                </Typography>
                                <Divider light />
                                <Typography>
                                    C: {new Date(createdAt).toLocaleString('en-GB')}
                                </Typography>
                                <Typography>
                                    U: {new Date(updatedAt).toLocaleString('en-GB')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    )
                }
                </Container>
            </main>
        </React.Fragment>
    )
}

export async function getServerSideProps({query}) {
    const {realmSlug, nameSlug} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/${(nameSlug)}@${realmSlug}`));
    const json = await res.json();
    return { props: json }
}

export default CharacterPage
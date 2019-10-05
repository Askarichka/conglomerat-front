import { useRouter } from 'next/router'
import { Container, Table, TableBody, TableCell, TableRow, Paper, Grid, Typography, Divider, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import fetch from 'isomorphic-unfetch'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(2),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 300,
    },
    card: {
        minWidth: 275,
        margin: theme.spacing(2),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const Item = ({asset_class, name, timestamp, market, counterparties}) => {
    const classes = useStyles();
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container fixed>
            <Typography variant="overline" display="block">
                {asset_class}:{id}
            </Typography>
            <Typography variant="h2" gutterBottom>
                {name.ru_RU}
            </Typography>
            <Typography variant="caption" display="block">
                {timestamp}
            </Typography>
            <Divider />
                <Grid container spacing={1}>
                    {market.map((element, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {element.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {element.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            <Divider />
            <Grid item xs={3}>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Table className={classes.table} size="small">
                            <TableBody>
                                {counterparties.map(cp => (
                                    <TableRow key={cp}>
                                        <TableCell component="th" scope="row">
                                            {cp}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </Grid>
        </Container>
    )
};

Item.getInitialProps = async ({ query }) => {
    try {
        const res = await fetch(`http://34.90.62.42/api/test/${query.id}@Gordunni`);
        const json = await res.json();
        /*
        if (typeof json.market === 'undefined') {
            const err = new Error();
            err.code = 'ENOENT';
            throw err
        }*/
        console.log(json);
        return json;
    } catch (err) {
        return { err: { statusCode: err.status } }
    }
};

export default Item
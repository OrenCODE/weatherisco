import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from './navbarCustomStyles';

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: 'black' }}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" href={'/'} className={classes.logo}>
                            WEATHERISCO
                    </Button>
                    </Typography>
                    <Button color="inherit" href={'/'} className={classes.buttonText}>
                        Home
                    </Button>
                    <Button color="inherit" href={'/favorites'} className={classes.buttonText}>
                        Favorites
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar

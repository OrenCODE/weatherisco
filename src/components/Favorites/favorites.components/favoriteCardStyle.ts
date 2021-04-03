import {makeStyles, Theme, createStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: 'white',
            background: 'transparent',
            minWidth: 210,
            marginTop: 45
        },
        dayTitle: {
            fontSize: 50,
            textDecorationLine: 'unset',
            color: 'white !important',
            textShadow: '4px 3px rgb(0 0 0 / 60%)',
            fontWeight: 700,
            marginTop: 12,
        },
        weatherTitle: {
            fontSize: 38,
            textShadow: '4px 3px rgb(0 0 0 / 60%)',
            fontWeight: 700
        },
        temp: {
            fontSize: 36,
            textShadow: '2px 6px rgb(0 0 0 / 60%)',
            fontWeight: 900
        },
        weatherIcon: {
            marginTop: 32
        },
        favDel: {
            padding: 12,
            border: '1px solid #29344B',
            background: 'white'
        },
        pos: {
            marginBottom: 12,
        },
        media: {
            width: '90px',
        }
    }),
);

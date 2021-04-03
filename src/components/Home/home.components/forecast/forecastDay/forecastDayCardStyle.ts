import {makeStyles, Theme, createStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: 'white',
            background: 'transparent',
            minWidth: 160,
        },
        dayTitle: {
            fontSize: 42,
            textShadow: '4px 3px rgb(0 0 0 / 60%)',
            fontWeight: 900,
            marginTop: 12,
            fontFamily: 'Pavanam'
        },
        temp: {
            fontSize: 24,
            textShadow: '2px 6px rgb(0 0 0 / 60%)',
            fontWeight: 900
        },
        pos: {
            marginBottom: 12,
        },
        media: {
            width: '90px',
        }
    }),
);

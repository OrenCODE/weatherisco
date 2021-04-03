import {makeStyles, createStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        logo:{
            fontSize: 22,
            fontFamily: 'Alegreya Sans',
        },
        buttonText: {
            fontSize: 14,
            fontWeight: 900
        },
        title: {
            display: 'flex',
            flexGrow: 1,
        },
    }),
);

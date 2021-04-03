import React from 'react';
import { AppState } from '../../../../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { dayLightIcon, dayNightIcon } from '../forecastDayIcons';
import { useStyles } from './forecastDayCardStyle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

export type Props = {
    day: any
}

const ForecastDay = ({ day }: Props) => {

    const classes = useStyles();
    const { showFahrenheit } = useSelector((state: AppState) => state.forecast);

    return (
        <Card className={classes.root}>
            <div className={classes.dayTitle}>
                {getDayOfWeek(day.Date)}
            </div>
            <CardContent>
                <Typography>
                    {day.Day["Icon"].toString().length === 1 ?
                        (<img src={`${dayLightIcon}${day.Day.Icon}-s.png`} className={classes.media} />) :
                        (<img src={`${dayNightIcon}${day.Day.Icon}-s.png`} className={classes.media} />)
                    }
                </Typography>
                <Typography variant="body2" component="div">
                    {showFahrenheit ? (
                        <div className={classes.temp}>
                            <div>{cToF(day.Temperature["Minimum"].Value)} <i> °F</i></div>
                            <div>{cToF(day.Temperature["Maximum"].Value)} <i> °F</i></div>
                        </div>
                    ) : (
                            <div className={classes.temp}>
                                <div>{day.Temperature["Minimum"].Value} <i> °{day.Temperature["Minimum"].Unit}</i></div>
                                <div>{day.Temperature["Maximum"].Value} <i> °{day.Temperature["Maximum"].Unit}</i></div>
                            </div>
                        )}
                </Typography>
            </CardContent>
            <CardActions>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    );
};

const getDayOfWeek = (date: any) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
};

const cToF = (celsius: number) => {
    const number = Math.abs(celsius * 9 / 5 + 32);
    return Math.round(number * 10) / 10;
};

export default ForecastDay;

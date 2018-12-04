import React from "react";
import {connect} from 'react-redux';
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";

const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: "white"
    }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
    card: {
        margin: "5% 25%"
    }
};

class NowWhat extends React.Component {
    componentDidMount() {
        this.callAPI();
        setInterval(this.callAPI, 4000);
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps !== prevProps && !nextProps.Loading) {

        }
    }

    callAPI = () => {
        this.props.apiCall();
    };

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader title="Drone Data"/>
                <CardContent>
                    {this.props.loading ? (
                        <LinearProgress />
                    ) : (
                        <List>
                            <ListItem>
                                <ListItemText primary={`Latitude: ${this.props.latitude}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Longitude: ${this.props.longitude}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Weather State: ${this.props.weather_state_name}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Place: ${this.props.name}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Temperature: ${this.props.temperatureinFahrenheit}`}/>
                            </ListItem>
                        </List>
                    )}
                </CardContent>
            </Card>
        );
    }
}

const mapState = (state) => {
    const {
        loading,
        name,
        weather_state_name,
        temperatureinFahrenheit,
        longitude,
        latitude
    } = state.weather;
    return {
        loading,
        name,
        weather_state_name,
        temperatureinFahrenheit,
        longitude,
        latitude
    };
};

const mapDispatch = dispatch => ({
    apiCall: () =>
        dispatch({
            type: actions.FETCH_WEATHER,
            longitude: -95.3698,
            latitude: 29.7604
        }),
});

export default connect(
    mapState,
    mapDispatch,
)((withStyles(styles)(NowWhat)));

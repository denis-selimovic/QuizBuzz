import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Timer extends React.Component {

    constructor(props) {
        super(props);
        const { duration } = this.props;
        this.state = { seconds: duration * 60 }
        this.tickCallback = this.tickCallback.bind(this);
        this.renderTime = this.renderTime.bind(this);
    }

    tickCallback() {
        if (this.state.seconds > 0)
            this.setState({ seconds: this.state.seconds - 1 });
    }

    componentDidMount() {
        const { duration, timeCallback } = this.props;
        this.timeout = setTimeout(timeCallback, duration * 60 * 1000 + 500);
        this.interval = setInterval(this.tickCallback, 1000);
    }


    componentWillUnmount() {
        clearTimeout(this.timeout);
        clearInterval(this.interval);
    }

    addZero(time) {
        return (time < 10) ? '0' : '';
    }

    showHours(hours) {
        if (hours === 0) return '';
        return (hours >= 10) ? `${hours}:` : `0${hours}:`;
    }

    showTime() {
        const { seconds } = this.state;
        const stringHours = Math.floor(seconds / 3600);
        const stringMinutes = Math.floor((seconds - stringHours * 3600) / 60);
        const stringSeconds = seconds - stringMinutes * 60 - stringHours * 3600;
        return `${this.showHours(stringHours)}${this.addZero(stringMinutes)}${stringMinutes}:${this.addZero(stringSeconds)}${stringSeconds}`;
    }

    renderTime() {
        const style = (this.state.seconds <= 60) ? styles.expiringTime : styles.time;
        return (
            <Text style={style}>{this.showTime()}</Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTime()}
            </View>
        );
    }
}

export default Timer;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        fontSize: 24
    },
    expiringTime: {
        color: 'red',
        fontSize: 24
    }
});

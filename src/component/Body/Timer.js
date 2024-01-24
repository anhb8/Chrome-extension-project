import React from "react";
import Clock from "./Clock";

class Timer extends React.Component {
    render() {
        return(
            <Clock count={this.state.count} duration={this.props.duration} />
        )
    }
    constructor (props) {
        super(props);
        this.state = {count: 0}
    }

    componentDidMount () {
        const timer = setInterval ( () => {
            this.setState( 
                (prev) => (
                    {count: prev.count + 1}
                )
            )
            if (this.state.count == this.props.duration - 1) {
                clearInterval(timer)
            }
        }, 1000)
    }
}

export default Timer;
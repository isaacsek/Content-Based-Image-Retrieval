import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../../actions";

class Payments extends Component {


    render() {
        //debugger;
        //console.log(process.env);
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 Emaily Credits"
                amount={500}
                token={token => this.props.handleStripeToken(token)} // callback function after complete form
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

function mapStateToProps(state) {
    return {
        // look at combined reducers, we called this piece of state - auth
        auth : state.auth
    };
}

// actions are on this.props
export default connect(mapStateToProps, actions)(Payments);

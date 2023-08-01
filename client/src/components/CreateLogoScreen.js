import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor:String!,
        $borderColor:String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!
        ) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor:$backgroundColor,
            borderColor:$borderColor,
            borderRadius:$borderRadius,
            borderWidth:$borderWidth,
            padding:$padding,
            margin:$margin) {
            _id
        }
    }
`;

const initialState = {
    text:"Default Logo",
    color :"#000000",
    fontSize : "24pt",
    backgroundColor:"#FFFFFF",
    borderColor:"#000000",
    borderRadius:"15pt",
    borderWidth:"15pt",
    padding:"15pt",
    margin:"15pt",
    border:'solid',
};

class CreateLogoScreen extends Component {
    state = initialState;

    updateState = (key, value) => {
        this.setState({ [key]: value });
    };

    resetState = () => {
        this.setState(initialState);
    };

    FormInput = ({ name, type = "text", placeholder, isNumber = false, min = 0, max = 80 }) => {
        const node = React.createRef();
        return (
            <div className="form-group">
                <label htmlFor={name}>{placeholder}:</label>
                <input
                    type={type}
                    className="form-control"
                    name={name}
                    min={min}
                    max={max}
                    ref={node}
                    placeholder={placeholder}
                    onChange={(e) => this.updateState(name, isNumber ? `${e.target.value}pt` : e.target.value)}
                />
            </div>
        );
    };

    render() {
        const { FormInput } = this;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container row">
                        <div className= "col s4">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link id="home-btn" className="rounded btn-lg btn-info" to="/">Home</Link></h4>
                                    <h3 className="panel-title">Create Logo</h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        addLogo({ variables: { ...this.state } });
                                        this.resetState();
                                    }}>
                                        <FormInput name="text" placeholder="Text" />
                                        <FormInput name="color" type="color" placeholder="Color" />
                                        <FormInput name="fontSize" type="number" placeholder="Font Size" isNumber />
                                        <FormInput name="backgroundColor" type="color" placeholder="Background Color" />
                                        <FormInput name="borderColor" type="color" placeholder="Border Color" />
                                        <FormInput name="borderRadius" type="number" placeholder="Border Radius" isNumber />
                                        <FormInput name="borderWidth" type="number" placeholder="Border Width" isNumber />
                                        <FormInput name="padding" type="number" placeholder="Padding" isNumber />
                                        <FormInput name="margin" type="number" placeholder="Margin" isNumber />

                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <div style={this.state}>{this.state.text}</div> 
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;

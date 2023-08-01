import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor:String!,
        $borderColor:String!,
        $borderRadius:Int!,
        $borderWidth:Int!,
        $padding:Int!,
        $margin: Int!
        ) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor:$backgroundColor,
                borderColor:$borderColor,
                borderRadius:$borderRadius,
                borderWidth:$borderWidth,
                padding:$padding,
                margin:$margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    render() {
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    const logo = data.logo || {};
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container row">
                                    <div className="col s4">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4><Link className="rounded btn-lg btn-info" to="/">Home</Link></h4>
                                                <h3 className="panel-title">Edit Logo</h3>
                                            </div>
                                            <div className="panel-body">                                            
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    const formData = {
                                                        id: logo._id,
                                                        text: this.state.text,
                                                        color: this.state.color,
                                                        fontSize: parseInt(this.state.fontSize),
                                                        backgroundColor: this.state.backgroundColor,
                                                        borderColor: this.state.borderColor,
                                                        borderRadius: parseInt(this.state.borderRadius),
                                                        borderWidth: parseInt(this.state.borderWidth),
                                                        padding: parseInt(this.state.padding),
                                                        margin: parseInt(this.state.margin)
                                                    };
                                                    updateLogo({ variables: formData });
                                                    this.setState({
                                                        text: "",
                                                        color: "",
                                                        fontSize: "",
                                                        backgroundColor: "",
                                                        borderColor: "",
                                                        borderRadius: "",
                                                        borderWidth: "",
                                                        padding: "",
                                                        margin: ""
                                                    });
                                                }}>
                                                    <FormGroup label="Text" type="text" name="text" value={this.state.text} onChange={this.handleChange}/>
                                                    <FormGroup label="Color" type="color" name="color" value={this.state.color} onChange={this.handleChange}/>
                                                    <FormGroup label="Font Size" type="text" name="fontSize" value={this.state.fontSize} onChange={this.handleChange}/>
                                                    <FormGroup label="Background Color" type="color" name="backgroundColor" value={this.state.backgroundColor} onChange={this.handleChange}/>
                                                    <FormGroup label="Border Color" type="color" name="borderColor" value={this.state.borderColor} onChange={this.handleChange}/>
                                                    <FormGroup label="Border Radius" type="number" name="borderRadius" value={this.state.borderRadius} onChange={this.handleChange}/>
                                                    <FormGroup label="Border Width" type="number" name="borderWidth" value={this.state.borderWidth} onChange={this.handleChange}/>
                                                    <FormGroup label="Padding" type="number" name="padding" value={this.state.padding} onChange={this.handleChange}/>
                                                    <FormGroup label="Margin" type="number" name="margin" value={this.state.margin} onChange={this.handleChange}/>
                                                    
                                                    <div className= "container row">
                                                        <button id="sub" type="submit" className="btn btn-success">Submit</button>
                                                        <Link id= "cancel" className="rounded btn-lg btn-danger" to="/">Cancel</Link>
                                                    </div>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s8">
                                        <div style={this.getStyles()}>{this.state.text}</div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }

    getStyles = () => ({
        border: 'solid',
        color: this.state.color,
        fontSize: this.state.fontSize,
        backgroundColor: this.state.backgroundColor,
        borderColor: this.state.borderColor,
        borderRadius: this.state.borderRadius,
        borderWidth: this.state.borderWidth,
        padding: this.state.padding,
        margin: this.state.margin
    })

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
}

const FormGroup = ({ label, type, name, value, onChange }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}:</label>
        <input
            type={type}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default EditLogoScreen;

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




const def = {

    text:"Default Logo",
    color :"#000000",
    fontSize : "24pt",
    backgroundColor:"#FFFFFF" ,
    borderColor:"#000000",
    borderRadius:"15pt",
    borderWidth:"15pt",
    padding:"15pt",
    margin:"15pt",
    border:'solid',



} ;


class CreateLogoScreen extends Component {
   

    state = {

        text:"Default Logo",
        color :"#000000",
        fontSize : "24pt",
        backgroundColor:"#FFFFFF" ,
        borderColor:"#000000",
        borderRadius:"15pt",
        borderWidth:"15pt",
        padding:"15pt",
        margin:"15pt",
        border:'solid',
    
    
    
    } ;
  


    render() {
    
        let text, color, fontSize, backgroundColor,borderColor,borderRadius,borderWidth,padding,margin; //this is where yo uleft off pawan!
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container row">
                        <div className= "col s4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link  id ="home-btn" className="rounded btn-lg btn-info"  to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),backgroundColor:backgroundColor.value, borderColor:borderColor.value,borderRadius:parseInt(borderRadius.value),borderWidth:parseInt(borderWidth.value),padding:parseInt(padding.value),margin:parseInt(margin.value)} });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                   
                                    backgroundColor.value="";
                                    borderColor.value="";
                                    borderRadius.value="";
                                    borderWidth.value="";
                                    padding.value="";
                                    margin.value="";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input   onChange={(e) => this.setState({text:e.target.value})} type="text" className="form-control" name="text" id="txt" ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input  onChange={(e) => this.setState({color:e.target.value})}  type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input min="5" max ="80" onChange={(e) => this.setState({fontSize:e.target.value+"pt"})}  type="number" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                   
                                   
                                   
                                   
                                   
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input onChange={(e) => this.setState({backgroundColor:e.target.value})} type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>
                                        
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input onChange={(e) => this.setState({borderColor:e.target.value})} type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input min="0" max ="80" onChange={(e) => this.setState({borderRadius:e.target.value+"pt"})} type="number" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                               
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input min="0" max ="80" onChange={(e) => this.setState({borderWidth:e.target.value+"pt"})}  type="number" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                  
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input min="0" max ="80" onChange={(e) => this.setState({padding:e.target.value+"pt"})}  type="number" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input min="0" max ="80" onChange={(e) => this.setState({margin:e.target.value+"pt"})} type="number" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" />
                                    </div>
                                    
                                    





                                    <button type="submit"   className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>

                        </div>
                        <div className="col s8">
                        <div  style = {{
                                        border:'solid',

                                       color:this.state.color,
                                       fontSize: this.state.fontSize,
                                       backgroundColor:this.state.backgroundColor,
                                       borderColor:this.state.borderColor,
                                       borderRadius: this.state.borderRadius,
                                       borderWidth: this.state.borderWidth,
                                       padding: this.state.padding,
                                       margin:this.state.margin


                                    }}>


                                    {this.state.text}  



                        </div> 




                        </div>


                  

                    </div>
                         
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;
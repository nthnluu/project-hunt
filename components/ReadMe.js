import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default class ReadMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
    }
  
    componentDidMount() {
        const user = this.props.link.split("/")[3];
        const repo = this.props.link.split("/")[4];
        axios.get(`https://api.github.com/repos/${user}/${repo}/readme`)
        .then(res => {
            const content = atob(res.data.content); 
            this.setState({ content }) 
        })
    }
  
    render() {
      return (
        <ReactMarkdown source={this.state.content}/>
      )
    }
  }  
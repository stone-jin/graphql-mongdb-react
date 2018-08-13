import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addAuthorMutation } from '../queries/queries'

class AddAuthor extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            age: 18
        }
    }
    
    submitForm(e){
        e.preventDefault();
        console.log(this.props)
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: this.state.age
            },
            refetchQueries:[{
                query: getAuthorsQuery
            }]
        });
    }

    render () {
        return (
            <div>
                <form id="add-author" onSubmit={this.submitForm.bind(this)}>
                    <div>
                        <label>作者:</label>
                        <input type="text" onChange={(e)=>{this.setState({name: e.target.value})}}/>
                    </div>
                    <div>
                        <label>年龄:</label>
                        <input type="text" onChange={(e)=>{this.setState({genre: e.target.value})}}/>
                    </div>
                    <button type="submit">添加</button>
                </form>
            </div>
        );
    }
}

// export default graphql(getAuthorsQuery)(AddAuthor);

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addAuthorMutation, {name: "addAuthorMutation"})
)(AddAuthor)
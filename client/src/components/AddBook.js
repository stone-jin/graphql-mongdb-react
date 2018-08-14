import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return (<option>Loading Authors...</option>)
        }else{
            return data.authors.map(author=>{
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries:[{
                query: getBooksQuery
            }]
        });
    }

    render () {
        return (
            <div>
                <hr/>
                <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                    <div>
                        <label>书籍名字:</label>
                        <input type="text" onChange={(e)=>{this.setState({name: e.target.value})}}/>
                    </div>
                    <div>
                        <label>内容:</label>
                        <input type="text" onChange={(e)=>{this.setState({genre: e.target.value})}}/>
                    </div>
                    <div>
                        <label>作者:</label>
                        <select onChange={(e)=>{this.setState({authorId: e.target.value})}}>
                            <option value="">请选择一个作者</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button type="submit">添加</button>
                </form>
            </div>
        );
    }
}

// export default graphql(getAuthorsQuery)(AddBook);

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)
import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
import { Form, Input, Select,  Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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
            // return (<Option key="Loading" value="sss">Loading Authors...</Option>)
        }else{
            return data.authors.map(author=>{
                return (<Option key={author.id} value={author.id}>{author.name}</Option>)
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

    changeName = (e)=>{
       this.setState({name: e.target.value})
    }
    
    changeContent = (e)=>{
        this.setState({genre: e.target.value})
    }

    changeAuthor = (e)=>{
        this.setState({authorId: e})
    }
    render () {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        return (
            <div>
                <hr/>
                <Form onSubmit={this.submitForm.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="书籍名字:"
                        >
                        <Input placeholder="请输入书籍的名字" onChange={this.changeName}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="内容:"
                        >
                        <Input placeholder="请输入书籍的介绍" onChange={this.changeContent}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="作者:"
                        >
                        <Select
                            style={{ width: 200 }}
                            placeholder="请选择一个作者"
                            optionFilterProp="children"
                            onChange={this.changeAuthor}
                        >
                            {this.displayAuthors()}
                        </Select>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// export default graphql(getAuthorsQuery)(AddBook);

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)
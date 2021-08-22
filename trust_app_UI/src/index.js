import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import web3 from './web3';
import './index.css';
import styles from './styles';
import trust from './trust';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormLabel,
    FormControl,
    FormGroup,
    Table, Card
} from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        const hightrust= await trust.methods.gethighesttrust().call();
        this.setState({hightrust});
    }

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Trust Building Network</h1>
                        <p className="mt-4"><a style={{ background: "yellow", textDecoration: "none" }}>  {this.state.hightrust} </a> is the most trustworthy account in our network</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <h2>Already a User?</h2>
                        <h3 className="mt-4">&#9734; Make a friend</h3>
                        <Form onSubmit={async (event) => {
                            event.preventDefault();
                            const { addr1, addr2 } = this.state;
                            const accounts = await web3.eth.getAccounts();
                            await trust.methods.addfriend(addr1,addr2).send({
                                from: accounts[0]
                            });
                            console.log(addr1, addr2);
                        }}>
                            <FormGroup as={Row}>
                                <FormLabel column sm="4">
                                    Your Address
                                </FormLabel>
                                <Col sm="6">
                                    <FormControl
                                        type="text"
                                        name="addr1"
                                        value={this.state.addr1}
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <FormLabel column sm="4">
                                    Friends Address
                                </FormLabel>
                                <Col sm="6">
                                    <FormControl
                                        type="text"
                                        name="addr2"
                                        value={this.state.addr2}
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>
                            <Button type="submit" variant="outline-primary">Submit</Button>
                        </Form>
                        <h3 className="mt-4">&#9734; Endorse a friend/stranger</h3>
                        <Form onSubmit={async (event) => {
                            const { sender, reciever } = this.state;
                            const accounts = await web3.eth.getAccounts();
                            await trust.methods.endorse(sender,reciever).send({
                                from: accounts[0]
                            });
                            this.componentDidMount();
                            console.log(sender, reciever);
                            event.preventDefault();
                        }}>
                            <FormGroup as={Row}>
                                <FormLabel column sm="4">
                                    Sender
                                </FormLabel>
                                <Col sm="6">
                                    <FormControl
                                        type="text"
                                        name="sender"
                                        value={this.state.sender}
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <FormLabel column sm="4">
                                    Reciever
                                </FormLabel>
                                <Col sm="6">
                                    <FormControl
                                        type="text"
                                        name="reciever"
                                        value={this.state.reciever}
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>
                            <Button type="submit" variant="outline-primary">Submit</Button>
                        </Form>
                    </Col>
                    <Col xs={12} sm={6}>
                        <h2>Join if you're new!</h2>
                        <Form className="mt-4" onSubmit={async (event) => {
                            event.preventDefault();
                            const { user } = this.state;
                            const accounts = await web3.eth.getAccounts();
                            await trust.methods.setuser(user).send({
                                from: accounts[0],gaslimit: '2000000'
                            });
                            console.log(user);
                        }}>
                            <FormGroup>
                                <FormControl
                                    type="text"
                                    name="user"
                                    placeholder="Set User"
                                    value={this.state.user}
                                    onChange={this.onChange} />
                            </FormGroup>
                            <Button type="submit" variant="outline-primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
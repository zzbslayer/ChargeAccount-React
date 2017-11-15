import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import {Button, Table, Form, FormGroup, ControlLabel, FormControl, Panel} from "react-bootstrap"

class Record extends React.Component{
  constructor(props) {
      super(props);
  }
  handleDelete(){

  }
  fmoney(s, n=2){   
      if(s==='')
         return;
      n = n > 0 && n <= 20 ? n : 2;   
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
      var l = s.split(".")[0].split("").reverse(),   
      r = s.split(".")[1];   
      var t = "";   
      for(let i = 0; i < l.length; i ++ ) {   
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
      }   
      return t.split("").reverse().join("") + "." + r;   
 } 
  render(){
      return(
          <tr>
              <th>&emsp;</th>
              <td>{this.props.date}</td>
              <td>{this.props.title}</td>
              <td>￥{this.fmoney(this.props.amount)}</td>
              <td>
                  <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
              </td>
          </tr>
      )
  }
}

class RecordForm extends React.Component{
  constructor(){
      super();
      this.state={
          date:'',
          title:'',
          amount:0,
          valid:false
      }
  }
  handleChange(e){
      var name = e.target.name
      this.setState({[name]:e.target.value, valid:this.state.date&&this.state.title&&this.state.amount})
  }
  conveyRecord(e){
      e.preventDefault();
      var record = {
          key: this.props.num,
          date:this.state.date,
          title:this.state.title,
          amount:this.state.amount
      }
      //console.log(record)
      this.props.addRecord(record)
  }
  render(){
      return(
          <Form inline>
              <FormGroup controlId="formInlineDate">
                  <ControlLabel>&emsp;&emsp;&emsp;&emsp;&emsp;Date</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Date" name="date" onChange={this.handleChange.bind(this)}/>
              </FormGroup>
              {' '}
              <FormGroup controlId="formInlineTitel">
                  <ControlLabel>Title</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Title" name="title" onChange={this.handleChange.bind(this)}/>
              </FormGroup>
              {' '}
              <FormGroup controlId="formInlineAmount">
                  <ControlLabel>Amount</ControlLabel>
                  {' '}
                  <FormControl type="number" placeholder="Amount" name="amount" onChange={this.handleChange.bind(this)}/>
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.conveyRecord.bind(this)} disabled={!this.state.valid}>
                  Add
              </Button>
          </Form>
      )
  }
}

class RecordPanel extends React.Component{
  constructor(props){
      super(props);
  }
  render(){
      console.log(this.props.benefits)
      console.log(this.props.debits)
      console.log(this.props.balance)
      return (
          <Table>
          <tbody>
          <tr>
              <th>&emsp;</th>
              <th><Panel header="Benefits" bsStyle="success">￥{this.props.benefits}</Panel></th>
              <th>&emsp;&emsp;</th>
              <th><Panel header="Debits" bsStyle="danger">￥{this.props.debits}</Panel></th>
              <th>&emsp;&emsp;</th>
              <th><Panel header="Balance" bsStyle="info">￥{this.props.balance}</Panel></th>
              <th>&emsp;</th>
          </tr>
          </tbody>
          </Table>
      )
  }
}

class ChargeAccount extends React.Component{
  constructor() {
      super();
      this.state={
          records:[
              {key:1, date:"2017-11-11", title:'Buy iPhoneX', amount:-8000,},
              {key:2, date:"2017-11-11", title:'Pocket Money', amount:10000,}
          ],
          num:3,
          benefits:10000,
          debits:-8000,
          balance:2000
      }
  }
  addRecord(record){
      var records=this.state.records
      var num=this.state.num+1
      records.push(record)
      var amount=parseFloat(record.amount)
      var benefits=this.state.benefits
      var debits=this.state.debits
      var balance=this.state.balance
      if (record.amount>0)
          benefits+=amount
      else
          debits+=amount
      balance+=amount
      this.setState({records:records,num:num,benefits:benefits,debits:debits,balance:balance})
  }
  render(){
      const records=this.state.records;
      const benefits=this.state.benefits;
      const debits=this.state.debits;
      const balance=this.state.balance;
      console.log(benefits)
      console.log(debits)
      console.log(balance)
      return(
          <div className='records'>
          <hr></hr>
              <h2 className='records'>&emsp;&emsp;&emsp;&emsp;Charge Account</h2>
              <div className='row'>
                  <RecordPanel benefits={benefits} debits={debits} balance={balance}/>
                  <RecordForm ref="RecordForm" num={this.state.num} addRecord={this.addRecord.bind(this)}/>
                  <hr />
                  <Table striped condensed hover>
                      <thead>
                          <tr>
                              <th>&emsp;</th>
                              <th>Date</th>
                              <th>Title</th>
                              <th>Amount</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                          records.map( function(record) {
                              return <Record key={record.key} date={record.date} title={record.title} amount={record.amount}></Record>
                          })
                      }
                      </tbody>
                  </Table>
              </div>
          </div>
      )
  }
}
export default ChargeAccount
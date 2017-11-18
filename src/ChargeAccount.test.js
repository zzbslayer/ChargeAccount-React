import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {findDOMNode} from 'react-dom';
import ChargeAccount from './ChargeAccount';

/* RMBData example : '￥ 2000' => return 2000 */
function RMBData2Float(data) {
  return parseFloat((data.replace(',','')).substring(1));
}

it('renders without crashing', () => {
  const ca = TestRenderer.create(<ChargeAccount />);
  let tree = ca.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Add a record', function() {
  it('There\'s a problem I can\'t solve in the test', function(){
    /* 
    It seems that 'inputbox.value = "something"' can't change the value of a inputbox 

    If I remove the validation check of Recordform,
    record can be added when submitButton is clicked.
    But the date, title and amount of the newly-added record is NULL.

     I have read the official docs of enzyme and react but no api can help me 
     Stackoverflow can't help me either 
     so I don't know how to test the Recordform  
     */

    /*
    const ca = TestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const input = caDOM.querySelectorAll('input');
    let date = input[0];
    date.value = "2017-11-11";
    let title = input[1];
    title.value = "Buy hair lotion";
    let amount = input[2];
    amount.value = "-100";
    
    let submitButton = caDOM.querySelector('button');
    TestUtils.Simulate.click(submitButton);

    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const record = (record_tbody.querySelectorAll('tr'))[2];
    const amount1 = RMBData2Float(record.querySelector('#amount').innerHTML);
    console.log("amount:"+amout1)
    */
  })
})

describe('Delete a record', function() {
  it('RecordTable should update when delete-button clicked', function() {
    let ca = mount(<ChargeAccount/>);
    let recordsNum = ca.find('#recordTable').find('tbody').find('tr').length;
    
    let deleteButton = ca.find('button').at(1);
    deleteButton.simulate('click');

    let recordsNumAfterClick = ca.find('#recordTable').find('tbody').find('tr').length;
    expect(recordsNumAfterClick).toEqual(recordsNum-1);
  })

  it('Benefits of RecordPanel should update when delete-button clicked', function(){
    const ca = TestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const benefits = RMBData2Float(panels[0].innerHTML);

    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const record = (record_tbody.querySelectorAll('tr'))[1];
    const amount = RMBData2Float(record.querySelector('#amount').innerHTML);

    let deleteButton = record.querySelector('button');
    TestUtils.Simulate.click(deleteButton);

    const caDOMAfterClick =findDOMNode(ca);
    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const benefitsAfterClick = RMBData2Float(panels[0].innerHTML);

    expect(benefitsAfterClick).toEqual(benefits-amount);
  })

  it('Debits of RecordPanel should update when delete-button clicked', function(){
    const ca = TestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const debits = RMBData2Float(panels[1].innerHTML);

    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const record = record_tbody.querySelector('tr');
    const amount = RMBData2Float(record.querySelector('#amount').innerHTML);

    let deleteButton = record.querySelector('button');
    TestUtils.Simulate.click(deleteButton);

    const caDOMAfterClick =findDOMNode(ca);
    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const debitsAfterClick = RMBData2Float(panels[1].innerHTML);

    expect(debitsAfterClick).toEqual(debits-amount);
  })

  it('Balance of RecordPanel should update when delete-button clicked', function(){
    const ca = TestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const debits = RMBData2Float(panels[2].innerHTML);

    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const record = record_tbody.querySelector('tr');
    const amount = RMBData2Float(record.querySelector('#amount').innerHTML);

    let deleteButton = record.querySelector('button');
    TestUtils.Simulate.click(deleteButton);

    const caDOMAfterClick =findDOMNode(ca);
    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const debitsAfterClick = RMBData2Float(panels[2].innerHTML);

    expect(debitsAfterClick).toEqual(debits-amount);
  })
})


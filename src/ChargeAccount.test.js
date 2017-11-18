import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {findDOMNode} from 'react-dom';
import ChargeAccount from './ChargeAccount';

/* RMBData example : '￥ 2000' => return 2000 */
function RMBData2Float(data) {
  return parseFloat((data.replace(',','')).substring(1));
}

it('renders as expected', () => {
  const ca = TestRenderer.create(<ChargeAccount />);
  let tree = ca.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Add a record', () => {
  it('RecordTable should update when a record added', () => {
    
    const ca = ReactTestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const records = record_tbody.querySelectorAll('tr');
    const recordsNum = records.length;

    const input = caDOM.querySelectorAll('input');
    let date = input[0];
    let dateInput = "2017-11-11"
    date.value = dateInput;
    ReactTestUtils.Simulate.change(date);
    let title = input[1];
    let titleInput = "Buy hair lotion";
    title.value = titleInput;
    ReactTestUtils.Simulate.change(title);
    let amount = input[2];
    let amountInput = -100
    amount.value = amountInput;
    ReactTestUtils.Simulate.change(amount);
    ReactTestUtils.Simulate.keyDown(amount, {key: "Enter", keyCode: 13, which: 13});
    
    let submitButton = caDOM.querySelector('button');
    ReactTestUtils.Simulate.click(submitButton);

    const recordTableAfterClick = caDOM.querySelector('#recordTable');
    const record_tbodyAfterClick = recordTableAfterClick.querySelector('tbody');
    const recordsAfterClick = record_tbodyAfterClick.querySelectorAll('tr');
    const recordsNumAfterClick = recordsAfterClick.length;

    const NewRecord = recordsAfterClick[recordsNum];
    const amount1 = RMBData2Float(NewRecord.querySelector('.amount').innerHTML);
    const date1 = NewRecord.querySelector('.date').innerHTML;
    const title1 = NewRecord.querySelector('.title').innerHTML;
    expect(recordsNumAfterClick).toEqual(recordsNum+1);
    expect(date1).toEqual(dateInput);
    expect(title1).toEqual(titleInput);
    expect(amount1).toEqual(amountInput);
  })

  it('Benifits of RecordPanel should update when delete-button clicked', () => {
    const ca = ReactTestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const benefits = RMBData2Float(panels[0].innerHTML);

    const input = caDOM.querySelectorAll('input');
    let date = input[0];
    let dateInput = "2017-11-11"
    date.value = dateInput;
    ReactTestUtils.Simulate.change(date);
    let title = input[1];
    let titleInput = "Wages";
    title.value = titleInput;
    ReactTestUtils.Simulate.change(title);
    let amount = input[2];
    let amountInput = 15000
    amount.value = amountInput;
    ReactTestUtils.Simulate.change(amount);
    ReactTestUtils.Simulate.keyDown(amount, {key: "Enter", keyCode: 13, which: 13});
    let submitButton = caDOM.querySelector('button');
    ReactTestUtils.Simulate.click(submitButton);

    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const benefitsAfterClick = RMBData2Float(panels[0].innerHTML);
    expect(benefitsAfterClick).toEqual(benefits+amountInput);
  })

  it('Debits of RecordPanel should update when delete-button clicked', () => {
    const ca = ReactTestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const debits = RMBData2Float(panels[1].innerHTML);

    const input = caDOM.querySelectorAll('input');
    let date = input[0];
    let dateInput = "2017-11-11"
    date.value = dateInput;
    ReactTestUtils.Simulate.change(date);
    let title = input[1];
    let titleInput = "Buy hair lotion";
    title.value = titleInput;
    ReactTestUtils.Simulate.change(title);
    let amount = input[2];
    let amountInput = -100
    amount.value = amountInput;
    ReactTestUtils.Simulate.change(amount);
    ReactTestUtils.Simulate.keyDown(amount, {key: "Enter", keyCode: 13, which: 13});
    let submitButton = caDOM.querySelector('button');
    ReactTestUtils.Simulate.click(submitButton);

    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const debitsAfterClick = RMBData2Float(panels[1].innerHTML);
    expect(debitsAfterClick).toEqual(debits+amountInput);
  })

  it('Balance of RecordPanel should update when delete-button clicked', () => {
    const ca = ReactTestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const balance = RMBData2Float(panels[2].innerHTML);

    const input = caDOM.querySelectorAll('input');
    let date = input[0];
    let dateInput = "2017-11-11"
    date.value = dateInput;
    ReactTestUtils.Simulate.change(date);
    let title = input[1];
    let titleInput = "Buy hair lotion";
    title.value = titleInput;
    ReactTestUtils.Simulate.change(title);
    let amount = input[2];
    let amountInput = -100
    amount.value = amountInput;
    ReactTestUtils.Simulate.change(amount);
    ReactTestUtils.Simulate.keyDown(amount, {key: "Enter", keyCode: 13, which: 13});
    let submitButton = caDOM.querySelector('button');
    ReactTestUtils.Simulate.click(submitButton);

    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const balanceAfterClick = RMBData2Float(panels[2].innerHTML);
    expect(balanceAfterClick).toEqual(balance+amountInput);
  })
})

describe('Delete a record', () => {
  it('RecordTable should update when delete-button clicked', () => {
    let ca = mount(<ChargeAccount/>);
    let recordsNum = ca.find('#recordTable').find('tbody').find('tr').length;
    
    let deleteButton = ca.find('button').at(1);
    deleteButton.simulate('click');

    let recordsNumAfterClick = ca.find('#recordTable').find('tbody').find('tr').length;
    expect(recordsNumAfterClick).toEqual(recordsNum-1);
  })

  it('Benefits of RecordPanel should update when delete-button clicked', () => {
    const ca = ReactTestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const benefits = RMBData2Float(panels[0].innerHTML);

    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const record = (record_tbody.querySelectorAll('tr'))[1];
    const amount = RMBData2Float(record.querySelector('.amount').innerHTML);

    let deleteButton = record.querySelector('button');
    ReactTestUtils.Simulate.click(deleteButton);

    const caDOMAfterClick =findDOMNode(ca);
    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const benefitsAfterClick = RMBData2Float(panels[0].innerHTML);

    expect(benefitsAfterClick).toEqual(benefits-amount);
  })

  it('Debits of RecordPanel should update when delete-button clicked', () => {
    const ca = ReactTestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const debits = RMBData2Float(panels[1].innerHTML);

    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const record = record_tbody.querySelector('tr');
    const amount = RMBData2Float(record.querySelector('.amount').innerHTML);

    let deleteButton = record.querySelector('button');
    ReactTestUtils.Simulate.click(deleteButton);

    const caDOMAfterClick =findDOMNode(ca);
    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const debitsAfterClick = RMBData2Float(panels[1].innerHTML);

    expect(debitsAfterClick).toEqual(debits-amount);
  })

  it('Balance of RecordPanel should update when delete-button clicked', () => {
    const ca = ReactTestUtils.renderIntoDocument(<ChargeAccount/>);
    const caDOM =findDOMNode(ca);
    const panels = caDOM.querySelectorAll(".panel-body");
    const debits = RMBData2Float(panels[2].innerHTML);

    const recordTable = caDOM.querySelector('#recordTable');
    const record_tbody = recordTable.querySelector('tbody');
    const record = record_tbody.querySelector('tr');
    const amount = RMBData2Float(record.querySelector('.amount').innerHTML);

    let deleteButton = record.querySelector('button');
    ReactTestUtils.Simulate.click(deleteButton);

    const caDOMAfterClick =findDOMNode(ca);
    const panelsAfterClick = caDOM.querySelectorAll(".panel-body");
    const debitsAfterClick = RMBData2Float(panels[2].innerHTML);

    expect(debitsAfterClick).toEqual(debits-amount);
  })
})


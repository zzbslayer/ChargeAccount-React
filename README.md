#A Simple Charge Account app 
Based on react.js, react-bootstrap, jest+enzyme.
It allows users to 
- add a record
- delete a record

and calculates
- benefits
- debits
- balance

When I try to use enzyme, there happened some problems.
find() can't find selectors like '.panel-body'
So I finally turned to ReactTestUtils.

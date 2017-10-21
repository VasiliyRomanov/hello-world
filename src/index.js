import React from 'react';
import ReactDOM from 'react-dom';




class SalaryRow extends React.Component {



  constructor() {
    super();
    this.state = {value: ''};
    this.salaryChange = this.salaryChange.bind(this);
  }

 salaryChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    
    return (
      <tr>
        <td>{this.props.addEmployee.id}</td>
        <td>{this.props.addEmployee.name}</td>
        <td>{this.props.addEmployee.dep}</td>
        <td><input type="number" onChange={this.salaryChange} /></td>
        <td>{this.state.value*0.13}</td>
      </tr>
    );
  }
}

class SalaryTable extends React.Component {
  render() {
    var rows = [];
    this.props.employee.forEach(function(addEmployee) {
      rows.push(<SalaryRow addEmployee={addEmployee} key={addEmployee.id} />);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>№</th>
      <th>ФИО</th>
      <th>Отдел</th>
      <th>З/П</th>
      <th>НДФЛ</th>
          </tr>
        </thead>
        <tbody>
        	{rows}
        	<tr>
        		<td colspan="5">Total:</td>
        	</tr>
        </tbody>
      </table>
    );
  }
}


class FilterableSalaryTable extends React.Component {
  render() {
    return (
      <div>
        <SalaryTable employee={this.props.employee} />
      </div>
    );
  }
}


var employees = [
  {id: 1, name: 'Иван Пупкин', dep: 'Администрация', salary: '', ndfl: ''},
  {id: 2, name: 'Петр Гаврилкин', dep: 'IT-отдел', salary: '', ndfl: ''},
  {id: 3, name: 'Анна Смирнова', dep: 'Бухгалтерия', salary: '', ndfl: ''},
  {id: 4, name: 'Сергей Чашкин', dep: 'Снабжение', salary: '', ndfl: ''}
];
 
ReactDOM.render(
  <FilterableSalaryTable employee={employees} />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';


class SalaryRow extends React.Component {

  render() {
    
    return (
      <tr>
        <td>{this.props.addEmployee.id}</td>
        <td>{this.props.addEmployee.name}</td>
        <td>{this.props.addEmployee.dep}</td>
        <td><input onChange={this.props.action} /></td>
        <td>{this.props.addEmployee.dep}</td>
      </tr>
    );
  }
};

class SalaryTable extends React.Component {

constructor() {
      super();

      this.updateEmployeeData = this.updateEmployeeData.bind(this);

      this.state = {
        employees: [
              {id: 1, name: 'Иван Пупкин', dep: 'Администрация', salary: '', ndfl: ''},
              {id: 2, name: 'Петр Гаврилкин', dep: 'IT-отдел', salary: '', ndfl: ''},
              {id: 3, name: 'Анна Смирнова', dep: 'Бухгалтерия', salary: '', ndfl: ''},
              {id: 4, name: 'Сергей Чашкин', dep: 'Снабжение', salary: '', ndfl: ''}
            ]
      };
   }

   updateEmployeeData(id, salary) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id == id;
    });

    var updatedData = update(employees[index], {salary: {$set: salary}});

    var newEmployees = update(employees, {
      $splice: [[index, 1, updatedData]]
    });
    this.setState({
      employees: newEmployees 
    });
   }

  render() {
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
            {this.state.employees.map((dynamicComponent) => <SalaryRow 
            key = {this.state.employees.id} addEmployee = {dynamicComponent} action={this.updateEmployeeData} />)}
        </tbody>
      </table>
    );
  }
}


ReactDOM.render(
  <SalaryTable />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';


class SalaryRow extends React.Component {

  render() {    
    var employeeID = this.props.addEmployee.id;

    var salaryHandler = this.props.salary;
    var changeSalary = function (s) { salaryHandler(employeeID, s.target.value);};

    var idHandler = this.props.id;
    var changeID = function (i) { idHandler(employeeID, i.target.value);};

    var nameHandler = this.props.name;
    var changeName = function (n) { nameHandler(employeeID, n.target.value);};

    var depHandler = this.props.dep;
    var changeDep = function (d) { depHandler(employeeID, d.target.value);};

    var deleteData = this.props.del;
    var delHandler = function() {deleteData(employeeID);};

    var fireEmployee = this.props.fire;
    var fireHandler = function() {fireEmployee(employeeID);};

    var isID = this.props.addEmployee.id === '' ? <input type="text" onBlur={changeID} /> : this.props.addEmployee.id;
    var isName = this.props.addEmployee.name === '' ? <input type="text" onBlur={changeName} /> : this.props.addEmployee.name;
    var isDep = this.props.addEmployee.dep === '' ? <input type="text" onBlur={changeDep} /> : this.props.addEmployee.dep;
    var isSalary = this.props.addEmployee.salary === '' ? <input type="number" onBlur={changeSalary} /> : this.props.addEmployee.salary;
    
    return (
      <tr>
        <td>{isID}</td>
        <td>{isName}</td>
        <td>{isDep}</td>
        <td>{isSalary}</td>
        <td>{this.props.addEmployee.ndfl}</td>
        <td><button onClick={delHandler} /></td>
        <td><button onClick={fireHandler}>Удалить</button></td>
      </tr>
    );
  }
};

class SalaryTable extends React.Component {

constructor() {
      super();

      this.updateID = this.updateID.bind(this);
      this.updateName = this.updateName.bind(this);      
      this.updateDep = this.updateDep.bind(this);
      this.updateSalary = this.updateSalary.bind(this);
      this.addNewRow = this.addNewRow.bind(this);
      this.deleteEmployeeData = this.deleteEmployeeData.bind(this);
      this.fireEmployee = this.fireEmployee.bind(this);

      this.state = {
        employees: [
              {id: 1, name: 'Иван Пупкин', dep: 'Администрация', salary: '', ndfl: ''},
              {id: 2, name: 'Петр Гаврилкин', dep: 'IT-отдел', salary: '', ndfl: ''},
              {id: 3, name: 'Анна Смирнова', dep: 'Бухгалтерия', salary: '', ndfl: ''},
              {id: 4, name: 'Сергей Чашкин', dep: 'Снабжение', salary: '', ndfl: ''}
            ]
      };
   }

   addNewRow() {
    var employees = this.state.employees;
    var newEmployees = update(employees, {$push: [{id: '', name: '', dep: '', salary: '', ndfl: ''}]});
    this.setState({
      employees: newEmployees 
    });
   }

   updateSalary(id, salary) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var updatedSalary = update(employees[index], {salary: {$set: salary}, ndfl: {$set: salary*0.13}});

    var newSalary = update(employees, {
      $splice: [[index, 1, updatedSalary]]
    });
    this.setState({
      employees: newSalary 
    });
   }

   updateID(id, inputID) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var updatedID = update(employees[index], {id: {$set: inputID}});

    var newID = update(employees, {
      $splice: [[index, 1, updatedID]]
    });
    this.setState({
      employees: newID 
    });
   }

   updateName(id, name) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var updatedName = update(employees[index], {name: {$set: name}});

    var newName = update(employees, {
      $splice: [[index, 1, updatedName]]
    });
    this.setState({
      employees: newName
    });
   }

   updateDep(id, dep) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var updatedDep = update(employees[index], {dep: {$set: dep}});

    var newDep = update(employees, {
      $splice: [[index, 1, updatedDep]]
    });
    this.setState({
      employees: newDep
    });
   }

   deleteEmployeeData(id) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var deleteData = update(employees[index], {id: {$set: ''}, name: {$set: ''}, dep: {$set: ''}, salary: {$set: ''}, ndfl: {$set: ''}});

    var deleteInfo = update(employees, {
      $splice: [[index, 1, deleteData]]
    });

    this.setState({
      employees: deleteInfo 
    });
   }


   fireEmployee(id) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var fire = update(employees, {
      $splice: [[index, 1]]
    });

    this.setState({
      employees: fire 
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
            key = {this.state.employees.id} addEmployee = {dynamicComponent} salary={this.updateSalary} id={this.updateID} name={this.updateName} dep={this.updateDep} del={this.deleteEmployeeData} fire={this.fireEmployee} />)}
            <tr><td><button onClick={this.addNewRow}>Добавить</button></td></tr>
        </tbody>
      </table>
    );
  }
}


ReactDOM.render(
  <SalaryTable />,
  document.getElementById('root')
);

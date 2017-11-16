import React from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import './index.css';


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

    var idEditor = this.props.delID;
    var deleteID = function() {idEditor(employeeID);};

    var nameEditor = this.props.delName;
    var deleteName = function() {nameEditor(employeeID)}

    var depEditor = this.props.delDep;
    var deleteDep = function() {depEditor(employeeID)}

    var salaryEditor = this.props.delSalary;
    var deleteSalary = function() {salaryEditor(employeeID)}

    var fireEmployee = this.props.fire;
    var fireHandler = function() {fireEmployee(employeeID);};

    var isID = this.props.addEmployee.id === '' ? <input type="text" size="1" onBlur={changeID} /> : this.props.addEmployee.id;
    var isName = this.props.addEmployee.name === '' ? <input type="text" onBlur={changeName} /> : this.props.addEmployee.name;
    var isDep = this.props.addEmployee.dep === '' ? <input type="text" onBlur={changeDep} /> : this.props.addEmployee.dep;
    var isSalary = this.props.addEmployee.salary === '' ? <input type="number" onBlur={changeSalary} /> : this.props.addEmployee.salary;
    
    return (
      <tr className="hover">
        <td className="id">{isID}<input title="Редактировать" align="right" width="20px" type="image" onClick={deleteID} src="http://aux.iconpedia.net/uploads/264210985477521004.png" alt="" /></td>
        <td>{isName}<input title="Редактировать" align="right" width="20px" type="image" onClick={deleteName} src="http://aux.iconpedia.net/uploads/264210985477521004.png" alt="" /></td>
        <td>{isDep}<input title="Редактировать" align="right" width="20px" type="image" onClick={deleteDep} src="http://aux.iconpedia.net/uploads/264210985477521004.png" alt="" /></td>
        <td>{isSalary}<input title="Редактировать" align="right" width="20px" type="image" onClick={deleteSalary} src="http://aux.iconpedia.net/uploads/264210985477521004.png" alt="" /></td>
        <td>{this.props.addEmployee.ndfl}</td>
        <td className="right"><input type="image" title="Удалить" onClick={fireHandler} src="http://aux.iconpedia.net/uploads/14037210881909376695.png" alt="" /></td>
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
      this.deleteID = this.deleteID.bind(this);
      this.deleteName = this.deleteName.bind(this);
      this.deleteDep = this.deleteDep.bind(this);
      this.deleteSalary = this.deleteSalary.bind(this);
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

   deleteID(id) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var deletedID = update(employees[index], {id: {$set: ''}});

    var updateEmployees = update(employees, {
      $splice: [[index, 1, deletedID]]
    });

    this.setState({
      employees: updateEmployees 
    });
   }

   deleteName(id) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var deletedName = update(employees[index], {name: {$set: ''}});

    var updateEmployees = update(employees, {
      $splice: [[index, 1, deletedName]]
    });

      this.setState({
        employees: updateEmployees 

    });
   }

   deleteDep(id) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var deletedDep = update(employees[index], {dep: {$set: ''}});

    var updateEmployees = update(employees, {
      $splice: [[index, 1, deletedDep]]
    });

      this.setState({
        employees: updateEmployees 

    });
   }

   deleteSalary(id) {
    var employees = this.state.employees;
    var index = employees.findIndex(function(c) {
      return c.id === id;
    });

    var deletedSalary = update(employees[index], {salary: {$set: ''}});

    var updateEmployees = update(employees, {
      $splice: [[index, 1, deletedSalary]]
    });

      this.setState({
        employees: updateEmployees 

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
    var total = this.state.employees.reduce((prev, next) => prev + next.ndfl,0);
    return (
        <table>
          <thead>
            <tr>
              <th>№</th>
        <th>ФИО</th>
        <th>Отдел</th>
        <th>З/П</th>
        <th>НДФЛ</th>
        <th></th>
            </tr>
          </thead>
          <tbody>
              {this.state.employees.map((dynamicComponent) => <SalaryRow 
              key = {this.state.employees.id} addEmployee = {dynamicComponent} salary={this.updateSalary} id={this.updateID} name={this.updateName} dep={this.updateDep} delID={this.deleteID} delName={this.deleteName} delDep={this.deleteDep} delSalary={this.deleteSalary} fire={this.fireEmployee} />)}
              <tr><td colspan="6" className="bottom">Сумма НДФЛ: {total} <input type="image" className="add" title="Добавить" src="http://aux.iconpedia.net/uploads/17194693261258811327.png" alt="" onClick={this.addNewRow} /></td></tr>
          </tbody>
        </table>
    );
  }
}


ReactDOM.render(
  <SalaryTable />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';


class SalaryRow extends React.Component {
   constructor(props) {
      super(props);
      this.state = {value: '0'};
      this.updateValue = this.updateValue.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
   }

   updateValue(modifiedValue){
      this.setState({
         value:modifiedValue
      })
   }

saveChanges() {
    this.setState({employees: this.state.employees.salary.concat(this.state.value)})
}

  render() {
    
    return (
      <tr>
        <td>{this.props.addEmployee.id}</td>
        <td>{this.props.addEmployee.name}</td>
        <td>{this.props.addEmployee.dep}</td>
        <td><InputSalary key={this.props.addEmployee.id} value={this.state.value} updateValue={this.updateValue} onChange={this.saveChanges} /></td>
        <td>{this.state.value*0.13}</td>
      </tr>
    );
  }
};

class InputSalary extends React.Component {
   update() {
      var modifiedValue = this.refs.inputValue.value;
      this.props.updateValue(modifiedValue);
   }

   render() {
      return (
         <input type="number" ref="inputValue" value={this.props.value} onChange={this.update.bind(this)} />
      );
   }

};

class SalaryTable extends React.Component {
  render() {
    var rows = [];
    var total = employees.reduce((prev, next) => prev + next.salary, 0);
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
            <td colspan="5">Total: {total}</td>
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

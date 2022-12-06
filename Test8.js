var Employee = /** @class */ (function () {
    function Employee(identifier) {
        this.identifier = identifier;
    }
    return Employee;
}());
var Warehouse = /** @class */ (function () {
    function Warehouse(identifier) {
        this.identifier = identifier;
    }
    return Warehouse;
}());
function printEmployeeIdentifier(employee) {
    console.log(employee.identifier);
}
var warehouse = new Warehouse("abc");
printEmployeeIdentifier(warehouse);

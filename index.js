// Your code here

let createEmployeeRecord = function(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployees = function(employee) {
  return employee.map(data => {
    return createEmployeeRecord(data)
  })
}

let createTimeInEvent = (employee, timeStamp) => {
  let [date, hour] = timeStamp.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  })
  return employee
}
let createTimeOutEvent = (employee, timeStamp) => {
  let [date, hour] = timeStamp.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  })
  return employee
}

let hoursWorkedOnDate = (employee, date) => {
  let inEvent = employee.timeInEvents.find(e => {
    return e.date === date
  })
  let outEvent = employee.timeOutEvents.find(e => {
    return e.date === date
  })
  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought) {
  let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour
  return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee) {
  let eligibleDates = employee.timeInEvents.map(function(e) {
    return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

let createEmployeeRecords = function(src) {
  return src.map(function(row) {
    return createEmployeeRecord(row)
  })
}

let findEmployeebyFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec) {
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function(memo, rec) {
    return memo + allWagesFor(rec)
  }, 0)
}

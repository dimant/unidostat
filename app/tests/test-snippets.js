// <script src="tests/sample-data.js"></script>
// test code
if(!dbInfo) {
    unidostat.setCredentials("diman.todorov@outlook.com", "r0llerball");
    appstate.setDbInfo(indstatDbInfo.db);
    appstate.setCountries([{code: "040", name:"Austria"}]);
    appstate.setIndustries([{code: "04", name: "Employees"}]);
    dbInfo = appstate.getDbInfo();
}
// --------

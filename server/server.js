const app = require('.server/app.js');
const http = require('http');
const { setupCronJobs } = require('.server/services/cronService.js');
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
// Start cron jobs
setupCronJobs();
});
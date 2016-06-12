const app = require('./src');

app.listen(4001, () => {
  process.stdout.write('\nAPI running on port 4001\n');
});

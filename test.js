const test = require('tape');
const { isValid } = require('./dist');

test('personal identity codes in an erroneous format', assert => {
  assert.notOk(isValid('12345'));
  assert.notOk(isValid('123456789123456789'));
  assert.notOk(isValid('abc'));
  assert.notOk(isValid('191a0831-7574'));
  assert.notOk(isValid('19610603!1757'));
  assert.notOk(isValid('040699T891P'));
  assert.notOk(isValid('280201G891N'));
  assert.end();
});

test('personal identity codes with a correct checksum but incorrect date', assert => {
  assert.notOk(isValid('211357-2294'));
  assert.notOk(isValid('321124-251T'));
  assert.notOk(isValid('310253-4947'));
  assert.notOk(isValid('301388-3605'));
  assert.notOk(isValid('320988-676d'));
  assert.notOk(isValid('290200-8912'));
  assert.end();
});

test('valid personal identity codes', assert => {
  assert.ok(isValid('210157-229E'));
  assert.ok(isValid('071124-251N'));
  assert.ok(isValid('160853-494c'));
  assert.ok(isValid('100688-360L'));
  assert.ok(isValid('260988-676J'));
  assert.ok(isValid('290200A8912')); // year 2000 leap day
  assert.ok(isValid('040699Y891P'));
  assert.ok(isValid('280201B891N'));
  assert.end();
});

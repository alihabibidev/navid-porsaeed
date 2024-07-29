export function getLineNumber(err) {
  //   const err = new Error();
  const stack = err.stack.split('\n');
  const line = stack[2]; // خط دوم شامل اطلاعات مورد نیاز است
  const lineNumber = line.match(/:(\d+):\d+/)[1]; // استخراج شماره خط
  return lineNumber;
}

export function aliLog(err, value) {
  console.log(`${__filename} - ${getLineNumber(err)} ---> ${value}`);
}

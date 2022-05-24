const {stdin, stdout, stderr} = process;

const fs = require('fs');
const path = require('path');

const writStream = fs.createWriteStream(path.join(__dirname, 'test.txt'));
stdout.write('Введите текст.\nЧтобы закончит ввод, введите exit\n');

stdin.on('data', data => {
  const text = data.toString();
  if (text.trim() === 'exit') process.exit();
  
  writStream.write(`${text}`, 
    err => {
      if (err) throw err;
    }
  );
});

process.on('exit', code => {
  if (code === 0)
    stdout.write('\nСпасибо за проверку, пока!\n');
  else
    stderr.write(`Ошибка с кодом ${code}`);
});
process.on('SIGINT', () => {
  process.exit();
});
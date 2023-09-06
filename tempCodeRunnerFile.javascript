const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Читаем ввод пользователя
rl.question('Введите количество револьверов и количество долларов: ', (input) => {
  const [n, s] = input.split(' ').map(Number);
  rl.question('Введите цены револьверов: ', (input) => {
    const revolverPrices = input.split(' ').map(Number);
    const result = findMaxAffordableRevolver(n, s, revolverPrices);
    console.log(result);
    rl.close();
  });
});

function findMaxAffordableRevolver(n, s, revolverPrices) {
  let maxPrice = 0;

  for (let i = 0; i < n; i++) {
    if (revolverPrices[i] <= s && revolverPrices[i] > maxPrice) {
      maxPrice = revolverPrices[i];
    }
  }

  if (maxPrice === 0) {
    return 0;
  }

  return maxPrice;
}

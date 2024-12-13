const readline = require("readline");
const VendingMachineState = require("./vendingMachineState");
const {
  displayMenu,
  isValidMoneyChoice,
  handleMoneyInsertion,
  handleDrinkSelection,
  displayAvailableDrinks,
} = require("./utils");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const state = new VendingMachineState();
const maxMoney = 99900; // 최대 투입 금액
const inventory = [
  { name: "Cola", price: 1100, stock: 10 },
  { name: "Water", price: 600, stock: 10 },
  { name: "Coffee", price: 700, stock: 10 },
];
const moneyIndex = [100, 500, 1000, 5000, 10000];

function main() {
  displayMenu(state);
  rl.question("선택: ", (choice) => {
    switch (choice) {
      case "1":
        console.log("\n화폐를 선택하세요:");
        moneyIndex.forEach((value, index) => console.log(`${index + 1}. ${value}원`));
        rl.question("선택: ", (moneyChoice) => {
          if (isValidMoneyChoice(moneyChoice, moneyIndex)) {
            handleMoneyInsertion(moneyChoice, moneyIndex, state, maxMoney);
            state.updateReadyForSelection(inventory);
            console.log(`\n현재 투입 금액: ${state.userMoney}원`);
          } else {
            console.log("올바른 화폐를 투입하세요.");
          }
          main();
        });
        break;
      case "2":
        state.isCardInserted = true;
        state.isReadyForSelection = true;
        console.log("\n카드가 삽입되었습니다. 음료를 선택할 수 있습니다.");
        main();
        break;
      case "3":
        if (state.isReadyForSelection) {
          displayAvailableDrinks(state, inventory);
          console.log("0. 선택하지 않고 이전 메뉴로 돌아가기");
          rl.question("음료 번호를 선택하세요: ", (drinkChoice) => {
            if (drinkChoice === "0") {
              console.log("\n이전 메뉴로 돌아갑니다.");
              main();
            } else {
              if (handleDrinkSelection(drinkChoice, inventory, state)) {
                console.log("\n음료가 제공되었습니다. 감사합니다!");
              }
              state.updateReadyForSelection(inventory);
              main();
            }
          });
        } else {
          console.log("\n음료를 선택할 수 없습니다. 돈을 투입하거나 카드를 삽입하세요.");
          main();
        }
        break;
      case "4":
        if (state.userMoney > 0) {
          console.log(`\n잔돈 ${state.userMoney}원이 반환됩니다.`);
          state.userMoney = 0;
        } else {
          console.log("\n반환할 잔돈이 없습니다.");
        }
        state.isReadyForSelection = false;
        main();
        break;
      case "5":
        if (state.isCardInserted) {
          console.log("\n카드가 제거되었습니다.");
        }
        if (state.userMoney > 0) {
          console.log(`잔돈 ${state.userMoney}원이 반환됩니다.`);
        }
        state.reset();
        console.log("\n자판기가 초기화되었습니다.");
        main();
        break;
      default:
        console.log("\n잘못된 입력입니다. 다시 선택하세요.");
        main();
    }
  });
}

console.log("\n자판기가 초기화되었습니다. 시작하려면 옵션을 선택하세요.");
main();

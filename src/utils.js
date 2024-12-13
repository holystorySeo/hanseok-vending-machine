// 사용자 입력 대기
function displayMenu(state) {
  console.log("\n##################");
  console.log(`\n투입 금액: ${state.userMoney}원`);
  console.log(`${state.isCardInserted ? "카드가 삽입되었습니다." : "카드가 삽입되지 않았습니다."}`);
  console.log("사용자 입력 대기:");
  console.log("1. 화폐 투입");
  if (!state.isCardInserted) console.log("2. 카드 삽입");
  if (state.isReadyForSelection) console.log("3. 음료 선택");
  if (state.isChangeRequired || state.userMoney > 0) console.log("4. 잔돈 반환");
  console.log("5. 재시작");
}

// 입력된 번호가 유효한 화폐 선택인지 확인합니다.
function isValidMoneyChoice(choice, moneyIndex) {
  const index = parseInt(choice, 10) - 1;
  return index >= 0 && index < moneyIndex.length;
}

// 사용자가 선택한 금액을 투입하고 현재 금액을 업데이트합니다.
function handleMoneyInsertion(choice, moneyIndex, state, maxMoney) {
  const index = parseInt(choice, 10) - 1;
  const moneyToAdd = moneyIndex[index];
  if (state.userMoney + moneyToAdd > maxMoney) {
    console.log(`최대 투입 금액(${maxMoney}원)을 초과할 수 없습니다.`);
  } else {
    state.userMoney += moneyToAdd;
    console.log(`현재 투입 금액: ${state.userMoney}원`);
  }
}

// 사용자가 선택한 음료를 구매 처리하고, 재고 및 금액을 업데이트합니다.
function handleDrinkSelection(choice, inventory, state) {
  const index = parseInt(choice, 10) - 1;
  if (index < 0 || index >= inventory.length) {
    console.log("잘못된 선택입니다. 다시 입력하세요.");
    return false;
  }

  const drink = inventory[index];
  if (drink.stock <= 0) {
    console.log(`${drink.name}는 품절입니다.`);
    return false;
  }

  if (state.isCardInserted || state.userMoney >= drink.price) {
    drink.stock--;
    if (state.userMoney >= drink.price) {
      state.userMoney -= drink.price;
    } else {
      console.log(`카드로 ${drink.price - state.userMoney}원을 결제합니다.`);
      state.userMoney = 0;
    }
    console.log(`${drink.name}를 제공합니다.`);
    return true;
  }

  console.log("잔액이 부족합니다. 추가 금액을 투입하세요.");
  return false;
}

// 현재 상태를 기반으로 선택 가능한 음료와 재고 상태를 표시합니다.
function displayAvailableDrinks(state, inventory) {
  console.log("\n선택 가능한 음료:");
  inventory.forEach((item, index) => {
    if (state.isCardInserted || state.userMoney >= item.price) {
      console.log(`${index + 1}. ${item.name} (${item.price}원) - 재고: ${item.stock}`);
    } else {
      console.log(`${index + 1}. ${item.name} (${item.price}원) - 구매 불가`);
    }
  });
}

module.exports = {
  displayMenu, // 사용자 메뉴를 표시하는 함수
  isValidMoneyChoice, // 화폐 투입 입력 값 검증 함수
  handleMoneyInsertion, // 화폐 투입 처리 함수
  handleDrinkSelection, // 음료 선택 처리 함수
  displayAvailableDrinks, // 선택 가능한 음료를 표시하는 함수
};
